const mysql = require('mysql')

//Li本地端

const pool = mysql.createPool({  
    connectionLimit: 10,
    password: '1234',
    user: 'root',
    database: 'dandinpo_teamproject',
    host: 'localhost',
    port: '3306'
})

//Liaw本地端
/*
const pool = mysql.createPool({  
    connectionLimit: 10,
    password: 'root',
    user: 'root',
    database: 'dandinpo_teamproject',
    host: 'localhost',
    port: '3306'
})*/
/*const pool = mysql.createPool({  
    connectionLimit: 10,
    password: 'admin',
    user: 'dandinpo_admin',
    database: 'dandinpo_teamproject',
    host: '70.40.216.229',
    port: '3306'
})*/

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

async function GetAdminId (userName){
    try{
        result = await sqlConnection(`select id from admin where userName = "${userName}";`)
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

async function AddNewOrganizer(){
    const sql = `insert into organizer()value();`
    try{
        var result = await sqlConnection(sql)
        console.log(result)
        if (result.length != 0){
            return result["insertId"]
        }
        else{
            return null
        }
    }catch(e){
        console.log(e)
        return null
    }
}

async function GetOrganizerId(type,id){
    if (type == 'business'){
        var sql = `select organizerId from business where id = ${id};`
    }
    else if (type == 'admin'){
        var sql = `select organizerId from admin where id = ${id};`
    }
    else {
        return null
    }
    try{
        console.log(sql)
        var result = await sqlConnection(sql)
        if (result[0].organizerId == null){
            let returnId = await AddNewOrganizer()
            console.log(`returnId:${returnId}`)
            try {
                if (type == 'business'){
                    var sqlUpdate = `update business set organizerId = ${returnId} where id = ${id}`
                }else{
                    var sqlUpdate = `update admin set organizerId = ${returnId} where id = ${id}`
                }
                console.log(sqlUpdate)
                var updateResult = await sqlConnection(sqlUpdate)
                console.log(updateResult)
                return returnId
            }
            catch(e){
                console.log(e)
                return null
            }                 
        }
        else{
            return result[0].organizerId
        }
        }catch(e){
        console.log(e)
        return null
    }
}
module.exports = {
    sqlConnection,
    sqlConnectionFile,
    GetUserId,
    GetBusinessId,
    GetAdminId,
    GetOrganizerId,
    AddNewOrganizer
}