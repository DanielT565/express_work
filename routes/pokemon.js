const express=require('express');
const poke=express.Router();
const db=require('../config/database');

poke.post('/',async(req,res,next)=>{
    const {pok_name,pok_height,pok_weight,pok_base_experience}=req.body;
    if(pok_name&&pok_height&&pok_weight&&pok_base_experience){
        let query='INSERT INTO pokemon(pok_name, pok_height, pok_weight, pok_base_experience)';
        query+= `VALUES ('${pok_name}',${pok_height},${pok_weight},${pok_base_experience})`;
        const rows= await db.query(query);
        if(rows.affectedRows==1){
            return res.status(200).json({code: 1, message:'Pokemon insertado correctamente.'});
        }
        return res.status(500).json({code:500, message:'Ha ocurrido un error.'})
        }
    return res.status(500).json({code:500,message:'Campos incompletos'})
});

poke.delete("/:id([0-9]{1,3})", async(req,res,next)=>{
    const query=`DELETE FROM pokemon WHERE pok_id=${req.params.id}`;
    const rows=await db.query(query);
    if(rows.affectedRows==1){
        return res.status(200).json({code: 200, message: 'Pokemon eliminado exitosamente'});
    }
    return res.status(404).json({code: 404, message: 'Pokemon no encontrado'});
});
poke.put("/:id([0-9]{1,3})",async(req,res,next)=>{
    const{pok_name,pok_height,pok_weight,pok_base_experience}=req.body
    
    if(pok_name&&pok_height&&pok_weight&&pok_base_experience){
        let query=`UPDATE pokemon SET pok_name='${pok_name}',pok_height=${pok_height},`;
        query+=`pok_weight=${pok_weight},pok_base_experience=${pok_base_experience} WHERE pok_id=${req.params.id};`;
        const rows= await db.query(query);
        if(rows.affectedRows==1){
            return res.status(200).json({code: 200, message:'Pokemon actualizado.'});
        }
        return res.status(500).json({code:500, message:'Ha ocurrido un error.'})
        }
    return res.status(500).json({code:500,message:'Campos incompletos'})
});
poke.patch("/:id([0-9]{1,3})",async(req,res,next)=>{
    if(req.body.pok_name){
        let query=`UPDATE pokemon SET pok_name='${req.body.pok_name}' WHERE pok_id=${req.params.id}`;
        const rows= await db.query(query);
        if(rows.affectedRows==1){
            return res.status(200).json({code: 200, message:'Pokemon actualizado.'});
        }
        return res.status(500).json({code:500, message:'Oh no a ocurrido un error.'})
    }
    return res.status(500).json({code:500, message:'Campos incompletos.'})
});
poke.get("/",async(req,res,next)=>{
    const pkmn=await db.query('SELECT * FROM pokemon;');
    res.status(200).json({code:1,message:pkmn});
});
poke.get('/:id([0-9]{1,3})',async(req,res,next)=>{
    const id=req.params.id
    if(id>=1 && id<=722){
        const pkmn=await db.query('SELECT * FROM pokemon WHERE pok_id='+id+';')
        return res.status(200).json({code:1,message:pkmn})
    }
    return res.status(404).send({code:404, message:'Pokemon no encontrado'})
});
poke.get('/:name([A-Za-z¨]+)',async(req,res,next)=>{
    const name=req.params.name;
    const pkmn=await db.query('SELECT * FROM pomekon WHERE pok_name'+name+';');
    if(pkmn.length>0){
        return res.status(200).json({code:1,message:pkmn});
    }
    /*for(i=0;i<pokemon.length;i++){
        if(pokemon[i].name.toUpperCase==name.toUpperCase){
            res.status(200);
            res.send(pokemon[i]);
        }
        else{
            res.status(404);
            res.send("Pokemon no encontrado");
        }
    }*/
    /*const pok=pokemon.filter((p)=>{
        return (p.name.toUpperCase()==name.toUpperCase())? p:null;
    });*/
    return res.status(404).send({code:404, message:'Pokemon no encontrado'})
});

module.exports=poke;