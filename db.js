function connect () {
  var MongoClient = require('mongodb').MongoClient;
  var url = "mongodb://dbUser:dbPassword1@ds249623.mlab.com:49623/getir-case-study";
  const client = new MongoClient(url, { useNewUrlParser: true,   useUnifiedTopology: true });
  client.connect(function(err, db) {
    if (err) throw err;
    var dbo = db.db("getir-case-study");
    dbo.collection("records").find({createdAt:{$gte: new Date(2016,1,26), $lte: new Date(2018,2,2)}}).limit(5).toArray(function(err, result) {
      if (err) throw err;
      db.close();
    });
  });
}

function query(startDate, endDate, minCount, maxCount, callback) {
  const MongoClient = require('mongodb').MongoClient;
  const url = "mongodb://dbUser:dbPassword1@ds249623.mlab.com:49623/getir-case-study";
  const client = new MongoClient(url, { useNewUrlParser: true,   useUnifiedTopology: true });

  client.connect(function(err, db) {
    if (err) throw err;
    const dbo = db.db("getir-case-study");
    dbo.collection("records").aggregate([
      {$unwind: "$counts"},
      {
        $group: {
          _id: "$key",
          key: { $last: "$key" },
          createdAt: {$last: "$createdAt"},
          totaCount: {$sum: "$counts"},
        }
      },
      {
        $match: {
          $and: [
            {"totaCount": {$gte: minCount, $lte: maxCount}},
            {"createdAt": {$gte: new Date(startDate + "T00:00:00.000Z")}},
            {"createdAt": {$lte: new Date(endDate + "T00:00:00.000Z")}}]
        }
      },
      { $project : { "_id" : 0 } }
    ]).toArray(function (err, result) {
      if (err) {
        callback(err) ;
      } else {
        callback(result);
      }
      db.close();
    });
  });
}

module.exports ={
  connect,query
}
