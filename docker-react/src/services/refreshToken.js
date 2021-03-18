import { setAuthorization, getAuth, setAccessToken } from "../auth/auth";
import axios from "axios";
import environment from "environment";
import JwtDecode from "jwt-decode";
import { history } from "../store/store";

let isAlreadyFetchingAccessToken = false;

// This is the list of waiting requests that will retry after the JWT refresh complete
let subscribers = [];

export default async function resetTokenAndReattemptRequest(error) {
  try {
    const { response: errorResponse } = error;
    const { token: refresh_token } = getAuth(); // Your own mechanism to get the refresh token to refresh the JWT token
    console.log(getAuth(), refresh_token);
    if (!refresh_token) {
      // We can't refresh, throw the error anyway
      history.push("/login");
      return Promise.reject(error);
    }
    /* Proceed to the token refresh procedure
    We create a new Promise that will retry the request,
    clone all the request configuration from the failed
    request in the error object. */
    const retryOriginalRequest = new Promise((resolve) => {
      /* We need to add the request retry to the queue
    since there another request that already attempt to
    refresh the token */
      addSubscriber((access_token) => {
        errorResponse.config.headers.Authorization = "Bearer " + access_token;
        resolve(axios(errorResponse.config));
      });
    });
    if (!isAlreadyFetchingAccessToken) {
      isAlreadyFetchingAccessToken = true;

      const headers = {
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization:
          "Basic c3ByaW5nLXNlY3VyaXR5LW9hdXRoMi1yZWFkLWNsaWVudDpzcHJpbmctc2VjdXJpdHktb2F1dGgyLXJlYWQtY2xpZW50LXBhc3N3b3JkMTIzNA==",
        scope: "read",
      };
      const query = {
        grant_type: "refresh_token",
        refresh_token,
        client_id: "spring-security-oauth2-read-client",
        client_secret: "spring-security-oauth2-read-client-password1234",
      };

      var queryString = Object.keys(query)
        .map((key) => key + "=" + query[key])
        .join("&");

      const response = await axios({
        method: "post",
        url: environment.login,
        headers: headers,
        data: queryString,
      });
      if (!response.data) {
        history.push("/login");
        return Promise.reject(error);
      }
      const decodedValue = JwtDecode(response.data.access_token);
      let credential = {
        userId: decodedValue.userId,
        access_token: response.data.access_token,
        user_name: decodedValue.user_name,
        expires_in: new Date(new Date().getTime() + response.expires_in * 1000),
        authdata: headers.Authorization,
        refresh_token: response.data.refresh_token,
      };
      setAuthorization(credential);
      setAccessToken("token=" + credential.access_token);

      isAlreadyFetchingAccessToken = false;
      onAccessTokenFetched(credential.access_token);
    }
    return retryOriginalRequest;
  } catch (err) {
    return Promise.reject(err);
  }
}

function onAccessTokenFetched(access_token) {
  // When the refresh is successful, we start retrying the requests one by one and empty the queue
  subscribers.forEach((callback) => callback(access_token));
  subscribers = [];
}

function addSubscriber(callback) {
  subscribers.push(callback);
}
