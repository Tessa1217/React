import { TiDocumentText } from 'react-icons/ti';
import RequiredAsterick from '@/shared/ui/form/RequiredAsterick';
const FormMetaEditor = ({
  title,
  description,
  isPublic,
  requiresLogin,
  expiresAt,
  onChange,
}) => {
  return (
    <div className='p-6 bg-white rounded-2xl shadow-md space-y-6 w-full max-w-3xl mx-auto'>
      <h1 className='text-2xl font-semibold text-gray-800 flex items-center gap-2'>
        <TiDocumentText /> 설문지 등록
      </h1>
      {/* 설문지 제목 */}
      <div>
        <label className='block text-sm font-semibold text-gray-700 mb-1'>
          설문지 제목 <RequiredAsterick />
        </label>
        <input
          type='text'
          value={title}
          placeholder='예: 고객 만족도 조사'
          onChange={(e) => onChange('title', e.target.value)}
          className='w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500'
        />
      </div>

      {/* 설명 */}
      <div>
        <label className='block text-sm font-semibold text-gray-700 mb-1'>
          설명 <RequiredAsterick />
        </label>
        <textarea
          placeholder='설문에 대한 설명을 입력하세요...'
          rows={4}
          value={description}
          onChange={(e) => onChange('description', e.target.value)}
          className='w-full border border-gray-300 rounded-lg px-4 py-2 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500'
        />
      </div>

      {/* 공개 여부 및 로그인 필요 */}
      <div className='flex items-center space-x-6'>
        <label className='inline-flex items-center'>
          <input
            type='checkbox'
            checked={isPublic}
            onChange={(e) => onChange('isPublic', e.target.checked)}
            className='form-checkbox h-5 w-5 text-blue-600'
          />
          <span className='ml-2 text-sm text-gray-700'>
            공개 설문 <RequiredAsterick />
          </span>
        </label>
        <label className='inline-flex items-center'>
          <input
            type='checkbox'
            value={requiresLogin}
            onChange={(e) => onChange('requiresLogin', e.target.checked)}
            className='form-checkbox h-5 w-5 text-blue-600'
          />
          <span className='ml-2 text-sm text-gray-700'>
            로그인 필요 <RequiredAsterick />
          </span>
        </label>
      </div>

      {/* 만료일 */}
      <div>
        <label className='block text-sm font-semibold text-gray-700 mb-1'>
          만료일 (선택)
        </label>
        <input
          type='date'
          value={expiresAt}
          onChange={(e) => onChange('expiresAt', e.target.value)}
          className='border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500'
        />
      </div>
    </div>
  );
};

export default FormMetaEditor;
