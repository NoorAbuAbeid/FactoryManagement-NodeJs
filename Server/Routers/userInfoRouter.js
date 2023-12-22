const express = require("express");
const userBLL = require("../BLL/userBLL");
const actionsBLL = require("../BLL/actionsBLL");

const router = express.Router();

//Get all users for the data base
router.route("/").get(async (req, res) => {
  try {
    const users = await userBLL.getUsers();
    res.json(users);
  } catch (error) {
    res.json("There was an error!");
  }
});

//Get actionsAllowed from the json file for specefic user
router.route("/actionsAllowed/:name").get(async (req, res) => {
  try {
    const name = req.params.name;

    const id = await userBLL.getUseridByNameWS(name);
    const user = await userBLL.getUserByName(name);
    const actionAllowed = await actionsBLL.getActionAllowedById(
      id,
      user.NumOfActions
    );
    res.json({ actionAllowed });
  } catch (error) {
    console.error("Error handling action allowed:", error);
    res.status(500).json({ message: "Failed to handle action allowed" });
  }
});

module.exports = router;
