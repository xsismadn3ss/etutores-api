const { request, response } = require("express");

function validatePermissions(requiredPermission) {
  return (req=request, res=response, next) => {
    const userPermission = req.user.rol;

    if (!userPermission || userPermission != requiredPermission){
        return res.status(403).json({
            message: "No tienes permisos suficientes"
        })
    }
    return next()
  };
}

module.exports = validatePermissions