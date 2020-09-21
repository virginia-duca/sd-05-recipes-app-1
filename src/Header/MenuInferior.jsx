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
      <button className="btn" onClick={() => redirect('/bebidas')}>
      <i className="medium material-icons white-text">local_bar</i>
        {/* <img src={drinkIcon} alt="Drink" data-testid="drinks-bottom-btn" /> */}
      </button>
      <button className="btn" onClick={() => redirect('/explorar')}>
        <i className="medium material-icons white-text">explore</i>
       {/*  <img src={exploreIcon} alt="Explore" data-testid="explore-bottom-btn" /> */}
      </button>
      <button className="btn" onClick={() => redirect('/comidas')}>
        <i className="medium material-icons white-text">local_dining</i>
        {/* <img src={mealIcon} alt="Meal" data-testid="food-bottom-btn" /> */}
      </button>
    </footer>
    </div>
  );
};

MenuInferior.propTypes = {
  redirect: PropTypes.func.isRequired,
};

export default appPage(MenuInferior);
