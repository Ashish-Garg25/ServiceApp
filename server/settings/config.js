import mongoose from "mongoose";
import dotenv from "dotenv";
import AdminJS from "adminjs";
import * as AdminJSMongoose from '@adminjs/mongoose';

dotenv.config();
const MongoURI = process.env.MONGO_URI;

const ConnectToMongo = () => {

  AdminJS.registerAdapter({
    Resource: AdminJSMongoose.Resource,
    Database: AdminJSMongoose.Database,
  })

  mongoose
    .connect(MongoURI)
    .then(() => {
      console.log("MongoDB Connection Successfully!");
    })
    .catch((err) => console.log(`Error ${err}`));
};

export default ConnectToMongo;
