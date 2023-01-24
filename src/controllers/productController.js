import productDAO from "../DAO/productsDAO.js";
import Product from "../models/products.js";
import db from "../connection/sqlite.js";

const productMethods = new productDAO(db)

const productController = (app) => {

    app.get("/produtos", async (req, res) => {
        try{
            const products = await productMethods.GetAllProducts(db);
            res.status(200).json({msg: `Aqui estão todos os produtos: `, products})
        } catch(error) {
            res.status(400).json({msg: `Erro interno: `, error})
        }
    })
    app.post("/produtos", async (req, res) => {
        try {
            const SQL = `INSERT INTO produtos(id, titulo, descricao, valor) VALUES (?,?,?,?)`;
            const newItem = new Product(
                req.body.titulo, 
                req.body.descricao, 
                req.body.valor
            );
            new Promise((resolve, reject) => {
                db.run(
                  SQL,
                  [newItem.id, newItem.titulo, newItem.descricao, newItem.valor],
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
            res.status(200).json({msg: `Produto inserido com sucesso`, newProduct: newItem.titulo});
        } catch(error) {
            res.status(400).json({msg: `Erro interno: ${error}`});
        }
    })
    app.put("/produtos/:id", async (req, res) => {
        const id = req.params.id;
        try {
            const getProduct = await productMethods.GetAnProduct(id);
            if(getProduct){
                const updateProduct = new Product(
                    req.body.titulo,
                    req.body.descricao,
                    req.body.valor
                );
                const product = [
                    {
                        titulo: updateProduct.titulo || getProduct[0].titulo,
                        descricao: updateProduct.descricao || getProduct[0].descricao,
                        valor: updateProduct.valor || getProduct[0].valor,
                        id: id
                    }
                ];
                const changingProduct = await productMethods.UpdatingProduct(product[0]);
                res.status(200).json({msg: `Produto atualizado com sucesso`, updateProduct: changingProduct});
            } else {
                res.status(400).json({msg: `Produto não encontrado`})
            }
        } catch(error) {
            res.status(400).json({msg: `Erro interno ${error}`})
        }
    })
    app.delete("/produtos/:titulo", async (req, res) => {
        const titulo = req.params.titulo;
        console.log(titulo);
        try {
            const SQL = `DELETE FROM produtos WHERE titulo = '${titulo}'`;
            
            const deletingProduct = new Promise((resolve, reject) => {
                db.run(
                    SQL, 
                    (error, rows) => {
                        if(!error){
                            resolve(rows)
                        } else {
                            reject(error);
                        }
                });
            });
            res.status(200).json({msg: `${titulo} deletado com sucesso`})
        } catch(error) {
            res.status(400).json({msg: `Erro interno: ${error}`})
        }
    });
};

export default productController;