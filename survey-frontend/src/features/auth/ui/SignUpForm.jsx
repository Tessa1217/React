import RequiredAsterick from '@/shared/ui/form/RequiredAsterick';

import { useMemo } from 'react';

const passwordMatchErrorMsg = '비밀번호가 일치하지 않습니다.';

const duplicateEmailErrorMsg = '중복된 이메일이 존재합니다.';

const dupliacteUserIdErrorMsg = '이미 사용된 아이디입니다.';

const SignUpForm = ({
  userId,
  email,
  password,
  name,
  passwordCheck,
  passwordCheckMatched,
  isCheckingUserId,
  userIdChecked,
  userIdDuplicate,
  isCheckingEmail,
  emailChecked,
  emailDuplicate,
  onChange,
  onUserIdChange,
  onEmailChange,
  onPasswordCheckChange,
  onDuplicateEmailCheck,
  onDuplicateUserIdCheck,
  onSubmit,
  isSigningUp,
}) => {
  // 중복 체크 여부
  const duplicateEmailChecked = useMemo(
    () => emailChecked && !emailDuplicate,
    [emailChecked, emailDuplicate]
  );

  const duplicateUserIdChecked = useMemo(
    () => userIdChecked && !userIdDuplicate,
    [userIdChecked, userIdDuplicate]
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
        {/* 아이디 */}
        <div>
          <label className='block text-sm font-medium text-gray-700'>
            아이디 <RequiredAsterick />
          </label>
          <div className='flex gap-2'>
            <input
              type='userId'
              name='userId'
              value={userId}
              onChange={onUserIdChange}
              className='mt-1 block w-80 px-4 py-2 border rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500'
              required
            />
            <button
              className={`w-30 text-white px-4 py-2 rounded-lg transition cursor-pointer ${
                duplicateUserIdChecked
                  ? 'bg-gray-400'
                  : 'bg-blue-600 hover:bg-blue-700'
              }`}
              onClick={(e) => onDuplicateUserIdCheck(e)}
              disabled={isCheckingUserId || duplicateUserIdChecked}
            >
              {duplicateUserIdChecked ? '확인완료' : '중복확인'}
            </button>
          </div>
          {userIdChecked && userIdDuplicate && (
            <div>
              <p className='text-sm text-red-600 mt-1'>
                {dupliacteUserIdErrorMsg}
              </p>
            </div>
          )}
        </div>
        {/* Email */}
        <div>
          <label className='block text-sm font-medium text-gray-700'>
            이메일 <RequiredAsterick />
          </label>
          <div className='flex gap-2'>
            <input
              type='email'
              name='email'
              value={email}
              onChange={onEmailChange}
              className='mt-1 block w-80 px-4 py-2 border rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500'
              required
            />
            <button
              className={`w-30 text-white px-4 py-2 rounded-lg transition cursor-pointer ${
                duplicateEmailChecked
                  ? 'bg-gray-400'
                  : 'bg-blue-600 hover:bg-blue-700'
              }`}
              onClick={(e) => onDuplicateEmailCheck(e)}
              disabled={isCheckingEmail || duplicateEmailChecked}
            >
              {duplicateEmailChecked ? '확인완료' : '중복확인'}
            </button>
          </div>
          {emailChecked && emailDuplicate && (
            <div>
              <p className='text-sm text-red-600 mt-1'>
                {duplicateEmailErrorMsg}
              </p>
            </div>
          )}
        </div>

        {/* Password */}
        <div>
          <label className='block text-sm font-medium text-gray-700'>
            비밀번호 <RequiredAsterick />
          </label>
          <input
            type='password'
            name='password'
            value={password}
            onChange={onChange}
            className='mt-1 block w-full px-4 py-2 border rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500'
            required
          />
        </div>
        <div>
          <label className='block text-sm font-medium text-gray-700'>
            비밀번호 확인 <RequiredAsterick />
          </label>
          <input
            type='password'
            name='passwordCheck'
            value={passwordCheck}
            onChange={onPasswordCheckChange}
            className='mt-1 block w-full px-4 py-2 border rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500'
            required
          />
          {!passwordCheckMatched && (
            <p className='text-sm text-red-600 mt-1'>{passwordMatchErrorMsg}</p>
          )}
        </div>
        {/* Name */}
        <div>
          <label className='block text-sm font-medium text-gray-700'>
            성명 <RequiredAsterick />
          </label>
          <input
            type='text'
            name='name'
            value={name}
            onChange={onChange}
            className='mt-1 block w-full px-4 py-2 border rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500'
            required
          />
        </div>

        {/* Submit */}
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
