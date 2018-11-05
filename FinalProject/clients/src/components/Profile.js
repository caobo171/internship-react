import React from "react";
import { Subscribe } from "unstated";
import { Link } from "react-router-dom";
import userContainer from "../containers/UserContainer";
import postContainer from "../containers/PostContainer";
import auth from "../containers/AuthContainer";

class Profile extends React.Component {
  generateActionItem = (user, auth, addFollow, deleteFollow) => {
    if (auth._id) {
      if (user._id == auth._id) {
        return (
          <Link
            to={"/settings"}
            className="btn btn-sm btn-outline-secondary action-btn"
          >
            <i className="ion-edit" />
            &nbsp; Settings
          </Link>
        );
      } else {
        if (auth.followList.indexOf(user._id) == -1) {
          return (
            <button
              onClick={() => addFollow(user._id)}
              className="btn btn-sm btn-outline-secondary action-btn"
            >
              <i className="ion-plus-round" />
              &nbsp; Follow {user.name}
            </button>
          );
        } else {
          return (
            <button
              onClick={() => deleteFollow(user._id)}
              className="btn btn-sm btn-outline-secondary action-btn"
            >
              <i className="ion-plus-round" />
              &nbsp; Unfollow {user.name}
            </button>
          );
        }
      }
    } else {
      return "";
    }
  };
  componentDidMount() {
    userContainer.getUser(this.props.match.params.id);
    postContainer.getMyPosts(this.props.match.params.id);
  }
  render() {
    return (
      <Subscribe to={[userContainer, postContainer, auth]}>
        {(
          { state: { user } },
          { state: { postsToShow, showType }, getMyPosts, getPostsFavorite },
          { state: { auth }, addFollow, deleteFollow }
        ) => (
          <div className="profile-page">
            <div className="user-info">
              <div className="container">
                <div className="row">
                  <div className="col-xs-12 col-md-10 offset-md-1">
                    <img src={user.imgUrl} className="user-img" />
                    <h4>{user.name}</h4>
                    <p>
                      {user.about ? user.about : "Nothing to tell about me"}
                    </p>
                    {this.generateActionItem(
                      user,
                      auth,
                      addFollow,
                      deleteFollow
                    )}
                  </div>
                </div>
              </div>
            </div>

            <div className="container">
              <div className="row">
                <div className="col-xs-12 col-md-10 offset-md-1">
                  <div className="articles-toggle">
                    <ul className="nav nav-pills outline-active">
                      <li className="nav-item">
                        <a
                          className={
                            showType == "myfeed"
                              ? "nav-link active"
                              : "nav-link"
                          }
                          onClick={() => {
                            getMyPosts(user._id);
                          }}
                        >
                          My Articles
                        </a>
                      </li>
                      <li className="nav-item">
                        <a
                          className={
                            showType == "#favorite"
                              ? "nav-link active"
                              : "nav-link"
                          }
                          onClick={() => {
                            getPostsFavorite(user);
                          }}
                        >
                          Favorited Articles
                        </a>
                      </li>
                    </ul>
                  </div>
                  <React.Fragment>
                    {postsToShow.map(post => (
                      <div className="article-preview" key={post._id}>
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
                          <button className="btn btn-outline-primary btn-sm pull-xs-right">
                            <i className="ion-heart" /> {post.favoriteCount}
                          </button>
                        </div>
                        <Link to={`/post/${post._id}`} className="preview-link">
                          <h1>{post.type}</h1>
                          <p>This is the description for the post.</p>
                          <span>Read more...</span>
                        </Link>
                      </div>
                    ))}
                  </React.Fragment>
                </div>
              </div>
            </div>
          </div>
        )}
      </Subscribe>
    );
  }
}

export default Profile;
