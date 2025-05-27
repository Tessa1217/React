// 회원가입 UI
import SignUpForm from '@/features/auth/ui/SignUpForm';
import { memo, useState } from 'react';
import { useImmer } from 'use-immer';
import { useNavigate } from 'react-router-dom';
import { useAppMutation } from '@/shared/hooks/useAppMutation';
import {
  sendSignUp,
  checkDuplicateEmail,
} from '@/features/auth/model/auth.api';

const SignUpFormContainer = memo(() => {
  const navigate = useNavigate();

  const [signUpForm, setSignUpForm] = useState({
    email: '',
    password: '',
    name: '',
  });

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

  // 비밀번호 변경 확인 핸들러
  const handlePasswordCheckChange = (e) => {
    updateChecker((draft) => {
      draft.passwordCheck.value = e.target.value;
      draft.passwordCheck.matched = e.target.value == signUpForm.password;
    });
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
      email={signUpForm.email}
      password={signUpForm.password}
      name={signUpForm.name}
      passwordCheck={checker.passwordCheck.value}
      passwordCheckMatched={checker.passwordCheck.matched}
      isCheckingEmail={isCheckingEmail}
      emailChecked={checker.emailCheck.checked}
      emailDuplicate={checker.emailCheck.duplicate}
      onChange={handleChange}
      onEmailChange={handleEmailChange}
      onPasswordCheckChange={handlePasswordCheckChange}
      onDuplicateEmailCheck={handleDuplicateEmailCheck}
      onSubmit={handleSubmit}
      isSigningUp={isSigningUp}
    />
  );
});
export default SignUpFormContainer;
