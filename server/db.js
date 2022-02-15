const mongoose = require("mongoose");

const mongoDB =
  "mongodb+srv://pran123:pran123@devconnector.oddkc.mongodb.net/algo-blog?retryWrites=true&w=majority";
const connection = mongoose.connect(
  mongoDB,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  () => {
    console.log("Connected to Mongo DB Successfully!!");
  }
);