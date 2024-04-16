function isLogged() {
  return localStorage.getItem("token") !== null;
}

export function authGuard(navigate) {
  if (!isLogged()) {
    navigate("/");
  }
}
