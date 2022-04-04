module.exports='/',(req,rest,next)=>{
    rest.status(200);
    rest.send("Bienvenido al pokedex");
}