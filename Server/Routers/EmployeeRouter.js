const express = require("express");
const employeeBLL = require("../BLL/employeeBLL");

const router = express.Router();

// Add a new employee
router.route("/").post(async (req, res) => {
  const obj = req.body;
  const result = await employeeBLL.addEmployee(obj);
  res.status(201).json(result);
});

//Get all employees
router.route("/").get(async (req, res) => {
  try {
    const employees = await employeeBLL.getAllEmployees();
    res.json(employees);
  } catch (error) {
    res.json("There was an error!");
  }
});

//Get employee by ID
router.route("/:id").get(async (req, res) => {
  const { id } = req.params;
  const employee = await employeeBLL.getEmployeeById(id);
  res.json(employee);
});

//Update employee department
router.route("/updateEmployeeDepartment/:employeeId").put(async (req, res) => {
  const { employeeId } = req.params;
  const { Department } = req.body;

  try {
    const updatedEmployee = await employeeBLL.updateEmployeeDepartment(
      employeeId,
      Department
    );
    res.status(200).json(updatedEmployee);
  } catch (error) {
    console.error("Error updating employee department:", error);
    res.status(500).json({ message: "Failed to update employee department." });
  }
});

// Get all employees of a specific department
router.route("/department/:departmentId").get(async (req, res) => {
  const { departmentId } = req.params;

  try {
    const employeesInDepartment = await employeeBLL.getEmployeesByDepartment(
      departmentId
    );
    res.json(employeesInDepartment);
  } catch (error) {
    console.error("Error fetching employees by department:", error);
    res
      .status(500)
      .json({ message: "Failed to fetch employees by department." });
  }
});

//Update employee
router.route("/:id").put(async (req, res) => {
  try {
    const { id } = req.params;
    const obj = req.body;
    const result = await employeeBLL.updateEmployee(id, obj);
    res.json(result);
  } catch (error) {
    res.status(500).json("There was an error!");
  }
});

//Delete employee
router.route("/:id").delete(async (req, res) => {
  const { id } = req.params;
  const result = await employeeBLL.deleteEmployee(id);
  res.json(result);
});

//Get employee shifts
router.get("/:employeeId/shifts", async (req, res) => {
  try {
    const { employeeId } = req.params;
    const shifts = await employeeBLL.getEmployeeShifts(employeeId);
    res.json(shifts);
  } catch (error) {
    res.status(500).json("Failed to fetch employee shifts");
  }
});

// Register an employee for shifts
router.put("/shiftRegister/:employeeId", async (req, res) => {
  const { employeeId } = req.params;
  const { shifts } = req.body;

  try {
    const result = await employeeBLL.registerForShifts(employeeId, shifts);
    res
      .status(200)
      .json({ message: "Employee registered for shifts successfully" });
  } catch (error) {
    res.status(500).json({ error: "Failed to register for shifts" });
  }
});

//Get available shifts
router.get("/availableShifts/:employeeId", async (req, res) => {
  const { employeeId } = req.params;

  try {
    const availableShifts = await employeeBLL.getAvailableShifts(employeeId);
    res.status(200).json(availableShifts);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch available shifts" });
  }
});

module.exports = router;
