import { useState } from "react";
import { useNavigate } from "react-router-dom";

function SearchOrder() {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();
    if (!query) return;
    navigate(`/order/${query}`);
    setQuery("");
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Search order #"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="rounded-full py-3 px-4 bg-rose-50 transition-all duration-300 focus:outline-none focus:ring focus:ring-rose-500 w-32 sm:w-64 sm:focus:w-96"
      />
    </form>
  );
}

export default SearchOrder;
