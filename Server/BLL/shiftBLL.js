const Shift = require("../Models/ShiftModel");

//Create New Shift
const addShift = async (obj) => {
  const shift = new Shift(obj);
  await shift.save();
  return "Created";
};

const getAllShifts = () => {
  return Shift.find({});
};

const getShiftById = (id) => {
  return Shift.findById({ _id: id });
};

const updateShift = async (id, obj) => {
  await Shift.findByIdAndUpdate(id, obj);
  return "Updated!";
};

const allocateEmployeesToShift = async (shiftId, employeeIds) => {
  const shift = await Shift.findById(shiftId);

  if (!shift) {
    throw new Error("Shift not found");
  }
  shift.employee = shift.employee.concat(employeeIds);
  await shift.save();
  return "Employees allocated!";
};

module.exports = {
  addShift,
  getAllShifts,
  updateShift,
  allocateEmployeesToShift,
  getShiftById,
};
