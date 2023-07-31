// Test ID: IIDSAT

import { useLoaderData } from "react-router-dom";
import { getOrder } from "../../services/apiRestaurant";
import {
  calcMinutesLeft,
  formatCurrency,
  formatDate,
} from "../../utils/helpers";
import OrderItem from "./OrderItem";

function Order() {
  const order = useLoaderData();
  // Everyone can search for all orders, so for privacy reasons we're gonna gonna exclude names or address, these are only for the restaurant staff
  const {
    id,
    status,
    priority,
    priorityPrice,
    orderPrice,
    estimatedDelivery,
    cart,
  } = order;
  const deliveryIn = calcMinutesLeft(estimatedDelivery);

  return (
    <div className="px-6 py-4 space-y-6">
      <div className=" flex justify-between flex-wrap gap-4">
        <h2 className="font-semibold text-xl">Order #{id} status</h2>

        <div className=" space-x-2">
          {priority && (
            <span className="bg-red-500 text-stone-50 rounded-full py-2 px-4">
              Priority
            </span>
          )}
          <span className="bg-green-500 text-stone-50 rounded-full py-2 px-4">
            {status} order
          </span>
        </div>
      </div>

      <div className="flex justify-between flex-wrap bg-stone-200 py-5 px-3 ">
        <p className=" font-medium ">
          {deliveryIn >= 0
            ? `Only ${calcMinutesLeft(estimatedDelivery)} minutes left 😃`
            : "Order should have arrived"}
        </p>
        <p className="text-stone-700">
          (Estimated delivery: {formatDate(estimatedDelivery)})
        </p>
      </div>
      <ul className=" divide-y-2 divide-stone-200 border-y-2 ">
        {cart.map((item) => (
          <OrderItem item={item} key={item.id} />
        ))}
      </ul>
      <div className=" bg-stone-200 py-5 px-3 ">
        <p>Price pizza: {formatCurrency(orderPrice)}</p>
        {priority && <p>Price priority: {formatCurrency(priorityPrice)}</p>}
        <p className=" font-semibold mt-1">
          To pay on delivery: {formatCurrency(orderPrice + priorityPrice)}
        </p>
      </div>
    </div>
  );
}

export async function Loader({ params }) {
  const order = await getOrder(params.orderId);
  return order;
}
export default Order;
