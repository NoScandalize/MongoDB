const router = require("express").Router();
const bcrypt = require("bcrypt");

const User = require("../models/User");

// middlewares
const verifyToken = require("../helper/check-token");

// helpers
const getUserByToken = require("../helper/get-user-by-token");

// get an user
router.get("/:id", verifyToken, async (req, res) => {
  const id = req.params.id;
  // verify user
  try {
    const user = await User.find({ _id: id }, { password: 0 });

    return res.status(301).json({ error: null, user });
  } catch (err) {
    return res.status(400).json({ error: "O usuário não existe!" });
  }
});

// update an user
router.patch("/", verifyToken, async (req, res) => {
  const token = req.header("auth-token");
  const user = await getUserByToken(token);
  const { id, name, email, password, confirmPassword } = req.body;

  const userId = user._id.toString();

  // check if user id is equal token user id
  if (userId != id) {
    return res.status(401).json({ error: "Acesso negado!" });
  }

  // create an user object
  const updateData = {
    name: name,
    email: email,
  };

  // check if passwords match
  if (password !== confirmPassword) {
    return res.status(401).json({ error: "As senha precisam ser iguais!" });

    // change password
  } else if (password === confirmPassword && password != null) {
    // creating password
    const salt = await bcrypt.genSalt(12);
    const passwordHash = await bcrypt.hash(password, salt);

    // add passwrod to data
    updateData.password = passwordHash;
  }

  try {
    // returns update data
    const updatedUser = await User.findOneAndUpdate(
      { _id: userId },
      { $set: updateData },
      { new: true }
    );

    res
      .status(301)
      .json({
        error: null,
        message: "Usuário atualizado com sucesso!",
        data: updatedUser,
      });
  } catch (err) {
    return res.status(400).json({ err });
  }
});

module.exports = router;
