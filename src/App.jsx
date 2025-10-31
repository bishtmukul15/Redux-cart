import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCartData, sendCartData } from "./store/cart-actions";
import Notification from "../src/component/Notification";
import Cart from "../src/component/Cart";

let isInitial = true;

function App() {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);
  const notification = useSelector((state) => state.ui.notification);

  // 🟣 Fetch cart data once on reload
  useEffect(() => {
    dispatch(fetchCartData());
  }, [dispatch]);

  // 🟢 Send updated cart data whenever cart changes (except first load)
  useEffect(() => {
    if (isInitial) {
      isInitial = false;
      return;
    }

    dispatch(sendCartData(cart));
  }, [cart, dispatch]);

  return (
    <div style={{ padding: "20px" }}>
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
}

export default App;
