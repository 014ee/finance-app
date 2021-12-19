// SAVING BOX (SWIPER) ------------------------------------------------------------------------
var swiper = new Swiper(".history__saving", {
  slidesPerView: "auto",
  spaceBetween: 12,
});


// RECENT HISTORY AREA -------------------------------------------------------------------------
const windowY = window.outerHeight
const tabBarY = document.querySelector('.tab-bar').clientHeight
const accountHistoryTop = document.querySelector('.account__history').offsetTop
const accountHistoryY =  windowY - accountHistoryTop - tabBarY
const historyRecentTop = document.querySelector('.history__recent').offsetTop
const historyRecentY = accountHistoryY - historyRecentTop

const historyRecent = document.querySelector('.history__recent')
historyRecent.style.height = `${historyRecentY}px`


// TOUCH DRAG --------------------------------------------------------------------------------
const accountHistory = document.querySelector('.account__history');
const dragup = document.querySelector('.dragup');

let isUp = false; // 드래그업 이벤트 발생 여부 플래그
let touchInfo = { // touchStart 시점의 좌표와 시간 초기 세팅
  startY: 0,
  startTime:0
}

// 터치 정보값을 초기화하는 함수
function initTouchInfo(){
  touchInfo.startY = 0
  touchInfo.startTime = 0
}


// DRAG UP ------------------------------------------------------------------------------------
function dragupStart(e){
  initTouchInfo(); // 터치 정보 초기화
  touchInfo.startY = e.changedTouches[0].clientY; // 초기 터치된 y값
  touchInfo.startTime = e.timeStamp;
  isUp = true;
}

function dragupMove(e){
  if(!isUp) return;
  let nowY = e.changedTouches[0].clientY; // 실시간 터치되고 있는 y값
  let moveY = Math.abs(touchInfo.startY - nowY); // 기준 y에서 이동된 y값의 절대값
  accountHistory.style.transform = `translateY(-${moveY}px)`
}

function dragupEnd(e){
  console.log('위에 붙었다.')
  isUp = false
  accountHistory.style.transform = `translateY(-267px)`
  accountHistory.style.transition = '.4s;'
  initTouchInfo();
}

dragup.addEventListener('touchstart', dragupStart)
dragup.addEventListener('touchmove', dragupMove)
dragup.addEventListener('touchend', dragupEnd)


