class CartDAO{
    constructor(database){
        this.db = database;
    }
    GetAllItensOnBag(){
        const SQL = `SELECT * FROM carrinho`;
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

    GetAnItemOnBag(id){
        const SQL = `SELECT * FROM carrinho WHERE id=?`;
        return new Promise((resolve, reject) => {
            this.db.all(SQL, id, (erro, rows) => {
                if(!erro){
                    resolve(rows);
                } else {
                    reject(erro);
                }
            });
        });
    }

    InsertNewItemOnBag(newItemOnBag){
        const SQL = `INSERT INTO carrinho(id, userID, productID, status) VALUES (?,?,?,?)`;
        return new Promise((resolve, reject) => {
            this.db.run(
                SQL,
                [
                    newItemOnBag.id,
                    newItemOnBag.userID,
                    newItemOnBag.productID,
                    newItemOnBag.status
                ],
                (error) => {
                    if(!error){
                        resolve(newItemOnBag);
                    } else {
                        reject(error);
                    }
                }
            );
        });
    }

    ModifyItemOnBag(itemOnCart){
        const SQL = "UPDATE carrinho SET userID=?, productID=?, status=? WHERE id=?";
        return new Promise((resolve, reject)=>{
            this.db.run(
            SQL, 
            [
                itemOnCart.userID, 
                itemOnCart.productID, 
                itemOnCart.status,
                itemOnCart.id
            ],
            (error) => {
                if(!error){
                    resolve(itemOnCart);
                } else {
                    reject(error);
                }
            
            })
        })
    }

    DeleteItemOnBag(id){
        const SQL = `DELETE FROM carrinho WHERE id =?`;
        return new Promise((resolve, reject) => {
            this.db.run(SQL, id, (error)=>{
                if(!error){
                    resolve("Produto deletado com sucesso");
                } else {
                    reject(error);
                }
            })
        })
    }
};

export default CartDAO;