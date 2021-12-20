// SAVING BOX (SWIPER) ------------------------------------------------------------------------
var swiper = new Swiper(".history__saving", {
  slidesPerView: "auto",
  spaceBetween: 12,
});


// RECENT HISTORY SCROLL AREA -----------------------------------------------------------------
const windowY = window.outerHeight
const tabBarY = document.querySelector('.tab-bar').clientHeight
const accountTitleY = document.querySelector('.account__title').clientHeight
const accountHistory = document.querySelector('.account__history')
const accountHistoryTop = accountHistory.offsetTop
const accountHistoryY =  windowY - tabBarY - accountHistoryTop // 디바이스에 따른 account__history 기본 높이값
const historyRecent = document.querySelector('.history__recent')
const historyRecentTop = historyRecent.offsetTop
const historyRecentY = accountHistoryY - historyRecentTop // 디바이스에 따른 history__recent 기본 높이값
historyRecent.style.height = `${historyRecentY}px`
console.log(accountHistoryY) // 가끔 8px이 더해지는 문제 있음 (why?)


// TOUCH DRAG ---------------------------------------------------------------------------------
const dragup = document.querySelector('.dragup');

let isUp = false; // 드래그업 이벤트 발생 여부 플래그
let touchInfo = { // touchStart 시점의 좌표와 시간 초기 세팅
  startY: 0,
  startTime:0,
  moveY:0,
  translateY: 0,
  scrollY: historyRecentY,
}

// 터치 정보값을 초기화하는 함수
function initTouchInfo(){
  touchInfo.startY = 0
  touchInfo.startTime = 0
  touchInfo.moveY = 0
  touchInfo.translateY = accountHistory.style.transform.slice(11,-3);
  touchInfo.translateY = parseInt(touchInfo.translateY)
  touchInfo.scrollY = historyRecentY
}


// DRAG UP ------------------------------------------------------------------------------------
function dragupStart(e){
  initTouchInfo(); // 터치 정보 초기화
  touchInfo.startY = e.changedTouches[0].clientY; // 초기 터치된 y값
  touchInfo.startTime = e.timeStamp;
  isUp = true;
  touchInfo.scrollY = windowY - tabBarY - accountTitleY
  historyRecent.style.height = `${touchInfo.scrollY}px`
}

function dragupMove(e){
  if(!isUp) return;
  let nowY = e.changedTouches[0].clientY; // 실시간 터치되고 있는 y값
  touchInfo.moveY = touchInfo.startY - nowY; // 초기 터치 영역으로부터 움직인 y값
  accountHistory.style.transform = `translateY(${ touchInfo.translateY + (-1 * touchInfo.moveY)}px)`
}

function dragupEnd(e){
  isUp = false
  if (touchInfo.moveY > 25 || -25 < touchInfo.moveY < 0){
    accountHistory.style.transform = `translateY(-267px)`
    historyRecent.style.height = `${touchInfo.scrollY - historyRecentTop}px`
    console.log(historyRecentTop)
  }else if (touchInfo.moveY < -25 || 0 < touchInfo.moveY < 25){
    accountHistory.style.transform = `translateY(0)`
    initTouchInfo();
    historyRecent.style.height = `${touchInfo.scrollY}px`
  }
  accountHistory.style.transition = '.4s;'
}

dragup.addEventListener('touchstart', dragupStart)
dragup.addEventListener('touchmove', dragupMove)
dragup.addEventListener('touchend', dragupEnd)


// MYGOAL CHART PERCENT BG ---------------------------------------------------------------------
let mygoal = 500000 // 임의의 예시 (목표: 50만원)
let mygoalCurrent = 290000 // 임의의 예시 (현재: 29만원 저축)
let mygoalStatus = Math.round((mygoalCurrent/mygoal) * 100) // 현재 목표 달성률
console.log(mygoalStatus)

let mygoalChart = document.querySelector('.mygoal .chart .bar .status')
mygoalChart.style.width  = `${mygoalStatus}%`

let savingBoxChart = document.querySelector('.saving-box .status')
savingBoxChart.style.width  = `${mygoalStatus}%`