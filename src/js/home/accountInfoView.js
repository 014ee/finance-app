import { $ } from '../utils/frequent';
import { getFormattedPrice } from '../utils/formatter';
import { MILLISECONDS_IN_A_DAY } from '../utils/constants';

export default function setAccountInfoView(accountList) {
  const htmlList = [];
  const container = $('.account__info .swiper-wrapper');
  const template = `
  <div class="swiper-slide" id="{{__id__}}">
    <div class="info__box">
      <h5 class="account-number">{{__accountNumber__}}</h5>
      <strong class="balance"><span class="amount won">{{__balance__}}</span></strong>
      <button class="button button--tranfer">이체</button>
      <div class="consumption-goal">
        <div class="chart">
          <div class="bar">
            <span class="status" style="width: {{__achievementRate__}}"></span>
          </div>
          <button class="button button-chart">
            <img src="./images/icon_chart.png" alt="지출관리" />
          </button>
        </div>
        <p>
          <span class="period">{{__remainingPeriod__}}</span>일 동안
          <span class="amount won">{{__remainingAmount__}}</span>
          <span class="status">남음</span>
        </p>

      </div>
    </div>
  </div>`;

  accountList.map((account, index) => {
    const { accountNumber, balance } = account.info;
    const { target, expended, endDate } = account.goals.consumption;
    const achievementRate = `${Math.round((expended / target) * 100)}%`;
    const remainingPeriod = Math.floor((Date.parse(endDate) - Date.now()) / MILLISECONDS_IN_A_DAY);
    const remainingAmount = target - expended;

    let renderTemplate = template;
    renderTemplate = renderTemplate.replace('{{__id__}}', index);
    renderTemplate = renderTemplate.replace('{{__accountNumber__}}', accountNumber);
    renderTemplate = renderTemplate.replace('{{__balance__}}', getFormattedPrice(balance));
    renderTemplate = renderTemplate.replace('{{__achievementRate__}}', achievementRate);
    renderTemplate = renderTemplate.replace('{{__remainingPeriod__}}', remainingPeriod);
    renderTemplate = renderTemplate.replace(
      '{{__remainingAmount__}}',
      getFormattedPrice(remainingAmount)
    );

    htmlList.push(renderTemplate);
  });

  container.innerHTML = '';
  container.innerHTML = htmlList.join('');
}
