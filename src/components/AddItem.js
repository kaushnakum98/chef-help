import React, { useEffect, useState } from "react";
import Select from "react-select";
import { useHistory } from "react-router";
import makeAnimated from "react-select/animated";
import { getAllItems, addMenuItem, getAllMenuItems } from "../api/api";

const animatedComponents = makeAnimated();

const AddItem = () => {
  const history = useHistory();
  const [options, setOptions] = useState([]);
  const [newItem, setNewItem] = useState({
    name: "",
    description: "",
    price: "",
    instructions: "",
    ingredients: [],
    photo: "",
    type: "",
  });

  const handleChangeIngredient = async (e) => {
    const ingredients = await e.map((element) => {
      return element.value;
    });

    setNewItem({ ...newItem, ingredients: ingredients });
  };

  const handleChange = (e) => {
    setNewItem({ ...newItem, [e.target.name]: e.target.value });
  };

  const handlePhoto = (e) => {
    setNewItem({ ...newItem, [e.target.name]: e.target.files[0] });
  };

  useEffect(() => {
    const fetchApiData = async () => {
      const { data } = await getAllItems();
      const optionsData = data.map((ele) => {
        return { value: ele.id, label: ele.name };
      });
      setOptions(optionsData);
    };
    fetchApiData();
  }, []);

  const handleClick = async (e) => {
    e.preventDefault();
    let formData = new FormData();
    formData.append("name", newItem.name);
    formData.append("description", newItem.description);
    formData.append("price", newItem.price);
    formData.append("photo", newItem.photo);
    formData.append("instructions", newItem.instructions);
    formData.append("ingredients", newItem.ingredients);
    formData.append("type", newItem.type);
    const saveItemRes = await addMenuItem(formData);
    history.go(0);
  };

  return (
    <div className="menuItem">
      <h1>Create Item For the Menu</h1>
      <div className="menuItem__form">
        <div className={`menuItem__name`}>
          <label>Name</label>
          <input
            value={newItem.name}
            onChange={handleChange}
            name="name"
            type="text"
          />
        </div>

        <div className={`menuItem__name`}>
          <label>Description : </label>
          <textarea
            value={newItem.description}
            onChange={handleChange}
            name="description"
            type="text"
          />
        </div>

        <div className={`menuItem__name`}>
          <label>Price $$ : </label>
          <input
            value={newItem.price}
            onChange={handleChange}
            name="price"
            type="text"
          />
        </div>

        <div className={`menuItem__name`}>
          <label>Photo : </label>
          <input
            onChange={handlePhoto}
            name="photo"
            accept=".png, .jpg, .jpeg"
            type="file"
          />
        </div>

        <div className={`menuItem__name`}>
          <label>Instructions For preparation : </label>
          <input
            value={newItem.instructions}
            onChange={handleChange}
            name="instructions"
            type="text"
          />
        </div>

        <div className={`menuItem__name`}>
          <label>Item Type : </label>
          <input
            value={newItem.type}
            onChange={handleChange}
            name="type"
            type="text"
          />
        </div>

        <div className={`menuItem__name`}>
          <label>Ingredients : </label>
          <Select
            isMulti
            className={`menuItem__select`}
            options={options}
            onChange={handleChangeIngredient}
            components={animatedComponents}
            name="ingredients"
            placeholder={`select items`}
          />
        </div>
        <button onClick={handleClick}>Create Menu Item</button>
      </div>
    </div>
  );
};

export default AddItem;
