const mongoose = require("mongoose");
require("dotenv").config();
const mongodb_online = process.env.MONGO_ATLAS_URI;
const mongodb_offline = process.env.MONGO_LOCAL;

async function conectionMongo() {
  const mongoDB = mongodb_online || mongodb_offline;
  mongoose.set("strictQuery", true);
  try {
    await mongoose.connect(mongoDB, {});
    console.log("Conectado a la base de datos : "+ mongoDB);
  } catch (error) {
    console.log("Error" + error);
  }
};

module.exports={
  mongoose,
  conectionMongo
}