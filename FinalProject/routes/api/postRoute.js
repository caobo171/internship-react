const express = require("express");
const router = express.Router();
const passport = require("passport");
const mongoose = require("mongoose");
const Post = mongoose.model("post");

const authenicate = require("../../configs/auth");

router.post("/", authenicate, async (req, res) => {
  console.log(req.user);
  let post = new Post({
    user: req.user._id,
    type: req.body.type,
    title: req.body.title,
    content: req.body.content,
    tagList: req.body.tagList
  });
  let data = await post.save();
  res.send(data);
});

router.get("/", async (req, res) => {
  Post.find()
    .populate("user", ["name", "imgUrl"])
    .then(posts => {
      //console.log(profiles);
      res.send(posts);
    });
});

router.get("/tags", (req, res) => {
  Post.find()
    .distinct("tagList")
    .then(posts => {
      //console.log(profiles);
      res.send(posts);
    });
});

router.get("/me", authenicate, (req, res) => {
  Post.find({ user: req.user._id })
    .populate("user", ["name", "imgUrl"])
    .then(posts => {
      res.send(posts);
    });
});

router.get("/:id", (req, res) => {
  Post.findById({ _id: req.params.id })
    .populate("user", ["name", "imgUrl"])
    .then(post => res.send(post));
});

router.post("/comments/:id", authenicate, (req, res) => {
  Post.findById({ _id: req.params.id })
    .populate("user", ["name", "imgUrl"])
    .then(post => {
      let comment = {
        user: req.user._id,
        imgUrl: req.user.imgUrl,
        name: req.user.name,
        content: req.body.content
      };
      console.log(post);
      post.comments.unshift(comment);
      console.log(post);
      post.save().then(post => res.send(post));
    });
});

router.delete("/comments/:idPost/:idComment", (req, res) => {
  Post.findById({ _id: req.params.idPost })
    .populate("user", ["name", "imgUrl"])
    .then(post => {
      let removeId = post.comments
        .map(comment => comment._id.toString())
        .indexOf(req.params.idComment);
      post.comments.splice(removeId, 1);
      post.save().then(post => {
        res.send(post);
      });
    });
});
router.delete("/:id", (req, res) => {
  Post.findByIdAndRemove({ _id: req.params.id }).then(post => {
    res.send(post);
  });
});

router.post("/edit/:id", (req, res) => {
  console.log(req.body);
  Post.findOneAndUpdate(
    { _id: req.params.id },
    {
      type: req.body.type,
      title: req.body.title,
      content: req.body.content,
      tagList: req.body.tagList
    }
  ).then(post => res.send(post));
});

module.exports = router;
