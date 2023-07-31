import CreateUser from "../features/user/CreateUser";
import { useSelector } from "react-redux";
import Button from "./Button";

function Home() {
  const username = useSelector((state) => state.user.username);

  return (
    <div className="text-center m-8">
      <h1 className="text-xl font-bold m-8 sm:text-3xl ">
        The best pizza.
        <br />
        <span className="text-rose-700">
          Straight out of the oven, straight to you.
        </span>
      </h1>

      {username === "" ? (
        <CreateUser />
      ) : (
        <Button to={"/menu"}>Continue ordering , {username}</Button>
      )}
    </div>
  );
}

export default Home;
