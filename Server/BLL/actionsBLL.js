const actionFile = require("../DAL/actionFile");

//Get all actions from the json file
const getAllActions = async () => {
  const { actions } = await actionFile.getActions();
  return actions;
};

//Add action to the json file
const addAction = async (obj) => {
  const actions = await getAllActions();
  actions.push(obj);
  const data = { actions };
  return actionFile.setActions(data);
};

//Get actions Allowed from the json file by Id
const getActionAllowedById = async (id, maxActions) => {
  const actions = await getAllActions();
  let actionAllowedValue = maxActions; // Default to maxActions

  actions.forEach((action) => {
    if (action.id === id) {
      actionAllowedValue = action.actionAllowed;
    }
  });

  return actionAllowedValue;
};

module.exports = {
  getAllActions,
  addAction,
  getActionAllowedById,
};
