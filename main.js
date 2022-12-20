const mainImg = document.querySelector(".main_img");
const startBtn = document.querySelector(".btn_start");
const footer = document.querySelector("footer");
const remainTime = document.querySelector(".time");
const loseImg = document.querySelector(".img_lose");
const winImg = document.querySelector(".img_win");
const unclickedImg = document.querySelector(".imgs_box_unclicked");
const clickedImg = document.querySelector(".imgs_box_clicked");
let sec = 5;
let intervalId = undefined;



const handleBtnClick = function() {
  if (startBtn.textContent === "시작") { // 시작 버튼 클릭
    startBtn.textContent = "재시작";
    mainImg.style.display = "none";
    footer.style.display = "flex";
    clickedImg.style.display = "block";
    unclickedImg.style.display = "block";
    loseImg.style.display = "none"
  } else { // 재시작 버튼 클릭
    startBtn.textContent = "시작";
    mainImg.style.display = "block";
    footer.style.display = "none"; 
  }
}

const handleTimer = function() {
  remainTime.textContent = sec + " 초";
  sec = sec - 1;
  if (sec < 0) {
    loseImg.style.display = "block"
    clickedImg.style.display = "none";
    unclickedImg.style.display = "none";
    clearInterval(intervalId);
  }
}

const startTimer = function() {
  if (!intervalId) {
    handleTimer()
    return intervalId = setInterval(handleTimer, 1000);
  } 
  if (intervalId) {
    clearInterval(intervalId);
    remainTime.textContent = sec + " 초";
    sec = 25
    intervalId = undefined;
  }
}

startBtn.addEventListener("click", handleBtnClick);
startBtn.addEventListener("click", startTimer);