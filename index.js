//const morgan=require('morgan');
//Depediencies
const express=require('express'); //Se exrporta el archivo index.js desde la carpeta express
const app=express(); //Se llama a la constante express
//Routers
const pokemon=require('./routes/pokemon')
const user=require('./routes/user');
//Middleware
const auth=require('./middleware/auth')
const notfound=require('./middleware/notFound');
const index=require('./middleware/index');
//app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.get("/",(req,res,next)=>{
    return res.status(200).send({code: 1,message:'Bienvenido al pokedex'})
})

app.use('/user',user);
app.use(auth);
app.use('/pokemon',pokemon);

app.use(notfound);

app.get(index); //Se visualizan los cambios en el servidor ya creado anteriormente.

/*
Verbos http
-GET: Regresa una pagina web
-POST: Hace peticion en para una pagina web
-PATCH: Actualización de un recurso.
-PUT: Modifica todos los elementos.
-DELETE: Informa la eliminación de un recurso.
*/

app.listen(process.env.PORT || 3000, ()=>{
    console.log('Server is runing...')
});  //Se crea un mini puerto para visualizar el resultado