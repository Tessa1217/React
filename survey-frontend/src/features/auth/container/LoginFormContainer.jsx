// 로그인 UI 컴포넌트 (로그인 폼 레이아웃, 입력 필드 및 버튼)
import LoginForm from '@/features/auth/ui/LoginForm';
import { useEffect, memo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import parseJwt from '@/features/auth/lib/jwt';
import { sendLogin } from '@/features/auth/model/auth.api';
import { updateLoginStatus } from '@/features/auth/model/auth.slice';
import { useAppMutation } from '@/shared/hooks/useAppMutation';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import useFormAlert from '@/shared/hooks/useFormAlert';

// 로그인 폼 입력 상태 (유효성 체크를 위한 zod 활용)
const schema = z.object({
  userId: z.string().min(5, '아이디는 최소 5자리 이상이어야 합니다.'),
  password: z.string().min(8, '비밀번호는 최소 8자리 이상이어야 합니다.'),
});

const LoginFormContainer = memo(() => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const showFormErrorAlert = useFormAlert();

  const {
    register,
    setFocus,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
    mode: 'onSubmit',
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

  // 로그인 요청을 위한 mutation 훅
  const { mutate, isPending } = useAppMutation(sendLogin, {
    onSuccess: (res) => {
      const accessToken = res.data;
      const user = parseJwt(accessToken);
      dispatch(updateLoginStatus({ accessToken, user }));
      navigate('/');
    },
  });

  // 폼 제출 핸들러
  const handleSubmitAfterValidate = (data) => {
    mutate(data);
  };

  return (
    <LoginForm
      register={register}
      isLoggingIn={isPending}
      onSubmit={handleSubmit(handleSubmitAfterValidate)}
    />
  );
});
export default LoginFormContainer;
