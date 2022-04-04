const mysql=require('mysql');
const util=require('util');

const Pool=mysql.createPool({
    connectionLimit:10,
    host:'localhost',
    user:'root',
    password:'',
    database:'pokemon'
});

Pool.query=util.promisify(Pool.query);
module.exports=Pool;
