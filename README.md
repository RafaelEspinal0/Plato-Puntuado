# Plato-Puntuado APP

![Logo from app - Plato Puntuado!](/public/darktheme.png)


Esta aplicacion esta desarrollada en __Next.js__ y __MongoDB__. La aplicación trata de hacer calificaciones y comentarios a los restaurantes que un usuario visite.

---

Para correr localmente, se necesita la base de datos 🐳

```
docker-compose up -d
```

* El -d, significa __detached__

* MongoDb URL Local:

```
mongodb://localhost:27017/platodb
```

## Configurar las variables de entorno
Renombrar el archivo __.env.template__ a __.env__ 

* Reconstruir los modulos de node con yarn y levantar la app
```
yarn install
yarn run dev
```

* Reconstruir los modulos de node con npm y levantar la app
```
npm install
npm run dev
```

## Llenar la base de datos con informaciones de prueba en __/database/seed-data.ts__

Llamara  ☎️:
```
    http://localhost:3000/api/seed
```
