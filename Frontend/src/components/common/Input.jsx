const Input = ({ type = 'text', placeholder, value, onChange, className = '', name, id, disabled = false, readOnly = false }) => {
  return (
    <input
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      name={name}
      id={id}
      disabled={disabled}
      readOnly={readOnly}
      className={`w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#86c537] focus:border-transparent ${className}`}
    />
  );
};

export default Input;
