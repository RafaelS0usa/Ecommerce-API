import app from "./src/index.js";

const port = 2022;

app.listen(port, ()=>{
    console.log(`Servidor operando na porta: http://localhost:2022`);
});