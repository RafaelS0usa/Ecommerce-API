import productDAO from "../DAO/productsDAO.js";
import Product from "../models/products.js";
const productMethods = new productDAO(db)

const productController = (app, db) => {

    app.get("/produtos", async (req, res) => {
        try{
            const products = await productMethods.GetAllProducts(db);
            res.status(200).json({msg: `Aqui estão todos os produtos: ${products}`})
        } catch(error) {
            res.status(400).json({msg: `Erro interno: ${error}`})
        }
    })
    app.post("/produtos", async (req, res) => {
        try {
            const newProduct = new Product(
                req.body.titulo, 
                req.body.descricao, 
                req.body.valor
            );
            const createProduct = await ProductsDAO.InsertNewProduct(newProduct);
            res.status(200).json({msg: `Produto inserido com sucesso`, newProduct: createProduct});
        } catch(error) {
            res.status(400).json({msg: `Erro interno: ${error}`});
        }
    })
    app.put("/produtos/:titulo", async (req, res) => {
        const titulo = req.params.titulo;
        try {
            const getProduct = await ProductsDAO.GetAllProducts(titulo);
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
                const changingProduct = await ProductsDAO.UpdatingProduct(product[0]);
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
        try {
            const getProduct = await ProductsDAO.GetAnProduct(titulo);
            const deletingProduct = await ProductsDAO.DeletingProduct(titulo);
            res.status(200).json({msg: `${getProduct[0].titulo} deletado com sucesso`})
        } catch(error) {
            res.status(400).json({msg: `Erro interno: ${error}`})
        }
    });
};

export default productController;