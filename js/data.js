// json 데이터 요청 ---------------------------------------------------------------------------
const requestData = "../data/bank.json"
const requestObj = new XMLHttpRequest();

requestObj.open("GET", requestData);
requestObj.responseType = 'json';
requestObj.send();
requestObj.onload = () => {
  makeDomWithBankData(requestObj.response);
}


// json 데이터 선언 ----------------------------------------------------------------------------
function makeDomWithBankData(bankData) {
  const bankList = bankData.bankList.reverse(); // 결제 내역 최신순으로 변환

  bankList.forEach(function (oneData, index) {
    // 1. 데이터 가공
    const paymentIndex = index
    const prevIndex = paymentIndex - 1
    const paymentDetail = oneData
    const prevpaymentDetail = bankList[prevIndex]
    const paymentIncome = paymentDetail['income']
    const paymentClassify = paymentDetail['classify']
    const paymentHistory = paymentDetail['history']
    const paymentPrice = paymentDetail['price']
    // ↓ 날짜 가공
    const paymentDate = paymentDetail['date'].replace(/[-]/gm, '/')
    const paymentTime = Date.parse(paymentDate)
    const currentDate = () => {
      let todayDate = new Date()
      let year = todayDate.getFullYear()
      let month = todayDate.getMonth() + 1
      let date = todayDate.getDate()
      return `${year}/${month}/${date}`
    }
    const currentTime = Date.parse(currentDate())
    const oneday = 86400000 // 1일 간격 밀리초세컨드

    // 2. DOM 생성 함수 (지출내역 최신순으로 생성)
    const createDayTemplete = function (paymentDetail, prevpaymentDetail = true) {
      const historyRecent = document.querySelector('.history__recent')
      const mostOldestDayUl = document.querySelector('.day:last-child ul')
      console.log (paymentDetail['date'], prevpaymentDetail['date'])

      // ↓ 현재 지출내역이 첫번째거나 || 현재 지출내역 날짜랑 이전 지출내역 날짜랑 비교해서 다르면 day 템플릿 생성
      if (paymentIndex === 0 || paymentDetail['date'] !== prevpaymentDetail['date']) {
        const dayEl = document.createElement('div')
        const strongEl = document.createElement('strong')
        const ulEl = document.createElement('ul')
        const dayDateEl = document.createElement('span') // day 날짜
        historyRecent.appendChild(dayEl).classList.add('day')
        dayEl.appendChild(strongEl)
        dayEl.appendChild(ulEl)
        strongEl.appendChild(dayDateEl).classList.add('date')
        if (currentDate() === paymentDate) {
          dayDateEl.innerText = '오늘'
        } else if (currentTime - paymentTime <= oneday) {
          dayDateEl.innerText = '어제'
        } else { // 나머지
          dayDateEl.innerText = paymentDate
        }

        const dayPriceStatusEl = document.createElement('span')
        const dayTotalPriceEl = document.createElement('span') // day 총 지출금액
        const dayTotalStatusEl = document.createElement('span') // day 총 지출현황(지출/수입)
        dayTotalPriceEl.innerText = paymentPrice
        dayTotalStatusEl.innerText = paymentIncome
        strongEl.appendChild(dayPriceStatusEl).classList.add('price-status')
        dayPriceStatusEl.appendChild(dayTotalPriceEl).classList.add('price')
        dayPriceStatusEl.appendChild(dayTotalStatusEl).classList.add('status')

        const liEl = document.createElement('li')
        const liPriceEl = document.createElement('span')
        liEl.innerText = paymentHistory
        liPriceEl.innerText = paymentPrice
        ulEl.appendChild(liEl)
        liEl.appendChild(liPriceEl).classList.add('price')
      } else { // ↓ 같은 날짜의 지출내역일 경우 li만 추가
        const liEl = document.createElement('li')
        const liPriceEl = document.createElement('span')
        liEl.innerText = paymentHistory
        liPriceEl.innerText = paymentPrice
        mostOldestDayUl.appendChild(liEl)
        liEl.appendChild(liPriceEl).classList.add('price')
      }
    }

    // 3. 데이터 뿌리기
    createDayTemplete(paymentDetail, prevpaymentDetail)
  })
}


// MYGOAL CHART PERCENT BG ---------------------------------------------------------------------
let mygoal = 500000 // 임의의 금액 (목표: 50만원)
let mygoalCurrent = 290000 // 임의의 금액 (현재: 29만원 저축)
let mygoalStatus = Math.round((mygoalCurrent / mygoal) * 100) // 현재 목표 달성률

let mygoalChart = document.querySelector('.mygoal .chart .bar .status')
mygoalChart.style.width = `${mygoalStatus}%`

let savingBoxChart = document.querySelectorAll('.saving-box .status')
savingBoxChart.forEach(function (boxBg) {
  boxBg.style.width = `${mygoalStatus}%`
})