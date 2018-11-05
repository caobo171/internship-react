import React from "react";

class DropList extends React.Component {
  constructor() {
    super();
    this.state = {
      taskName: ""
    };
  }

  drop = e => {
    e.preventDefault();
    let id = e.dataTransfer.getData("id");
    console.log(document.getElementById(id));
    console.log(document.getElementById(id));
    console.log(e.target);
    try {
      this.props.editTask(id, this.props.title);
    } catch (e) {
      console.log(e);
    }
  };
  allowDrop = e => {
    e.preventDefault();
  };
  onChangeHandle = e => {
    this.setState({ [e.target.name]: e.target.value }, console.log(this.state));
  };
  generateListDrop = () => {
    let dropListElement = [];
    this.props.dropList.forEach((task, i) => {
      //dropListElement.push(<DropTask key={i} task={task} />);
      dropListElement.push(
        <div
          className="card__task"
          id={task.id}
          key={task.id}
          draggable="true"
          data-name={task.name}
          onDragStart={this.drag}
        >
          {task.name}
        </div>
      );
    });
    return dropListElement;
  };

  addDropTask = event => {
    event.preventDefault();
    this.props.addDropTask(this.state.taskName, this.props.title);
  };

  drag = e => {
    e.dataTransfer.setData("id", e.target.id);
    console.log(e.target);
    console.log(e.target.dataset.name);
    // e.dataTransfer.setData("name", this.props.task.name);
    // e.dataTransfer.setData("type", this.props.task.type);
  };

  render() {
    return (
      <div className="card">
        <h3 className="card__title">{this.props.title}</h3>
        <div
          className="drop-area"
          onDrop={this.drop}
          onDragOver={this.allowDrop}
        >
          <div className="card__task" />
          {this.generateListDrop()}
        </div>

        <div className="card__form">
          <input
            type="text"
            name="taskName"
            className="text-input"
            placeholder="title"
            onChange={this.onChangeHandle}
          />
          <a onClick={this.addDropTask} className="btn">
            Add Task...
          </a>
        </div>
      </div>
    );
  }
}

export default DropList;
