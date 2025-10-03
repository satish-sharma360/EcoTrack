const Button = ({ children, onClick, className = '', variant = 'default', disabled = false, type = 'button' }) => {
  const baseClasses = 'px-4 cursor-pointer py-2 rounded-lg font-medium transition-all duration-200 flex items-center justify-center';
  const variants = {
    default: 'bg-[#86c537] hover:bg-[#75b02f] text-white',
    outline: 'border-2 border-[#86c537] text-[#86c537] hover:bg-[#86c537] hover:text-white',
    ghost: 'hover:bg-gray-100 text-gray-700',
    secondary: 'bg-gray-200 hover:bg-gray-300 text-gray-800'
  };
  
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${baseClasses} ${variants[variant]} ${disabled ? 'opacity-50 cursor-not-allowed' : ''} ${className}`}
    >
      {children}
    </button>
  );
};
export default Button