# E-Tutores API
Aplicación web backend para el proyecto fullstack del **bootcamp google developer**

Esta API esta diseñada para manejar los procesos de la aplicación. El téma del proyecto es crear una aplicación web para una plataforma educativa orientada a un servicio de tutorias en el que los tutores pueden publicar cursos nuevos y los estudiantes pueden inscribirse a las materias.


## Configuración de entorno

Ejectuca ``npm install`` para instalar todas las dependencias necesarias del proyecto.

Confirgura las variables de entorno en un archivo ``.env`` toma como referencia las variables listadas en ``.example.env``.

Crea un archivo ``config.json`` en la carpeta **config**. toma como referencia el contenido que esta en ``example.config.json`` y configura las variables para conectarte a tu base de datos (de preferencia las variables que se encuentran en ``development``)


## Listado de comandos usados en el proyecto

### Node
Comandos personalizados con scripts precargados para ejecutar acciones rapidas en el proyecto
* ``npm run dev``: correr entorno de desarrollo
* ``npm run prod``: correr entorno de producción
* `npm run migrate`: aplicar migraciones a la base de datos
* ``npm run undo``: revertir migraciones en la base de datos

### Sequelize
* ``sequelize init``: iniciar proyecto de sequelize para manejar migraciones
* ``sequelize migration:generate --name {migration_name}``: crear una nueva migración
* ``sequleize model:generate``: crear un nuevo modelo

    ```bash
    # Ejemplo de creación de un nuevo modelo
    npx sequelize-cli model:generate --name tasks --attributes name:string,done:boolean
    ```
