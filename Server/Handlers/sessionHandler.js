const checkSession = async () => {
  const actionsUrl = "http://localhost:8000/actions";
  const actionsResp = await fetch(actionsUrl);
  const actionsData = await actionsResp.json();
  if (actionsData.flag == "SessionDestroyed") {
    return false;
  } else if (actionsData.flag == "actionPerformed") {
    return true;
  }
};
