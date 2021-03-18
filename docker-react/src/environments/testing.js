import environment from "./base";

// production backend url

export const obj = {
  basePath: "smart-turn"
};
const env = environment(obj);
export default {
  ...env
};
