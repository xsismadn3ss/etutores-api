const { request, response } = require("express");

function validatePermissions(requiredPermissions) {
  return (req=request, res=response, next) => {
    const userPermissions = req.user.rol;
    const hasPermission = requiredPermissions.every((permission) =>
      userPermissions.includes(permission)
    );

    if (!hasPermission){
        return res.status(403).json({
            message: "No tienes permisos suficientes"
        })
    }
    next()
  };
}

module.exports = validatePermissions