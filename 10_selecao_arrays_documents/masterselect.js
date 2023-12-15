db.pessoas.insertMany([
    {
        nome: "Douglas",
        caracteristicas: {
            peso: "110kg",
            altura: "1.76m",
            cor_dos_olhos: "pretos",
            idade: 25,
        }
    },
    {
        nome: "Aline",
        caracteristicas: {
            peso: "70kg",
            altura: "1.60m",
            cor_dos_olhos: "castanhos",
            idade: 25,
        }
    },
    {
        nome: "Camila",
        caracteristicas: {
            peso: "72kg",
            altura: "1.58m",
            cor_dos_olhos: "castanhos",
            idade: 28,
        }
    },
    {
        nome: "Carla",
        caracteristicas: {
            peso: "68kg",
            altura: "1.62m",
            cor_dos_olhos: "verdes",
            idade: 26,
        }
    }
])

db.pessoas.find({ "caracteristicas.cor_dos_olhos": "castanhos" })

// Operadores
db.pessoas.find({ "caracteristicas.idade": { $gt: 26 } })
db.pessoas.find({ "caracteristicas.idade": { $lt: 26 } })

// Elementos em Array
db.alunos.insertMany([
    {
        nome: "Douglas",
        matematica: [8, 7, 10, 8]
    },
    {
        nome: "Aline",
        matematica: [8, 8, 9, 7]
    },
    {
        nome: "Camila",
        matematica: [6, 4, 10, 9]
    },
])

db.alunos.find({ matematica: 6 })
db.alunos.find({ matematica: 10 })

// Ordem e valores exatos
db.alunos.find({ matematica: [8, 8, 9, 7] })

// Seleção de array de documents
db.produtos.insertMany([ 
    { 
        nome: "Camisa", 
        variacoes: [ 
            { 
                cor: "Vermelha", 
                tamanho: "P", 
                qtd: 10 
            }, 
            { 
                cor: "Azul", 
                tamanho: "M", 
                qtd: 25 }, 
            { 
                cor: "Verde", 
                tamanho: "G", 
                qtd: 48 
            }, 
        ] 
    }, 
    { 
        nome: "Calça", 
        variacoes: [ 
            { 
                cor: "Preta", 
                tamanho: 42, 
                qtd: 12 
            }, 
            { 
                cor: "Cinza", 
                tamanho: 46, 
                qtd: 20 
            }, 
            { 
                cor: "Azul", 
                tamanho: 46, 
                qtd: 32 
            } 
        ] 
    } 
])

db.produtos.find({ "variacoes": { 
    cor: "Verde",  
    tamanho: "G", 
    qtd: 48 
} })

db.produtos.find({ "variacoes": { 
    cor: "Cinza",  
    tamanho: 46, 
    qtd: 20 
} })

// Tarefa #05

// 1
db.alunos.updateOne({nome: "Douglas"}, {$set: {quimica: [ 9, 10, 8, 9 ]}})
db.alunos.updateOne({nome: "Aline"}, {$set: {quimica: [ 10, 10, 9, 9 ]}})
db.alunos.updateOne({nome: "Camila"}, {$set: {quimica: [ 8, 9, 8, 9 ]}})

// 2
db.alunos.insertOne({ nome: "Josias", matematica: [8, 9], quimica: [10, 9] })

// 3
db.alunos.find({ quimica: 10 })

// 4
db.alunos.find({ quimica: { $size: 2 } })

// 5
db.alunos.updateOne({ quimica: { $size: 2 } }, { $set: { falta_provas: true } })
db.alunos.find({}).pretty()