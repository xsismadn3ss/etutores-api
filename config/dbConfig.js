const {Sequelize} = require('sequelize')
const {env} = require('../config')
const config = require('./config.json')
const envConfig = config[env] || config.development;

const sequelize = new Sequelize(envConfig.database, envConfig.username, envConfig.password, {
    host: envConfig.host,
    port: envConfig.port,
    dialect: envConfig.dialect,
});

sequelize.authenticate()
    .then(() => {
        console.log('Conexión a la base de datos establecida correctamente.');
    })
    .catch(err => {
        console.error('No se pudo conectar a la base de datos:', err);
    });

module.exports = sequelize;