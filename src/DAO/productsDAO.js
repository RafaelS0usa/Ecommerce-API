class productDAO {
    constructor(database){
        this.db = database;
    }
    
    GetAllProducts(db) {
        const SQL = `SELECT * FROM produtos`;
        return new Promise((resolve, reject) => {
            db.all(SQL, (erro, rows) => {
                if(!erro){
                    resolve(rows);
                } else {
                    reject(erro);
                }
            });
        });
    }

    GetAnProduct(db,titulo) {
        const SQL = `SELECT * FROM products WHERE id=?`;
        return new Promise((resolve, reject) => {
          db.all(SQL, titulo, (erro, rows) => {
            if (!erro) {
              resolve(rows);
            } else {
              reject(erro);
            }
          });
        });
    }

    InsertNewProduct(db){
        const SQL = `INSERT INTO produtos(id, titulo, descricao, valor) VALUES (?,?,?,?)`;
        return new Promise((resolve, reject) => {
            db.run(
                SQL,
                [
                    newProduct.id, 
                    newProduct.titulo,
                    newProduct.descricao,
                    newProduct.valor
                ],
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

    UpdatingProduct(db,product){
        const titulo = req.params.titulo;
        const SQL = `UPDATE produtos SET titulo=?, descricao=?, valor=? WHERE titulo='${titulo}'`;
        return new Promise((resolve, reject) => {
            db.run(
                SQL,
                [product.titulo, product.descricao, product.valor],
                (error) => {
                    if(!error){
                        resolve(res.status(200).json({msg: product}))
                    } else {
                        reject(res.status(400).json({msg: error}))
                    }
                }
            )
        })
    }

    DeletingProduct(db, titulo){
        const SQL = `DELETE FROM produtos WHERE titulo = '${req.body.titulo}'`;
        return new Promise((resolve, reject) => {
            db.run(
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