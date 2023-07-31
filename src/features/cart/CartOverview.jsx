import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { cartTotalPrice } from "./cartSlice";

function CartOverview() {
  const quantity = useSelector((state) => state.cart.cart.length);
  const totalPrice = useSelector(cartTotalPrice);

  if (!quantity) return null;
  return (
    <div className="bg-stone-800 text-lime-50 p-5 uppercase flex justify-between">
      <p>
        <span className=" spacing mr-7">{quantity} pizzas</span>
        <span>${totalPrice}</span>
      </p>
      <Link to="/cart">Open cart &rarr;</Link>
    </div>
  );
}

export default CartOverview;
