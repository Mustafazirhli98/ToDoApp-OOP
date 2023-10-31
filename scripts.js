let allInputs = document.querySelectorAll("input")
let timeInput = document.querySelector("#timeInput")
let taskInput = document.querySelector("#taskInput")
let taskDetailInput = document.querySelector("#taskDetail")
let btnSubmit = document.querySelector("#submit")
let tbody = document.querySelector(".tbody")
let timeError = document.querySelector(".time-error")
let taskError = document.querySelector(".task-error")
let table = document.querySelector(".table")


let taskList = new Map()


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
    }
    showAlertSuccess = (message, className) => {
        let alert = `
        <div class="alert alert-${className}" role="alert">
            ${message}
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-check-circle" viewBox="0 0 16 16">
            <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
            <path d="M10.97 4.97a.235.235 0 0 0-.02.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-1.071-1.05z"/>
            </svg>
        </div>
        `
        const row = document.querySelector(".row")
        row.insertAdjacentHTML("beforebegin", alert)
        setTimeout(() => {
            document.querySelector(".alert").remove()
        }, 2000)
    }

    showAlertDanger = (message, className) => {
        let alert = `
        <div class="alert alert-${className} " role="alert">
            ${message}
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-x-circle" viewBox="0 0 16 16">
            <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
            <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/>
            </svg>
        </div>
        `
        const row = document.querySelector(".row")
        row.insertAdjacentHTML("beforebegin", alert)
        setTimeout(() => {
            document.querySelector(".alert").remove()
        }, 2000)
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
        user.showAlertDanger("Zaman aralığı ve Görev boş kalamaz", "danger")
    }
    else {
        user.addToDoList();
        user.addTaskDetail();
        user.showAlertSuccess("Görev Eklendi", "success")
    }
    taskList.set("time", user.time)
    taskList.set("task", user.task)
    taskList.set("taskDetail", user.taskDetail)
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
const maxCharacters = 40;
allInputs.forEach(input => {
    input.addEventListener("keydown", (e) => {
        if (e.target.value.length > maxCharacters && e.key.length === 1) {
            e.preventDefault()
        }
    })
})



