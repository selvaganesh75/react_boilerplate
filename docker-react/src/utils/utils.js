export const buildErrFromResponse = async (response) => {
  return new Promise((resolve, reject) => {
    if (!response) reject({ message: "Something went wrong" });
    if (response && response.errors) {
      const errorMsg = response.errors;
      let errors = "";
      if (Array.isArray(errorMsg.msg)) {
        errorMsg.msg.forEach((val) => {
          const param = val.param ? val.param + ":" : "";
          errors += `${param} ${val.msg}, \n`;
        });
      } else {
        const param = errorMsg.param ? errorMsg.param + ":" : "";
        errors = param + errorMsg.msg;
      }
      reject({ message: errors });
    }
    if (response) resolve(response);
    if (response === null || response === undefined)
      reject({ message: "Something went wrong" });
    if (response.status > 399)
      reject({ message: response.statusText || "Something went wrong" });
    resolve({});
  });
};
