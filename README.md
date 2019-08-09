#Pueba de OPS Decathlon

Esta es una aplicaciòn escrita en NodeJs que necesita de 3 items fundamentales para funcionar correctamente:

- App FrontEnd
- App BackEnd
- Base de datos Mongo

Para que la app funcione correctamente en local las dependencias minimas son:

- NodeJs
- Npm

# API - BACKEND 

Para instalar dependecias:

- npm install

Para iniciar el servidor ejecutar:

- npm start

# Variables de entorno

El proyecto necesita las siguientes variables para iniciar, estas variables deben ser configuradas en el archivo .env o confing.json

PORT, MONGO_URL

# APP - FRONTEND

Para instalar dependecias ejecutar:

- npm install

Para crear el bundle de la app:

- npm run build

Para iniciar el servidor ejecutar:

- npm run start

# Variables de entorno

La app front necesita las siguientes variables para iniciar, estas variables deben ser configuradas en el archivo .env o confing.json

PORT, API_URL

# Recomendaciones

- Crear una imagen docker para cada app para el despliegue.

- La app necesita de una base de datos Mongo para funcionar, esta base de datos se debe iniciar como una instancia o contenedor independiente.