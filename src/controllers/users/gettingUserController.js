var db = require("../../routes/users.routes")

const gettingUserController = async (req, res) => {
    res.json(db);
};

module.exports = gettingUserController;