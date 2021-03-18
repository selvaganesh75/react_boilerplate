import axios from "axios";
import resetTokenAndReattemptRequest from "./refreshToken";
import { buildErrFromResponse } from "../utils/utils";
import { getAuth, removeAccessToken, removeAuthorization } from "../auth/auth";
import store, { history } from "../store/store";
class Service {
  service;
  constructor() {
    const service = axios.create({
      headers: {
        "Content-Type": "application/json",
      },
    });
    service.interceptors.request.use(
      (config) => {
        if (!config.headers.Authorization) {
          const token = getAuth().token;

          if (token) {
            config.headers.Authorization = `Bearer ${token}`;
          }
        }

        return config;
      },
      (error) => Promise.reject(error)
    );
    service.interceptors.response.use(this.handleSuccess, this.handleError);
    this.service = service;
  }

  handleSuccess(response) {
    console.log(response);
    return response;
  }
  isTokenExpiredError = (errorResponse) => {
    // Your own logic to determine if the error is due to JWT token expired returns a boolean value
    if (errorResponse && errorResponse.status && errorResponse.status === 401) {
      return true;
    }
    return false;
  };

  handleError = (error) => {
    const errorResponse = error.response;
    if (this.isTokenExpiredError(errorResponse)) {
      alert("Token Expired. Please login...");
      removeAccessToken();
      removeAuthorization();
      store.dispatch({ type: "LOGOUT" });
      history.push("/login");
      return Promise.reject(error);
    }

    return buildErrFromResponse(errorResponse.data);
  };

  redirectTo = (document, path) => {
    document.location = path;
  };

  get = (path, options = { headers: {} }) => {
    return this.service.get(path, options).then((response) => response.data);
  };

  patch = (path, payload, header) => {
    return this.service
      .request({
        method: "PATCH",
        url: path,
        responseType: "json",
        data: payload,
        headers: header,
      })
      .then((response) => {
        return response.data;
      });
  };

  post = (path, payload, header) => {
    return this.service
      .request({
        method: "POST",
        url: path,
        responseType: "json",
        data: payload,
        headers: header,
      })
      .then((response) => {
        return response.data;
      });
  };

  put = (path, payload, header) => {
    return this.service
      .request({
        method: "PUT",
        url: path,
        responseType: "json",
        data: payload,
        headers: header,
      })
      .then((response) => response.data);
  };

  delete = (path, payload, header) => {
    return this.service
      .request({
        method: "DELETE",
        url: path,
        responseType: "json",
        data: payload,
        headers: header,
      })
      .then((response) => response.data);
  };
}

const service = new Service();

export default service;
