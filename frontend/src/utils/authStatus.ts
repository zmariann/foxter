const authStatus = (): boolean => {

  if(typeof document === "undefined") return false;

  if (document.cookie.indexOf("loggedInUser=") != -1) return true;

  return false;
};

const getCurrentUserId = () => {
  if(typeof document === "undefined") return null;

  if (document.cookie.indexOf("loggedInUser=") != -1){
    return parseInt(document.cookie.split("loggedInUser=")[1].split(";")[0])
  } 

  return null;
}

export { authStatus, getCurrentUserId };
