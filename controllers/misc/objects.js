const path = require("path");

const PATH = path.join(__dirname, `../../public`);

const appResponse = (params) => {
  const {
    error = null,
    status = 200,
    data = null,
    res,
    htmlResponse,
  } = params || {};
  const obj = {
    success: !error,
    data,
    error,
    status,
  };
  if (!res) return obj;
  if (htmlResponse) return res.sendFile(respondWithHTML({ status }));
  res.send(obj);
};

const respondWithHTML = ({ status }) => {
  const files = {
    403: `${PATH}/pages/errors/403.html`,
    401: `${PATH}/pages/errors/401.html`,
  };
  const path = files[status] || `${PATH}/pages/errors/400.html`;
  return path;
};

module.exports = {
  appResponse,
};
