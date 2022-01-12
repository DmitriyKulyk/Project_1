const add_task_btn = document.getElementById('add_task_btn');
const desk_task_Input = document.getElementById('description_task');
const todos_wrapper = document.querySelector('.todos_wrapper');

let tasks;
!localStorage.tasks ? tasks = [] : tasks = JSON.parse(localStorage.getItem('tasks'))


let todoItemElems = [];

function Task (description) {
    this.description = description;
    this.completed = false;
}

const createTemplate = (task, index) => {
    return `
        <div class="todo_item ${task.completed ? 'checked' : ''}">
            <div class="description">${task.description}</div>
            <div class="buttons">
                <input onclick="completeTask(${index})" class="btn_complete" type="checkbox"${task.completed ? 'checked' : ''}>
                <button onclick="deleteleteTask(${index})" class="btn_delete">Delete</button>
            </div>
        </div>  
    
    `
}

const filterTasks = () => {
    const activeTasks = tasks.length && tasks.filter(item => item.completed == false);
    const completeTask = tasks.length && tasks.filter(item => item.completed == true);
    tasks = [...activeTasks,...completeTask];

}

const fillHtmlList = () => {
 todos_wrapper.innerHTML = "";
 if (tasks.length > 0) {
    filterTasks();
    tasks.forEach((item, index) => {
        todos_wrapper.innerHTML += createTemplate(item, index);
    });
    todoItemElems = document.querySelectorAll('.todo_item');
 }
}

fillHtmlList();

const updateLocal = () => {
    localStorage.setItem ('tasks' , JSON.stringify(tasks))
}

const completeTask = index => {
    tasks[index].completed = !tasks[index].completed;
    if(tasks[index].completed) {
        todoItemElems[index].classList.add('checked');
    } else {
        todoItemElems[index].classList.remove('checked');
    }
    updateLocal();
    fillHtmlList();

}

add_task_btn.addEventListener ('click', () => {
    tasks.push(new Task(desk_task_Input.value));
    updateLocal();
    fillHtmlList();
    desk_task_Input.value = '';
    
})

const deleteleteTask = index => {
    todoItemElems[index].classList.add('delition');
    setTimeout(() => {
        tasks.splice(index, 1);
        updateLocal();
        fillHtmlList(); 
    },500)
    
    
}