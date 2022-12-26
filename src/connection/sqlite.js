import sqlite3 from "sqlite3";
import path from "path";
const pathFile = path.resolve("./src/connection/","database.db");

const db = new sqlite3.Database(pathFile);
process.on("SIGINT", ()=>{
    db.close(()=>{
        console.log("DB FINISHED");
        process.exit(0);
    })
});

export default db;