import React from "react";
import { Subscribe } from "unstated";
import postContainer from "../containers/PostContainer";

class EditArticle extends React.Component {
  titleInput = React.createRef();
  typeInput = React.createRef();
  contentInput = React.createRef();
  tagListInput = React.createRef();
  componentDidMount() {
    postContainer.getPost(this.props.match.params.id);
  }
  handleClick = editPost => () => {
    let title = this.titleInput.current.value;
    let type = this.typeInput.current.value;
    let content = this.contentInput.current.value;
    let tagList = this.tagListInput.current.value.replace(/ /g, "").split(",");

    //console.log({ name: name, email: email, password: password });
    editPost(
      {
        title: title,
        type: type,
        content: content,
        tagList: tagList
      },
      this.props.match.params.id,
      this.props.history
    );
  };
  render() {
    return (
      <Subscribe to={[postContainer]}>
        {({ state: { post }, editPost }) => (
          <div className="editor-page">
            <div className="container page">
              <div className="row">
                <div className="col-md-10 offset-md-1 col-xs-12">
                  <fieldset>
                    <fieldset className="form-group">
                      <input
                        type="text"
                        ref={this.titleInput}
                        defaultValue={post.title}
                        className="form-control form-control-lg"
                        placeholder="Article Title"
                      />
                    </fieldset>
                    <fieldset className="form-group">
                      <input
                        type="text"
                        className="form-control"
                        defaultValue={post.type}
                        placeholder="What's this article about?"
                        ref={this.typeInput}
                      />
                    </fieldset>
                    <fieldset className="form-group">
                      <textarea
                        className="form-control"
                        rows="8"
                        placeholder="Write your article (in markdown)"
                        defaultValue={post.content}
                        ref={this.contentInput}
                      />
                    </fieldset>
                    <fieldset className="form-group">
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Enter tags"
                        ref={this.tagListInput}
                      />
                      <div className="tag-list" />
                    </fieldset>
                    <button
                      className="btn btn-lg pull-xs-right btn-primary"
                      type="button"
                      onClick={this.handleClick(editPost)}
                    >
                      Edit
                    </button>
                  </fieldset>
                </div>
              </div>
            </div>
          </div>
        )}
      </Subscribe>
    );
  }
}

export default EditArticle;
