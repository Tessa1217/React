// 회원가입 UI
import SignUpForm from '@/features/auth/ui/SignUpForm';
import { memo, useState } from 'react';
import { useImmer } from 'use-immer';
import { useNavigate } from 'react-router-dom';
import { useAppMutation } from '@/shared/hooks/useAppMutation';
import {
  sendSignUp,
  checkDuplicateEmail,
  checkDuplicateUserId,
} from '@/features/auth/model/auth.api';

const SignUpFormContainer = memo(() => {
  const navigate = useNavigate();

  const [signUpForm, setSignUpForm] = useState({
    userId: '',
    email: '',
    password: '',
    name: '',
  });

  const { mutate: checkUserId, isPending: isCheckingUserId } = useAppMutation(
    checkDuplicateUserId,
    {
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
    { onSuccess: () => navigate('/') }
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

  // 입력값 변경 핸들러
  const handleChange = (e) => {
    setSignUpForm({ ...signUpForm, [e.target.name]: e.target.value });
  };

  // 이메일 변경 확인 핸들러
  const handleEmailChange = (e) => {
    updateChecker((draft) => {
      draft.emailCheck.checked = false;
    });
    handleChange(e);
  };

  // 아이디 변경 확인 핸들러
  const handleUserIdChange = (e) => {
    updateChecker((draft) => {
      draft.userIdCheck.checked = false;
    });
    handleChange(e);
  };

  // 비밀번호 변경 확인 핸들러
  const handlePasswordCheckChange = (e) => {
    updateChecker((draft) => {
      draft.passwordCheck.value = e.target.value;
      draft.passwordCheck.matched = e.target.value == signUpForm.password;
    });
  };

  // 사용자 아이디 중복확인 요청 핸들러
  const handleDuplicateUserIdCheck = (e) => {
    e.stopPropagation();
    checkUserId(signUpForm.userId);
  };

  // 이메일 중복확인 요청 핸들러
  const handleDuplicateEmailCheck = (e) => {
    e.stopPropagation();
    checkEmail(signUpForm.email);
  };

  // 폼 요청 핸들러
  const handleSubmit = (e) => {
    e.preventDefault();
    signUp(signUpForm);
  };

  return (
    <SignUpForm
      {...signUpForm}
      passwordCheck={checker.passwordCheck.value}
      passwordCheckMatched={checker.passwordCheck.matched}
      isCheckingEmail={isCheckingEmail}
      isCheckingUserId={isCheckingUserId}
      userIdChecked={checker.userIdCheck.checked}
      userIdDuplicate={checker.userIdCheck.duplicate}
      emailChecked={checker.emailCheck.checked}
      emailDuplicate={checker.emailCheck.duplicate}
      onChange={handleChange}
      onEmailChange={handleEmailChange}
      onUserIdChange={handleUserIdChange}
      onPasswordCheckChange={handlePasswordCheckChange}
      onDuplicateEmailCheck={handleDuplicateEmailCheck}
      onDuplicateUserIdCheck={handleDuplicateUserIdCheck}
      onSubmit={handleSubmit}
      isSigningUp={isSigningUp}
    />
  );
});
export default SignUpFormContainer;
