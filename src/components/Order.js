import React, { useState, useEffect } from "react";
import { arrayBufferToBase64 } from "../js/script";
import { getAllMenuItems, getCookie } from "../api/api";
import ShowOrders from "./ShowOrders";

const Order = (props) => {
  const [items, setItems] = useState();
  const [order, setOrderItem] = useState([]);

  useEffect(() => {
    const fetchApiData = async () => {
      const { data } = await getAllMenuItems();
      setItems(data);
    };
    fetchApiData();
    // return function cleanup() {
    //   setOrderItem([]);
    // };
  }, []);

  let buffer, base64Flag, imageStr;

  const checkIfItemExist = (item) => {
    let found = false;
    order.forEach((element) => {
      if (element.itemId === item._id) {
        found = true;
        return;
      }
    });
    return found;
  };

  const HandleClick = async (item) => {
    let newOrder = order;
    if (checkIfItemExist(item)) {
      newOrder.forEach((ele) => {
        if (ele.itemId === item._id) {
          ele.quantity += 1;
        }
      });
    } else {
      newOrder.push({
        itemId: item._id,
        name: item.name,
        description: item.description,
        price: item.price,
        photo: item.photo,
        quantity: 1,
      });
    }
    setOrderItem([...newOrder]);
  };

  return (
    <section className={`container container-pall order`}>
      <ShowOrders data={order} />

      <div className={`order__menu`}>
        <div className="menu__grid">
          {items &&
            items.map((item) => {
              buffer = item.photo.data.data; // e.g., <Buffer 89 50 4e ... >
              base64Flag = "data:image/jpeg;base64,";
              imageStr = arrayBufferToBase64(buffer);
              return (
                <div key={item._id} className="menu__item">
                  <img
                    className="menu__image"
                    // style={"background-image: "}
                    alt="404"
                    src={base64Flag + imageStr}
                  ></img>
                  <div className="menu__text">
                    <div className="menu__price">
                      <h2>$ {item.price}</h2>
                    </div>
                    <div className="menu__name">
                      {item.name} | {item.type && item.type}
                    </div>
                    {/* <div className="menu__description">{item.description}</div> */}
                  </div>
                  <button onClick={() => HandleClick(item)}>Add </button>
                </div>
              );
            })}
        </div>
      </div>
    </section>
  );
};

export default Order;
