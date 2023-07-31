import { Link } from "react-router-dom";

function Button({ children, disabled, to, style, onClick }) {
  const className =
    "bg-rose-500 text-lg py-2 px-3 rounded-full text-stone-900 font-semibold hover:bg-rose-400 transition-colors duration-300 mt-4 disabled:cursor-not-allowed";

  if (to)
    return (
      <Link to={to} className={className}>
        {children}
      </Link>
    );

  if (style === "menu")
    return (
      <button className={`${className} mr-4`} onClick={onClick}>
        {children}
      </button>
    );

  if (style === "delete")
    return (
      <button className={`${className} mr-4 px-4 `} onClick={onClick}>
        {children}
      </button>
    );

  if (style === "clear")
    return (
      <button
        className={`${className} ml-4 bg-stone-300 py-2 hover:bg-stone-400 text-stone-700 `}
        onClick={onClick}
      >
        {children}
      </button>
    );

  if (style === "order")
    return (
      <button className={`${className} ml-4 py-3 px-5`} onClick={onClick}>
        {children}
      </button>
    );

  if (style === "update")
    return (
      <button
        className={`${className} py-0 px-1 h-8 w-8  flex items-center`}
        onClick={onClick}
      >
        {children}
      </button>
    );

  return (
    <button disabled={disabled} className={className} onClick={onClick}>
      {children}
    </button>
  );
}

export default Button;
