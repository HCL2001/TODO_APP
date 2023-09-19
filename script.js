const inputBox = document.getElementById("input-text");
const container = document.getElementById("list-container");
// Define a regular expression to match special characters
const specialCharsRegex = /[!@#$%^&*()_+{}\[\]:;<>,.?~\\]/;

//
//  *params : none
//  *return : add Task to list container
//
function addTask() {
  if (inputBox.value === "") {
    alert("The value is must not be empty");
    return;
  }
  // Check if the input contains special characters
  if (specialCharsRegex.test(inputBox.value)) {
    alert("The value must not contain special characters");
    return;
  }
  let li = document.createElement("li");
  li.innerText = inputBox.value;
  container.appendChild(li);
  let span = document.createElement("span");
  span.innerHTML = "\u00d7";
  li.appendChild(span);
  inputBox.value = "";
  saveData();
  return;
}

//
//  *params: a event from keypress on key board
//  *return: execute addTask() function
//
inputBox.addEventListener("keypress", function (event) {
  if (event.key === "Enter") {
    event.preventDefault();
    addTask();
    return;
  }
});

//
//  *params: none
//  *return: will execute command a checked style to li element if press on text or will remove task if list on X icon
//
container.addEventListener(
  "click",
  function (e) {
    if (e.target.tagName === "LI") {
      e.target.classList.toggle("checked");
      saveData();
      return;
    }
    if (e.target.tagName === "SPAN") {
      e.target.parentElement.remove();
      saveData();
      return;
    }
  },
  false
);

//
//  *params: none
//  *return: will savea a list data to localStorage
//
function saveData() {
  localStorage.setItem("data", container.innerHTML);
  return;
}

//
//  *params: none
//  *return: will get item which has name is data from localStorage
//
function showTask() {
  container.innerHTML = localStorage.getItem("data");
  return;
}

showTask();
