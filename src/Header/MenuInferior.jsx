import React from 'react';
import drinkIcon from '../images/drinkIcon.svg';
import exploreIcon from '../images/exploreIcon.svg';
import mealIcon  from '../images/mealIcon.svg';

export default function MenuInferior() {
  return(
    <footer data-testid="footer">
      <div>
        <img src={drinkIcon} alt="Drink" data-testid="drinks-bottom-btn" />
        <img src={exploreIcon} alt="Explore" data-testid="explore-bottom-btn" />
        <img src={mealIcon} alt="Meal" data-testid="food-bottom-btn" />
      </div>
    </footer>
  );
}
