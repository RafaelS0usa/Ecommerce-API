import Product from "../models/products.js";

const productController = (app, db) => {
    app.get("/produtos", (req, res) => {
        try{
            const SQL = `SELECT * FROM produtos`;

            new Promise((resolve, reject) => {
                db.all(SQL, (erro, rows) => {
                    if(!erro){
                        resolve(rows);
                    } else {
                        reject(erro);
                    }
                });
            }) .then((result) => {
                res.json(result);
            });
        } catch (error) {
            console.log(error);
        }
    })
    app.post("/produtos", (req, res) => {
        try {
            const SQL = `INSERT INTO produtos(id, titulo, descricao, valor) VALUES (?,?,?,?)`;
            
            const newProduct = new Product(
                req.body.titulo, 
                req.body.descricao, 
                req.body.valor);
            console.log(newProduct);

            new Promise((resolve, reject) => {
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
                            resolve(`Produto inserido com sucesso`);
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
    })
    app.put("/produtos", (req, res) => {

    })
    app.delete("/produtos", (req, res) => {
        try{
            const SQL = `DELETE FROM produtos WHERE titulo = ?`;
            new Promise((resolve, reject) => {
                db.run(
                    SQL,
                    (error) => {
                        if(!error){
                            resolve(`Produto deletado com sucesso`)
                        } else {
                            reject(error);
                        }
                    }
                );
            }).then((result) => {
                res.json(result);
            });
        } catch (error) {
            console.log(error);
        }
    })
};

export default productController;