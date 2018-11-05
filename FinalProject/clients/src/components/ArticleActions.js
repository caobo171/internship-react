import React from "react";
import { Link } from "react-router-dom";
import { Subscribe } from "unstated";
import postContainer from "../containers/PostContainer";
import auth from "../containers/AuthContainer";

class ArticleActions extends React.Component {
  generateActionPostItem = (
    post,
    auth,
    deleteFollow,
    deleteFavorite,
    addFollow,
    addFavorite,
    deletePost
  ) => {
    if (auth._id) {
      if (auth._id == post.user._id) {
        return (
          <React.Fragment>
            <Link
              to={`/edit/${post._id}`}
              className="btn btn-sm btn-outline-success"
            >
              <i className="ion-edit" />
              &nbsp; Edit Post
            </Link>
            &nbsp;&nbsp;
            <button
              onClick={() => {
                deletePost(post._id, this.props.history);
              }}
              className="btn btn-sm btn-outline-danger"
            >
              <i className="ion-trash-a" />
              &nbsp; Delete Post
            </button>
          </React.Fragment>
        );
      } else {
        return (
          <React.Fragment>
            {auth.followList.indexOf(post.user._id) == -1 ? (
              <button
                className="btn btn-sm btn-outline-secondary"
                onClick={() => {
                  addFollow(post.user._id);
                }}
              >
                <i className="ion-plus-round" />
                &nbsp; Follow {post.user.name}{" "}
              </button>
            ) : (
              <button
                className="btn btn-sm btn-outline-secondary"
                onClick={() => {
                  deleteFollow(post.user._id);
                }}
              >
                <i className="ion-plus-round" />
                &nbsp; Unfollow {post.user.name}{" "}
              </button>
            )}
            &nbsp;&nbsp;
            {auth.favoriteList.indexOf(post._id) == -1 ? (
              <button
                className="btn btn-sm btn-outline-primary"
                onClick={() => {
                  addFavorite(post._id);
                }}
              >
                <i className="ion-heart" />
                &nbsp; Favorite Post{" "}
                <span className="counter">({post.favoriteCount})</span>
              </button>
            ) : (
              <button
                className="btn btn-sm btn-outline-primary"
                onClick={() => {
                  deleteFavorite(post._id);
                }}
              >
                <i className="ion-heart" />
                &nbsp; Unfavorite Post{" "}
                <span className="counter">({post.favoriteCount})</span>
              </button>
            )}
          </React.Fragment>
        );
      }
    }
  };
  render() {
    return (
      <Subscribe to={[postContainer, auth]}>
        {(
          { state: { post }, deletePost },
          {
            state: { auth },
            deleteFollow,
            deleteFavorite,
            addFollow,
            addFavorite
          }
        ) => (
          <React.Fragment>
            {this.generateActionPostItem(
              post,
              auth,
              deleteFollow,
              deleteFavorite,
              addFollow,
              addFavorite,
              deletePost
            )}
          </React.Fragment>
        )}
      </Subscribe>
    );
  }
}

export default ArticleActions;
