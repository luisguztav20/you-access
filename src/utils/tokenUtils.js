import { jwtDecode } from "jwt-decode";
import Cookies from "js-cookie";

export const getRoleFromToken = () => {
  const token = Cookies.get("x-token"); // Obtener el token de las cookies

  const decoded = jwtDecode(token);

  return console.log("token: " + decoded);
};
