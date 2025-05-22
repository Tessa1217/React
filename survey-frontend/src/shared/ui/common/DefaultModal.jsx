const DefaultModal = ({ id, type, title, description, onClose, onSuccess }) => {
  return (
    <div
      id={id}
      className='bg-white rounded-2xl shadow-xl w-full max-w-lg p-8 relative transform scale-95 transition-transform duration-300 ease-out z-100'
    >
      <button
        id='closeModal'
        className='absolute top-4 right-4 text-gray-400 hover:text-gray-600 text-2xl font-bold cursor-pointer'
      >
        &times;
      </button>
      <div className='flex justify-center mb-4'>
        <div className='bg-blue-100 text-blue-600 w-12 h-12 flex items-center justify-center rounded-full text-xl'>
          💬
        </div>
      </div>
      <h2 className='text-2xl font-semibold text-center mb-2'>{title}</h2>
      <div className='text-gray-600 text-center'>{description}</div>
      <div className='mt-6 flex justify-center gap-4'>
        <button
          id='confirmButton'
          onClick={
            type == 'confirm' && onSuccess ? () => onSuccess() : () => onClose()
          }
          className='bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700 transition cursor-pointer'
        >
          확인
        </button>
        <button
          id='closeModalBottom'
          onClick={() => onClose()}
          className='bg-gray-200 text-gray-800 px-5 py-2 rounded-lg hover:bg-gray-300 transition cursor-pointer'
        >
          취소
        </button>
      </div>
    </div>
  );
};

export default DefaultModal;
