/*
1. 유저가 값을 인풋에 입력
2. + 버튼을 누르면 할일이 추가
3. 삭제 버튼 누르면 할일이 삭제
4. 체크 버튼 누르면 줄이 그어지며 할일 완료
5. 탭을 누르면 언더바 이동
6. 완료 탭에는 완료 사항만, 진행 탭에는 진행 사항만*/
let taskList = [];
let mode = "all";
let filterList = [];

let taskInput = document.querySelector("#task-input");
let addBtn = document.querySelector("#add-btn");
let underLine = document.getElementById("under-line")
let tabs = document.querySelectorAll(".tab-wrap div");

addBtn.addEventListener("click", addTask);
taskInput.addEventListener("keyup", function (event) {
  if (window.event.keyCode == 13) {
    addTask();
    taskInput.value = "";
  }
  // 그리고 html 태그에 onkeyup="enterkey();"를 추가해서 사용
});
taskInput.addEventListener("focus", function () {
  taskInput.value == null;
});

for (let i = 1; i < tabs.length; i++) {
  tabs[i].addEventListener("click", function (event) {
    filter(event);
  });
}

function addTask() {
  let task = {
    id: randomIdgenerate(),
    taskContent: taskInput.value,
    isComplete: false,
  };
  taskList.push(task);
  render();
  taskInput.value = "";
}

function render() {
  let list = [];
  if (mode == "all") {
    list = taskList;
  } else if (mode == "continue" || mode == "complete") {
    list = filterList;
  }
  let resultHTML = "";
  for (let i = 0; i < list.length; i++) {
    if (list[i].isComplete == true) {
      resultHTML += `
        <div class="task">
          <div class="task-done">${list[i].taskContent}</div>
          <div class="button">
            <button class="check" onClick="toggleComplete('${list[i].id}')"><i class="fa-solid fa-arrows-rotate"></i></button>
            <button class="delete" onClick="deleteTask('${list[i].id}')"><i class="fa-solid fa-xmark"></i></button>
          </div>
        </div>`;
    } else {
      resultHTML += `
            <div class="task">
              <div>${list[i].taskContent}</div>
              <div class="button">
                <button class="check" onClick="toggleComplete('${list[i].id}')"><i class="fa-solid fa-check"></i></button>
                <button class="delete" onClick="deleteTask('${list[i].id}')"><i class="fa-solid fa-xmark"></i></button>
              </div>
            </div>`;
    }
  }
  document.getElementById("task-board").innerHTML = resultHTML;
}

function toggleComplete(id) {
  console.log(id);
  for (let i = 0; i < taskList.length; i++) {
    if (taskList[i].id == id) {
      taskList[i].isComplete = !taskList[i].isComplete; // 반전 값
      break;
    }
  }
  filter();
}

function deleteTask(id) {
  for (let i = 0; i < taskList.length; i++) {
    if (taskList[i].id == id) {
      taskList.splice(i, 1);
      break;
    }
  }
  filter()
}

function filter(event) {
  filterList = [];
  if(event){
    mode = event.target.id;
    underLine.style.width = event.target.offsetWidth + "px";
    underLine.style.top = "0px";
    underLine.style.left = event.target.offsetLeft + "px";
  }
  if (mode == "continue") {
    for (let i = 0; i < taskList.length; i++) {
      if (taskList[i].isComplete == false) {
        filterList.push(taskList[i]);
      }
    }
  } else if (mode == "complete") {
    for (let i = 0; i < taskList.length; i++) {
      if (taskList[i].isComplete == true) {
        filterList.push(taskList[i]);
      }
    }
  }
  render()
}

function randomIdgenerate() {
  return Math.random().toString(36).substr(2, 16);
} // id값을 랜덤으로 만들어주는 함수
