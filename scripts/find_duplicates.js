// https://www.geeksforgeeks.org/how-to-find-duplicates-in-mongodb/
// On MongoDB Shell:
db["entries"].aggregate([
  {
    $group: {
      _id: "$name",
      count: { $sum: 1 },
      duplicates: { $addToSet: "$_id" }
    }
  },
  {
    $match: {
      count: { $gt: 1 }
    }
  },
  {
    $project: {
      _id: 0,
      name: "$_id",
      duplicates: 1
    }
  }
])
