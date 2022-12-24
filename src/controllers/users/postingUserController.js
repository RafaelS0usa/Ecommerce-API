const postingUserController = async (req, res) => {
    //db.push(req.body);
    res.send(`Usuario ${req.body.name} foi criado com sucesso`);
};

module.exports = postingUserController;