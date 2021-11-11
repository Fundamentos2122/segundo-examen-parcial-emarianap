const attr_toggle = "data-toggle";
const attr_target = "data-target";
const attr_dismiss = "data-dismiss";
const class_modal = "modal";
const class_show = "show";
const taskForm = document.forms["taskForm"];
const taskList = document.getElementById("taskList");

getTasks();

document.addEventListener("DOMContentLoaded", function() {
    //Botones que abren un modal   
    let modal_open_buttons = document.querySelectorAll(`[${attr_toggle}='${class_modal}']`) 

    modal_open_buttons.forEach(element => {
        element.addEventListener("click", OpenModal);
    });

    //Botones que cierran un modal    
    let modal_close_buttons = document.querySelectorAll(`[${attr_dismiss}]`) 

    modal_close_buttons.forEach(element => {
        element.addEventListener("click", CloseModal);
    });

});

/**
 * Muestra un modal
 * @param {PointerEvent} e 
 */
function OpenModal(e){
    //Obtener el selector del elemento a mostrar
    let modal_selector = e.target.getAttribute(attr_target);

    //Obtener el elemento del DOM
    let modal = document.querySelector(modal_selector);

    //agregar la clase para mostrar el modal
    modal.classList.add(class_show);
}

/**
 * Cerra un modal
 * @param {PointerEvent} e 
 */
 function CloseModal(e){
    //Obtener el selector del elemento a ocultar
    let modal_selector = e.target.getAttribute(attr_dismiss);

    //Obtener el elemento del DOM
    let modal = document.querySelector(modal_selector);

    //Quitar la clase para mostrar el modal
    modal.classList.remove(class_show);
}


document.getElementById('formTask').addEventListener('submit', saveTask);

function saveTask(e){
    let title = document.getElementById('title').value;
    let description = document.getElementById('description').value;
    let date = document.getElementById('date').value;

    const task = {
        title,
        description,
        date
    };

    //Guarda lista en LocalStorage y verifica si ya existe alguna
    if(localStorage.getItem('tasks') === null){
        let tasks = [];
        tasks.push(task);
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }
    else{
        let tasks = JSON.parse(localStorage.getItem('tasks'));
        tasks.push(task);
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }
    
    getTasks();
    e.preventDefault();

}

function getTasks(){
    let tasks = JSON.parse(localStorage.getItem('tasks'));
    let newTask = document.getElementById('taskList');

    newTask.innerHTML = '';

    for(let i = 0; i < tasks.length; i++){
        let title = tasks[i].title;
        let description = tasks[i].description;
        let date = tasks[i].date;
        
        newTask.innerHTML +=
        `
        <div class="border-top">
            <div class="taskT">
                <h5>${title}</h5>
                <p>${date}</p>
            </div>
            <p>${description}</p>
            
            <div class="row">
                <input type="checkbox" name="complete" id="checked">
                <label for="complete">Completada</label>  
            </div>
        </div>`;

    }
    taskForm.reset();
}

var checkbox = document.getElementById('checked').checked;
checkbox.addEventListener("change", validaCheckbox, false);

function validaCheckbox(){
    var checked = checkbox.checked;
    if(checked){
        alert('check seleccionado');
    }
}


