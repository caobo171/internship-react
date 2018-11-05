import { Container } from "unstated";
import axios from "axios";

class PostContainer extends Container {
  state = {
    post: {},
    posts: [],
    showType: "global",
    postsToShow: [],
    tags: [],
    loading: false
  };
  addPost = async (data, history) => {
    let resData = await axios.post("http://localhost:5000/api/post/", data);
    if (resData) {
      history.push("/");
    }
  };

  getPostsFromDatabase = async () => {
    this.setState({
      loading: true
    });
    let resData = await axios.get("http://localhost:5000/api/post");
    this.setState({
      posts: resData.data,
      showType: "global",
      postsToShow: resData.data,
      loading: false
    });
  };

  getGlobalPosts = async () => {
    let posts = this.state.posts;
    this.setState({ postsToShow: posts, showType: "global" });
  };
  getMyPosts = async id => {
    let posts = this.state.posts;
    this.setState({
      postsToShow: posts.filter(post => post.user._id === id),
      showType: "myfeed"
    });
  };

  getPostsByTag = async () => {
    let posts = this.state.posts.filter(
      post => post.tagList.indexOf(this.state.showType) !== -1
    );
    this.setState({ postsToShow: posts });
  };

  getPostsOnFeed = async auth => {
    let posts = this.state.posts.filter(
      post => auth.followList.indexOf(post.user._id) != -1
    );
    this.setState({ postsToShow: posts, showType: "#feed" });
  };

  getPostsFavorite = async user => {
    let posts = this.state.posts.filter(
      post => user.favoriteList.indexOf(post._id) != -1
    );
    this.setState({ postsToShow: posts, showType: "#favorite" });
  };

  getPost = async id => {
    console.log(id);
    // let resData = await axios.get(`http://localhost:5000/api/post/${id}`);
    // this.setState({ post: resData.data }, () => {
    //   console.log(this.state);
    // });
    let postIndex = this.state.posts
      .map(post => post._id.toString())
      .indexOf(id);
    this.setState({ post: this.state.posts[postIndex] }, () => {
      console.log(this.state);
    });
  };

  addComment = async (id, data) => {
    console.log(`${id}+${data.content}`);
    let resData = await axios.post(
      `http://localhost:5000/api/post/comments/${id}`,
      data
    );
    this.setState({ post: resData.data }, () => {
      console.log(this.state.post);
    });
  };

  deleteComment = async (idPost, idComment) => {
    console.log(`${idPost}+${idComment}`);
    let resData = await axios.delete(`
      http://localhost:5000/api/post/comments/${idPost}/${idComment}
    `);
    console.log(resData);
    this.setState({ post: resData.data }, () => {
      console.log(this.state.post);
    });
  };

  deletePost = (idPost, history) => {
    console.log(idPost);
    axios.delete(`http://localhost:5000/api/post/${idPost}`).then(post => {
      console.log(post);
      history.push("/");
    });
  };

  editPost = (data, idPost, history) => {
    console.log(data);
    axios
      .postgetTags(`http://localhost:5000/api/post/edit/${idPost}`, data)
      .then(data => history.push(`/post/${idPost}`));
  };

  getTags = async () => {
    let resData = await axios.get(`http://localhost:5000/api/post/tags`);
    console.log(resData.data);
    this.setState({ tags: resData.data });
  };

  setShowTypeByTag = async type => {
    this.setState({ showType: type }, () => {
      console.log(this.state);
      this.getPostsByTag();
    });
  };
  setShowType = async type => {
    this.setState({ showType: type }, () => {
      //
    });
  };
}

let postContainer = new PostContainer();
export default postContainer;
