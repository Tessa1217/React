// 로그인 UI 컴포넌트 (로그인 폼 레이아웃, 입력 필드 및 버튼)
import LoginForm from '@/features/auth/ui/LoginForm';
import { useCallback, useState, memo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import parseJwt from '@/features/auth/lib/jwt';
import { sendLogin } from '@/features/auth/model/auth.api';
import { updateLoginStatus } from '@/features/auth/model/auth.slice';
import { useAppMutation } from '@/shared/hooks/useAppMutation';

const LoginFormContainer = memo(() => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // 로그인 폼 입력 상태
  const [loginForm, setLoginForm] = useState({
    email: '',
    password: '',
  });

  // 로그인 요청을 위한 mutation 훅
  const { mutate, isPending } = useAppMutation(sendLogin, {
    onSuccess: (res) => {
      const accessToken = res.data;
      const user = parseJwt(accessToken);
      dispatch(updateLoginStatus({ accessToken, user }));
      navigate('/');
    },
  });

  // 입력 필드 값 변경 핸들러
  const handleFormChange = useCallback(
    (e) => {
      setLoginForm({ ...loginForm, [e.target.name]: e.target.value });
    },
    [loginForm]
  );

  // 폼 제출 핸들러
  const handleSubmit = useCallback(
    (e) => {
      e.preventDefault();
      mutate(loginForm);
    },
    [loginForm, mutate]
  );

  return (
    <LoginForm
      email={loginForm.email}
      password={loginForm.password}
      isLoggingIn={isPending}
      onFormChange={handleFormChange}
      onSubmit={handleSubmit}
    />
  );
});
export default LoginFormContainer;
