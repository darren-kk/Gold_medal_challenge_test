const startBtn = document.querySelector(".btn_start");
const footer = document.querySelector("footer");
const remainTime = document.querySelector(".time");
const remainChoi = document.querySelector(".choi");

const mainImg = document.querySelector(".main_img_box");
const loseImg = document.querySelector(".img_lose");
const winImg = document.querySelector(".img_win");
const unclickedImgBox = document.querySelector(".imgs_box_unclicked");
const clickedImgBox = document.querySelector(".imgs_box_clicked");

const unclickedImgs = document.querySelectorAll(".unclicked");
const clickedImgs = document.querySelectorAll(".clicked");

const indexArray = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];

const randomImgsArray = [];
let flippedArray = [];
let unflippedArray = [];
let sec = 25;
let goal = 8;
let intervalId = undefined;
let count = 0;

const handleClick = () => {
  handleStartBtn();
  startTimer();
  makeRandomImgs();
}


const handleStartBtn = () => {
  if (startBtn.textContent === "시작") { // 시작 버튼 클릭
    startBtn.textContent = "재시작";
    mainImg.style.display = "none";
    footer.style.display = "flex";
    clickedImgBox.style.display = "block";
    unclickedImgBox.style.display = "block";
    loseImg.style.display = "none"
  } 
  else { // 재시작 버튼 클릭
    startBtn.textContent = "시작";
    mainImg.style.display = "block";
    footer.style.display = "none";
    unflippedArray = [];
    flippedArray = []; 
    count = 0;
    makeRandomImgs();
    for (const el of unclickedImgs) {
      el.style.visibility = "visible";
    }
  }
}

const handleTimer = () => {
  remainTime.textContent = sec + " 초";
  sec = sec - 1;

  if (sec < 0) {
    loseImg.style.display = "block"
    clickedImgBox.style.display = "none";
    unclickedImgBox.style.display = "none";
    clearInterval(intervalId);
  }
}

const startTimer = () => {
  if (!intervalId) {
    handleTimer();
    return intervalId = setInterval(handleTimer, 1000);
  } 
  if (intervalId) {
    clearInterval(intervalId);
    remainTime.textContent = sec + " 초";
    sec = 25;
    intervalId = undefined;
  }
}

const makeRandomNumbers = (array) => {
  for (let i = 0; i < array.length; i++) {
    let j = Math.floor(Math.random() * (i + 1));
    let value = array[i];
    array[i] = array[j];
    array[j] = value;
  }
  return array;
}

const makeRandomImgs = () => {
  const randomIndex = makeRandomNumbers(indexArray);

  for (let i = 0; i < clickedImgs.length; i++) {
    randomImgsArray.push(clickedImgs[randomIndex[i]].src);
  }
  
  for (let i = 0; i < clickedImgs.length; i++) {
    clickedImgs[i].src = randomImgsArray[i];
  }
}

const handleUnclickedFlip = (event) => {
  const unclickedImgsArray = Array.from(unclickedImgs);
  count = count + 1;
  event.target.style.visibility = "hidden";

  if (count <= 2) {
    flippedArray.push(randomImgsArray[unclickedImgsArray.indexOf(event.target)]);
    unflippedArray.push(event.target)
  }

  if (count === 2) {
    count = 0;

    if (flippedArray[0] !== flippedArray[1]) {
      setTimeout(() => {for (const el of unflippedArray) {
        el.style.visibility = "visible";
        unflippedArray = [];
      }}, 300)
      flippedArray = [];
    } else {
      unflippedArray[0].style.visibility = "hidden";
      unflippedArray[1].style.visibility = "hidden";
      unflippedArray = [];
      flippedArray = [];
      goal = goal - 1
      remainChoi.textContent = goal + " 명";
    }
  }

  console.log(unflippedArray);
  console.log(flippedArray);
}

startBtn.addEventListener("click", handleClick);

for (const el of unclickedImgs) {
  el.addEventListener("click", handleUnclickedFlip);
}

