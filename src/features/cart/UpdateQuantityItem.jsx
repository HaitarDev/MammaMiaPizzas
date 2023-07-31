import { useDispatch, useSelector } from "react-redux";
import Button from "../../ui/Button";
import {
  currentQuantity,
  decreaseQuantityItem,
  increaseQuantityItem,
} from "./cartSlice";

function UpdateQuantityItem({ pizzaId }) {
  const dispatch = useDispatch();
  const quantity = useSelector(currentQuantity(pizzaId));

  return (
    <div className="flex gap-1 items-end ">
      <Button
        style="update"
        onClick={() => dispatch(increaseQuantityItem(pizzaId))}
      >
        +
      </Button>
      <span className="font-meduim text-xl">{quantity}</span>
      <Button
        style="update"
        onClick={() => dispatch(decreaseQuantityItem(pizzaId))}
      >
        -
      </Button>
    </div>
  );
}

export default UpdateQuantityItem;
