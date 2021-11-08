// Global variables
let idCount = 0; // ID, increase one for each item
let undoneItems = []; // store nodes of undone todo items
let completedItems = []; // store nodes of completed todo items
let allItems = []; // store nodes of all todo items

let todoList = document.getElementById("todo-list");
let todoInput = document.getElementById("todo-input");
todoInput.addEventListener("keyup", (e) => {
  if (e.key === "Enter"){
    let item = new TodoItem(e.target.value, idCount).liNode;
    allItems.push(item);
    undoneItems.push(item);
    idCount += 1;
    refresh();
    e.target.value = "";
  }
})

// Global function
Array.prototype.remove = function() {
    var what, a = arguments, L = a.length, ax;
    while (L && this.length) {
        what = a[--L];
        while ((ax = this.indexOf(what)) !== -1) {
            this.splice(ax, 1);
        }
    }
    return this;
};

function refresh(itemList = "All"){
  todoList.innerHTML = '';  // clear all todo items

  if (itemList === "Active"){
    list = undoneItems
  } else if (itemList === "Completed"){
    list = completedItems
  } else {
    list = allItems
  }

  if (allItems.length > 0){
    for(let i=0; i<list.length; ++i){
      todoList.appendChild(list[i]); // add all (including new) todo items
    }
    let footer = new Footer(undoneItems.length).footerNode;
    todoList.appendChild(footer)
  }
}


// Classes
class TodoItem {
  constructor(item, id){
    this.node = document.createElement("li");
    this.node.classList.add("todo-app__item");

    let checkDiv = document.createElement("div");
    checkDiv.classList.add("todo-app__checkbox");

    let todoText = document.createElement("h1");
    todoText.id = `h1_${id}`
    todoText.textContent = item

    let cancelImg = document.createElement("img");
    cancelImg.src = "./img/x.png";
    cancelImg.classList.add("todo-app__item-x");
    cancelImg.addEventListener("click", function(){
      let todoItem = document.getElementById(id).parentNode.parentNode;
      allItems.remove(todoItem);
      undoneItems.remove(todoItem);
      completedItems.remove(todoItem);
      refresh();
    })

    let checkbox = document.createElement("input");
    checkbox.id = id;
    checkbox.type = "checkbox";

    let label = document.createElement("label");
    label.htmlFor = id;
    label.addEventListener("click", function(){
      let todoItem = document.getElementById(id).parentNode.parentNode;
      let todoText = document.getElementById(`h1_${id}`);
      if (document.getElementById(id).checked == false) {
        todoText.classList.add("checked");
        undoneItems.remove(todoItem);
        completedItems.push(todoItem);
        refresh();
      } else {
        todoText.classList.remove("checked");
        completedItems.remove(todoItem);
        undoneItems.push(todoItem);
        refresh();
      }
    })

    this.node.appendChild(checkDiv);
    this.node.appendChild(todoText);
    this.node.appendChild(cancelImg);
    checkDiv.appendChild(checkbox);
    checkDiv.appendChild(label);
  }
  get liNode(){
    return this.node;
  }
}

class Footer {
  constructor(total){
    this.node = document.createElement("footer");
    this.node.classList.add("todo-app__footer");
    this.node.id = "todo-footer";

    let totolDiv = document.createElement("div");
    totolDiv.classList.add("todo-app__total");
    totolDiv.innerHTML = `${total} left`;

    let viewDiv = document.createElement("div");
    viewDiv.classList.add("todo-app__view-buttons");

    let cleanDiv = document.createElement("div");
    cleanDiv.classList.add("todo-app__clean");

    let allButton = document.createElement("button");
    allButton.type = "button";
    allButton.name = "all";
    allButton.innerHTML = "All";
    allButton.addEventListener("click",function(){
      refresh("All");
    })

    let activeButton = document.createElement("button");
    activeButton.type = "button";
    activeButton.name = "active";
    activeButton.innerHTML = "Active";
    activeButton.addEventListener("click",function(){
      refresh("Active");
    })

    let completedButton = document.createElement("button");
    completedButton.type = "button";
    completedButton.name = "completed";
    completedButton.innerHTML = "Completed";
    completedButton.addEventListener("click",function(){
      refresh("Completed");
    })

    let cleanButton = document.createElement("button");
    cleanButton.type = "button";
    cleanButton.name = "clean";
    cleanButton.innerHTML = "Clear completed";
    cleanButton.addEventListener("click",function(){
      completedItems = [];
      allItems = undoneItems.slice();
      refresh();
    })

    if (completedItems.length <= 0) {
      cleanButton.style.visibility = "hidden"
    }

    this.node.appendChild(totolDiv);
    this.node.appendChild(viewDiv);
    this.node.appendChild(cleanDiv);
    viewDiv.appendChild(allButton);
    viewDiv.appendChild(activeButton);
    viewDiv.appendChild(completedButton);
    cleanDiv.appendChild(cleanButton);
  }

  get footerNode(){
    return this.node;
  }
}
