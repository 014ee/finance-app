import Swiper from 'swiper';
import 'swiper/swiper-bundle.min.css';

import { $ } from '../utils/frequent';
import { getFormattedPrice } from '../utils/formatter';

export default function setSavingGoalsView(data) {
  const htmlList = [];
  const container = $('.history__saving .slider');
  const template = `
  <div class="saving-goal swiper-slide">
    <span class="status" style='width: {{__width__}}'></span>
    <strong>
      <span class="tit">{{__title__}}</span>
      <span class="amount won">{{__amount__}}</span>
    </strong>
  </div>`;

  data.map(goal => {
    const { title, target, saved } = goal;
    let renderTemplate = template;
    const achievementRate = Math.round((saved / target) * 100);

    renderTemplate = renderTemplate.replace('{{__title__}}', title);
    renderTemplate = renderTemplate.replace('{{__amount__}}', getFormattedPrice(target - saved));
    renderTemplate = renderTemplate.replace('{{__width__}}', `${achievementRate}px`);

    htmlList.push(renderTemplate);
  });

  new Swiper('.history__saving', {
    slidesPerView: 'auto',
  });

  container.innerHTML = `
  <button class="saving-goal saving-goal--creat swiper-slide">
    <span class="button button--plus">+</span> 저금통 만들기
  </button>`;
  container.insertAdjacentHTML('afterbegin', htmlList.join(''));
}
