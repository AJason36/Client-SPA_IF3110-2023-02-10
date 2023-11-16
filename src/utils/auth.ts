import { jwtDecode } from "jwt-decode";

export type Payload = {
  username: string;
  email: string;
  fullName: string;
  role: string;
};

function setAuthToken(token: string) {
  localStorage.setItem("token", token);
}

function getAuthData(): Payload {
  const tokentest = localStorage.getItem("token");
  try {
    const decoded: Payload = jwtDecode(tokentest!);
    return decoded;
  } catch (err) {
    return {
      username: "",
      email: "",
      fullName: "",
      role: "",
    };
  }
}

function logout() {
  localStorage.removeItem("token");
}

function getUsername(): string {
  return getAuthData().username;
}

function getEmail(): string {
  return getAuthData().email;
}

function getFullName(): string {
  return getAuthData().fullName;
}

function getRole(): string {
  return getAuthData().role.toString();
}
export {
  setAuthToken,
  getAuthData,
  getUsername,
  getEmail,
  getFullName,
  getRole,
  logout,
};
