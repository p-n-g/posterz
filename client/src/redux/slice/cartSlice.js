import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cartSlice",
  initialState: {
    cartItems: [],
  },
  reducers: {
    addToCart: (state, action) => {
      const currItem = action.payload;

      // console.log("action.payload cart item key", action);

      const index = state.cartItems.findIndex(
        (item) => item.id === currItem.id
      );
      if (index === -1) {
        // console.log("adding a fresh item to cart");
        state.cartItems.push({ ...currItem, quantity: 1 });
      } else {
        //   console.log("item already exits in cart");
        state.cartItems[index].quantity += 1;
      }
    },
    removeFromCart: (state, action) => {
      const currItem = action.payload;
      const index = state.cartItems.findIndex(
        (item) => item.id === currItem.id
      );
      console.log("remove from cart item index", index);
      if (index === -1) {
        return;
      }
      if (state.cartItems[index]?.quantity === 1) {
        state.cartItems.splice(index, 1);
        // state.cartItems = state.cartItems.filter(item => item.id != currItem.id);
      } else {
        state.cartItems[index].quantity -= 1;
      }
    },
    removeWholeItem: (state, action) => {
      const currItem = action.payload;
      const index = state.cartItems.findIndex(
        (item) => item.id === currItem.id
      );
      if (index === -1) {
        return;
      }
      state.cartItems.splice(index, 1);
    },
    clearCart: (state, action) => {
      state.cartItems = [];
    },
  },
});

export default cartSlice.reducer;
export const { addToCart, removeFromCart, removeWholeItem, clearCart } = cartSlice.actions;
