const express = require("express");
const shiftBLL = require("../BLL/shiftBLL");

const router = express.Router();

// Add a new shift
router.route("/").post(async (req, res) => {
  const obj = req.body;
  const result = await shiftBLL.addShift(obj);
  res.status(201).json(result);
});

//Get all shifts
router.route("/").get(async (req, res) => {
  try {
    const shifts = await shiftBLL.getAllShifts();
    res.json(shifts);
  } catch (error) {
    res.json("There was an error!");
  }
});

//Get shift By ID
router.route("/:id").get(async (req, res) => {
  const { id } = req.params;
  const shift = await shiftBLL.getShiftById(id);
  res.json(shift);
});

//Update a shift
router.route("/:id").put(async (req, res) => {
  try {
    const { id } = req.params;
    const obj = req.body;
    const result = await shiftBLL.updateShift(id, obj);
    res.json(result);
  } catch (error) {
    res.status(500).json("There was an error!");
  }
});

//Allocate new employees for an existing shift
router.route("/allocate/:id").put(async (req, res) => {
  try {
    const { id } = req.params;
    const { employees } = req.body;
    const result = await shiftBLL.allocateEmployeesToShift(id, employees);
    res.json(result);
  } catch (error) {
    res.status(500).json("There was an error!");
  }
});

module.exports = router;
