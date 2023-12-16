// $bucket

db.books.aggregate([
    {
        $bucket: {
            groupBy: "$pageCount",
            boundaries: [100, 200, 300, 400, 500, 600, 700],
            default: "OTHERS",
            output: {
                "count": {$sum: 1}
            }
        }
    }
]);

// $bucketAuto

db.books.aggregate([
    {
        $bucketAuto: {
            groupBy: "$categories",
            buckets: 3
        }
    }
])

// $collStats

db.books.aggregate([ { $collStats: { queryExecStats: {}, count: {} } } ])

// $sort

db.books.aggregate([
    { $sort: { pageCount: -1 } }
]).pretty()

// $limit

db.books.aggregate([
    { $sort: { pageCount: -1 } },
    { $limit: 3 }
]).pretty()

// $match

db.books.aggregate([
    { $sort: { pageCount: -1 } },
    { $match: { authors: "Gavin King" } },
    { $limit: 3 }
]).pretty();

// $out

db.books.aggregate([
    { $match: { categories: "Java", pageCount: { $gt: 800 } } },
    { $limit: 5 },
    { $out: "bigjavabooks" }
])

// $project

db.books.aggregate([
    { $match: { authors: "Gavin King" } },
    { $sort: { pageCount: -1 } },
    { $limit: 3 },
    { $project: { title: 1, pageCount: 1 } }
]).pretty();

// $sample

db.books.aggregate([
    { $match: { categories: "Java" } },
    { $sort: { pageCount: -1 } },
    { $project: { title: 1, authors: 1 } },
    { $sample: { size: 10 } }
]).pretty()

// $skip

db.books.aggregate([
    { $match: { categories: "Microsoft" } },
    { $sort: { pageCount: -1 } },
    { $project: { title: 1, pageCount: 1 } },
    { $skip: 2 },
    { $limit: 2 },
])

// $unwind

db.books.aggregate([
    { $unwind: "$categories" },
    { $project: { categories: 1 } }
])

// $sortByCount

db.books.aggregate([
    { $unwind: "$categories" },
    { $sortByCount: "$categories" }
])

db.books.aggregate([
    { $unwind: "$authors" },
    { $sortByCount: "$authors" }
])

// $unset

db.books.aggregate([
    { $match: { categories: "Software Engineering" } },
    { $sort: { pageCount: -1 } },
    { $unset: "_id" }
]).pretty()

db.books.aggregate([
    { $match: { categories: "Software Engineering" } },
    { $sort: { pageCount: -1 } },
    { $unset: ["_id", "shortDescription", "longDescription"] }
]).pretty()

// $count

db.books.aggregate([
    { $match: { categories: "Java" } },
    { $count: "Contagem" }
])

db.books.aggregate([
    { $match: { categories: "Java" } },
    { $limit: 5 },
    { $count: "Contagem" }
])

db.books.aggregate([
    { $match: { categories: "Java", pageCount: { $gt: 950 } } },
    { $count: "Contagem" }
])