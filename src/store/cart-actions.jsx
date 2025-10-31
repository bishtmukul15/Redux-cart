// src/store/cart-actions.js
import { uiActions } from "./toggle";
import { cartActions } from "./cart-slice";

const FIREBASE_URL =
  "https://react-http-1c2c7-default-rtdb.asia-southeast1.firebasedatabase.app/cart.json";

// 🟢 Send cart data to Firebase
export const sendCartData = (cart) => {
  return async (dispatch) => {
    dispatch(
      uiActions.showNotification({
        status: "pending",
        title: "Sending...",
        message: "Sending cart data to server...",
      })
    );

    const sendRequest = async () => {
      const response = await fetch(FIREBASE_URL, {
        method: "PUT",
        body: JSON.stringify({
          items: cart.items,
          totalQuantity: cart.totalQuantity,
          totalAmount: cart.totalAmount,
        }),
      });

      if (!response.ok) {
        throw new Error("Sending cart data failed!");
      }
    };

    try {
      await sendRequest();

      dispatch(
        uiActions.showNotification({
          status: "success",
          title: "Success!",
          message: "Cart data sent successfully!",
        })
      );
    } catch (error) {
      dispatch(
        uiActions.showNotification({
          status: "error",
          title: "Error!",
          message: "Failed to send cart data!",
        })
      );
    }
  };
};

// 🟣 Fetch cart data from Firebase on reload
export const fetchCartData = () => {
  return async (dispatch) => {
    dispatch(
      uiActions.showNotification({
        status: "pending",
        title: "Loading...",
        message: "Fetching cart data...",
      })
    );

    const fetchData = async () => {
      const response = await fetch(FIREBASE_URL);

      if (!response.ok) {
        throw new Error("Fetching cart data failed!");
      }

      const data = await response.json();
      return data;
    };

    try {
      const cartData = await fetchData();

      dispatch(
        cartActions.replaceCart({
          items: cartData?.items || [],
          totalQuantity: cartData?.totalQuantity || 0,
          totalAmount: cartData?.totalAmount || 0,
        })
      );

      dispatch(
        uiActions.showNotification({
          status: "success",
          title: "Success!",
          message: "Fetched cart data successfully!",
        })
      );
    } catch (error) {
      dispatch(
        uiActions.showNotification({
          status: "error",
          title: "Error!",
          message: "Failed to fetch cart data!",
        })
      );
    }
  };
};
