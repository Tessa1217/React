const ModalBackground = ({ children, id, onDimmerClick }) => {
  return (
    <div
      className='fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50 pointer-events-none transition-opacity duration-300 ease-out'
      onClick={(e) => onDimmerClick(e, id)}
    >
      {children}
    </div>
  );
};

export default ModalBackground;
