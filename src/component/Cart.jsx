// src/components/Cart.js
import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { uiActions } from "../store/toggle";
import { cartActions } from "../store/cart-slice";

const Cart = () => {
  const dispatch = useDispatch();
  const cartIsVisible = useSelector((state) => state.ui.cartIsVisible);
  const cartItems = useSelector((state) => state.cart.items);
  const totalAmount = useSelector((state) => state.cart.totalAmount);
  const totalQuantity = useSelector((state) => state.cart.totalQuantity);

  const toggleCartHandler = () => {
    dispatch(uiActions.toggle());
  };

  const addSampleItem = () => {
    dispatch(
      cartActions.addItemToCart({
        id: "p1",
        title: "T-Shirt",
        price: 500,
      })
    );
  };

  const increaseItemHandler = (id, title, price) => {
    dispatch(cartActions.addItemToCart({ id, title, price }));
  };

  const decreaseItemHandler = (id) => {
    dispatch(cartActions.removeItemFromCart(id));
  };

  return (
    <div style={{ padding: "10px" }}>
      {/* 🛒 Cart Button with count */}
      <button onClick={toggleCartHandler} style={{ marginRight: "10px" }}>
        🛒 My Cart ({totalQuantity})
      </button>

      {/* Add item for demo */}
      <button onClick={addSampleItem}>Add Sample Item</button>

      {/* Cart Display */}
      {cartIsVisible && (
        <div
          style={{
            marginTop: "15px",
            border: "1px solid gray",
            padding: "10px",
            borderRadius: "10px",
            width: "300px",
          }}
        >
          <h3>Your Cart</h3>

          {cartItems.length === 0 ? (
            <p>No items yet...</p>
          ) : (
            <ul>
              {cartItems.map((item) => (
                <li
                  key={item.id}
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginBottom: "8px",
                    borderBottom: "1px solid #ccc",
                    paddingBottom: "6px",
                  }}
                >
                  <div>
                    {item.title} — ₹{item.price} × {item.quantity} = ₹
                    {item.totalPrice}
                  </div>
                  <div>
                    <button
                      onClick={() => decreaseItemHandler(item.id)}
                      style={{ marginRight: "5px" }}
                    >
                      -
                    </button>
                    <button
                      onClick={() =>
                        increaseItemHandler(item.id, item.title, item.price)
                      }
                    >
                      +
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          )}

          <p>
            <strong>Total Amount:</strong> ₹{totalAmount}
          </p>
        </div>
      )}
    </div>
  );
};

export default Cart;
