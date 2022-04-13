import React, { useState } from "react";
import { deleteItem } from "../api/api";
import { useHistory } from "react-router";

const Table = ({ data: { data } }) => {
  const history = useHistory();

  const handleClick = async (e) => {
    e.preventDefault();
    console.log(e.target.id);
    await deleteItem(e.target.id);
    history.go(0);
  };
  return (
    <table className={`wrapper container container-pall`}>
      <tr className={`row header green`}>
        <th>id</th>
        <th>name</th>
        <th>Prepration Time</th>
        <th>Type</th>
        <th>Operation</th>
      </tr>
      {data &&
        data.map((elem) => {
          return (
            <tr className="row">
              <td className="cell">{elem["id"]}</td>
              <td className="cell">{elem["name"]}</td>
              <td className="cell">{elem["timeToPrep"]}</td>
              <td className="cell">{elem["type"]}</td>
              <td className="cell">
                <button
                  className={`delete`}
                  id={elem["_id"]}
                  onClick={handleClick}
                >
                  Delete This Item
                </button>
              </td>
            </tr>
          );
        })}
    </table>
  );
};

export default Table;
