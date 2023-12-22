const express = require("express");
const departmentBLL = require("../BLL/DepartmentBLL");
const employeeBLL = require("../BLL/employeeBLL");

const router = express.Router();

//create new department with validation(checking existance of dep name and manager)
router.route("/").post(async (req, res) => {
  const obj = req.body;
  const departmentName = obj.Name;
  const managerId = obj.Manager;
  try {
    // Check if the department name already exists
    const isDepartmentNameExists =
      await departmentBLL.checkDepartmentNameExists(departmentName);
    if (isDepartmentNameExists) {
      res
        .status(400)
        .json({ message: "Department name already exists", field: "name" });
      return;
    }
    // Check if the manager is already managing another department
    const isManagerOfAnotherDepartment =
      await departmentBLL.checkManagerIsAlreadyManager(managerId);
    if (isManagerOfAnotherDepartment) {
      res.status(400).json({
        message: "Manager is already managing another department",
        field: "manager",
      });
      return;
    }
    const department = await departmentBLL.addDepartment(obj);
    res.status(201).json(department); // Return the created department object
  } catch (error) {
    console.error("Error creating department:", error);
    res.status(500).json({ message: "Failed to create department" });
  }
});
//Get all department that exist in the DB
router.route("/").get(async (req, res) => {
  try {
    const department = await departmentBLL.getAllDepartments();
    res.json(department);
  } catch (error) {
    res.json("There was an error!");
  }
});
//Get department by ID
router.route("/:id").get(async (req, res) => {
  const { id } = req.params;
  const department = await departmentBLL.getDepartmentById(id);
  res.json(department);
});

//Delete department and put null in the department filed for
//all the employees that belongs to this department
router.route("/:id").delete(async (req, res) => {
  const { id } = req.params;
  const departmentEmployees = req.body.departmentEmployeesArr;

  try {
    // Update the Department field to null for those employees
    const updatePromises = departmentEmployees.map(async (employee) => {
      await employeeBLL.updateEmployeeDepartment(employee._id, null);
    });
    await Promise.all(updatePromises);
    // Delete the department
    const result = await departmentBLL.deleteDepartment(id);
    res.json(result);
  } catch (error) {
    console.error("Error deleting department:", error);
    res.status(500).json({ message: "Failed to delete department." });
  }
});

//Update a department(vaalidation : checking existance of dep name and manager)
router.route("/:id").put(async (req, res) => {
  const { id } = req.params;
  const obj = req.body;

  try {
    const existingDepartment = await departmentBLL.getDepartmentById(id);
    // Check if the new department name is valid first
    if (obj.Name && obj.Name !== existingDepartment.Name) {
      const nameExists = await departmentBLL.checkDepartmentNameExists(
        obj.Name,
        id
      );

      if (nameExists) {
        return res
          .status(400)
          .json({ message: "Department name already exists.", field: "name" });
      } else {
        await departmentBLL.updateDepartment(id, { Name: obj.Name });
      }
    }
    // Check if the department has a manager
    if (existingDepartment.Manager) {
      // If it has a manager, check if the user wants to change it
      if (
        obj.Manager &&
        obj.Manager.toString() !== existingDepartment.Manager.toString()
      ) {
        // Check if the new manager is already managing another department (excluding the current department)
        const isManagerOfAnotherDepartment =
          await departmentBLL.checkManagerIsAlreadyManager(obj.Manager, id);

        if (isManagerOfAnotherDepartment) {
          return res.status(400).json({
            message: "Manager is already managing another department.",
            field: "manager",
          });
        } else {
          // Only update the manager if they are not managing another department
          await employeeBLL.updateEmployeeDepartment(obj.Manager, id);
          await departmentBLL.updateDepartment(id, { Manager: obj.Manager });
        }
      }
    } else {
      // If the department has no manager and the user wants to set one
      if (obj.Manager) {
        await employeeBLL.updateEmployeeDepartment(obj.Manager, id);
        await departmentBLL.updateDepartment(id, { Manager: obj.Manager });
      }
    }

    res.json("Department updated successfully!");
  } catch (error) {
    console.error("Error updating department:", error);
    res.status(500).json({ message: "Failed to update department." });
  }
});

//Allocate employees for an existing department
router.route("/:id/addEmployees").put(async (req, res) => {
  const { id } = req.params;
  const { employees } = req.body;

  try {
    // Loop through the selected employees and update their departments
    for (const employeeId of employees) {
      const updatedEmployee = await employeeBLL.updateEmployeeDepartment(
        employeeId,
        id
      );
    }

    res.status(200).json({ message: "Employees added successfully!" });
  } catch (error) {
    console.error("Error adding employees to department:", error);
    res.status(500).json({ message: "Failed to add employees to department." });
  }
});

// Add this route to handle department manager updates
router.route("/:id/updateManager").put(async (req, res) => {
  const { id } = req.params;

  try {
    // Update the department's manager
    await departmentBLL.updateDepartmentManager(id, null);

    res
      .status(200)
      .json({ message: "Department manager updated successfully!" });
  } catch (error) {
    console.error("Error updating department manager:", error);
    res.status(500).json({ message: "Failed to update department manager." });
  }
});

module.exports = router;
