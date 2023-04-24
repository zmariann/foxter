const authStatus = (): boolean => {
  if (typeof document === "undefined") return false;
  if (document.cookie.indexOf("loggedInUser=") != -1) return true;

  return false;
};

export { authStatus };
