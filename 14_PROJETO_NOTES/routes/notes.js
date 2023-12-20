const Router = require("express").Router;
const db = require('../db/connection');
const { ObjectId } = require('mongodb');

const router = Router();

// view details note
router.get('/:id', async (req, res) => {

    const id = new ObjectId(req.params.id)

    const note = await db.getDb().db().collection('notes').findOne({_id: id})
    
    res.render('notes/details', {note})

})

// form create notes
router.get('/', (req, res) => {

    res.render('notes/create')

})

// send notes for db
router.post('/', (req, res) => {

    const { title, description } = req.body;

    db.getDb()
    .db()
    .collection('notes')
    .insertOne({ title: title, description: description })


    res.redirect(301, '/')

})

// edit view
router.get('/edit/:id', async (req, res) => {

    const id = new ObjectId(req.params.id);

    const note = await db.getDb().db().collection('notes').findOne({_id: id})

    res.render('notes/edit', { note })

})

// update note from db
router.post('/update', (req, res) => {

    const { title, description, id } = req.body;

    db.getDb().db().collection('notes').updateOne({ _id: new ObjectId(id) }, { $set: { title: title, description: description } })

    res.redirect(301, '/')

})


// delete note from db
router.post('/delete', async (req, res) => {

    const id = new ObjectId(req.body.id);

    await db.getDb()
    .db()
    .collection('notes')
    .deleteOne({_id: id})

    res.redirect(301, '/')

})

module.exports = router;