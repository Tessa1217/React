import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useModal } from '@/shared/hooks/useModal';
import { checkDuplicateEmail } from '@/features/auth/model/check.api';
import { sendSignUpRequest } from '@/features/auth/model/auth.slice';
import SignUpForm from '@/features/auth/ui/SignUpForm';
const SignUpFormContainer = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { openModal } = useModal();
  const [signUpForm, setSignUpForm] = useState({
    email: '',
    password: '',
    name: '',
  });

  const passwordMatchErrorMsg = '비밀번호가 일치하지 않습니다.';

  const [passwordChecker, setPasswordChecker] = useState({
    passwordCheck: '',
    passwordMatchError: '',
  });

  const [duplicateEmailCheck, setDuplicateEmailCheck] = useState(false);

  const handleChange = (e) => {
    setSignUpForm({ ...signUpForm, [e.target.name]: e.target.value });
  };

  const handlePasswordCheckChange = (e) => {
    const check = e.target.value == signUpForm.password;
    setPasswordChecker({
      passwordCheck: e.target.value,
      passwordMatchError: check ? '' : passwordMatchErrorMsg,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(
      sendSignUpRequest({ param: signUpForm, callbackFn: () => navigate('/') })
    );
  };

  const handleDupliacteEmailCheck = async () => {
    const { data } = await checkDuplicateEmail(signUpForm.email);
    if (data) {
      openModal({
        type: 'alert',
        id: 'alertModal',
        title: 'Email 중복확인',
        description: 'Email이 중복됩니다.',
      });
      return;
    }
    setDuplicateEmailCheck(!data);
  };

  return (
    <SignUpForm
      email={signUpForm.email}
      password={signUpForm.password}
      passwordCheck={passwordChecker.passwordCheck}
      passwordMatchError={passwordChecker.passwordMatchError}
      duplicateEmailCheck={duplicateEmailCheck}
      onChange={handleChange}
      onPasswordCheckChange={handlePasswordCheckChange}
      onDuplicateEmailCheck={handleDupliacteEmailCheck}
      onSubmit={handleSubmit}
    />
  );
};
export default SignUpFormContainer;
