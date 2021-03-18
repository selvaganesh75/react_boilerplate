// default environment setup
export default function(obj) {
  //const { misconnection,performance} = obj;
  return {
    intervals: {
      logout: 3600 // 1 hour in seconds
    },

    isProduction: true,
    isDevelopment: false,
    ...obj
  };
}
