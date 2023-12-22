// MongoDB Connection
const mongoose = require("mongoose");

mongoose.connect("mongodb://127.0.0.1:27017/test");

const db = mongoose.connection;

db.on("error", console.error.bind(console, "\x1b[31mconnection error:"));

db.once("open", function () {
  console.log("\x1b[32mConnection to DB successful");
});

// Schema create
const personSchema = new mongoose.Schema({
  name: String,
  age: Number,
  profession: String,
});

// Model create
const Person = mongoose.model("Person", personSchema);

const douglas = new Person({
  name: "Douglas",
  age: 25,
  profession: "Developer",
});

// data insert
// douglas.save((err) => {
//     if(err) {
//         console.log(err
//     }
// })

// data find
// async function getPerson() {
//     const person = await Person.findOne({ name: "Douglas" }).exec()
//     console.log(person)
// }

// getPerson()


// // insert many data
// Person.insertMany([
//     {name: "Aline", age: 27, profession: "Developer"},
//     {name: "Camila", age: 30, profession: "Developer"}
// ])

// data delete
// async function getPerson(name) {
//     const person = await Person.find({name: name}).exec()
//     if(person.length === 0) {
//         console.log("This person not found!")
//     } else {
//         console.log(person)
//     }
// }

// getPerson("Camila")

// Person.deleteOne({ name: "Camila" }).exec();

// data update
// Person.updateOne({ name: "Aline" }, {profession: "Software Enginner"}).exec()

// getPerson('Aline')

// where
async function getPersonNameAndAge(name, age) {

    const person = await Person.where('age').gte(age).where("name", name).exec();

    if(person.length === 0) {
        console.log('This person not found!')
    } else {
        console.log(person)
    }
}

getPersonNameAndAge("Aline", 27)