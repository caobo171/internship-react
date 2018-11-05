import React from "react";
import { Link } from "react-router-dom";
import postContainer from "../containers/PostContainer";
import auth from "../containers/AuthContainer";
import ArticleActions from "./ArticleActions";
import { Subscribe } from "unstated";

class Article extends React.Component {
  contentInput = React.createRef();
  handleClick = addComment => () => {
    console.log("click");
    let content = this.contentInput.current.value;
    if (content.length > 5) {
      addComment(this.props.match.params.id, { content: content });
    }
  };
  componentDidMount() {
    postContainer.getPost(this.props.match.params.id);
  }
  render() {
    return (
      <Subscribe to={[postContainer, auth]}>
        {(
          { state: { post }, addComment, deleteComment },
          {
            state: { auth },
            deleteFollow,
            deleteFavorite,
            addFollow,
            addFavorite
          }
        ) => {
          if (post.user) {
            console.log(post);
            return (
              <div className="article-page">
                <div className="banner">
                  <div className="container">
                    <h1>{post.title}</h1>

                    <div className="article-meta">
                      <Link to={`/profile/${post.user._id}`}>
                        <img src={post.user.imgUrl} />
                      </Link>
                      <div className="info">
                        <Link
                          to={`/profile/${post.user._id}`}
                          className="author"
                        >
                          {post.user.name}
                        </Link>
                        <span className="date">January 20th</span>
                      </div>
                      <ArticleActions />
                    </div>
                  </div>
                </div>

                <div className="container page">
                  <div className="row article-content">
                    <div className="col-md-12">
                      <h2 id="introducing-ionic">{post.type}</h2>
                      <p>{post.content}</p>
                    </div>
                  </div>

                  <hr />

                  <div className="article-actions">
                    <div className="article-meta">
                      <a href="profile.html">
                        <img src={post.user.imgUrl} />
                      </a>
                      <div className="info">
                        <Link
                          to={`/profile/${post.user._id}`}
                          className="author"
                        >
                          {post.user.name}
                        </Link>
                        <span className="date">January 20th</span>
                      </div>
                      <ArticleActions />
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-xs-12 col-md-8 offset-md-2">
                      {auth._id ? (
                        <div className="card comment-form">
                          <div className="card-block">
                            <textarea
                              className="form-control"
                              placeholder="Write a comment..."
                              rows="3"
                              ref={this.contentInput}
                            />
                          </div>

                          <div className="card-footer">
                            <img
                              src={auth.imgUrl}
                              className="comment-author-img"
                            />
                            <button
                              className="btn btn-sm btn-primary"
                              onClick={this.handleClick(addComment)}
                            >
                              Post Comment
                            </button>
                          </div>
                        </div>
                      ) : (
                        <Link to={"/login"}> You Have To Login To Comment</Link>
                      )}
                      <div>
                        {post.comments.map(comment => (
                          <div className="card" key={comment._id}>
                            <div className="card-block">
                              <p className="card-text">{comment.content}</p>
                            </div>
                            <div className="card-footer">
                              <Link
                                to={`/profile/${comment.user}`}
                                className="comment-author"
                              >
                                <img
                                  src={comment.imgUrl}
                                  className="comment-author-img"
                                />
                              </Link>
                              &nbsp;
                              <Link
                                to={`/profile/${comment.user}`}
                                className="comment-author"
                              >
                                {comment.name}
                              </Link>
                              <span className="date-posted">Dec 29th</span>
                              <span className="mod-options">
                                <i
                                  className="ion-trash-a"
                                  onClick={() =>
                                    deleteComment(post._id, comment._id)
                                  }
                                />
                              </span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          } else {
            return <p>Loading..</p>;
          }
        }}
      </Subscribe>
    );
  }
}

export default Article;
