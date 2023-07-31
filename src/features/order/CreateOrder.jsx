import { Form, redirect, useActionData, useNavigation } from "react-router-dom";
import Button from "../../ui/Button";
import { createOrder } from "../../services/apiRestaurant";
import Input from "../../ui/Input";
import EmpthyCart from "../cart/EmptyCart";

import { useSelector } from "react-redux";
import { formatCurrency } from "../../utils/helpers";
import { cartTotalPrice } from "../cart/cartSlice";
import { useState } from "react";

// https://uibakery.io/regex-library/phone-number
const isValidPhone = (str) =>
  /^\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/.test(
    str
  );

function CreateOrder() {
  const [withPriority, setWithPriority] = useState(false);

  const formErrors = useActionData();

  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";

  const cart = useSelector((state) => state.cart.cart);
  const username = useSelector((state) => state.user.username);
  const totalPrice = useSelector(cartTotalPrice);
  const priceWithPriority = withPriority ? totalPrice + 2 : totalPrice;

  if (!cart.length) return <EmpthyCart />;
  return (
    <div className=" flex flex-col items-center">
      <h2 className="my-6 font-semibold text-2xl mr-40">{`Ready to order? Let's go!`}</h2>

      <Form method="POST">
        <div className="flex flex-col gap-2 ">
          <label className="ml-1">First Name</label>
          <Input defaultValue={username} type="text" name="customer" required />
        </div>

        <div className="flex flex-col gap-2">
          <label className="mt-2 ml-1">Phone number</label>
          <div>
            <Input type="tel" name="phone" required />
          </div>
          {formErrors?.phone && (
            <p className="text-red-600  rounded-full">{formErrors.phone}</p>
          )}
        </div>

        <div className="flex flex-col gap-2">
          <label className="mt-2 ml-1">Address</label>
          <div className="mb-4">
            <Input type="text" name="address" required />
          </div>
        </div>

        <div>
          <input
            type="checkbox"
            name="priority"
            id="priority"
            className="accent-rose-500 h-4 w-4 text-center"
            value={withPriority}
            onChange={(e) => setWithPriority(e.target.checked)}
          />
          <label htmlFor="priority" className="ml-2 text-center font-semibold">
            Want to give your order priority?
          </label>
        </div>

        <div>
          {isSubmitting ? (
            <Button disabled={isSubmitting}>Wait a moment ...</Button>
          ) : (
            <Button style="order">
              Order now from {formatCurrency(priceWithPriority)}
            </Button>
          )}
        </div>
        <input type="hidden" name="cart" value={JSON.stringify(cart)} />
      </Form>
    </div>
  );
}

export async function action({ request }) {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);

  const order = {
    ...data,
    cart: JSON.parse(data.cart),
    priority: data.priority === "true",
  };

  const errors = {};
  if (!isValidPhone(data.phone))
    errors.phone =
      "Please give us your correct phone number , we might need it to contact you";
  if (Object.keys(errors).length > 0) return errors;

  const newOrder = await createOrder(order);
  return redirect(`/order/${newOrder.id}`);
}
export default CreateOrder;
