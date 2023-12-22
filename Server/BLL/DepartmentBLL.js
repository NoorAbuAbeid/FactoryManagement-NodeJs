const Department = require("../Models/DepartmentModel");

//Create new department
const addDepartment = async (obj) => {
  const department = new Department();
  department.Name = obj.Name;
  department.Manager = obj.Manager;
  await department.save();
  return department;
};

//Get all dep from DB
const getAllDepartments = () => {
  return Department.find({});
};

//Get dep by ID from DB
const getDepartmentById = (id) => {
  return Department.findById({ _id: id });
};

//delete a dep
const deleteDepartment = async (id) => {
  await Department.findByIdAndDelete(id);
  return "Deleted!";
};
//upadte a dep
const updateDepartment = async (id, obj) => {
  await Department.findByIdAndUpdate(id, obj);
  return "Updated!";
};

//Update the manager for a specfic dep
const updateDepartmentManager = async (departmentId, newManagerId) => {
  const department = await Department.findById(departmentId);
  // Check if the department exists
  if (!department) {
    throw new Error("Department not found");
  }

  department.Manager = newManagerId;
  await department.save();

  return "Updated department manager!";
};

//Check if the manager is already manage another dep so he/she can't manage other departments
const checkManagerIsAlreadyManager = async (
  managerId,
  departmentIdToExclude = null
) => {
  try {
    // Check if there are any managers in the database
    const allManagers = await Department.find({ Manager: { $exists: true } });

    // If there are no managers, return false to indicate that the manager is not managing any department
    if (allManagers.length === 0) {
      return false;
    } else {
      // Query the database to find departments where the manager is the manager
      let query = { Manager: managerId };
      if (departmentIdToExclude) {
        // Exclude the current department being edited
        query._id = { $ne: departmentIdToExclude };
      }
      const existingDepartments = await Department.find(query);
      // If the manager is already the manager of another department, return true
      return existingDepartments.length > 0;
    }
  } catch (error) {
    console.error("Error checking manager:", error);
  }
};

//Check if this name is already a name for other dep

const checkDepartmentNameExists = async (
  departmentName,
  excludeDepartmentId = null
) => {
  try {
    const departments = await getAllDepartments();
    if (departments.length == 0) return false;
    else {
      // Filter departments by name
      const existingDepartment = departments.find(
        (dept) =>
          dept.Name.toLowerCase() === departmentName.toLowerCase() &&
          (excludeDepartmentId
            ? dept._id.toString() !== excludeDepartmentId.toString()
            : true)
      );
      return !!existingDepartment; // Return true if a matching department exists
    }
  } catch (error) {
    console.error("Error checking department name existence:", error);
    return true; // Return true in case of an error to be cautious
  }
};

module.exports = {
  addDepartment,
  getAllDepartments,
  getDepartmentById,
  deleteDepartment,
  updateDepartment,
  updateDepartmentManager,
  checkManagerIsAlreadyManager,
  checkDepartmentNameExists,
};
