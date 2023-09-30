const sql = require("mysql2");



const dbconnection = sql.createConnection({
    host: "localhost",
    user:"root",
    password: "root",
    database: "authentication",
    port:"3307"
})

module.exports = dbconnection

