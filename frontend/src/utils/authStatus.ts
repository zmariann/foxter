const authStatus = (): boolean => {

  if (document.cookie.indexOf("loggedInUser=1") != -1) return true;

  return false;
};

export { authStatus };
