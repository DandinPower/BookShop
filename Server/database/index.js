const mysql = require('mysql')

const pool = mysql.createPool({
    connectionLimit: 10,
    password: 'ELEfox650',
    user: 'root',
    database: 'dandinpo_teamproject',
    host: 'localhost',
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

const sqlConnectionFile = (sql, values) => {
    return new Promise((reslove, reject) => {
      pool.getConnection((err, connection) => {
        if (err) {
          reject(err);
        } else {
          connection.query(sql, values, (error, rows) => {
            if (error) {
              reject(error);
            } else {
              reslove(rows);
            }
            connection.release();
          });
        }
      });
    });
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

async function GetBusinessId (productId){
    try{
        result = await sqlConnection(`select businessId from product where no = ${productId};`)
        console.log(result);
        if (result.length != 0){
            return result[0]["businessId"]
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
    sqlConnectionFile,
    GetUserId,
    GetBusinessId
}