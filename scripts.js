let allInputs = document.querySelectorAll("input")
let timeInput = document.querySelector("#timeInput")
let taskInput = document.querySelector("#taskInput")
let taskDetailInput = document.querySelector("#taskDetail")
let btnSubmit = document.querySelector("#submit")
let tbody = document.querySelector(".tbody")
let timeError = document.querySelector(".time-error")
let taskError = document.querySelector(".task-error")
let table = document.querySelector(".table")



//#region constructor
class ToDo {
    constructor(time, task, taskDetail) {
        this.time = time;
        this.task = task;
        this.taskDetail = taskDetail;
    }

    addToDoList = () => {
        tbody.innerHTML += `
                     <tr>
                        <td >${this.time}</td>
                        <td class="task-column">
                        ${this.task}
                        <div class="taskStat">
                        <input class="checkbox" type="checkbox"/>
                        <i class="fa-solid fa-trash deleteIcon"></i>
                        <i class="fa-solid fa-caret-down dropdown"></i>
                        <div/>
                        </td>        
                    </tr>            
                    <div class="taskDetail closed"><div/>                
                    `
    }
    removeToDoList = (deleteIcon) => {
        if (deleteIcon.classList.contains("deleteIcon")) {
            deleteIcon.parentElement.parentElement.parentElement.nextElementSibling.remove()
            deleteIcon.parentElement.parentElement.parentElement.remove()
        }
    }
    checkedTask = (checkbox) => {
        let taskColumn = checkbox.closest("td.task-column")
        taskColumn.classList.toggle("checkedTask")

    }
    addTaskDetail = () => {
        let parentOfDetailDiv = tbody.lastElementChild;
        parentOfDetailDiv.textContent = `${this.taskDetail}`;
        parentOfDetailDiv.classList.add("closed");
        if (this.taskDetail === "") {
            parentOfDetailDiv.textContent = "Görev detayı yok."
        }
        localStorage.setItem("taskDetail", this.taskDetail)
    }
}

//#endregion


let user = new ToDo()


btnSubmit.addEventListener("click", (e) => {
    e.preventDefault();
    user.time = timeInput.value;
    user.task = taskInput.value;
    user.taskDetail = taskDetailInput.value;
    taskInput.value = "";
    timeInput.value = "";
    taskDetailInput.value = "";
    if (user.task === "" || user.time === "") {
        console.log("görev kısmı boş kalamaz doldurulmalı")
    }
    else {
        user.addToDoList();
        user.addTaskDetail();
    }
})


table.addEventListener("click", (e) => {
    user.removeToDoList(e.target)
})

table.addEventListener("mouseover", (e) => {
    if (e.target.classList.contains("deleteIcon")) {
        e.target.classList.add("fa-bounce");
    }
});

table.addEventListener("mouseout", (e) => {
    if (e.target.classList.contains("deleteIcon")) {
        e.target.classList.remove("fa-bounce");
    }
});

table.addEventListener("click", (e) => {
    if (e.target.classList.contains("checkbox")) {
        let checkbox = e.target;
        user.checkedTask(checkbox)
    }
})

table.addEventListener("click", (e) => {
    if (e.target.classList.contains("dropdown")) {
        e.target.parentElement.parentElement.parentElement.nextElementSibling.classList.toggle("closed")
    }
})
const maxCharacters = 34;
allInputs.forEach(input => {
    input.addEventListener("keydown", (e) => {
        if (e.target.value.length > maxCharacters && e.key.length === 1) {
            e.preventDefault()
        }
    })
})

//TO DO :localStorage