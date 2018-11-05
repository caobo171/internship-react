import React from "react";
import ReactDOM from "react-dom";

class DropTask extends React.Component {
  constructor() {
    super();
  }

  drag = e => {
    e.dataTransfer.setData("id", e.target.id);
    console.log(e.target);
    e.dataTransfer.setData("name", this.props.task.name);
    // e.dataTransfer.setData("type", this.props.task.type);
  };
  render() {
    return (
      <div id={this.props.task.id} draggable="true" onDragStart={this.drag}>
        {this.props.task.name}
      </div>
    );
  }
}

export default DropTask;
