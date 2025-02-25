import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  product: [],
  amount: 0,
  // value: 1,
};
export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addCart: (state, action) => {
      // const product_id = action.payload;
      // const productIndex = state.product.findIndex(
      //   (item) => item.id === product_id
      // );
      // console.log(productIndex);
      // console.log(product_id);
      // if (productIndex >= 0) {
      //   // If product already exists, increase its quantity
      //   state.product[productIndex].quantity += 1;
      // } else {
      //   // If product doesn't exist, add it with quantity 1
      //   state.product.push({ id: action.payload, quantity: 1 });
      //   // state.product = [...state.product, { id: action.payload, quantity: 1 }];
      // }
      state.product.push({ id: action.payload, quantity: 1 });
    },
    blankCart: (state, action) => {
      state.product = [];
    },
    increment: (state, action) => {
      const product_id = action.payload._id;
      console.log("product_id :>> ", product_id);
      const productIndex = state.product.findIndex(
        (item) => item.id === product_id
      );
      console.log("productIndex :>> ", productIndex);
      if (productIndex >= 0) {
        state.product[productIndex].quantity += 1;
      } else {
        console.log("product_id :>> ", product_id);
      }
      // state.value += 1;
    },
    amount: (state, action) => {
      state.amount = action.payload;
      console.log("amount :>> ", amount);
    },
  
  },
});
export const { addCart, blankCart, increment, decrement, clearCount,amount} =
  cartSlice.actions;

export default cartSlice.reducer;
