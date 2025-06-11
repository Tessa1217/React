// 회원가입 UI
import SignUpForm from '@/features/auth/ui/SignUpForm';
import { memo, useEffect } from 'react';
import { useImmer } from 'use-immer';
import { useNavigate } from 'react-router-dom';
import { useAppMutation } from '@/shared/hooks/useAppMutation';
import {
  sendSignUp,
  checkDuplicateEmail,
  checkDuplicateUserId,
} from '@/features/auth/model/auth.api';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import useFormConfirm, { ConfirmType } from '@/shared/hooks/useFormConfirm';
import useFormAlert from '@/shared/hooks/useFormAlert';

const schema = z.object({
  userId: z
    .string()
    .min(5, '아이디는 최소 5자리 이상이어야 합니다.')
    .max(50, '아이디는 최대 50자리까지 입력 가능합니다.'),
  password: z
    .string()
    .min(8, '비밀번호는 최소 8자리 이상이어야 합니다.')
    .max(20, '비밀번호는 최대 20자리까지 입력 가능합니다.'),
  email: z
    .string()
    .max(200, '이메일은 200자리까지 입력 가능합니다.')
    .email('올바른 이메일 주소를 입력해주세요.'),
  name: z
    .string()
    .min(1, '성명은 필수값입니다.')
    .max(100, '성명은 최대 100자리까지 입력 가능합니다.'),
});

const SignUpFormContainer = memo(() => {
  const navigate = useNavigate();
  const showFormErrorAlert = useFormAlert();
  const showConfirmModal = useFormConfirm();

  const {
    register,
    setFocus,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
    mod: 'onSubmit',
    shouldFocusError: false,
  });

  // Error 반환 시 알림 띄우기 및 Focus 처리
  useEffect(() => {
    const firstErrorKey = Object.keys(errors)[0];
    if (firstErrorKey) {
      showFormErrorAlert(errors[firstErrorKey]?.message).then(() =>
        setFocus(firstErrorKey)
      );
    }
  }, [errors, showFormErrorAlert, setFocus]);

  const { mutate: checkUserId, isPending: isCheckingUserId } = useAppMutation(
    checkDuplicateUserId,
    {
      showMessage: false,
      onSuccess: ({ data }) => {
        updateChecker((draft) => {
          draft.userIdCheck.checked = true;
          draft.userIdCheck.duplicate = data;
        });
      },
    }
  );

  // 이메일 중복 확인 요청
  const { mutate: checkEmail, isPending: isCheckingEmail } = useAppMutation(
    checkDuplicateEmail,
    {
      showMessage: false,
      onSuccess: ({ data }) => {
        updateChecker((draft) => {
          draft.emailCheck.checked = true;
          draft.emailCheck.duplicate = data;
        });
      },
    }
  );

  // 회원가입 요청
  const { mutate: signUp, isPending: isSigningUp } = useAppMutation(
    sendSignUp,
    { showMessage: true, onSuccess: () => navigate('/') }
  );

  const [checker, updateChecker] = useImmer({
    passwordCheck: {
      value: '',
      matched: true,
    },
    emailCheck: {
      duplicate: false,
      checked: false,
    },
    userIdCheck: {
      duplicate: false,
      checked: false,
    },
  });

  // 이메일 변경 확인 핸들러
  const handleEmailChange = (e) => {
    e.preventDefault();
    updateChecker((draft) => {
      draft.emailCheck.checked = false;
    });
  };

  // 아이디 변경 확인 핸들러
  const handleUserIdChange = (e) => {
    e.preventDefault();
    updateChecker((draft) => {
      draft.userIdCheck.checked = false;
    });
  };

  // 비밀번호 변경 확인 핸들러
  const handlePasswordCheckChange = (e) => {
    const password = getValues('password');
    updateChecker((draft) => {
      draft.passwordCheck.value = e.target.value;
      draft.passwordCheck.matched = e.target.value == password;
    });
  };

  // 사용자 아이디 중복확인 요청 핸들러
  const handleDuplicateUserIdCheck = (e) => {
    e.preventDefault();
    checkUserId(getValues('userId'));
  };

  // 이메일 중복확인 요청 핸들러
  const handleDuplicateEmailCheck = (e) => {
    e.preventDefault();
    checkEmail(getValues('email'));
  };

  // 폼 요청 핸들러
  const handleSubmitAfterValidate = (data) => {
    showConfirmModal(ConfirmType.INSERT).then((result) => {
      if (result) {
        signUp(data);
      }
    });
  };

  return (
    <SignUpForm
      register={register}
      onSubmit={handleSubmit(handleSubmitAfterValidate)}
      onEmailChange={handleEmailChange}
      onUserIdChange={handleUserIdChange}
      onPasswordCheckChange={handlePasswordCheckChange}
      onDuplicateEmailCheck={handleDuplicateEmailCheck}
      onDuplicateUserIdCheck={handleDuplicateUserIdCheck}
      isCheckingEmail={isCheckingEmail}
      isCheckingUserId={isCheckingUserId}
      isSigningUp={isSigningUp}
      passwordCheck={checker.passwordCheck.value}
      passwordCheckMatched={checker.passwordCheck.matched}
      userIdChecked={checker.userIdCheck.checked}
      userIdDuplicate={checker.userIdCheck.duplicate}
      emailChecked={checker.emailCheck.checked}
      emailDuplicate={checker.emailCheck.duplicate}
    />
  );
});
export default SignUpFormContainer;
