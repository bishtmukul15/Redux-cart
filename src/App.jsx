import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import Cart from "./component/Cart";
import Notification from "../src/component/Notification";
import { sendCartData, fetchCartData } from "./store/cart-actions";

const App = () => {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);
  const notification = useSelector((state) => state.ui.notification);
  const [isInitial, setIsInitial] = useState(true);

  // Fetch cart data on mount
  useEffect(() => {
    dispatch(fetchCartData());
  }, [dispatch]);

  // Send cart data when it changes
  useEffect(() => {
    if (isInitial) {
      setIsInitial(false);
      return;
    }
    dispatch(sendCartData(cart));
  }, [cart, dispatch]);

  return (
    <div>
      {notification && (
        <Notification
          status={notification.status}
          title={notification.title}
          message={notification.message}
        />
      )}
      <Cart />
    </div>
  );
};

export default App;
