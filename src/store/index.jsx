// src/store/store.js
import { configureStore } from "@reduxjs/toolkit";
import uiReducer from "./toggle"; // ✅ import reducer (not slice)
import cartReducer from "./cart-slice";

const store = configureStore({
  reducer: {
    ui: uiReducer,
    cart: cartReducer,
  },
});

export default store;
