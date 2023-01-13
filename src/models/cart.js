import {v4 as uuidv4} from "uuid";

class cart {
    constructor (userID, productID, status){
        this.id = uuidv4(),
        this.userID = userID,
        this.productID = productID,
        this.status = status
    }
}

export default cart; 