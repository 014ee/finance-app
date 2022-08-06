import Swiper from 'swiper';
import { fetchData, $ } from '../utils/frequent';
import { ACCOUNT_LIST_URL } from '../utils/constants';

import setAccountInfoView from './accountInfoView';
import setAccountHistoryView from './accountHistoryView';
import setSavingGoalsView from './savingGoalsView';

fetchData(ACCOUNT_LIST_URL).then(response => {
  const accountEl = $('.account');
  let currentAccountId = accountEl.dataset.id;

  setAccountInfoView(response.accountList);
  setDataView(currentAccountId);
  function setDataView(id) {
    const { goals, history } = response.accountList[id];

    $('.account__header .nickname').innerText =
      response.accountList[currentAccountId].info.nickname;
    setAccountHistoryView(history);
    setSavingGoalsView(goals.saving);
  }

  new Swiper('.account__info', {
    slidesPerView: 'auto',
    spaceBetween: 12,
    on: {
      slideChangeTransitionEnd: () => {
        changeDataId();
        setDataView(currentAccountId);

        function changeDataId() {
          currentAccountId = $('.account__info .swiper-slide-active').getAttribute('id');
          accountEl.dataset.id = currentAccountId;
        }
      },
    },
  });
});
