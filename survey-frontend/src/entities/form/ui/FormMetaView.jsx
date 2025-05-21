import { TiDocumentText } from 'react-icons/ti';
const FormMetaView = ({
  title,
  description,
  isPublic,
  requiresLogin,
  expiresAt,
}) => {
  const badgeColor = isPublic ? 'green' : 'red';

  return (
    <div className='p-6 bg-white rounded-2xl shadow-md space-y-6 w-full max-w-3xl mx-auto'>
      <h1 className='text-2xl font-semibold text-gray-800 flex items-center gap-2'>
        <TiDocumentText />
        설문지 조회
        <span
          className={`inline-flex items-center rounded-md bg-${badgeColor}-50 px-2 py-1 text-xs font-medium text-${badgeColor}-700 ring-1 ring-${badgeColor}-600/10 ring-inset`}
        >
          {isPublic ? '공개' : '비공개'}
        </span>
      </h1>
      {/* 설문지 제목 */}
      <div className='text-xl font-medium text-gray-700'>{title}</div>
      {/* 설명 */}
      <div>{description}</div>
      {expiresAt && <div>만료일 : {expiresAt}</div>}
    </div>
  );
};

export default FormMetaView;
