import React, { useEffect, useState } from "react";
import { arrayBufferToBase64 } from "../js/script";
import { createOrder, getAllItems } from "../api/api";
import LiveOrders from "./LiveOrders";

const ShowOrders = (props) => {
  let buffer, base64Flag, imageStr;
  let subTotal = 0;
  const [value, setValue] = useState(0);
  // const [ingrediets, setIngredients] = useState();
  const [order, setOrder] = useState();

  const handleInputChange = (e, item) => {
    item.quantity = parseInt(e.target.value);
    setValue(value + 1);
  };

  const handleCheckout = async () => {
    let orders = [];
    props.data.forEach((item, index) => {
      orders[index] = {
        itemId: item.itemId,
        quantity: item.quantity,
      };
    });
    const res = await createOrder(orders);
    setOrder(res);
  };

  return (
    <div>
      <LiveOrders order={order} />
      <h1>Orders</h1>

      <div className="shopping-cart">
        <div className="column-labels">
          <label className="product-image">Image</label>
          <label className="product-details">Item</label>
          <label className="product-price">Price</label>
          <label className="product-quantity">Quantity</label>
          <label className="product-removal">Remove</label>
          <label className="product-line-price">Total</label>
        </div>

        {props.data &&
          props.data.map((item, index) => {
            subTotal = subTotal + item.price * item.quantity;
            buffer = item.photo.data.data; // e.g., <Buffer 89 50 4e ... >
            base64Flag = "data:image/jpeg;base64,";
            imageStr = arrayBufferToBase64(buffer);
            return (
              <div key={item.itemId} className="product">
                <div className="product-image">
                  <img src={base64Flag + imageStr} alt="404" />
                </div>
                <div className="product-details">
                  <div className="product-title">{item.name}</div>
                  <p className="product-description">{item.description}</p>
                </div>
                <div className="product-price">{item.price}</div>
                <div className="product-quantity">
                  <input
                    type="number"
                    onChange={(e) => handleInputChange(e, item)}
                    defaultValue={item.quantity}
                    min="1"
                  />
                </div>
                <div className="product-removal">
                  <button
                    // onClick={() => removeItem(index)}
                    className="remove-product"
                  >
                    Remove
                  </button>
                </div>
                <div className="product-line-price">
                  {item.price * item.quantity}
                </div>
              </div>
            );
          })}

        {subTotal > 0 && (
          <>
            <div className="totals">
              <div className="totals-item">
                <label>Subtotal</label>
                <div className="totals-value" id="cart-subtotal">
                  {subTotal.toFixed(2)}
                </div>
              </div>
              <div className="totals-item">
                <label>Tax (15%)</label>
                <div className="totals-value" id="cart-tax">
                  {(subTotal * 0.15).toFixed(2)}
                </div>
              </div>

              <div className="totals-item totals-item-total">
                <label>Grand Total</label>
                <div className="totals-value" id="cart-total">
                  {(subTotal * 1.15).toFixed(2)}
                </div>
              </div>
            </div>

            <button onClick={handleCheckout} className="checkout">
              Checkout
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default ShowOrders;
