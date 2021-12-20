// SAVING BOX (SWIPER) ------------------------------------------------------------------------
var swiper = new Swiper(".history__saving", {
  slidesPerView: "auto",
  spaceBetween: 12,
});


// RECENT HISTORY AREA -------------------------------------------------------------------------
const windowY = window.outerHeight
const tabBarY = document.querySelector('.tab-bar').clientHeight
const accountHistory = document.querySelector('.account__history')
const clienRect = accountHistory.getBoundingClientRect(); // 각종 좌표값이 들어있는 객체
let accountHistoryTop = clienRect.top; // viewport 시작 지점을 기준으로 한 상대좌표 Y값
const accountHistoryY =  windowY - accountHistoryTop - tabBarY
const historyRecentTop = document.querySelector('.history__recent').offsetTop
const historyRecentY = accountHistoryY - historyRecentTop

const historyRecent = document.querySelector('.history__recent')
historyRecent.style.height = `${historyRecentY}px`


// TOUCH DRAG --------------------------------------------------------------------------------
const dragup = document.querySelector('.dragup');
let currentTranslateY = 0;

let isUp = false; // 드래그업 이벤트 발생 여부 플래그
let touchInfo = { // touchStart 시점의 좌표와 시간 초기 세팅
  startY: 0,
  startTime:0,
  moveY:0,
  translateY: 0,
}

// 터치 정보값을 초기화하는 함수
function initTouchInfo(){
  touchInfo.startY = 0
  touchInfo.startTime = 0
  touchInfo.moveY = 0
  touchInfo.translateY = accountHistory.style.transform.slice(11,-3);
  touchInfo.translateY = parseInt(touchInfo.translateY)
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
  touchInfo.moveY = touchInfo.startY - nowY; // 기준 y에서 이동된 y값
  accountHistory.style.transform = `translateY(${ touchInfo.translateY + (-1 * touchInfo.moveY)}px)`
}

function dragupEnd(e){
  isUp = false
  if (touchInfo.moveY > 20){
    accountHistory.style.transform = `translateY(-267px)`
  }else if (touchInfo.moveY < -20){
    accountHistory.style.transform = `translateY(0)`
  }
  accountHistory.style.transition = '.4s;'
}


dragup.addEventListener('touchstart', dragupStart)
dragup.addEventListener('touchmove', dragupMove)
dragup.addEventListener('touchend', dragupEnd)


