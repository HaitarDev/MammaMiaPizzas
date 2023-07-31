import { Link } from "react-router-dom";
import SearchOrder from "../features/order/SearchOrder";
import UserName from "./UserName";
import { useSelector } from "react-redux";

function Header() {
  const username = useSelector((state) => state.user.username);

  return (
    <header className="bg-rose-500 p-4 text-stone-800 flex justify-between items-center">
      <Link to="/" className="text-xl tracking-widest sm:text-2xl ">
        MammaMiaPizzas
      </Link>
      <SearchOrder />
      {username && <UserName />}
    </header>
  );
}

export default Header;
