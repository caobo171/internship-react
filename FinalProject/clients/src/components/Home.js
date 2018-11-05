import React from "react";
import { Subscribe } from "unstated";
import postContainer from "../containers/PostContainer";
import auth from "../containers/AuthContainer";
import { Link } from "react-router-dom";
import MDSpinner from "react-md-spinner";

class Home extends React.Component {
  componentDidMount() {
    postContainer.getPostsFromDatabase();
    postContainer.getTags();
  }
  render() {
    return (
      <Subscribe to={[postContainer, auth]}>
        {(
          {
            state: { postsToShow, showType, tags, loading },
            getPostsOnFeed,
            getGlobalPosts,
            setShowType,
            setShowTypeByTag
          },
          { state: { auth } }
        ) => {
          if (!loading) {
            return (
              <div className="home-page">
                <div className="banner">
                  <div className="container">
                    <h1 className="logo-font">SELF Taught</h1>
                    <p>A place to share your knowledge.</p>
                  </div>
                </div>

                <div className="container page">
                  <div className="row">
                    <div className="col-md-9">
                      <div className="feed-toggle">
                        <ul className="nav nav-pills outline-active">
                          <li className="nav-item">
                            <a
                              className={
                                showType == "myfeed"
                                  ? "nav-link active"
                                  : "nav-link"
                              }
                              onClick={() => {
                                console.log(auth._id);
                                console.log("agagag");
                                getPostsOnFeed(auth);
                              }}
                            >
                              Your Feed
                            </a>
                          </li>
                          <li className="nav-item">
                            <a
                              className={
                                showType === "global"
                                  ? "nav-link active"
                                  : "nav-link"
                              }
                              onClick={() => {
                                getGlobalPosts();
                              }}
                            >
                              Global Feed
                            </a>
                          </li>
                          <li className="nav-item">
                            {showType != "global" && showType != "#feed" ? (
                              <a className="nav-link active">#{showType}</a>
                            ) : (
                              ""
                            )}
                          </li>
                        </ul>
                      </div>
                      <div>
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
                            <Link
                              to={`/post/${post._id}`}
                              className="preview-link"
                            >
                              <h1>{post.type}</h1>
                              <p>This is the description for the post.</p>
                              <span>Read more...</span>
                            </Link>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="col-md-3">
                      <div className="sidebar">
                        <p>Popular Tags</p>

                        <div className="tag-list">
                          {tags.map((tag, index) => (
                            <a
                              onClick={() => {
                                setShowTypeByTag(tag);
                                //getPostsByTag();
                              }}
                              key={index}
                              className="tag-pill tag-default"
                            >
                              {tag}
                            </a>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          } else {
            return (
              <div className="spinner">
                <MDSpinner size="100" />;
              </div>
            );
          }
        }}
      </Subscribe>
    );
  }
}

export default Home;
