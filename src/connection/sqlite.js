const sqlite3 = require("sqlite3");
const path = require("path");
const pathFile = path.resolve("./src/connection/","database.db");

const db = new sqlite3.Database(pathFile);
process.on("SIGINT", ()=>{
    db.close(()=>{
        console.log("DB FINISHED");
        process.exit(0);
    })
});

module.exports = db;