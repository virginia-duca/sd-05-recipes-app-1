import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import { isRecipeFavorited, toggleFavorite, toClipboard } from '../Services/Utils';
import './style.css';

const Header = ({ recipe, path }) => {
  const [isFavorite, setIsFavorite] = useState();
  const { id, type, image, name, category, alcoholicOrNot } = recipe;

  return (
  <header className="header-container basic">

    <div className="card horizontal">
      <div className="card-image">
        <img className="image" src={image} data-testid="recipe-photo" alt="" />
      </div>
      <div className="card-stacked">
        <div className="card-content">
          <p className="header-title" data-testid="recipe-title">{name}</p>
          <hr />
          <p data-testid="recipe-category">{alcoholicOrNot || category}</p>
          <div className="card-links">
            <button
              className="btn-floating btn white" data-testid="share-btn"
              onClick={() => { toClipboard(`http://localhost:3000${path}`); }}
            >
              <i className="material-icons black-text">share</i>
            </button>
            <button
              className="btn-floating btn white" data-testid="favorite-btn"
              onClick={() => { setIsFavorite(toggleFavorite(recipe)) }}
            >
              <i className="material-icons black-text">{isRecipeFavorited(id, type) ? 'favorite' : 'favorite_border'}</i>
            </button>
          </div>
        </div>
      </div>
    </div>
  </header>
  )
};

Header.propTypes = {
  recipe: PropTypes.instanceOf(Object),
  path: PropTypes.string,
}.isRequired;


export default Header;
