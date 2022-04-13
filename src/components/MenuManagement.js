import React, { useEffect, useState } from "react";
import AddItem from "./AddItem";
import { getAllMenuItems } from "../api/api";
import { arrayBufferToBase64 } from "../js/script";

const MenuManagement = (props) => {
  const [menuItems, setMenuItems] = useState();

  let buffer, base64Flag, imageStr;

  useEffect(() => {
    const fetchApiData = async () => {
      const { data } = await getAllMenuItems();
      setMenuItems(data);
    };
    fetchApiData();
  }, []);

  const handleClick = (item) => {
    props.history.push({
      pathname: "/menuItem",
      state: item,
    });
  };

  return (
    <div className={`menu__content container container--pall`}>
      <h2>Menu</h2>
      <AddItem />
      <div className="menu__grid">
        {menuItems &&
          menuItems.map((item) => {
            buffer = item.photo.data.data; // e.g., <Buffer 89 50 4e ... >
            base64Flag = "data:image/jpeg;base64,";
            imageStr = arrayBufferToBase64(buffer);
            return (
              <div onClick={() => handleClick(item)} className="menu__item">
                <img
                  className="menu__image"
                  // style={"background-image: "}
                  alt="404"
                  src={base64Flag + imageStr}
                ></img>
                <div className="menu__text">
                  <div className="menu__price">$ {item.price}</div>
                  <div className="menu__name">
                    {item.name} | {item.type && item.type}
                  </div>
                  <div className="menu__description">{item.description}</div>
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default MenuManagement;
