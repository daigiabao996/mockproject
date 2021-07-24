export const checkToken = () => {
  if (localStorage.getItem("user")) {
    return localStorage.getItem("user");
  }
  return null;
};
