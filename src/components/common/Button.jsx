const Button = ({
  color = 'blue',
  size = 'sm',
  type = 'button',
  onClick,
  icons: Icon = null,
  className = '',
  style = {},
  buttonText,
}) => {
  const buttonSize = (size) => {
    switch (size) {
      case 'xs':
        return 'px-2 py-1 text-xs';
      case 'sm':
        return 'px-3 p-1.5 text-sm';
      case 'md':
        return 'px-4 py-2 text-base';
      case 'lg':
        return 'px-5 py-2.5 text-lg';
      case 'xl':
        return 'px-6 py-3 text-xl';
      default:
        return 'px-4 py-2 text-base';
    }
  };
  return (
    <button
      className={
        className
          ? className
          : `${buttonSize(
              size
            )} bg-${color} text-white rounded transition cursor-pointer ${
              className && className
            }`
      }
      style={style}
      type={type}
      onClick={onClick}
    >
      {buttonText && buttonText} {Icon && <Icon className='inline-block' />}
    </button>
  );
};

export default Button;
