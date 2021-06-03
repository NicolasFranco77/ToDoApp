// Elements

const clear = document.querySelector(".clear");
const dateElement = document.getElementById("date");
const list = document.getElementById("list");
const input = document.getElementById("input");

// Classes Names
const CHECK = "fa-check-circle";
const UNCHECK = "fa-circle-thin";
const LINE_THROUGH = "lineThrough";

//Variables
let LIST, id;

// Get item from localstorage
let data = localStorage.getItem("TODO");

// Check if data is not empty
if (data) {
  LIST = JSON.parse(data);
  id = LIST.length; // Set the id to the last one in the list
  loadList(LIST); // Load the list to the user interface
} else {
  // If data isn't empty
  LIST = [];
  id = 0;
}

// Load items to the users's interface
function loadList(array) {
  array.forEach(function (item) {
    addToDo(item.name, item.id, item.done, item.trash);
  });
}

// Clear the localstorage
clear.addEventListener("click", function () {
  localStorage.clear();
  location.reload();
});

//Show date
const options = { weekday: "long", month: "long", day: "numeric" };
const today = new Date();
dateElement.innerHTML = today.toLocaleDateString("es-AR", options);

// Add to do function
function addToDo(toDo, id, done, trash) {
  if (trash) {
    return;
  }

  const DONE = done ? CHECK : UNCHECK;
  const LINE = done ? LINE_THROUGH : "";

  const item = `
        <li class="item">

            <i class="fa ${DONE} co" job="complete" id="${id}"></i>
            <p class="text ${LINE}">${toDo}</p>
            <i class="fa fa-trash-o de" job="delete" id="${id}"></i>
            </li>
    `;

  const position = "beforeend";

  list.insertAdjacentHTML(position, item);
}

// Add an item to the list when user enter the enter key
document.addEventListener("keyup", function (event) {
  if (event.keyCode == 13) {
    const toDo = input.value;

    // If the input isn's empty
    if (toDo) {
      addToDo(toDo);
      LIST.push({
        name: toDo,
        id: id,
        done: false,
        trash: false,
      });
      // Add item to localstorage
      id++;
      localStorage.setItem("TODO", JSON.stringify(LIST));
    }
    input.value = "";
  }
});

// Complete to do
function completeToDo(element) {
  element.classList.toggle(CHECK);
  element.classList.toggle(UNCHECK);
  element.parentNode.querySelector(".text").classList.toggle(LINE_THROUGH);

  LIST[element.id].done = LIST[element.id].done ? false : true;
}

// Remove to do
function removeToDo(element) {
  element.parentNode.parentNode.removeChild(element.parentNode);

  LIST[element.id].trash = true;
}

// Target the items created dynamically
list.addEventListener("click", function (event) {
  const element = event.target; //return the clicked element inside list
  const elementJob = element.attributes.job.value; // return complete or deleted

  if (elementJob == "complete") {
    completeToDo(element);
  } else if (elementJob == "delete") {
    removeToDo(element);
  }
  // Add item to localstorage
  localStorage.setItem("TODO", JSON.stringify(LIST));
});
