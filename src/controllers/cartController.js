import cart from "../models/cart.js";
import CartDAO from "../DAO/cartDAO.js";
import db from "../connection/sqlite.js";

const cartMethods = new CartDAO(db)

const cartController = (app) => {
    app.get("/bag", async (req, res) => {
        try{
            const itemsOnBag = await cartMethods.GetAllItensOnBag(db);
            if(itemsOnBag == 0){
                res.status(200).json({msg: "Nenhum item na bag"})
            } else {
                res.status(200).json({msg: "Aqui estão seus itens: ", itemsOnBag})
            }
        } catch (error) {
            res.status(400).json({msg: "Erro interno. ERROR: ", error})
        }
    })
    app.post("/bag", async (req, res) => {
        try{
            const newItem = new cart(
                req.body.userID,
                req.body.productID,
                req.body.status
            )
            switch(newItem.status){
                case "purchased":
                    const addNewItem = await cartMethods.InsertNewItemOnBag(newItem)
                    res.status(200).json({msg: "Item adicionado à bag com sucesso ", addNewItem})
                break;
                case "saved":
                    const addingNewItem = await cartMethods.InsertNewItemOnBag(newItem)
                    res.status(200).json({msg: "Item salvo na bag ", addingNewItem})
                break;
                default:
                    res.status(400).json({msg: "Erro interno"})
            }
        } catch (error) {
            res.status(400).json({msg: "Erro interno! ERROR: ", error})
        }
    })
    app.put("/bag/:id", async (req, res) => {
        const id = req.params.id;
        try{
            const getItem = await cartMethods.GetAnItemOnBag(id)
            if(getItem){
                const updateItem = new cart (
                    req.body.userID,
                    req.body.productID,
                    req.body.status
                );
                const item = [
                    {
                        user: updateItem.userID || getItem[0].userID,
                        product: updateItem.productID || getItem[0].productID,
                        status: updateItem.status || getItem[0].status,
                        id: id
                    }
                ];
                const updatingItem = await cartMethods.ModifyItemOnBag(item[0]);
                res.status(200).json({msg: `Bag atualizada com sucesso`, updatingItem: updatingItem});
            } else {
                res.status(400).json({msg: `Produto não encontrado`})
            }
        } catch (error) {
            res.status(400).json({msg: `Erro interno ${error}`})
        }
    })
    app.delete("/bag/:id", async (req, res) => {
        const id = req.params.id;
        try {
            const deletingItem = await cartMethods.DeleteItemOnBag(id)
            res.status(200).json({msg: "Item excluido com sucesso"})
        } catch (error) {
            res.status(400).json({msg: `Erro interno: ${error}`})
        }
    })
}

export default cartController;