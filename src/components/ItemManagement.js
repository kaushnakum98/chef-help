import React, { useState, useEffect } from "react";
import Table from "./TableComponent";
import { getAllItems, addItem } from "../api/api";
import { useHistory } from "react-router";

const ItemManagement = () => {
  const history = useHistory();
  const [error, setErrorMessage] = useState("");
  const [data, setData] = useState({});
  const [tableData, setTableData] = useState({});
  const handleChange = (event) => {
    const { name, value } = event.target;
    setData({ ...data, [name]: value });
  };

  useEffect(() => {
    const fetchApiData = async () => {
      const fetchAllItems = await getAllItems();
      setTableData(fetchAllItems);
    };
    fetchApiData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (data) {
      if (!data.id) {
        setErrorMessage("id is Required");
      } else {
        setErrorMessage("");
      }

      if (data.id <= 0) {
        setErrorMessage("id can not be zero");
      } else {
        setErrorMessage("");
      }
      if (!data.name) {
        setErrorMessage("name is Required");
      } else {
        setErrorMessage("");
      }
      if (!data.timeToPrep) {
        setErrorMessage("preparation time is Required");
      } else {
        setErrorMessage("");
      }

      if (data.timeToPrep <= 0) {
        setErrorMessage("preparation time can not be zero");
      } else {
        setErrorMessage("");
      }
      if (!data.type) {
        setErrorMessage("type is Required");
      } else {
        setErrorMessage("");
      }

      if (error.length === 0) {
        //add item to db
        const res = await addItem(data);
        history.go(0);
      }
    }
  };
  return (
    <section className={`addItem container container-pall`} id="itemManagement">
      <h1 id="itemTitle">Manage Inventory</h1>
      <span id="itemError">{error}</span>
      <section className={`addItem__section`}>
        <form className={`addItem__form`}>
          <div className="addItem__label">
            <label>ID :</label>
            <label>name :</label>
            <label>preparation time :</label>
            <label>type :</label>
          </div>
          <div className="addItem__input">
            <input name="id" onChange={handleChange} type="number"></input>
            <input name="name" onChange={handleChange} type="text"></input>
            <input
              name="timeToPrep"
              onChange={handleChange}
              type="number"
            ></input>
            <input name="type" onChange={handleChange} type="text"></input>
          </div>
        </form>
      </section>
      <div className="addItem__input">
        <button type="submit" onClick={handleSubmit} className="btn">
          Add Item to Inventory
        </button>
      </div>
      <section className={`current-items`}>
        <h1 id="itemTitle">Current Items</h1>
        <Table data={tableData} />
      </section>
    </section>
  );
};

export default ItemManagement;
