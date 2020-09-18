import React from 'react';
import { useState } from 'react';
import PropTypes from 'prop-types';
import shareIcon from '../images/shareIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import {
  toggleFavorite,
  isRecipeFavorited,
  toClipboard,
} from '../Services/Utils';
import './style.css';

const NewCardFavoritos = ({ recipe, index, redirect }) => {
  const { alcoholicOrNot, area, category, id, image, name, type } = recipe;
  const [isFavorite, setIsFavorite] = useState(isRecipeFavorited(id, type));

  return (
    <div id="new-card" className="clipboard">
      <p data-testid={`${index}-horizontal-top-text`}>
        {type === 'comida' ? `${area} - ${category}` : alcoholicOrNot}
      </p>
      <button
        data-testid={`${index}-horizontal-name`}
        onClick={() => redirect(`/${type}s/${id}`)}
        src=""
      >
        {name}
      </button>
      <button
        data-testid={`${index}-horizontal-share-btn`}
        src={shareIcon}
        onClick={() => toClipboard(`http://localhost:3000/${type}s/${id}`)}
      >
        <img src={shareIcon} alt="share" />
      </button>
      <button
        data-testid={`${index}-horizontal-favorite-btn`}
        src={isFavorite ? blackHeartIcon : whiteHeartIcon}
        onClick={() => {
          setIsFavorite(toggleFavorite(recipe));
          document.location.reload();
        }}
      >
        <img
          src={isFavorite ? blackHeartIcon : whiteHeartIcon}
          alt="favorite"
        />
      </button>
      <button
        data-testid={`${index}-horizontal-image`}
        onClick={() => {
          redirect(`/${type}s/${id}`);
        }}
        src={image}
      >
        <img className="image" src={image} alt="imagem" />
      </button>
    </div>
  );
};

NewCardFavoritos.propTypes = {
  recipe: PropTypes.instanceOf(PropTypes.array).isRequired,
  index: PropTypes.number.isRequired,
  redirect: PropTypes.func.isRequired,
};

export default NewCardFavoritos;
