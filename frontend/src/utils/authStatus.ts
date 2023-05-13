const storeInLocalStorage = (key: string, value: any) => {
  if (typeof localStorage === "undefined") return false;

  if (value === null)
    localStorage.removeItem(key)
  else
    localStorage.setItem(key, value)
  return true;
}

const getFromLocalStorage = (key: string) => {
  if (typeof localStorage === "undefined") return null;

  return localStorage.getItem(key)
}

export const getAuthStatus = (): boolean => {
  if (getFromLocalStorage("authStatus") == "true")
    return true;

  return false;
};

export const setAuthStatus = (prop: boolean | null) => {
  storeInLocalStorage("authStatus", prop)
}

export const getCurrentUserId = (): number | null => {
  let currentUserId = getFromLocalStorage("currentUserId")
  if (currentUserId === null)
    return null
  else
    return parseInt(currentUserId)
}

export const getCurrentUserName = () => {
  return getFromLocalStorage("currentUserName");
}

export const setCurrentUserId = (prop: number | null) => {
  return storeInLocalStorage("currentUserId", prop);
}

export const setCurrentUserName = (prop: string | null) => {
  return storeInLocalStorage("currentUserName", prop);
}