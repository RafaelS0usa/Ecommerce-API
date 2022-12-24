var db = require("../../routes/users.routes")

const updatingUserController = async (req, res) => {
    const id = Number(req.params.id);
    
    db.map((elemento, index)=>{
        if(elemento.id === id){
            db.splice(index, 1, req.body)
        }
    })

    res.send(`Usuario atualizado com sucesso!`)
};

module.exports = updatingUserController;