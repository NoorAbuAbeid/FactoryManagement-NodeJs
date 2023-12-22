const express = require("express");
const jwt = require("jsonwebtoken");
const usersBLL = require("../BLL/userBLL");
const actionsBLL = require("../BLL/actionsBLL");

const router = express.Router();

// Entry Point: 'http://localhost:8000/auth'
router.route("/login").post(async (req, res) => {
  const { username, email } = req.body;
  const users = await usersBLL.getAllUsers();
  // Find the user in the users array
  const user = users.find(
    (user) => user.username === username && user.email === email
  );

  if (user) {
    const userId = user.id;
    const fullName = user.fullName;
    const ACCESS_SECRET_TOKEN = "Volley16ball1607ZXQW";
    const accessToken = jwt.sign(
      { id: userId, fullName: fullName },
      ACCESS_SECRET_TOKEN,
      { expiresIn: "15m" }
    );
    req.session.UserID = userId;
    req.session.Name = fullName;
    const userDB = await usersBLL.getUserByName(fullName);
    req.session.maxActions = userDB.NumOfActions;
    req.session.actionsPerformed = 0;
    req.session.loginDate = new Date();
    console.log("Session in authRouter:", req.session);
    res.json({ accessToken, fullName });
  } else {
    res.status(401).json({ message: "Invalid credentials" });
  }
});

module.exports = router;
