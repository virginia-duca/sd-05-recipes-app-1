import React from 'react';
import PropTypes from 'prop-types';
import drinkIcon from '../images/drinkIcon.svg';
import exploreIcon from '../images/exploreIcon.svg';
import mealIcon from '../images/mealIcon.svg';
import { appPage } from '../Services/Utils';

import './style.css';

const MenuInferior = ({ redirect }) => {
  return (
    <div>
    <footer data-testid="footer">
      <button onClick={() => redirect('/bebidas')}>
        <img src={drinkIcon} alt="Drink" data-testid="drinks-bottom-btn" />
      </button>
      <button onClick={() => redirect('/explorar')}>
        <img src={exploreIcon} alt="Explore" data-testid="explore-bottom-btn" />
      </button>
      <button onClick={() => redirect('/comidas')}>
        <img src={mealIcon} alt="Meal" data-testid="food-bottom-btn" />
      </button>
    </footer>
    </div>
  );
};

MenuInferior.propTypes = {
  redirect: PropTypes.func.isRequired,
};

export default appPage(MenuInferior);
