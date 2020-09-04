//Selectors
const todoInput = document.querySelector(".todo-input");
const todoButton = document.querySelector(".todo-button");
const todoList = document.querySelector(".todo-list");
const filterOption = document.querySelector(".filter-todo");

//Event Listeners

document.addEventListener("DOMContentLoaded", getTodos);
todoButton.addEventListener('click', addTodo);
todoList.addEventListener("click",deleteCheck);
filterOption.addEventListener("click",filterTodo)

//Functions

function addTodo(event){
    
    event.preventDefault();
    //todo div
    const todoDiv = document.createElement("div");
    todoDiv.classList.add("todo");
    //create LI
    const newTodo = document.createElement('li');
    newTodo.innerText=todoInput.value;
    newTodo.classList.add('todo-item');
    todoDiv.appendChild(newTodo);
    //ADD todo to lacol strorage
    saveLocalTodos(todoInput.value);
    //Check mark button
    const completedButton = document.createElement('button');
    completedButton.innerHTML='<i class="fas fa-check"></i>';
    completedButton.classList.add("complete-btn");
    todoDiv.appendChild(completedButton);
    //Check trash button
    const trashButton = document.createElement("button");
    trashButton.innerHTML='<i class="fas fa-trash"></i>';
    trashButton.classList.add("trash-btn");
    todoDiv.appendChild(trashButton);
    //appened to list
    todoList.appendChild(todoDiv);
    //Clear todo input value
    todoInput.value="";
}

function deleteCheck(e){
    
    const item = e.target;
    //DELETE TODO
    if(item.classList[0] === "trash-btn"){
        const todo = item.parentElement;
        //animation
        todo.classList.add("fall");
        removeLocalTodos(todo);
        todo.addEventListener("transitionend",function(){
            todo.remove();
        });
    }
    //check mark
    if(item.classList[0] === "complete-btn"){
        const todo = item.parentElement;
        todo.classList.toggle("completed");
        //if(!todo.classList.contains("completed")){
            //removeLocalTodos(todo);
            //console.log(todo);
            //saveLocalTodosChacked();
        //}
    }
}

function filterTodo(e){
    const todos=todoList.childNodes;
    todos.forEach(function(todo){
        switch(e.target.value){
            case "all":
                todo.style.display="flex";
                break;
            case "completed":
                if(todo.classList.contains("completed")){
                    todo.style.display="flex";
                }else{
                    todo.style.display="none";
                }
                break;
            case "uncompleted":
                if(!todo.classList.contains("completed")){
                    todo.style.display="flex";
                }else{
                    todo.style.display="none";
                  }
                break;
        }
    })
}

function saveLocalTodos(todo){
    //CHECK
    let todos;
    if(localStorage.getItem("todos")===null){
        todos=[];
    }else{
        todos = JSON.parse(localStorage.getItem("todos"));
    }
    todos.push(todo);
    localStorage.setItem("todos", JSON.stringify(todos));
}

function saveLocalTodosChacked(todo){
    //CHECK
    let todos;
    if(localStorage.getItem("todosCH")===null){
        todos=[];
    }else{
        todos = JSON.parse(localStorage.getItem("todosCH"));
    }
    todos.push(todo);
    localStorage.setItem("todosCH", JSON.stringify(todos));
}

function getTodos(){
    //check
    let todos;
    if(localStorage.getItem("todos")===null){
        todos=[];
    }else{
        todos = JSON.parse(localStorage.getItem("todos"));
    }
    todos.forEach(function(todo){
        //todo div
        const todoDiv = document.createElement("div");
        todoDiv.classList.add("todo");
        //create LI
        const newTodo = document.createElement('li');
        newTodo.innerText=todo;
        newTodo.classList.add('todo-item');
        todoDiv.appendChild(newTodo);
        //Check mark button
        const completedButton = document.createElement('button');
        completedButton.innerHTML='<i class="fas fa-check"></i>';
        completedButton.classList.add("complete-btn");
        todoDiv.appendChild(completedButton);
        //Check trash button
        const trashButton = document.createElement("button");
        trashButton.innerHTML='<i class="fas fa-trash"></i>';
        trashButton.classList.add("trash-btn");
        todoDiv.appendChild(trashButton);
        //appened to list
        todoList.appendChild(todoDiv);
    })
}

function removeLocalTodos(todo){
    //check
    let todos;
    if(localStorage.getItem("todos")===null){
        todos=[];
    }else{
        todos = JSON.parse(localStorage.getItem("todos"));
    }
    const todoIndex = todo.children[0].innerText;
    todos.splice(todos.indexOf(todoIndex), 1); 
    localStorage.setItem("todos", JSON.stringify(todos));
}