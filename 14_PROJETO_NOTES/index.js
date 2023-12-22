const dbUser = process.env.DB_USER;
const dbPass = process.env.DB_PASS;

// imports
const express = require('express');
const exphbs = require('express-handlebars');
const bodyParser = require('body-parser');

// config
const app = express();
const port = 8000;

// db
const db = require('./db/connection')

// template engine
app.engine('handlebars', exphbs.engine());
app.set('view engine', 'handlebars');

// static
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }))

// routes import
const notesRoutes = require('./routes/notes');

// routes
app.get("/", async (req, res) => {

        const notes = await db.getDb().db().collection('notes').find({}).toArray();
        
        res.render('home', {notes});

})

app.use('/notes', notesRoutes)

db.initDb((err, db) => {
    
    if(err) {
        console.log(`\x1b[31mA conexão com o banco foi recusada! Error: ${err}`)
        console.log(dbUser)
    } else {
        console.clear();
        console.log(`\x1b[32mConexão com o banco de dados efetuada!`)
        app.listen(port, () => {
            console.log(`\x1b[32mAplicação iniciada com sucesso! Port: \x1b[35m${port}`)
        })

    }
})

