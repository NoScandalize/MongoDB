const { json } = require('body-parser');
const jwt = require('jsonwebtoken');

// middleware to validate token
const checkToken = (req, res, next) => {

    const token = req.header("auth-token");

    if(!token) {
        return res.status(401).json({ error: "Acesso negado!" })
    }

    try {

        const verified = jwt.verify(token, "securitykey")

        req.user = verified;
        next();

    } catch(err) {

        res.status(400).json({ error: "O token é inválido" })

    }

}

module.exports = checkToken;