import { $, sortByLatest } from '../utils/frequent';
import { getFormattedDate, getFormattedPrice } from '../utils/formatter';
import setDragEvent from './dragEvent';

export default function setAccountHistoryView(data) {
  const htmlList = [];
  const container = $('.history__recent');
  const dataList = sortByLatest(data);
  const groupingByDate = new Map();
  dataList.map(data => {
    if (groupingByDate.has(data.date)) {
      groupingByDate.set(data.date, [...groupingByDate.get(data.date), data]);
    } else {
      groupingByDate.set(data.date, [data]);
    }
  });

  for (let [date, dataList] of groupingByDate) {
    const historyTemplateList = [];
    const summary = {
      amount: 0,
      income: '수입',
    };

    dataList.map(data => {
      const { income, price } = data;

      historyTemplateList.push(setHistoryTemplate(data));
      if (income) {
        summary.amount += price;
      } else {
        summary.amount -= price;
        summary.income = '지출';
      }
    });

    htmlList.push(setDayTemplate(date, historyTemplateList, summary));
  }

  function setHistoryTemplate(data) {
    let template = `
      <li>
        <span class="title">{{__title__}}</span>
        <span class='price{{__income__}}'>{{__price__}}</span>
      </li>
    `;

    template = template.replace('{{__title__}}', data.title);
    template = template.replace('{{__price__}}', getFormattedPrice(data.price));
    if (data.income) template = template.replace('{{__income__}}', '--income');
    else template = template.replace('{{__income__}}', '');

    return template;
  }
  function setDayTemplate(date, historyTemplateList, summary) {
    let template = `
      <div class="day">
        <strong>
          <span class="date">{{__date__}}</span>
          <span class="summary">
            <span class="amount won">{{__amount__}}</span>
            <span class="income">{{__income__}}</span>
          </span>
        </strong>
        <ul>{{__historyTemplate__}}</ul>
      </div>
    `;

    template = template.replace('{{__date__}}', getFormattedDate(date));
    template = template.replace('{{__amount__}}', getFormattedPrice(Math.abs(summary.amount)));
    template = template.replace('{{__income__}}', getFormattedPrice(summary.income));
    template = template.replace('{{__historyTemplate__}}', historyTemplateList.join(''));

    return template;
  }

  container.innerHTML = '';
  container.innerHTML = htmlList.join('');
}
setDragEvent();
