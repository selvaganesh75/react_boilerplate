import environment from "./base";

// production backend url

export const obj = {
  basePath: "internal-app",
  login: "http://localhost:9000/login",

  files: {
    getAndroid: "https://redsmart.airasia.com/internal/download/redsmart.apk",
    getIOS: "https://redsmart.airasia.com/internal/download/manifest",
    uploadAndroid: "https://redsmart.airasia.com/internal/upload/redsmart.apk",
    uploadIOS: "https://redsmart.airasia.com/internal/upload/redsmart.ipa",
    uploadWebApp: "https://redsmart.airasia.com/internal/upload/build.zip",
  },

  pages: {
    download: "https://redsmart.airasia.com/internal-app/download",
    upload: "https://redsmart.airasia.com/internal-app/download",
    login: "https://redsmart.airasia.com/internal-app/login",
  },
};
const env = environment(obj);
export default {
  ...env,
  isProduction: true,
  isDevelopment: false,
};
