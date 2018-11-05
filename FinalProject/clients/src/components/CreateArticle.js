import React from "react";
import { Subscribe } from "unstated";
import postContainer from "../containers/PostContainer";

class CreateArticle extends React.Component {
  titleInput = React.createRef();
  typeInput = React.createRef();
  contentInput = React.createRef();
  tagListInput = React.createRef();
  handleClick = addPost => () => {
    let title = this.titleInput.current.value;
    let type = this.typeInput.current.value;
    let content = this.contentInput.current.value;
    let tagList = this.tagListInput.current.value.replace(/ /g, "").split(",");
    //console.log({ name: name, email: email, password: password });
    addPost(
      {
        title: title,
        type: type,
        content: content,
        tagList: tagList
      },
      this.props.history
    );
  };
  render() {
    return (
      <Subscribe to={[postContainer]}>
        {({ state: { post }, addPost }) => (
          <div className="editor-page">
            <div className="container page">
              <div className="row">
                <div className="col-md-10 offset-md-1 col-xs-12">
                  <fieldset>
                    <fieldset className="form-group">
                      <input
                        type="text"
                        ref={this.titleInput}
                        className="form-control form-control-lg"
                        placeholder="Article Title"
                      />
                    </fieldset>
                    <fieldset className="form-group">
                      <input
                        type="text"
                        className="form-control"
                        placeholder="What's this article about?"
                        ref={this.typeInput}
                      />
                    </fieldset>
                    <fieldset className="form-group">
                      <textarea
                        className="form-control"
                        rows="8"
                        placeholder="Write your article (in markdown)"
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
                      onClick={this.handleClick(addPost)}
                    >
                      Publish Article
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

export default CreateArticle;
