const jf = require("jsonfile");

const file = "./data/userActions.json";

// Function to read user actions from the JSON file
const getActions = () => {
  try {
    return jf.readFile(file);
  } catch (error) {
    console.error("Error reading user actions:", error);
  }
};

// Function to write user actions to the JSON file
const setActions = async (obj) => {
  try {
    await jf.writeFile(file, obj);
  } catch (error) {
    console.error("Error writing user actions:", error);
  }
};

module.exports = { setActions, getActions };
