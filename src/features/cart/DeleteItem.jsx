import { deleteItem } from "./cartSlice";
import Button from "../../ui/Button";
import { useDispatch } from "react-redux";

function DeleteItem({ pizzaId, onClick }) {
  const dispatch = useDispatch();
  return (
    <Button
      style="delete"
      onClick={() => {
        dispatch(deleteItem(pizzaId));
        onClick();
      }}
    >
      delete
    </Button>
  );
}

export default DeleteItem;
