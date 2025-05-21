import { ToastContainer } from 'react-toastify';
const Toast = () => {
  const contextClass = {
    success: 'bg-blue-600',
    error: 'bg-red-600',
    info: 'bg-gray-600',
    warning: 'bg-orange-400',
    default: 'bg-indigo-600',
    dark: 'bg-white-600 font-gray-300',
  };
  return (
    <ToastContainer
      role='alert'
      toastClassName={(context) =>
        contextClass[context?.type || 'default'] +
        ' relative flex p-1 min-h-10 rounded-md justify-between overflow-hidden cursor-pointer'
      }
      position='top-right'
      closeOnClick
      hideProgressBar={true}
      autoClose={1000}
      pauseOnFocusLoss
      draggable
    />
  );
};

export default Toast;
