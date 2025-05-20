import { TiDocumentText } from 'react-icons/ti';
const FormMetaView = ({
  title,
  description,
  isPublic,
  requiresLogin,
  expiresAt,
}) => {
  return (
    <div className='p-6 bg-white rounded-2xl shadow-md space-y-6 w-full max-w-3xl mx-auto'>
      <h1 className='flex'>
        <TiDocumentText /> 설문지 조회
      </h1>
      {/* 설문지 제목 */}
      <div>{title}</div>
      {/* 설명 */}
      <div>{description}</div>
    </div>
  );
};

export default FormMetaView;
