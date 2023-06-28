import React from 'react';

import { ReactComponent as Filter } from './../../assets/svg/filter.svg';

import './Count.css';

const CountPage = ({
  setHideFilters,
  hideFilters,
  counstValues,
  handleCount,
  activeCount,
}) => {
  return (
    <div className="count">
      <h2 className="count__title">Количество записей:</h2>
      <ul className="list-reset count__list">
        {counstValues.map((value, index) => (
          <li
            key={index}
            onClick={() => handleCount(index)}
            className={
              activeCount == index ? 'count__item count__item--active' : 'count__item'
            }>
            {value}
          </li>
        ))}
      </ul>
      <div onClick={() => setHideFilters(!hideFilters)} className="filter-icon">
        <Filter />
      </div>
    </div>
  );
};

export default CountPage;
