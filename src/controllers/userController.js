import UsersDAO from "../DAO/usersDAO.js";
import User from "../models/users.js";
import db from "../connection/sqlite.js";

const userMethods = new UsersDAO(db)

const userController = (app) => {
  app.get("/usuarios", async (req, res) => {
    try {
      const users = await userMethods.GetAllUsers(db);
      res.status(200).json({msg:`Aqui está todos os usuarios:`, users})
    } catch (error) {
      res.status(400).json({msg: `Erro interno: `, error})
    }
  })
  app.post("/usuarios", async (req, res) => {
      try {
        const SQL = `INSERT INTO usuarios(id, nome, email, senha) VALUES (?,?,?,?)`;
        const newUser = new User(
          req.body.nome, 
          req.body.email, 
          req.body.senha);
        console.log(newUser);

        new Promise((resolve, reject) => {
          db.run(
            SQL,
            [newUser.id, newUser.nome, newUser.email, newUser.senha],
            (erro) => {
              if (!erro) {
                resolve();
              } else {
                reject(erro);
              }
            }
          );
        }).then((result) => {
          res.json(result);
        });
        res.status(200).json({msg: `Novo usuário cadastrado com sucesso`, newUser: newUser.nome});
      } catch (error) {
        res.status(400).json({msg:`Erro interno: `, error})
      }
  })
  app.put("/usuarios/:id", async (req, res) => {
    const id = req.params.id;
    try{
      const getUser = await userMethods.GetAnUser(id);
      if(getUser){
        const updateUser = new User(
          req.body.nome,
          req.body.email,
          req.body.senha
        );
        
        const user = [
          {
            nome: updateUser.nome || getUser[0].nome,
            email: updateUser.email || getUser[0].email,
            senha: updateUser.senha || getUser[0].senha,
            id: id
          }
        ];
        const updatingUser = await userMethods.UpdatingUser(user[0]);
        res.status(200).json({msg: `Usuário atualizado com sucesso`, updateUser: updatingUser});
      }
    } catch(error) {
      res.status(400).json({msg: `Erro interno`, error});
    }
  })
  app.delete("/usuarios/:id", (req, res) => {
    const id = req.params.id;
    try{
      const SQL = `DELETE FROM usuarios WHERE id = '${id}'`;
      const deletingUser = new Promise((resolve, reject) => {
        db.run(
          SQL,
          (error, rows)=>{
            if(!error){
              resolve(rows)
            } else {
              reject(error)
            }
          });
      })
      res.status(200).json({msg: `Usuário deletado com sucesso`})
    } catch(error){
      res.status(400).json({msg: `Erro interno: ${error}`})
    }
  })
};

export default userController;
