import User from "../models/users.js";
const userController = (app, db) => {
  app.get("/usuarios", (req, res) => {
    try {
      const SQL = `SELECT * FROM usuarios`;

      new Promise((resolve, reject) => {
        db.all(SQL, (erro, rows) => {
          if (!erro) {
            resolve(rows);
          } else {
            reject(erro);
          }
        });
      }).then((result) => {
        res.json(result);
      });
    } catch (error) {
      console.log(error);
    }
  }),
    app.post("/usuarios", (req, res) => {
      try {
        const SQL = `INSERT INTO usuarios(id, nome, email, senha) VALUES (?,?,?,?)`;

        const newUser = new User(req.body.nome, req.body.email, req.body.senha);
        console.log(newUser);

        new Promise((resolve, reject) => {
          db.run(
            SQL,
            [newUser.id, newUser.nome, newUser.email, newUser.senha],
            (erro) => {
              if (!erro) {
                resolve(`Usuário inserido com sucesso!`);
              } else {
                reject(erro);
              }
            }
          );
        }).then((result) => {
          res.json(result);
        });
      } catch (error) {
        console.log(error);
      }
    });
};

export default userController;
