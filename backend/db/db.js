const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost:27017/Tasks");
const userschema = mongoose.Schema({
  Task: {
    type: String,
    required: true,
  },
  Priority: {
    type: String,
    required: true,
  },
  Date: {
    type: Date,
    required: true,
  },
});

const Person = mongoose.model("users", userschema);

module.exports = Person;

// const firstUser = new Person({
//   firstname: "seenu", Task: '1', Priority: '1', Date:
//   lastname: "kumar",
//   age: 21,
// });
// firstUser.save().then(() => console.log("user is saved successfully"));

// cmd to start the server
// mongod.exe --dbpath ~/db
