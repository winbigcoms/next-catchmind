const { MongoClient } = require("mongodb");

require("dotenv").config();

const uri = process.env.mongo_uri;

const mongoClient = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

module.exports = mongoClient;
