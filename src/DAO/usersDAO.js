class UsersDAO {
    constructor(database){
        this.db = database;
    }
    
    GetAllUsers() {
        const SQL = `SELECT * FROM usuarios`;
        return new Promise((resolve, reject) => {
            this.db.all(SQL, (erro, rows) => {
                if(!erro){
                    resolve(rows);
                } else {
                    reject(erro);
                }
            });
        });
    }

    GetAnUser(id) {
        const SQL = `SELECT * FROM usuarios WHERE id=?`;
        return new Promise((resolve, reject) => {
          this.db.all(SQL, id, (erro, rows) => {
            if (!erro) {
              resolve(rows);
            } else {
              reject(erro);
            }
          });
        });
    }

    InsertNewUsers(Users){
        const SQL = `INSERT INTO usuarios(id, nome, email, senha) VALUES (?,?,?,?)`;
        return new Promise((resolve, reject) => {
            db.run(
                SQL,
                
                (erro) => {
                    if(!erro) {
                        resolve(res.status(200).json({msg: `${newUsers.nome} inserido com sucesso`}));
                    } else {
                        reject(erro);
                    }
                }
            );
        })
    }

    UpdatingUser(Users){
        const SQL = `UPDATE usuarios SET nome=?, email=?, senha=? WHERE id=?`;
        return new Promise((resolve, reject) => {
            this.db.run(
                SQL,
                [Users.nome, Users.email, Users.senha, Users.id],
                (error) => {
                    if(!error){
                        resolve({msg: Users})
                    } else {
                        reject({msg: error})
                    }
                }
            )
        })
    }

    DeletingUsers(nome){
        const SQL = `DELETE FROM usuarios WHERE nome= '${nome}'`;
        return new Promise((resolve, reject) => {
            this.db.run(
                SQL, titulo, (error, rows) => {
                    if(!error){
                        resolve(rows)
                    } else {
                        reject(error);
                    }
            });
        })
    }
}

export default UsersDAO;