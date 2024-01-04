const router = require("express").Router();
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');

const User = require("../models/User");

// register an user
router.post('/register', async (req, res) => {

    const { name, email, password, confirmPassword } = req.body;

    // check fo required fields
    if(!name) {
        return res.status(400).json({ message: "O nome é obrigatório!" })
    }

    if(!email) {
        return res.status(400).json({ message: "O email é obrigatório!" })
    }

    if(!password) {
        return res.status(400).json({ message: "A senha é obrigatória!" })
    }

    if(!confirmPassword) {
        return res.status(400).json({ message: "A confirmação de senha é obrigatória!" })
    }

    // check if passwords match
    if(password !== confirmPassword) {
        return res.status(400).json({ message: "As senha precisam ser iguais!" })
    }

    // check if user exists
    const emailExists = await User.findOne({ email: email });

    if(emailExists) {
        return res.status(400).json({ message: "O e-mail já está em uso!" })
    }

    // create password
    const salt = await bcrypt.genSalt(12);
    const passwordHash = await bcrypt.hash(password, salt);

    const user = new User({
        name: name,
        email: email,
        password: passwordHash
    });
    
    try {

        const newUser = await user.save();

        // create token
        const token = jwt.sign(
            // payload
            {
                name: newUser.name,
                id: newUser._id
            },
            "securitykey"
        );

        // return token
        res.json({ error: null, message: "Usuário cadastrado com sucesso!", token: token, userId: newUser._id })

    } catch(err) {
        res.status(400).json({ err })
    }

})

// login an user
router.post("/login", async (req, res) => {

    const { email, password } = req.body;

    // check if user exists
    const user = await User.findOne({ email: email })

    if (!user) {
        return res.status(400).json({ message: "Email ou senha inválidos!" })
    }

    // check if password match
    const checkPassword = await bcrypt.compare(password, user.password)
    
    if (!checkPassword) {
        return res.status(400).json({ message: "Email ou senha inválidos!" })
    }

    // create token
    const token = jwt.sign(
        // payload
        {
            name: user.name,
            id: user._id
        },
        "securitykey"
    );

    // return token
    return res.json({ error: null, message: "Login efetuado com sucesso!", token: token, userId: user._id })

})

module.exports = router;