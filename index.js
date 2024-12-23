const app = require('./app')
const mode = require('./config').env

app.listen(
    app.get('port'), ()=>{
        console.log('Servidor escuchando en el puerto', app.get('port')),
        console.log('Modo de desarrollo:', mode)
    }
)