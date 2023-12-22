const axios = require("axios");

const url = "https://jsonplaceholder.typicode.com/users";

//Get all users from WS
const getAllUsers = () => {
  return axios.get(url);
};

//Get user Id from WS by his fullname
const getID = async (name) => {
  const response = await axios.get(url);
  const users = response.data;
  const user = users.find((user) => user.name === name);
  return user ? user.id : null;
};

module.exports = { getAllUsers, getID };
