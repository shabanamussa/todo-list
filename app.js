//selectors
const todoInput_input = document.querySelector(".todo-input");
const todoButton_button = document.querySelector(".todo-button");
const todoList_ul = document.querySelector(".todo-list");
const filterOption = document.querySelector('.filter-todo');
//event listeners

document.addEventListener('DOMContentLoaded', getTodos);
todoButton_button.addEventListener('click', addTodo);
todoList_ul.addEventListener('click', deleteCheck);
filterOption.addEventListener('click', filterTodo);

//functions

function addTodo(event) {
        //Prevent form from submitting
    event.preventDefault();
        //todo Div
    const todoDiv = document.createElement('div');
    todoDiv.classList.add('todo');
        //create LI
    const TodoLi = document.createElement('li');
    TodoLi.innerText = todoInput_input.value;
    TodoLi.classList.add('todo-item');
    todoDiv.appendChild(TodoLi)
    // add todo to local storage
    saveLocalTodos(todoInput_input.value)
        //checkmark button
    const completedButton = document.createElement('button');
    completedButton.innerHTML = '<i class="fas fa-check"></i>';
    completedButton.classList.add('completed-btn');
    todoDiv.appendChild(completedButton);
        //trash button
    const trashButton = document.createElement('button');
    trashButton.innerHTML = '<i class="fas fa-trash"></i>';
    trashButton.classList.add('trash-btn');
    todoDiv.appendChild(trashButton);
        //append to list
    todoList_ul.appendChild(todoDiv);
    //clear todo Input value
    todoInput_input.value = "";
}

function deleteCheck(e) {
    const item = e.target;
    if(item.classList[0] === 'trash-btn'){
        const todo = item.parentElement;
        todo.classList.add("fall");
        removeLocalTodos(todo)
        todo.addEventListener('transitionend', function(){
            todo.remove();
        })
    }

    if(item.classList[0] === 'completed-btn'){
        const todo = item.parentElement;
        todo.classList.toggle("completed");
    }
}

function filterTodo(e) {
    const todos = todoList_ul.childNodes;
    todos.forEach(function(todo){
        switch(e.target.value){
            case "all":
                todo.style.display = 'flex';
                break;
            case "completed":
            if(todo.classList.contains('completed')) {
                todo.style.display = 'flex';
            } else {
                todo.style.display = 'none';
            }
                break;
            case "uncompleted":
            if(todo.classList.contains('completed')) {
                todo.style.display = 'none';
            }else {
                todo.style.display = 'flex';
            }
                break;
        }
    });
}

function saveLocalTodos(todo) {
    //check
    let todos;
    if(localStorage.getItem('todos') === null){
        todos = [];
    } else{
        todos = JSON.parse(localStorage.getItem('todos'));
    }
    todos.push(todo);
    localStorage.setItem('todos', JSON.stringify(todos));
}

function getTodos() {
      //check
      let todos;
      if(localStorage.getItem('todos') === null){
          todos = [];
      } else{
          todos = JSON.parse(localStorage.getItem('todos'));
      }
    todos.forEach(function(todo){
    const todoDiv = document.createElement('div');
    todoDiv.classList.add('todo');
        //create LI
    const TodoLi = document.createElement('li');
    TodoLi.innerText = todo;
    TodoLi.classList.add('todo-item');
    todoDiv.appendChild(TodoLi)
        //checkmark button
    const completedButton = document.createElement('button');
    completedButton.innerHTML = '<i class="fas fa-check"></i>';
    completedButton.classList.add('completed-btn');
    todoDiv.appendChild(completedButton);
        //trash button
    const trashButton = document.createElement('button');
    trashButton.innerHTML = '<i class="fas fa-trash"></i>';
    trashButton.classList.add('trash-btn');
    todoDiv.appendChild(trashButton);
        //append to list
    todoList_ul.appendChild(todoDiv);
    })
}

function removeLocalTodos(todo){
      //check
      let todos;
      if(localStorage.getItem('todos') === null){
          todos = [];
      } else{
          todos = JSON.parse(localStorage.getItem('todos'));
      }
    const todoIndex = todo.children[0].innerText;
    todos.splice(todos.indexOf(todoIndex), 1)
    localStorage.setItem("todos", JSON.stringify(todos));
}