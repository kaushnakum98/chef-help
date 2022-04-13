import React, { useState, useEffect } from "react";
import { getAllItems } from "../api/api";
import Task from "../components/TaskElement";

const LiveOrders = ({ order }) => {
  const [ingrediets, setIngredients] = useState();
  const [type, setType] = useState();
  useEffect(() => {
    const fetchApiData = async () => {
      let items = {};
      let itemType = {};
      const { data } = await getAllItems();
      data.forEach((item) => {
        items[item.id] = { name: item.name, type: item.type };
      });
      setIngredients(items);
      setType(itemType);
    };
    fetchApiData();
  }, []);

  return (
    <div>
      <h1 className="tasks">Hello this is your current task</h1>{" "}
      {order &&
        Object.keys(order)
          .sort((a, b) => b - a)
          .map((time) => {
            return (
              <div>
                {order[time].map((item) => {
                  const taskItem = `item Name : ${
                    ingrediets[item.itemId].name
                  } , item
                  Quantity ${item.qty}
                  item Type : ${ingrediets[item.itemId].type}`;
                  return (
                    <div key={item.itemId}>
                      <Task className="tasks" taskItem={taskItem} />
                    </div>
                  );
                })}
              </div>
            );
          })}
    </div>
  );
};

export default LiveOrders;
