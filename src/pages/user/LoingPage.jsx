import { useCallback, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import LoginForm from './components/LoginForm';
import { login } from '../../apis/user/authApi';
import { useMutation } from '@tanstack/react-query';
import { setLoginUserInfo } from '../../stores/auth';
import { useDispatch } from 'react-redux';
const LoginPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: '',
    password: '',
  });

  const { mutate } = useMutation({
    mutationFn: (loginInfo) => {
      return login(loginInfo);
    },
    onSuccess: (data) => {
      setLoginUserInfoAfterLogin(data[0]);
      navigate('/board/1');
    },
  });

  const setLoginUserInfoAfterLogin = useCallback(
    (user) => {
      dispatch(setLoginUserInfo(user));
    },
    [dispatch]
  );

  const onChange = useCallback((e) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  }, []);

  const onSubmit = useCallback(
    (e) => {
      e.preventDefault();
      mutate(form);
    },
    [form, mutate]
  );

  return <LoginForm {...form} onChange={onChange} onSubmit={onSubmit} />;
};

export default LoginPage;
