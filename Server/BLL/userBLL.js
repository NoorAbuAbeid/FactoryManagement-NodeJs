const usersWS = require("../DAL/userWS");

const User = require("../Models/UserModel");

// Get data from web service
const getAllUsers = async () => {
  let { data: users } = await usersWS.getAllUsers();

  users = users.map((user) => {
    return {
      id: user.id,
      username: user.username,
      email: user.email,
      fullName: user.name,
    };
  });

  return users;
};

//get data from db
const getUsers = () => {
  return User.find({});
};

//Get user from DB by Name
const getUserByName = async (fullName) => {
  const user = await User.findOne({ FullName: fullName });
  return user;
};

//Get user id from WS by Name
const getUseridByNameWS = async (fullName) => {
  const id = await usersWS.getID(fullName);
  return id;
};

module.exports = {
  getAllUsers,
  getUsers,
  getUserByName,
  getUseridByNameWS,
};
