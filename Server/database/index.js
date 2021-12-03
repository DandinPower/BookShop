const mysql = require('mysql')

const pool = mysql.createPool({
    connectionLimit: 10,
    password: 'admin',
    user: 'dandinpo_admin',
    database: 'dandinpo_teamproject',
    host: '70.40.216.229',
    port: '3306'
})

let sqlConnection = (sql) => {
    return new Promise((resolve,reject) => {
        
        pool.query(sql,(err,results)=>{
            if(err){
                return reject(err)
            }
            return resolve(results)
        })
    })
}

async function GetUserId (userName){
    try{
        result = await sqlConnection(`select id from account where userName = "${userName}";`)
        console.log(result);
        if (result.length != 0){
            return result[0]["id"]
        }
        else{
            return null
        }
    }catch(e){
        console.log(e);
        return null
    }
}

module.exports = {
    sqlConnection,
    GetUserId
}