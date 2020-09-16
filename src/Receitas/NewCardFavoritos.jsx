import React from 'react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import shareIcon from '../images/shareIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import { toggleFavorite, isRecipeFavorited } from '../Services/Utils';
import './style.css';


const NewCardFavoritos = (
  { recipe, index, redirect },
) => {
  console.log(recipe)
  const { alcoholicOrNot, area, category, id, image, name, type } = recipe;
  const [copy, setCopy] = useState(false);
  const [isFavorite, setIsFavorite] = useState(isRecipeFavorited(id, type));

  const toClipboard = (link) => {
    navigator.clipboard
      .writeText(link)
      .then(() => {
        setCopy(true);
        const span = document.createElement('span');
        span.innerText = 'Link copiado!';
        document.querySelector('#new-card').appendChild(span);
      })
      .catch(() => null);
  };

  return (
    <div id="new-card">
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
        <img src={shareIcon} />
      </button>
      <button
        data-testid={`${index}-horizontal-favorite-btn`}
        src={isFavorite ? blackHeartIcon : whiteHeartIcon}
        onClick={() => {
          setIsFavorite(toggleFavorite(recipe));
          document.location.reload();
        }}
      >
        <img src={isFavorite ? blackHeartIcon : whiteHeartIcon} />
      </button>
      {/* <Link to={`/${type}s/${id}`}>
      <img src={image} data-testid={`${index}-horizontal-image`} />
      </Link> */}
      <button
        data-testid={`${index}-horizontal-image`}
        onClick={() => { redirect(`/${type}s/${id}`); } }
        src={image}
        >
        <img className='image' src={image} />
      </button>
    </div>
  );
};

export default NewCardFavoritos;
