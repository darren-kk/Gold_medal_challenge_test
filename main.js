const mainImg = document.querySelector(".main_img");
const startBtn = document.querySelector(".btn_start");
const footer = document.querySelector("footer")
const remainTime = document.querySelector(".time")
let sec = 25;
let intervalId = undefined;



const handleBtnClick = function() {
  if (startBtn.textContent === "시작") {
    mainImg.style.display = "none";
    startBtn.textContent = "재시작";
    footer.style.display = "flex";
  } else {
    mainImg.style.display = "block";
    startBtn.textContent = "시작";
    footer.style.display = "none"; 
  }
}


startBtn.addEventListener("click", handleBtnClick);