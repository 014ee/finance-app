import { $ } from '../utils/frequent';

export default function setDragEvent() {
  window.addEventListener('load', handleDrag);
}

function handleDrag() {
  const accountHistoryEl = $('.account__history');
  const historyRecentEl = $('.history__recent');
  const dragAreaEl = $('.drag-area');
  const windowHeight = window.innerHeight;
  const tabBarHeight = $('.tab-bar').clientHeight;

  const state = {
    init() {
      this.isDragging = false;
      this.firstTouchedY = 0;
      this.movedY = 0;
      this.translateY = parseInt(accountHistoryEl.style.transform.slice(11, -3));
    },
  };

  setHistoryRecentHeight();
  function setHistoryRecentHeight(height = 'init') {
    if (height === 'init') {
      const init = windowHeight - tabBarHeight - historyRecentEl.getBoundingClientRect().top + 'px';
      historyRecentEl.style.height = init;
    } else {
      historyRecentEl.style.height = height;
    }
  }

  function dragStart(e) {
    state.init();
    state.isDragging = true;
    state.firstTouchedY = e.changedTouches[0].clientY;
    setHistoryRecentHeight('100%');
  }

  function dragMove(e) {
    let realTimeTouchedY = e.changedTouches[0].clientY;
    state.movedY = state.firstTouchedY - realTimeTouchedY;
    accountHistoryEl.style.transform = `translateY(${state.translateY + state.movedY * -1}px)`;
  }

  function dragEnd() {
    if (0 < state.movedY) {
      accountHistoryEl.style.transform = `translateY(-${
        accountHistoryEl.offsetTop - $('.account__header').clientHeight
      }px)`;
      setHistoryRecentHeight();
    } else if (state.movedY < 0) {
      accountHistoryEl.style.transform = `translateY(0px)`;
      setHistoryRecentHeight();
    }
    state.init();
  }

  dragAreaEl.addEventListener('touchstart', dragStart);
  dragAreaEl.addEventListener('touchmove', dragMove);
  dragAreaEl.addEventListener('touchend', dragEnd);
}
