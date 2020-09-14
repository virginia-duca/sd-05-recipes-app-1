import React, { useState, useEffect } from 'react';

import {
  isRecipeFavorited,
  toggleFavorite,
  toClipboard,
} from '../Services/Utils';

import shareIcon from '../images/shareIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';


const Header = ({
  recipe,
  path
}) => {

  const [isFavorite, setIsFavorite] = useState(false);
  const { id, type, image, name, category, alcoholicOrNot } = recipe;

  useEffect(() => {
    setIsFavorite(isRecipeFavorited(id, type));
  },[isFavorite])

  return (
  <header className='basic'>
    <div>
      <img className='foto' data-testid="recipe-photo" src={image} alt="" />
      <h3 data-testid="recipe-title">{name}</h3>
      <h4 data-testid="recipe-category">{alcoholicOrNot || category}</h4>
    </div>
    <div>
      <button data-testid="share-btn">
        <img src={shareIcon} alt="Share" onClick={() => { toClipboard(path); }} />
      </button>
      <button
        data-testid="favorite-btn"
        src={isFavorite ? blackHeartIcon : whiteHeartIcon}
        onClick={() => {
          setIsFavorite(toggleFavorite(recipe))
        }} >
        <img src={isFavorite ? blackHeartIcon : whiteHeartIcon} alt="Favorite" />
      </button>
    </div>
  </header>
  )
};

export default Header;
