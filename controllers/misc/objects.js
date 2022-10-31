const appResponse = (params) => {
  const { error = null, status = 200, data = null, res } = params || {};
  const obj = {
    success: !error,
    data,
    error,
    status,
  };
  if (!res) return obj;
  res.send(obj);
};

module.exports = {
  appResponse,
};
