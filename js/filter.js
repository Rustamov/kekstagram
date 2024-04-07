import { getClickedChildWithClass } from './util.js';

const filterEl = document.querySelector('.img-filters');
const filterFormEL = filterEl.querySelector('.img-filters__form');
const filterButtons = filterEl.querySelectorAll('.img-filters__button');
const buttonActiveClass = 'img-filters__button--active';

const FILTERS = {
  DEFAULT: 'filter-default',
  RANDOM: 'filter-random',
  DISCUSSED: 'filter-discussed',
};

filterEl.classList.remove('img-filters--inactive');

const getCurrentFilter = () => {
  const filterId = filterEl.querySelector(`.${buttonActiveClass}`).getAttribute('id');
  const filterFindIndex = Object.values(FILTERS).indexOf(filterId);

  return (filterFindIndex !== -1) ? filterId : FILTERS.DEFAULT;
};

const setFilterClick = (cb) => {

  filterFormEL.addEventListener('click', (evt) => {
    const clickedButton = getClickedChildWithClass(evt.currentTarget, evt.target, 'img-filters__button');
    if (!clickedButton) {
      return;
    }

    const filterValue = clickedButton.getAttribute('id');
    if (filterValue === getCurrentFilter()) {
      return;
    }

    for (const button of filterButtons) {
      button.classList.toggle(buttonActiveClass, clickedButton === button);
    }

    cb();
  });
};

export { setFilterClick, getCurrentFilter, FILTERS };
