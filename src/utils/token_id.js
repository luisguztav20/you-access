import { jwtDecode } from "jwt-decode";
import Cookies from "js-cookie";

export const getIDFromToken = () => {
  const token = Cookies.get("x-token");

  if (!token) return null;

  try {
    const decoded = jwtDecode(token);
    return decoded.id;
  } catch (error) {
    console.error("Error decodificando el token:", error);
    return null;
  }
};
