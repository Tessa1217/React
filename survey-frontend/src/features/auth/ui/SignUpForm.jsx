import RequiredAsterick from '@/shared/ui/form/RequiredAsterick';

import { useMemo } from 'react';

// 에러 메시지 상수
const passwordMatchErrorMsg = '비밀번호가 일치하지 않습니다.';

const duplicateEmailErrorMsg = '중복된 이메일이 존재합니다.';

const duplicateUserIdErrorMsg = '이미 사용된 아이디입니다.';

// 공통 input 스타일 클래스
const inputStyle =
  'mt-1 block w-full px-4 py-2 border rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500';

const SignUpForm = ({
  register,
  onSubmit,
  onUserIdChange,
  onEmailChange,
  onPasswordCheckChange,
  onDuplicateEmailCheck,
  onDuplicateUserIdCheck,
  isCheckingEmail,
  isCheckingUserId,
  isSigningUp,
  passwordCheck,
  passwordCheckMatched,
  userIdChecked,
  userIdDuplicate,
  emailChecked,
  emailDuplicate,
}) => {
  // 이메일 중복 체크 통과 여부
  const duplicateEmailChecked = useMemo(
    () => emailChecked && !emailDuplicate,
    [emailChecked, emailDuplicate]
  );

  // 아이디 중복 체크 통과 여부
  const duplicateUserIdChecked = useMemo(
    () => userIdChecked && !userIdDuplicate,
    [userIdChecked, userIdDuplicate]
  );

  // 중복 확인 버튼 렌더 함수 (아이디/이메일 공통)
  const renderDuplicateCheckButton = ({
    onClick,
    disabled,
    checked,
    label,
  }) => (
    <button
      type='button'
      className={`w-30 text-white px-4 py-2 rounded-lg transition cursor-pointer ${
        checked ? 'bg-gray-400' : 'bg-blue-600 hover:bg-blue-700'
      }`}
      onClick={onClick}
      disabled={disabled || checked}
    >
      {checked ? '확인완료' : label}
    </button>
  );

  return (
    <div className='min-h-screen flex items-center justify-center bg-gray-100'>
      <form
        onSubmit={onSubmit}
        className='w-full max-w-lg bg-white shadow-lg rounded-xl p-8 space-y-6'
      >
        <h2 className='text-2xl font-bold text-center text-gray-800'>
          회원가입
        </h2>

        {/* 아이디 입력 및 중복확인 */}
        <div>
          <label className='block text-sm font-medium text-gray-700'>
            아이디 <RequiredAsterick />
          </label>
          <div className='flex gap-2'>
            <input
              type='text'
              name='userId'
              {...register('userId')}
              onChange={onUserIdChange}
              className={inputStyle.replace('w-full', 'w-80')}
            />
            {renderDuplicateCheckButton({
              onClick: onDuplicateUserIdCheck,
              disabled: isCheckingUserId,
              checked: duplicateUserIdChecked,
              label: '중복확인',
            })}
          </div>
          {userIdChecked && userIdDuplicate && (
            <p className='text-sm text-red-600 mt-1'>
              {duplicateUserIdErrorMsg}
            </p>
          )}
        </div>

        {/* 이메일 입력 및 중복확인 */}
        <div>
          <label className='block text-sm font-medium text-gray-700'>
            이메일 <RequiredAsterick />
          </label>
          <div className='flex gap-2'>
            <input
              type='email'
              name='email'
              {...register('email')}
              onChange={onEmailChange}
              className={inputStyle.replace('w-full', 'w-80')}
            />
            {renderDuplicateCheckButton({
              onClick: onDuplicateEmailCheck,
              disabled: isCheckingEmail,
              checked: duplicateEmailChecked,
              label: '중복확인',
            })}
          </div>
          {emailChecked && emailDuplicate && (
            <p className='text-sm text-red-600 mt-1'>
              {duplicateEmailErrorMsg}
            </p>
          )}
        </div>

        {/* 비밀번호 입력 */}
        <div>
          <label className='block text-sm font-medium text-gray-700'>
            비밀번호 <RequiredAsterick />
          </label>
          <input
            type='password'
            name='password'
            {...register('password')}
            className={inputStyle}
            required
          />
        </div>

        {/* 비밀번호 확인 입력 */}
        <div>
          <label className='block text-sm font-medium text-gray-700'>
            비밀번호 확인 <RequiredAsterick />
          </label>
          <input
            type='password'
            name='passwordCheck'
            value={passwordCheck}
            onChange={onPasswordCheckChange}
            className={inputStyle}
            required
          />
          {!passwordCheckMatched && (
            <p className='text-sm text-red-600 mt-1'>{passwordMatchErrorMsg}</p>
          )}
        </div>

        {/* 이름 입력 */}
        <div>
          <label className='block text-sm font-medium text-gray-700'>
            성명 <RequiredAsterick />
          </label>
          <input
            type='text'
            name='name'
            {...register('name')}
            className={inputStyle}
            required
          />
        </div>

        {/* 회원가입 버튼 */}
        <button
          type='submit'
          disabled={
            isSigningUp ||
            !passwordCheckMatched ||
            !duplicateEmailChecked ||
            !duplicateUserIdChecked
          }
          className='w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-semibold py-2 px-4 rounded-lg transition duration-300'
        >
          회원가입
        </button>
      </form>
    </div>
  );
};
export default SignUpForm;
