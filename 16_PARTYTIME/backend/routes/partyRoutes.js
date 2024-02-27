const router = require("express").Router();
const jwt = require("jsonwebtoken");
const multer = require("multer");

const Party = require("../models/Party");
const User = require("../models/User");

// define file storage
const diskStorage = require("../helper/file-storage");
const upload = multer({ storage: diskStorage });

// middlewares
const verifyToken = require("../helper/check-token");

// helpers
const getUserByToken = require("../helper/get-user-by-token");

// create new party
router.post(
  "/",
  verifyToken,
  upload.fields([{ name: "photos" }]),
  async (req, res) => {
    // req data
    const { title, description, party_date } = req.body;

    let files = [];

    if (req.files) {
      files = req.files.photos;
    }

    // validations
    if (!title || title === "null") {
      res
        .status(400)
        .json({ error: "É necessário preencher o título da festa!" });
      return;
    }

    if (!description || description === "null") {
      res
        .status(400)
        .json({ error: "É necessário preencher a descrição da festa!" });
      return;
    }

    if (!party_date || party_date === "null") {
      res
        .status(400)
        .json({ error: "É necessário preencher a data da festa!" });
      return;
    }

    // verify user
    const token = req.header("auth-token");

    const userByToken = await getUserByToken(token);

    const userId = userByToken._id.toString();

    try {
      const user = await User.findOne({ _id: userId });

      // create photos array with image path
      let photos = [];

      if (files && files.length > 0) {
        files.forEach((photo, i) => {
          photos[i] = photo.path;
        });
      }

      const party = new Party({
        title: title,
        description: description,
        partyDate: party_date,
        photos: photos,
        privacy: req.body.privacy,
        userId: user._id.toString(),
      });

      try {
        const newParty = await party.save();
        return res.status(201).json({
          error: null,
          message: "Evento criado com sucesso!",
          data: newParty,
        });
      } catch (error) {
        return res.status(400).json({ error });
      }
    } catch (err) {
      return res.status(400).json({ error: "Acesso negado." });
    }
  }
);

// get all public parties
router.get("/all", async (req, res) => {
  try {
    const parties = await Party.find({ privacy: false }).sort([["_id", -1]]);
    return res.status(200).json({ error: null, parties: parties });
  } catch (error) {
    return res.status(400).json({ error });
  }
});

// get all user parties
router.get("/userparties", verifyToken, async (req, res) => {
  try {
    const token = req.header("auth-token");

    const user = await getUserByToken(token);

    const userId = user._id.toString();

    try {
      const userParties = await Party.find({ userId: userId });

      return res.status(200).json({ error: null, parties: userParties });
    } catch (error) {
      return res.status(400).json({ error });
    }
  } catch (error) {
    return res.status(400).json({ error });
  }
});

// get user party
router.get("/userparty/:id", verifyToken, async (req, res) => {
  try {
    const token = req.header("auth-token");

    const user = await getUserByToken(token);

    const userId = user._id.toString();
    const partyId = req.params.id;

    const party = await Party.findOne({ _id: partyId, userId: userId });

    if (!party) {
      return res.status(400).json({ error: "Acesso negado" });
    }

    return res.status(200).json({ error: null, party: party });
  } catch (error) {
    return res.status(400).json({ error });
  }
});

// get party (party or private)
router.get("/:id", async (req, res) => {
  try {
    // find party
    const id = req.params.id;

    const party = await Party.findOne({ _id: id });

    // public party
    if (party.privacy === false) {
      return res.json({ error: null, party: party });

      // private party
    } else {
      const token = req.header("auth-token");

      const user = await getUserByToken(token);

      const userId = user._id.toString();
      const partyUserId = party.userId.toString();

      // check if user id is equal to party user id
      if (userId == partyUserId) {
        return res.json({ error: null, party: party });
      } else {
        return res.status(400).json({ error: "Evento não encontrado!" });
      }
    }
  } catch (err) {
    return res.status(400).json({ error: "Evento não encontrado!" });
  }
});

// delete a party
router.delete("/", verifyToken, async (req, res) => {
  const token = req.header("auth-token");
  const user = await getUserByToken(token);
  const partyId = req.body.id;
  const userId = user._id.toString();

  if (!partyId) {
    return res
      .status(400)
      .json({ error: "Ocorreu algum erro, tente novamente mais tarde!" });
  }

  const party = await Party.findOne({ _id: partyId });

  if (!party) {
    return res
      .status(400)
      .json({ error: "Evento não encontrado ou inexistente!" });
  }

  if (party.userId != userId) {
    return res
      .status(400)
      .json({ error: "Ocorreu algum erro, tente novamente mais tarde!" });
  }

  try {
    await Party.deleteOne({ _id: partyId, userId: userId });
    res.json({ error: null, message: "Evento removido com sucesso!" });
  } catch (error) {
    res.status(400).json({ error: "Acesso negado!" });
  }
});

// update a party
router.patch(
  "/",
  verifyToken,
  upload.fields([{ name: "photos" }]),
  async (req, res) => {
    // req body
    const {
      title,
      description,
      party_date,
      id: partyId,
      user_id: partyUserId,
    } = req.body;

    let files = [];

    if (req.files) {
      files = req.files.photos;
    }

    // validations
    if (!title) {
      return res
        .status(400)
        .json({ error: "É necessário preencher o título da festa!" });
    }

    if (!description) {
      return res
        .status(400)
        .json({ error: "É necessário preencher a descrição da festa!" });
    }

    if (!party_date) {
      return res
        .status(400)
        .json({ error: "É necessário preencher a data da festa!" });
    }

    // verify user
    const token = req.header("auth-token");

    const userByToken = await getUserByToken(token);

    const userId = userByToken._id.toString();

    if (userId != partyUserId) {
      return res.status(400).json({ error: "Acesso negado!" });
    }

    // build party object
    const party = {
      id: partyId,
      title: title,
      description: description,
      partyDate: party_date,
      privacy: req.body.privacy,
      userId: userId,
    };

    // create photos array with image path
    let photos = [];

    if (files && files.length > 0) {
      files.forEach((photo, i) => {
        photos[i] = photo.path;
      });

      party.photos = photos;
    }


    try {
      // returns updated data
      const updatedParty = await Party.findOneAndUpdate(
        { _id: partyId, userId: userId },
        { $set: party },
        { new: true }
      );
      return res.json({
        error: null,
        message: "Evento atualizado com sucesso!",
        data: updatedParty,
      });
    } catch (error) {
      return res.status(400).json({ error });
    }
  }
);

module.exports = router;
