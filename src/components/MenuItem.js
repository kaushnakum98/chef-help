import React, { useState, useEffect } from "react";
import { arrayBufferToBase64 } from "../js/script";
import { getAllItemsById } from "../api/api";

const MenuItem = (props) => {
  const [items, setItems] = useState();

  useEffect(() => {
    const fetchApiData = async () => {
      const { data } = await getAllItemsById();
      let itemsData = {};
      data.forEach((item) => {
        itemsData[item.id] = item.name;
      });
      setItems(itemsData);
    };
    fetchApiData();
  }, []);

  let buffer, base64Flag, imageStr;

  const singleItem = props.location.state;
  buffer = singleItem.photo.data.data; // e.g., <Buffer 89 50 4e ... >
  base64Flag = "data:image/jpeg;base64,";
  imageStr = arrayBufferToBase64(buffer);
  return props.location.state ? (
    <div>
      <div className={`menuItem container container-pall`}>
        <div className={`menuItem__image`}>
          <img src={base64Flag + imageStr} alt="404"></img>
        </div>
        <div className={`menuItem__details`}>
          <div className={`menuItem__name`}>
            <h1>{singleItem.name}</h1>
          </div>

          <div className={`menuItem__description`}>
            <span>{singleItem.description}</span>
          </div>
          <div className={`menuItem__price`}>
            <h2>$ {singleItem.price}</h2>
          </div>
          <div className={`menuItem__ingredients`}>
            <ul>
              {singleItem.ingredients &&
                items &&
                singleItem.ingredients.map((item) => {
                  return <li>{items[item]}</li>;
                })}
            </ul>
          </div>
        </div>
      </div>
    </div>
  ) : (
    <div>
      <h1>Please Wait</h1>
    </div>
  );
};

export default MenuItem;
