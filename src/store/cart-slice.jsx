// src/store/cart-slice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { uiActions } from "./toggle";

const FIREBASE_URL =
  "https://react-http-1c2c7-default-rtdb.asia-southeast1.firebasedatabase.app/cart.json";

// ✅ createAsyncThunk for sending cart data
export const sendCartData = createAsyncThunk(
  "cart/sendCartData",
  async (cart, { dispatch, rejectWithValue }) => {
    // 🟡 Dispatch pending notification
    dispatch(
      uiActions.showNotification({
        status: "pending",
        title: "Sending...",
        message: "Sending cart data to server...",
      })
    );

    try {
      const response = await fetch(FIREBASE_URL, {
        method: "PUT",
        body: JSON.stringify({
          items: cart.items,
          totalQuantity: cart.totalQuantity,
          totalAmount: cart.totalAmount,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to send cart data!");
      }

      // ✅ Success — return data
      return "Cart data sent successfully!";
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    items: [],
    totalQuantity: 0,
    totalAmount: 0,
  },
  reducers: {
    addItemToCart(state, action) {
      const newItem = action.payload;
      const existingItem = state.items.find((item) => item.id === newItem.id);

      state.totalQuantity++;
      state.totalAmount += newItem.price;

      if (!existingItem) {
        state.items.push({
          id: newItem.id,
          title: newItem.title,
          price: newItem.price,
          quantity: 1,
          totalPrice: newItem.price,
        });
      } else {
        existingItem.quantity++;
        existingItem.totalPrice += newItem.price;
      }
    },
    removeItemFromCart(state, action) {
      const id = action.payload;
      const existingItem = state.items.find((item) => item.id === id);
      if (!existingItem) return;

      state.totalQuantity--;
      state.totalAmount -= existingItem.price;

      if (existingItem.quantity === 1) {
        state.items = state.items.filter((item) => item.id !== id);
      } else {
        existingItem.quantity--;
        existingItem.totalPrice -= existingItem.price;
      }
    },
  },

  // ✅ Handle thunk results in extraReducers
  extraReducers: (builder) => {
    builder
      .addCase(sendCartData.fulfilled, (state, action) => {
        // Success notification
        state.notification = {
          status: "success",
          title: "Success!",
          message: action.payload,
        };
      })
      .addCase(sendCartData.rejected, (state, action) => {
        // Error notification
        state.notification = {
          status: "error",
          title: "Error!",
          message: action.payload || "Sending cart data failed!",
        };
      });
  },
});

export const cartActions = cartSlice.actions;
export default cartSlice.reducer;
