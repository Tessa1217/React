import LoginForm from '@/features/auth/ui/LoginForm';
import React, { useCallback, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { sendLoginRequest } from '@/features/auth/model/auth.slice';
const LoginFormContainer = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loginForm, setLoginForm] = useState({
    email: '',
    password: '',
  });

  const handleFormChange = useCallback(
    (e) => {
      setLoginForm({ ...loginForm, [e.target.name]: e.target.value });
    },
    [loginForm]
  );

  const handleSubmit = useCallback(
    (e) => {
      e.preventDefault();
      dispatch(
        sendLoginRequest({ param: loginForm, callbackFn: () => navigate('/') })
      );
    },
    [dispatch, loginForm, navigate]
  );

  return (
    <LoginForm
      email={loginForm.email}
      password={loginForm.password}
      onFormChange={handleFormChange}
      onSubmit={handleSubmit}
    />
  );
};
export default React.memo(LoginFormContainer);
