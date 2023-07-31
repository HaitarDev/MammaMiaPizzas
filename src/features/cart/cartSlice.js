import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cart: [
    // {
    //   pizzaId: 12,
    //   name: "pizza m3jna",
    //   quantity: 2,
    //   unitPrice: 14,
    //   totalPrice: 28,
    // },
  ],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItem(state, action) {
      // payload: newItem,
      state.cart.push(action.payload);
    },
    deleteItem(state, action) {
      //payload: id,
      state.cart = state.cart.filter((item) => item.pizzaId !== action.payload);
    },
    increaseQuantityItem(state, action) {
      //payload: id,
      const item = state.cart.find((item) => item.pizzaId === action.payload);

      item.quantity++;
      item.totalPrice = item.quantity * item.unitPrice;
    },
    decreaseQuantityItem(state, action) {
      //payload: id,
      const item = state.cart.find((item) => item.pizzaId === action.payload);

      item.quantity--;
      item.totalPrice = item.quantity * item.unitPrice;

      if (item.quantity === 0) cartSlice.caseReducers.deleteItem(state, action);
    },
    clearItem(state) {
      state.cart = [];
    },
  },
});

export const cartTotalPrice = (state) =>
  state.cart.cart.reduce((acc, cur) => acc + cur.totalPrice, 0);

export const currentQuantity = (id) => (state) =>
  state.cart.cart.find((item) => item.pizzaId === id)?.quantity ?? 0;

export const {
  addItem,
  deleteItem,
  increaseQuantityItem,
  decreaseQuantityItem,
  clearItem,
} = cartSlice.actions;

export default cartSlice.reducer;
