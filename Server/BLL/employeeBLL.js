const Employee = require("../Models/EmployeeModel");
const Shift = require("../Models/ShiftModel");
const Department = require("../Models/DepartmentModel");

//Create New Employee
const addEmployee = async (obj) => {
  const employee = new Employee(obj);
  await employee.save();
  return "Created";
};

const getAllEmployees = () => {
  return Employee.find({});
};

const getEmployeeById = (id) => {
  return Employee.findById({ _id: id });
};

// Create New Employee without department (system init)
const saveEmployeeWithoutDepartment = async ({
  FirstName,
  LastName,
  StartWorkYear,
}) => {
  const employee = new Employee({ FirstName, LastName, StartWorkYear });
  console.log(employee);
  await employee.save();
  return "Created";
};

const updateEmployeeDepartment = async (employeeId, departmentId) => {
  return Employee.findByIdAndUpdate(
    employeeId,
    { Department: departmentId },
    { new: true }
  );
};

const getEmployeesByDepartment = (departmentId) => {
  return Employee.find({ Department: departmentId });
};

const updateEmployee = async (id, obj) => {
  await Employee.findByIdAndUpdate(id, obj);
  return "Updated!";
};

const deleteEmployee = async (id) => {
  const deletedEmployee = await Employee.findByIdAndDelete(id);
  if (!deletedEmployee) {
    return "Employee not found.";
  }
  const shifts = await Shift.find({ employee: id });
  shifts.forEach(async (shift) => {
    const index = shift.employee.indexOf(id);
    if (index !== -1) {
      shift.employee.splice(index, 1);
    }
    await shift.save();
  });
  // Check if the employee is a manager
  const department = await Department.findOne({ Manager: id });
  if (department) {
    department.Manager = null; // Remove the manager association
    await department.save();
  }
  return "Deleted!";
};

const getEmployeeShifts = async (employeeId) => {
  try {
    // Find all shifts where the provided employee ID is in the employee array
    const shifts = await Shift.find({ employee: employeeId });
    return shifts;
  } catch (error) {
    console.error("Error fetching employee shifts:", error);
    return [];
  }
};

async function registerForShifts(employeeId, shifts) {
  try {
    // Find the employee by ID
    const employee = await Employee.findById(employeeId);
    if (!employee) {
      throw new Error("Employee not found");
    }
    // Iterate through selected shifts
    for (const shiftId of shifts) {
      // Find the shift by ID
      const shift = await Shift.findById(shiftId);
      if (!shift) {
        throw new Error(`Shift with ID ${shiftId} not found`);
      }

      // Add the employee to the shift
      shift.employee.push(employee);
      await shift.save();
    }
  } catch (error) {
    console.error("Error:", error);
  }
}
const getAvailableShifts = async (employeeId) => {
  try {
    // Query your database to find shifts not registered by the employee
    const availableShifts = await Shift.find({ employee: { $ne: employeeId } });
    return availableShifts;
  } catch (error) {
    console.error("Error:", error);
  }
};

module.exports = {
  addEmployee,
  getAllEmployees,
  getEmployeeById,
  saveEmployeeWithoutDepartment,
  updateEmployeeDepartment,
  getEmployeesByDepartment,
  updateEmployee,
  deleteEmployee,
  getEmployeeShifts,
  registerForShifts,
  getAvailableShifts,
};
