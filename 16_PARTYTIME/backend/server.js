// modules
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors")

// routes import
const authRouter = require("./routes/authRoutes");
const userRouter = require("./routes/userRoutes");
const partyRouter = require('./routes/partyRoutes');

// middlewares

// config
const dbName = "partytime";
const port = 3000;

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static("public"));

// attach routes
app.use("/api/auth", authRouter);
app.use('/api/user', userRouter);
app.use('/api/party', partyRouter);


// mongodb connection
mongoose.connect(`mongodb://127.0.0.1:27017/${dbName}`)

app.get('/', (req, res) => {
    res.json({ message: "Página principal da aplicação" })
});

app.listen(port, () => {
    console.clear();
    console.log(`Aplicação iniciada com sucesso! Port ${port}`);
})