function showForm() {
  var test = document.getElementById("second-screen");
  test.style.display = "block";
}

function goBack() {
  var test = document.getElementById("second-screen");
  test.style.display = "none";
}

function closeDeletePopup() {
  var test = document.getElementById("outer-delete-div");
  test.style.display = "none";
}

function showDelete(taskItem) {
  var test = document.getElementById("outer-delete-div");
  test.style.display = "block";

  var confirmation = document.getElementById("confirm-delete-button");
  confirmation.onclick = function () {
    deleteTask(taskItem);
    closeDeletePopup();
  };
}

function deleteTask(taskItem) {
  taskItem.remove();
  let myAudio = document.querySelector("#audio");
  myAudio.play();
  saveData();
}

function addingtask(event) {
  event.preventDefault();
  var taskname = document.getElementById("input-box");
  var description = document.getElementById("description");
  var startdate = document.getElementById("start-date");
  var enddate = document.getElementById("end-date");
  const list = document.getElementById("task-list");
  var message = document.getElementById("message");
  var li = document.createElement("li");
  var prior = document.getElementById("priority");

  if (taskname.value === "") {
    alert("Task name can't be empty");
    return;
  } else if (description.value === "") {
    alert("Description can't be empty");
    return;
  } else if (startdate.value === "") {
    alert("Start date can't be empty");
    return;
  } else if (enddate.value === "") {
    alert("End date can't be empty");
    return;
  } else if (prior.value === "") {
    alert("Please select a priority for your task");
    return;
  }

  if (enddate.value < startdate.value) {
    alert("End date can not be before starting date!");
    return;
  }

  var taskContent = document.createElement("span");

  // creating checkbox
  var checkbox = document.createElement("input");
  checkbox.type = "checkbox";

  taskContent.textContent = `Task: ${taskname.value} - Description: ${description.value} - Start Date: ${startdate.value} - End Date: ${enddate.value} - Priority: ${prior.value}`;

  var taskActions = document.createElement("div");
  taskActions.className = "task-actions";

  var editButton = document.createElement("button");
  editButton.className = "edit";
  editButton.textContent = "Edit";
  editButton.onclick = function () {
    editTask(li, taskContent);
  };

  var deleteButton = document.createElement("button");
  deleteButton.className = "delete";
  deleteButton.textContent = "Delete";
  deleteButton.onclick = function () {
    showDelete(li);
  };

  taskActions.appendChild(editButton);
  taskActions.appendChild(deleteButton);
  li.appendChild(checkbox);
  li.appendChild(taskContent);
  li.appendChild(taskActions);

  if (prior.value === "high") {
    li.classList.add("high-priority");
  } else if (prior.value === "medium") {
    li.classList.add("medium-priority");
  } else if (prior.value === "low") {
    li.classList.add("low-priority");
  }

  list.appendChild(li);

  checkbox.addEventListener("change", function () {
    if (checkbox.checked) {
      taskContent.style.textDecoration = "line-through";
    } else {
      taskContent.style.textDecoration = "none";
    }
  });

  saveData();

  // making every text input box empty again
  taskname.value = "";
  description.value = "";
  startdate.value = "";
  enddate.value = "";
  prior.value = "";
  goBack();
}

function editTask(taskItem, taskContent) {
  var taskParts = taskContent.textContent.split(" - ");
  var taskname = prompt("Edit Task Name", taskParts[0].replace("Task: ", ""));
  var description = prompt(
    "Edit Description",
    taskParts[1].replace("Description: ", "")
  );
  var startdate = prompt(
    "Edit Start Date",
    taskParts[2].replace("Start Date: ", "")
  );
  var enddate = prompt("Edit End Date", taskParts[3].replace("End Date: ", ""));
  var prior = prompt("Edit Priority", taskParts[4].replace("Priority: ", ""));

  if (
    taskname !== null &&
    description !== null &&
    startdate !== null &&
    enddate !== null &&
    prior !== null
  ) {
    if (new Date(enddate) >= new Date(startdate)) {
      taskContent.textContent = `Task: ${taskname} - Description: ${description} - Start Date: ${startdate} - End Date: ${enddate} - Priority: ${prior}`;

      // Remove existing priority classes
      taskItem.classList.remove(
        "high-priority",
        "medium-priority",
        "low-priority"
      );

      // Add new priority class
      if (prior === "high") {
        taskItem.classList.add("high-priority");
      } else if (prior === "medium") {
        taskItem.classList.add("medium-priority");
      } else if (prior === "low") {
        taskItem.classList.add("low-priority");
      }
      saveData();
    } else {
      alert("End date cannot be before start date!");
    }
  }
}

function checkEmptyList() {
  var list = document.getElementById("task-list");
  var message = document.getElementById("message");

  if (list.children.length === 0) {
    message.style.display = "block";
  } else {
    message.style.display = "none";
  }
}

checkEmptyList();

setInterval(checkEmptyList, 1);

function saveData() {
  const list = document.getElementById("task-list");
  localStorage.setItem("data", list.innerHTML);
}

function showTasks() {
  const list = document.getElementById("task-list");
  const data = localStorage.getItem("data");
  if (data) {
    list.innerHTML = data;

    // Reattach everything from local storage back to the variables from our code
    const tasks = list.getElementsByTagName("li");

    for (let i = 0; i < tasks.length; i++) {
      const task = tasks[i];
      const checkbox = task.querySelector("input[type='checkbox']");
      const taskContent = task.querySelector("span");
      const editButton = task.querySelector(".edit");
      const deleteButton = task.querySelector(".delete");

      checkbox.addEventListener("change", function () {
        if (checkbox.checked) {
          taskContent.style.textDecoration = "line-through";
        } else {
          taskContent.style.textDecoration = "none";
        }
      });

      editButton.onclick = function () {
        editTask(task, taskContent);
      };

      deleteButton.onclick = function () {
        deleteTask(task);
      };
    }
  }
}
showTasks();
