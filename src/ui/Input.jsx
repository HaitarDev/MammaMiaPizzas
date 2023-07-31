function Input({ children, type, name, placeholder, onChange, defaultValue }) {
  return (
    <input
      type={type}
      name={name}
      placeholder={placeholder}
      onChange={onChange}
      defaultValue={defaultValue}
      required
      autoComplete="off"
      className="rounded-full px-4 py-2 focus:outline-none focus:ring focus:ring-rose-300 w-full sm:w-96 border border-stone-200"
    >
      {children}
    </input>
  );
}

export default Input;
