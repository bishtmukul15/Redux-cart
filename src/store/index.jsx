// src/store/store.js
import { configureStore } from "@reduxjs/toolkit";
import uiSlice from "./toggle";
import cartSlice from "./cart-slice";

const store = configureStore({
  reducer: {
    ui: uiSlice.reducer,
    cart: cartSlice.reducer,
  },
});

export default store;
