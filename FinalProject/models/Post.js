const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const PostSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "user"
  },
  favoriteCount: {
    type: Number,
    default: 0
  },
  type: {
    type: String,
    required: true
  },
  title: {
    type: String,
    required: true
  },
  content: {
    type: String,
    required: true
  },
  tagList: [{ type: String }],
  comments: [
    {
      user: {
        type: Schema.Types.ObjectId,
        ref: "user"
      },
      content: {
        type: String,
        required: true
      },
      name: {
        type: String,
        required: true
      },
      imgUrl: {
        type: String,
        required: true
      }
    }
  ]
});

mongoose.model("post", PostSchema);
