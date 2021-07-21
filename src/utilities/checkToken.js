export const checkToken = () => {
  if (localStorage.getItem("token")) {
    return localStorage.getItem("token");
  }
  return null;
}
