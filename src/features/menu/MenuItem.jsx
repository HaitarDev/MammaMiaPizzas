import { useDispatch, useSelector } from "react-redux";
import Button from "../../ui/Button";
import DeleteItem from "../cart/DeleteItem";
import UpdateQuantityItem from "../cart/UpdateQuantityItem";
import { formatCurrency } from "../../utils/helpers";
import { addItem, currentQuantity } from "../cart/cartSlice";

import { useState } from "react";

function MenuItem({ pizza }) {
  const [addToCart, setAddToCart] = useState(false);
  const dispatch = useDispatch();

  const { id, name, unitPrice, ingredients, soldOut, imageUrl } = pizza;

  const getQuantity = useSelector(currentQuantity(id));

  const checkIfQuantityNull = getQuantity === 0;

  function handleAddToCart() {
    const newItem = {
      pizzaId: id,
      name: name,
      quantity: 1,
      unitPrice: unitPrice,
      totalPrice: unitPrice * 1,
    };
    dispatch(addItem(newItem));
    setAddToCart(true);
  }

  function handleDeleteCart() {
    setAddToCart(false);
  }

  return (
    <li className="flex align-middle border-b-2 ml-2 gap-4 py-2 ">
      <img src={imageUrl} alt={name} className="h-24 " />
      <div className="flex flex-col justify-between w-full">
        <div>
          <p className="font-semibold text-stone-800">{name}</p>
          <p className=" capitalize text-stone-600 italic">
            {ingredients.join(", ")}
          </p>
        </div>
        <div className="flex justify-between items-end">
          {!soldOut ? (
            <p className="text-sm text-stone-600">
              {formatCurrency(unitPrice)}
            </p>
          ) : (
            <p className=" uppercase text-sm text-stone-600">Sold out</p>
          )}

          {addToCart && (
            <>
              {checkIfQuantityNull ? null : <UpdateQuantityItem pizzaId={id} />}
              <DeleteItem pizzaId={id} onClick={handleDeleteCart} />
            </>
          )}

          {soldOut || addToCart || (
            <Button onClick={handleAddToCart} style="menu">
              Add to cart
            </Button>
          )}
        </div>
      </div>
    </li>
  );
}

export default MenuItem;
