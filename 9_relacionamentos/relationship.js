// Embedded documents

db.embedded.insertOne({
    name: "Douglas",
    age: 25,
    address: {
        street: "Rua Alguma Coisa",
        number: "312",
        complement: "Casa"
    }
})

db.embedded.insertOne({
    name: "Aline",
    idade: 27,
    address: {
        home: {
            rua: "Rua Alguma Coisa",
            number: "321",
            complement: "Casa"
        },
        work: {
            rua: "Rua Coisa Alguma",
            number: "123",
            complement: "Edifício"
        }
    }
})

// One to One

db.people.insertOne({
    name: "Douglas",
    age: 25,
    profession: "Developer"
})

db.address.insertOne({
    street: "Rua Alguma Coisa",
    number: "321",
    complement: "Casa",
    people_id: d._id
})

// One to Many

db.people.insertOne({
    name: "Camila",
    age: 25,
    profession: "Gerente"
})

const camila = db.people.findOne({ name: "Camila" })

const camilaId = camila._id

const douglas = db.people.findOne({ name: "Douglas" })

const douglasId = douglas._id

db.shopping.insertMany([
    { products: ["Livro", "Celular"], people_id: douglasId },
    { products: ["Mouse", "Teclado"], people_id: douglasId },
    { products: ["Agenda"], people_id: camilaId },
    { products: ["Cortina", "Travesseiro"], people_id: camilaId }
])

// Manu to Many
db.course.insertMany([
    {name: "PHP avançado"},
    {name: "JavaScript básico"},
    {name: "Banco de dados NoSQL"}
])

const douglas1 = db.people.findOne({ name: "Douglas" })
const aline1 = db.people.findOne({ name: "Aline" })

const php = db.course.findOne({ name: "PHP avançado" })
const js = db.course.findOne({ name: "JavaScript básico" })

db.course_people.insertMany([
    { course_id: php._id, people_id: douglas1._id },
    { course_id: js._id, people_id: douglas1._id },
    { course_id: php._id, people_id: aline1._id },
])

// Todos os alunos que cursam JavaScript

const idsStudents = []

db.course_people.find({ course_id: js._id }).forEach((student) => {
    idsStudents.push(student._id)
})

// $in

db.people.find({ _id: { $in: idsStudents } })

db.course_people.find({ course_id: js._id }).forEach(function(student) {
    idsStudents2.push(student._id)
})