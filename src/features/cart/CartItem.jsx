import DeleteItem from "./DeleteItem";
import { formatCurrency } from "../../utils/helpers";
import UpdateQuantityItem from "./UpdateQuantityItem";

function CartItem({ item }) {
  const { pizzaId, name, quantity, totalPrice } = item;

  return (
    <li className="border-b-2 py-2 flex justify-between items-center">
      <p className="text-lg tracking-wide  ">
        {quantity}&times; {name}
      </p>
      <div className="flex gap-5 items-center">
        <div>
          <p className="font-semibold mt-4">{formatCurrency(totalPrice)}</p>
        </div>

        <UpdateQuantityItem pizzaId={pizzaId} quantity={quantity} />
        <DeleteItem pizzaId={pizzaId} />
      </div>
    </li>
  );
}

export default CartItem;
