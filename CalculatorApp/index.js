var operationArray = [];
var operations = ["+", "-", "*", "/"];
var calculator = document.querySelector(".calculator");
var showResult = document.querySelector(".showResult");
var log = document.querySelector(".log");
var result = 0;
var tempArray = "";
var resultArray = "";
var calculate = () => {};
calculator.addEventListener("click", e => {
  if (e.target.className == "number") {
    if (e.target.value == "c") {
      tempArray = "";
      resultArray = "";
      showResult.innerHTML = tempArray;
    } else if (e.target.value == "=") {
      try {
        tempArray = eval(tempArray);
        resultArray += "= " + tempArray;
        li = document.createElement("li");
        li.innerHTML = resultArray;
        log.appendChild(li);
        console.log("blabla");
        resultArray = tempArray;
      } catch (e) {
        alert("Sai lỗi cú pháp ! Mời bạn nhập lại ! ");
      }
    } else {
      tempArray += e.target.value;
      resultArray += e.target.value;
    }
    showResult.innerHTML = tempArray;

    console.log(tempArray);
  }
});
