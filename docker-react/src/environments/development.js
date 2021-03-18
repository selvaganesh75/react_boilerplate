import environment from "./base";

// production backend url

export const obj = {
  basePath: "",
  login: "http://localhost:9000/login",

  files: {
    getAndroid: "http://localhost:8085/internal/download/redsmart.apk",
    getIOS: "http://localhost:8085/internal/download/manifest",
    uploadAndroid: "http://localhost:8085/internal/upload/redsmart.apk",
    uploadIOS: "http://localhost:8085/internal/upload/redsmart.ipa",
    uploadWebApp: "http://192.168.43.88:8085/internal/upload/build.zip",
  },

  pages: {
    download: "http://localhost:8085/internal-app/download",
    upload: "http://localhost:8085/internal-app/download",
    login: "http://localhost:8085/internal-app/login",
  },
};
const env = environment(obj);
export default {
  ...env,
  isProduction: false,
  isDevelopment: true,
};
