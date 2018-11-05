const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  imgUrl: {
    type: String
  },
  about: {
    type: String
  },
  favoriteList: [
    {
      type: String
    }
  ],
  followList: [
    {
      type: String
    }
  ]
});

mongoose.model("user", UserSchema);
