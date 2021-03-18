import {
  isTokenExpired,
  getAuth,
  setAuthorization,
  setAccessToken
} from "../auth/auth";
import service, { APIcall } from "./service";
import environment from "..";
import JwtDecode from "jwt-decode";
import { history } from "../Store/store";

function getToken(refresh_token) {
  const headers = {
    "Content-Type": "application/x-www-form-urlencoded",
    Authorization:
      "Basic c3ByaW5nLXNlY3VyaXR5LW9hdXRoMi1yZWFkLWNsaWVudDpzcHJpbmctc2VjdXJpdHktb2F1dGgyLXJlYWQtY2xpZW50LXBhc3N3b3JkMTIzNA==",
    scope: "read"
  };
  const query = {
    grant_type: "refresh_token",
    refresh_token,
    client_id: "spring-security-oauth2-read-client",
    client_secret: "spring-security-oauth2-read-client-password1234"
  };

  var queryString = Object.keys(query)
    .map(key => key + "=" + query[key])
    .join("&");

  service
    .post(environment.login, queryString, headers)
    .then(response => {
      if (response.status === 401) {
        history.push("/login");
      }
      const decodedValue = JwtDecode(response.access_token);
      let credential = {
        userId: decodedValue.userId,
        access_token: response.access_token,
        user_name: decodedValue.user_name,
        expires_in: new Date(new Date().getTime() + response.expires_in * 1000),
        authdata: headers.Authorization,
        refresh_token: response.refresh_token
      };
      setAuthorization(credential);
      setAccessToken("token=" + credential.access_token);
    })
    .catch(e => {
      console.log(e);
      // next(action);
    });
  //console.log(response);
}

export default function requestMiddleware() {
  return ({ dispatch }) => next => action => {
    const { refresh_token } = getAuth();
    if (refresh_token && isTokenExpired()) {
      getToken(refresh_token);
      return next(action);
    } else {
      return next(action);
    }
  };
}
