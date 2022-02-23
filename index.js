const express=require('express'); //Se exrporta el archivo index.js desde la carpeta express

const app=express(); //Se llama a la constante express

app.get('/',(req,rest,next)=>{
    rest.status(200);
    rest.send('Bienvenido');
}) //Se visualizan los cambios en el servidor ya creado anteriormente.

/*
Verbos http
-GET: Regresa una pagina web
-POST: Hace peticion en para una pagina web
-PATCH: Actualización de un recurso.
-PUT: Modifica todos los elementos.
-DELETE: Informa la eliminación de un recurso.
*/

app.listen(3000, ()=>{
    console.log('Server is runing...')
})  //Se crea un mini puerto para visualizar el resultado