import React from 'react';
import drinkIcon from '../images/drinkIcon.svg'
import exploreIcon from '../images/exploreIcon.svg'
import mealIcon  from '../images/mealIcon.svg'

export default function MenuInferior() {

  return(
    <footer data-testid="footer">
      <div>
        <img src={drinkIcon} data-testid="drinks-bottom-btn" />
        <img src={exploreIcon} data-testid="explore-bottom-btn" />
        <img src={mealIcon} data-testid="food-bottom-btn" />
      </div>
    </footer>

  )
}