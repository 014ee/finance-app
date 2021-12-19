// SAVING BOX (SWIPER)
var swiper = new Swiper(".savingSlider", {
  slidesPerView: "auto",
  spaceBetween: 12,
});

// RECENT HISTORY AREA
const windowY = window.outerHeight
const tabBarY = document.querySelector('.tab-bar').clientHeight
const accountHistoryTop = document.querySelector('.account__history').offsetTop
const accountHistoryY =  windowY - accountHistoryTop - tabBarY
const historyRecentTop = document.querySelector('.history__recent').offsetTop
const historyRecentY = accountHistoryY - historyRecentTop

const historyRecentArea = document.querySelector('.history__recent')
historyRecentArea.style.height = `${historyRecentY}px`

