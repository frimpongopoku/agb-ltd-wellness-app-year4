const path = require("path");
const { ROLES } = require("./constants");

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
  if (htmlResponse) return res.render(respondWithHTML({ status }));
  res.send(obj);
};

const respondWithHTML = ({ status }) => {
  // const files = {
  //   403: `${PATH}/pages/errors/403.html`,
  //   401: `${PATH}/pages/errors/401.html`,
  // };
  const files = {
    403: `errors/403`,
    401: `errors/401`,
  };
  const path = files[status] || `errors/400`;
  return path;
};

/**
 * Deconstructs roles array and returns an object of booleans that 
 * speficies all the roles a user occupies
 * role object, and  
 * @param {object} user
 * @returns {object} 
 */
const getUserRoles = (user) => { 
  if(!user) return false 

  const isManager = user.roles?.find( role => role.key === ROLES.MANAGER.key)
  const isStaff = user.roles?.find( role => role.key === ROLES.STAFF.key)
  return { isManager, isStaff}
}

module.exports = {
  appResponse,
  
  getUserRoles
};
