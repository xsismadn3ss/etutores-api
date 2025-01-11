const { request, response } = require("express");

function validatePermissions(requiredPermissions) {
  return (req=request, res=response, next) => {
    const userPermissions = req.user.rol;
    const hasPermission = requiredPermissions.some((permission) =>
      userPermissions.includes(permission)
    );

    if (!hasPermission){
        return res.status(403).json({
            message: "No tienes permiso para acceder a esta ruta"
        })
    }
    next()
  };
}

module.exports = validatePermissions