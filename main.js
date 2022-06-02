let taskInput = document.getElementById("input-task");
let addBtn = document.getElementById("add-btn");
let tabs = document.querySelectorAll(".tabs div");
let taskList = [];
let mode = "all";
let filterList = [];

//추가 버튼을 클릭하거나 엔터를 눌렀을 경우 할일추가 가능
addBtn.addEventListener("mousedown", addTask);
taskInput.addEventListener("keyup", function (event) {
  if (event.keyCode === 13) {
    addTask(event);
  }
});

for (let i = 1; i < tabs.length; i++) {
  tabs[i].addEventListener("click", function (event) {
    filter(event);
  });
}

//할일을 추가 하는 함수
function addTask() {
  if (taskInput.value == "") {
    alert("할일을 입력해주세요");
    return;
  }

  let task = {
    id: randomIDGenerate(),
    taskContent: taskInput.value,
    isComplete: false,
  };
  taskList.push(task);
  taskInput.value = "";
  render();
}

//UI렌더 부분
function render() {
  let list = [];
  if (mode == "all") {
    list = taskList;
  } else if (mode == "ing" || mode == "done") {
    list = filterList;
  }

  let resultHTML = "";
  for (let i = 0; i < list.length; i++) {
    if (list[i].isComplete == true) {
      resultHTML += `<div class="task task2">
            <div class="task-check">
              <button onclick="toggleComplete('${list[i].id}')"><i class="fa-solid fa-circle-check check2"></i></button>
              <div class="task-done">${list[i].taskContent}</div>
            </div>
            <button onclick="deleteTask('${list[i].id}')"><i class="fa-solid fa-trash-can"></i></button>
          </div>`;
    } else {
      resultHTML += `<div class="task">
        <div class="task-check">
          <button onclick="toggleComplete('${list[i].id}')"><i class="fa-solid fa-circle-check"></i></button>
          <div>${list[i].taskContent}</div>
        </div>
        <button onclick="deleteTask('${list[i].id}')"><i class="fa-solid fa-trash-can"></i></button>
      </div>`;
    }
  }

  document.getElementById("task-board").innerHTML = resultHTML;
}

//할일을 완료 했는지 안했는지 껐다켰다 할수있는 함수
function toggleComplete(id) {
  for (let i = 0; i < taskList.length; i++) {
    if (taskList[i].id == id) {
      taskList[i].isComplete = !taskList[i].isComplete;
      break;
    }
  }
  render(); //UI가 변경 될 수 있도록 render()함수 호출
}

//삭제하는 함수
function deleteTask(id) {
  for (let i = 0; i < taskList.length; i++) {
    if (taskList[i].id == id) {
      taskList.splice(i, 1);
    }
  }
  render();
}

//모두,진행중, 완료 탭별로 볼수 있음
function filter(event) {
  mode = event.target.id;
  filterList = [];

  document.getElementById("under-line").style.width =
    event.target.offsetWidth + "px";
  document.getElementById("under-line").style.top =
    event.target.offsetTop + event.target.offsetHeight + "px";
  document.getElementById("under-line").style.left =
    event.target.offsetLeft + "px";

  if (mode == "all") {
    render();
  } else if (mode == "ing") {
    for (let i = 0; i < taskList.length; i++) {
      if (taskList[i].isComplete == false) {
        filterList.push(taskList[i]);
      }
    }
    render();
  } else if (mode == "done") {
    for (let i = 0; i < taskList.length; i++) {
      if (taskList[i].isComplete == true) {
        filterList.push(taskList[i]);
      }
    }
    render();
  }
}

//아이템에 아이디를 부여해 내가 선택한 아이템이 어떤것인지 알기 위한 함수
function randomIDGenerate() {
  return "_" + Math.random().toString(36).substr(2, 9);
}
