import React from "react";

const Task = ({ taskItem }) => {
  return (
    <div className={`task`}>
      <li>{taskItem}</li>
    </div>
  );
};

export default Task;
