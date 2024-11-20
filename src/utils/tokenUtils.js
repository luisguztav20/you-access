import { jwtDecode } from "jwt-decode";
import Cookies from "js-cookie";

export const getRoleFromToken = () => {
  // Obtener el token de las cookies usando el nombre que se haya dado en el backend
  const token = Cookies.get("x-token"); // 'x-token' es el nombre del token en las cookies

  if (!token) return null;

  try {
    // Decodificar el token
    const decoded = jwtDecode(token);
    return decoded.role; // Retorna el rol "user" o "admin"
  } catch (error) {
    console.error("Error decodificando el token:", error);
    return null;
  }
};
