let taskInput = document.getElementById("input-task");
let addBtn = document.getElementById("add-btn");
let tabs = document.querySelectorAll(".tabs div");
let taskList = []; //할일을 저장하는 배열
let mode = "all"; //체크여부에 상관 없이 모든 할일을 보여주게 함 = all
let filterList = [];

//추가 버튼을 클릭하거나 엔터를 눌렀을 경우 할일추가 가능
addBtn.addEventListener("mousedown", addTask);
taskInput.addEventListener("keyup", function (event) {
  if (event.keyCode === 13) {
    addTask(event);
  }
});

for (let i = 1; i < tabs.length; i++) {
  //각 탭에 대한 함수
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
    id: randomIDGenerate(), //각 할일에는 랜덤한 아이디가 주어짐
    taskContent: taskInput.value, //내가 적은 할일
    isComplete: false, //할일을 마치지 않았을 경우 isComplete은 false
  };
  taskList.push(task); //할일 배열에 추가
  taskInput.value = ""; //추가가 되면 압력창안은 비워짐
  render(); //UI에 바로 적용
}

//UI렌더 부분
function render() {
  let list = [];
  if (mode == "all") {
    //체크여부에 상관 없이 할일을 볼 수 있는 탭일 경우
    list = taskList; //모든 할일을 볼 수 있다.
  } else if (mode == "ing" || mode == "done") {
    //진행중탭을 클릭 했거나, 이미 완료된 탭을 눌렀을 경우
    list = filterList; //필터된 리스트 만을 보여준다
  }

  let resultHTML = "";
  for (let i = 0; i < list.length; i++) {
    //리스트에 있는 아이템을 for문으로 하나씩 출력
    if (list[i].isComplete == true) {
      //isComplete가 true면? => 할일을 다 끝내서 체크한 아이템들
      resultHTML += `<div class="task task2">
            <div class="task-check">
              <button onclick="toggleComplete('${list[i].id}')"><i class="fa-solid fa-circle-check check2"></i></button>
              <div class="task-done">${list[i].taskContent}</div>
            </div>
            <button onclick="deleteTask('${list[i].id}')"><i class="fa-solid fa-trash-can"></i></button>
          </div>`; //완료된 탭에 들어있는 아이템들 출력
    } else {
      //체크 되지 않은 아이템들
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
  //각 할일의 id값을 받아서
  for (let i = 0; i < taskList.length; i++) {
    //모든 할일을 하나씩 출력
    if (taskList[i].id == id) {
      //함수로 받아온 아이템의 아이디와 클릭한 아이템의 아이디가 같다면
      taskList[i].isComplete = !taskList[i].isComplete; //할일의 isComplete을 껐다 켰다 할수 있음
      //할일의 isComplete가 true면 false로 false면 true로 바꿔준다
      break;
    }
  }
  render(); //UI가 변경 될 수 있도록 render()함수 호출
}

//삭제하는 함수
function deleteTask(id) {
  //각 할일의 id값을 받아서
  for (let i = 0; i < taskList.length; i++) {
    //모든 할일을 하나씩 출력
    if (taskList[i].id == id) {
      //함수로 받아온 아이템의 아이디와 클릭한 아이템의 아이디가 같다면
      taskList.splice(i, 1); //i번째 인덱스부터 1개의 요소를 삭제
    }
  }
  render();
}

//모두,진행중, 완료 탭별로 볼수 있음
function filter(event) {
  mode = event.target.id;
  filterList = []; //필터된 아이템들을 담을 배열

  document.getElementById("under-line").style.width =
    event.target.offsetWidth + "px";
  document.getElementById("under-line").style.top =
    event.target.offsetTop + event.target.offsetHeight + "px";
  document.getElementById("under-line").style.left =
    event.target.offsetLeft + "px"; //탭 클릭했을때 무슨 탭을 클릭했는지 알수있는 바

  if (mode == "all") {
    //체크 여부 관계 없이 모든 할일을 보여주는 탭
    render(); //just 그려준다
  } else if (mode == "ing") {
    //진행중인 탭
    for (let i = 0; i < taskList.length; i++) {
      if (taskList[i].isComplete == false) {
        //아직 체크 되지 않은 탭이면?
        filterList.push(taskList[i]); //필터리스트에 넣고
      }
    }
    render(); //UI를 그려준다. => 완료지 않은 아이템들만 볼수 있는 탭
  } else if (mode == "done") {
    //할일을 다 끝낸 탭
    for (let i = 0; i < taskList.length; i++) {
      if (taskList[i].isComplete == true) {
        //체크가 왼료된 탭이면?
        filterList.push(taskList[i]); //필터리스트에 넣고
      }
    }
    render(); //UI를 그려준다. => 완료된 아이템들만 볼수 있는 탭
  }
}

//아이템에 아이디를 부여해 내가 선택한 아이템이 어떤것인지 알기 위한 함수
function randomIDGenerate() {
  return "_" + Math.random().toString(36).substr(2, 9);
}
