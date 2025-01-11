const app = require('./app')
const mode = require('./appConfig').env

const emoji = () =>{
    if(mode == 'development'){
        return "💻"
    }
    return "🔗"
}

app.listen(
    app.get('port'), ()=>{
        console.log('Servidor escuchando en el puerto', app.get('port'), "✅"),
        console.log('Modo de desarrollo:', mode, emoji())
    }
)