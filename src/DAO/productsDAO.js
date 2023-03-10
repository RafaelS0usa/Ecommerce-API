class productDAO {
    constructor(database){
        this.db = database;
    }
    
    GetAllProducts() {
        const SQL = `SELECT * FROM produtos`;
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

    GetAnProduct(titulo) {
        const SQL = `SELECT * FROM produtos WHERE id=?`;
        return new Promise((resolve, reject) => {
          this.db.all(SQL, titulo, (erro, rows) => {
            if (!erro) {
              resolve(rows);
            } else {
              reject(erro);
            }
          });
        });
    }

    InsertNewProduct(product){
        const SQL = `INSERT INTO produtos(id, titulo, descricao, valor) VALUES (?,?,?,?)`;
        return new Promise((resolve, reject) => {
            db.run(
                SQL,
                
                (erro) => {
                    if(!erro) {
                        resolve(res.status(200).json({msg: `${newProduct.titulo} inserido com sucesso`}));
                    } else {
                        reject(erro);
                    }
                }
            );
        })
    }

    UpdatingProduct(product){
        const SQL = `UPDATE produtos SET titulo=?, descricao=?, valor=? WHERE id=?`;
        return new Promise((resolve, reject) => {
            this.db.run(
                SQL,
                [product.titulo, product.descricao, product.valor, product.id],
                (error) => {
                    if(!error){
                        resolve({msg: product})
                    } else {
                        reject({msg: error})
                    }
                }
            )
        })
    }

    DeletingProduct(titulo){
        const SQL = `DELETE FROM produtos WHERE titulo = '${titulo}'`;
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

export default productDAO;