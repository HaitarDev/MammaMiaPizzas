import LinkButton from "../../ui/LinkButton";
import Button from "../../ui/Button";
import CartItem from "./CartItem";
import EmptyCart from "./EmptyCart";
import { useDispatch, useSelector } from "react-redux";
import { clearItem } from "./cartSlice";

function Cart() {
  const dispatch = useDispatch();

  const cart = useSelector((state) => state.cart.cart);
  const username = useSelector((state) => state.user.username);

  if (!cart.length) return <EmptyCart />;
  return (
    <div className="mt-5 ml-4">
      <LinkButton to="/menu">&larr; Back to menu</LinkButton>

      <h2 className="font-semibold text-xl my-5">Your cart, {username}</h2>
      <ul>
        {cart.map((item) => (
          <CartItem item={item} key={item.pizzaId} />
        ))}
      </ul>

      <div className="mt-4">
        <Button to="/order/new">Order pizzas</Button>
        <Button style="clear" onClick={() => dispatch(clearItem())}>
          Clear cart
        </Button>
      </div>
    </div>
  );
}

export default Cart;
