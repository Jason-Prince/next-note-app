import mongoose, { connect } from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI
const connection = {};
const dbConnect = async () => {

  if (connection.isConnected) return;

  const db = await connect(MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    bufferCommands: false,
    bufferMaxEntries: 0,
    useFindAndModify: false,
    useCreateIndex: true,
  })

  connection.isConnected = db.connections[0].readyState;
  console.log(connection.isConnected);

}

export default dbConnect;