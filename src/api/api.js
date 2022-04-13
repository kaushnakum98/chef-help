import axios from "axios";

const apiUrl = "http://localhost:4000/api";

let config = {
  headers: {
    "Content-Type": "application/json",
    "Access-Control-Allow-Credentials": true,
  },
  Credentials: "include",
};

export const loginUser = async (email, password) => {
  const loginApiUrl = apiUrl + "/user/login";
  try {
    const data = await axios.post(loginApiUrl, {
      email: email,
      password: password,
    });
    return data;
  } catch (error) {
    return error;
  }
};

export const registerUser = async (data) => {
  const registerApiUrl = apiUrl + "/user/register";
  try {
    const res = await axios.post(registerApiUrl, data);
    return res;
  } catch (error) {
    return error;
  }
};

export const getAllItems = async (projection) => {
  const getAllItemapiUrl = apiUrl + "/item/getAllItems";
  try {
    const data = await axios.get(getAllItemapiUrl);
    return data;
  } catch (error) {
    return error;
  }
};

export const getAllMenuItems = async () => {
  const getAllMenuItemapiUrl = apiUrl + "/menu/getAllMenuItems";
  try {
    const data = await axios.get(getAllMenuItemapiUrl);
    return data;
  } catch (error) {
    return error;
  }
};

export const getAllItemsById = async () => {
  const getAllItemapiUrl = apiUrl + "/item/getAllItemsById";
  try {
    const data = await axios.get(getAllItemapiUrl);
    return data;
  } catch (error) {
    return error;
  }
};

export const addItem = async (data) => {
  const addItemUrl = apiUrl + "/item/addItem";
  try {
    const res = await axios.post(addItemUrl, data);
    return res;
  } catch (error) {
    return error;
  }
};

export const addMenuItem = async (data) => {
  const addMenuItemUrl = apiUrl + "/menu/addMenuItem";
  try {
    const res = await axios.post(addMenuItemUrl, data);
    return res;
  } catch (error) {
    return error;
  }
};

export const deleteItem = async (data) => {
  const deleteItemApiUrl = apiUrl + "/item/deleteIngredient";
  try {
    const res = await axios.post(deleteItemApiUrl, {
      id: data,
    });
    return res;
  } catch (error) {
    return error;
  }
};

export const createOrder = async (orderData) => {
  const createOrder = apiUrl + "/order/createOrder";
  try {
    const { data } = await axios.post(createOrder, orderData);
    return data;
  } catch (error) {
    return error;
  }
};

export const createCookieInHour = (cookieName, cookieValue, hourToExpire) => {
  let date = new Date();
  date.setTime(date.getTime() + hourToExpire * 60 * 60 * 1000);
  document.cookie =
    cookieName + " = " + cookieValue + "; expires = " + date.toGMTString();
};

export const getCookie = (cname) => {
  var name = cname + "=";
  var decodedCookie = decodeURIComponent(document.cookie);
  var ca = decodedCookie.split(";");
  for (var i = 0; i < ca.length; i++) {
    var c = ca[i];
    while (c.charAt(0) == " ") {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
};

export const eraseCookie = (name) => {
  document.cookie = name + "=; Max-Age=-99999999;";
};
