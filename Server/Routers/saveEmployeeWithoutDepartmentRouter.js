const express = require("express");
const employeeBLL = require("../BLL/employeeBLL");

const router = express.Router();
//Crete new employee without department for system init
router.route("/").post(async (req, res) => {
  const { FirstName, LastName, StartWorkYear } = req.body;

  const result = await employeeBLL.saveEmployeeWithoutDepartment({
    FirstName,
    LastName,
    StartWorkYear,
  });
  res.status(201).json(result);
});

module.exports = router;
