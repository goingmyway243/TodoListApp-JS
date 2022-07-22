class Todo {
    constructor(taskName, isDone = false) {
        this.taskName = taskName;
        this.isDone = isDone;
    }
}

const todoContainer = document.getElementById("todo_container");
const addTodoButton = document.getElementById("add_todo_button");
const addTodoInput = document.getElementById("add_todo_input");

const filterAll = document.getElementById("filterAll");

var todoArray = [];
var tmpArray = [];

function addTodo() {
    if (addTodoInput.value == "")
        return;

    let todo = new Todo(addTodoInput.value);
    addTodoInput.value = "";

    filterAll.checked = true;
    turnOffFilter(false);

    todoArray.push(todo);

    displayTodo();
}

function displayTodo() {
    todoContainer.innerHTML = "";

    todoArray.forEach(item => {
        let id = todoArray.indexOf(item);

        let childElement = document.createElement("li");
        childElement.className = "btn btn-outline-secondary form-control todo-text my-2";
        childElement.onclick = function () { toggleDone(id) }

        if (item.isDone) {
            childElement.className = "btn border border-primary form-control todo-text my-2 todo-btn-done";
        }

        let textElement = document.createElement("span");
        textElement.textContent = item.taskName;
        textElement.id = "todo-" + id;

        // ================= Edit Group
        let editInput = document.createElement("input");
        editInput.id = "editInput-" + id;
        editInput.className = "d-none";
        editInput.onclick = function (e) { e.stopPropagation() };

        let confirmEditButton = document.createElement("button");
        confirmEditButton.id = "confirmEdit-" + id;
        confirmEditButton.className = "d-none";
        confirmEditButton.innerText = "Confirm";
        confirmEditButton.onclick = function (e) {
            e.stopPropagation();
            onConfirmEdit(id);
        };

        let cancelEditButton = document.createElement("button");
        cancelEditButton.id = "cancelEdit-" + id;
        cancelEditButton.className = "d-none";
        cancelEditButton.innerText = "Cancel";
        cancelEditButton.onclick = function (e) {
            e.stopPropagation();
            onCancelEdit(id);
        };

        // ========================================================

        let editButton = document.createElement("button");
        editButton.id = "editButton-" + id;
        editButton.className = "btn btn-success todo-btn mx-2";
        editButton.innerText = "Edit"
        editButton.onclick = function (e) // không có function thì hàm sẽ coi như chạy ở bên ngoài chứ không gán cho nút
        {
            e.stopPropagation(); // chặn event của node cha
            onEdit(id);
        };

        let removeButton = document.createElement("button");
        removeButton.id = "removeButton-" + id;
        removeButton.className = "btn btn-danger todo-btn";
        removeButton.innerText = "Remove"
        removeButton.onclick = function (e) {
            e.stopPropagation();
            onDelete(id)
        };

        childElement.appendChild(textElement);

        childElement.appendChild(editInput);
        childElement.appendChild(cancelEditButton);
        childElement.appendChild(confirmEditButton);

        childElement.appendChild(removeButton);
        childElement.appendChild(editButton);

        todoContainer.appendChild(childElement);
    });
}

function toggleDone(id) {
    isDone = !todoArray[id].isDone
    todoArray[id].isDone = isDone;

    displayTodo();
}

function onDelete(id) {
    swal({
        title: 'Are you sure?',
        text: 'Once deleted, this cannot be recover',
        type: "warning",
        showCancelButton: true,
        confirmButtonClass: "btn-danger",
        confirmButtonText: "Yes",
        cancelButtonText: "No",
        closeOnConfirm: false
    },
        function () {
            delete todoArray[id]; // delete operator dùng để xóa phần tử mảng theo index
            displayTodo();
            swal("Deleted!", "Your task has been deleted.", "success");
        });
}

function onEdit(id) {
    showEditMode(true, id);
}

function onConfirmEdit(id) {
    let input = document.getElementById("editInput-" + id);

    if (input.value == "") {
        alert("Task name cannot be empty!");
        return;
    }

    todoArray[id].taskName = input.value;
    displayTodo();
}

function onCancelEdit(id) {
    showEditMode(false, id);
}

function turnOnFilter(isDone) {
    turnOffFilter(false);

    tmpArray = todoArray;

    todoArray = todoArray.filter(function (value, index, arr) {
        return value.isDone == isDone;
    });

    displayTodo();
}

function turnOffFilter(display) {
    if (tmpArray.length > todoArray.length) {
        todoArray = tmpArray;

        if (display)
            displayTodo();
    }
}

function showEditMode(editMode, id) {
    let textNode = document.getElementById("todo-" + id);
    let input = document.getElementById("editInput-" + id);
    let confirmButton = document.getElementById("confirmEdit-" + id);
    let cancelButton = document.getElementById("cancelEdit-" + id);
    let editButton = document.getElementById("editButton-" + id);
    let removeButton = document.getElementById("removeButton-" + id);

    if (editMode) {
        textNode.textContent = "";

        input.className = "border border-secondary px-2 float-left d-inline";
        input.value = todoArray[id].taskName;
        input.focus();

        confirmButton.className = "btn btn-success todo-btn mx-2";
        cancelButton.className = "btn btn-danger todo-btn";

        editButton.className = "d-none";
        removeButton.className = "d-none";
    }
    else {
        textNode.textContent = todoArray[id].taskName;

        input.className = "d-none";

        confirmButton.className = "d-none";
        cancelButton.className = "d-none";

        editButton.className = "btn btn-success todo-btn mx-2";
        removeButton.className = "btn btn-danger todo-btn";
    }
}