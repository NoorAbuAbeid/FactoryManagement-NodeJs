const express = require("express");
const router = express.Router();
const actionsBLL = require("../BLL/actionsBLL");

router.route("/").get(async (req, res) => {
  try {
    let flag = null;
    const { maxActions, actionsPerformed, loginDate } = req.session;
    const currentDate = new Date();

    if (
      currentDate.toLocaleDateString() !==
      new Date(loginDate).toLocaleDateString()
    ) {
      req.session.actionsPerformed = 0;
      req.session.loginDate = currentDate.toLocaleDateString();
    } else if (actionsPerformed >= maxActions) {
      req.session.destroy();
      flag = "SessionDestroyed";
    } else {
      req.session.actionsPerformed++;
      flag = "actionPerformed";
      const obj = {
        id: req.session.UserID,
        maxActions: maxActions,
        date: currentDate.toLocaleDateString(),
        actionAllowed: maxActions - req.session.actionsPerformed,
      };
      req.session.actionAllowed = obj.actionAllowed;
      await actionsBLL.addAction(obj);
    }
    res.json({ flag: flag });
    console.log("Session in actios router:", req.session);
  } catch (error) {
    console.error("Error handling actions:", error);
    res.status(500).json({ message: "Failed to handle user actions" });
  }
});

module.exports = router;
