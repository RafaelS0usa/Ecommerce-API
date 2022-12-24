const Express = require("express");
const userRoute = require("./src/routes/users.routes")
const app = Express()
const port = 2022;

app.use(Express.json())

app.use(userRoute)
//app.use(productsRoutes)

app.listen(port, ()=>{
    console.log(`Servidor rodando na porta: http://localhost:2022`)
})