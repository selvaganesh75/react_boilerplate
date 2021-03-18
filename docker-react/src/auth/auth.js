import JwtDecode from "jwt-decode";

export function authHeader() {
  // return authorization header with basic auth credentials
  const user = getAuth();

  if (user && user.authdata) {
    return { Authorization: user.authdata };
  } else {
    return {};
  }
}

export function decoder(JWT) {
  const decodedValue = JwtDecode(JWT);
  let credential = {
    userId: decodedValue.userId,
    user_name: decodedValue.user_name,
  };
  setAuthorization(credential);
  setAccessToken(JWT);
}

export function getAuth() {
  return JSON.parse(localStorage.getItem("AR-internal-user") || "{}");
}

export function setAuthorization(user) {
  localStorage.setItem("AR-internal-user", JSON.stringify(user));
}

export function removeAuthorization() {
  localStorage.setItem("AR-internal-user", JSON.stringify({}));
}

export function setAccessToken(user) {
  localStorage.setItem("token", user);
}

export function removeAccessToken() {
  localStorage.removeItem("token");
}

export function getToken() {
  return localStorage.getItem("token");
}
