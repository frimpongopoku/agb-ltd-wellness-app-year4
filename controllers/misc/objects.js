const appResponse = (params) => {
  const { error = null, status = 200, data = null } = params || {};
  return {
    success: !error,
    data,
    error,
    status,
  };
};




module.exports = {
  appResponse,
};
