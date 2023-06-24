const verify = require("../middleware/verifyAuth.js");

function checkRolesAccess(roles) {
  return (req, res, next) => {
    verify.verifyAuthRole(req, res, next, roles);
  };
}

module.exports = checkRolesAccess;
