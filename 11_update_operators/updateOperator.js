// Operador $inc
db.blog.insertMany([
    {
      author: "Matheus Battisti",
      postCount: 10,
      likesReceived: 150,
      categories: ["PHP", "JavaScript", "MongoDB"],
      active: true,
      maxPosts: 100
    },
    {
      author: "Jhon Doe",
      postCount: 219,
      likesReceived: 12890,
      categories: ["Java", "C#", "C"],
      active: false,
      maxPosts: 100
    },
    {
      author: "Maria Marin",
      postCount: 8,
      likesReceived: 12,
      categories: ["Linux", "DevOps", "Docker"],
      active: true,
      maxPosts: 100
    },
  ])

db.blog.updateOne({ author: "Matheus Battisti" }, { $inc: { postCount: 2 } })
db.blog.updateOne({ author: "Matheus Battisti" }, { $inc: { postCount: -5 } })

// Operador $min
db.blog.insertOne({ author: "Maicon Santos", postCount: 50, likesReceived: 50 })

db.blog.updateOne({ author: "Maicon Santos" }, { $min: { postCount: 25, likesReceived: 25 } })
db.blog.updateOne({ author: "Maicon Santos" }, { $min: { postCount: 0, likesReceived: 0 } })

// Operador $max
db.blog.updateOne({ author: "Matheus Battisti" }, { $max: { maxPosts: 250 } })

// Operador $mul
db.blog.updateOne({ author: "Matheus Battisti" }, { $mul: { maxPosts: 2 } })

// Operador $rename
db.blog.updateMany({}, { $rename: { author: "author_fullname" } })

// Operador $unset
db.blog.updateMany({}, { $unset: { active: "" } })

// Operador $addToSet
db.blog.updateOne({ author_fullname: "Matheus Battisti" }, { $addToSet: { categories: { $each: ["PHP", "Vue"] } } })

// Operador $pop
db.blog.updateOne({ author_fullname: "Matheus Battisti" }, { $pop: { categories: -1 } })

// Operador $push
db.blog.updateOne({ author_fullname: "Matheus Battisti" }, { $push: { categories: "Linux" } })
db.blog.updateMany({}, { $push : { categories: "Programação" } })

// Operador $push para mais itens
db.blog.updateOne({ author_fullname: "Matheus Battisti" }, { $push: { categories: { $each: [ "HTML", "CSS" ] } } })

// Operador $pullAll
db.blog.updateOne({ author_fullname: "Maria Marin" }, { $pullAll: { categories: ["Linux", "Docker"] } })