// Access DOM element

var listTask = [];
var btnAdd = document.querySelector(".form__btn");
var taskName = document.querySelector(".form__text-input");
var taskListElement = document.querySelector("#todoList");

//initialize event handler

btnAdd.addEventListener("click", () => {
  let idTask = listTask.length > 0 ? listTask[listTask.length - 1].id + 1 : 0;
  if (taskName.value.length < 3) {
    alert("Bạn hãy nhập lại todoList!");
  } else {
    let name = taskName.value;
    let task = new Task(idTask, name, 1);
    console.log(task);
    listTask.push(task);
    console.log(listTask);
    domUpdate();
  }
});

taskListElement.addEventListener("click", e => {
  if (e.target.type == "checkbox") {
    editElementDone(e);
    // alert("blajglg");
  }
  if (e.target.innerText == "X") {
    if (confirm("Bạn có chắc muốn xóa!")) {
      deleteElement(e);
    }
  }
  if (e.target.className == "part2__select-box") {
    editElementLevel(e);
  }
});
