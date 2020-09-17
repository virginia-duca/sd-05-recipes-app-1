/** @format */

import React from 'react';
import PropTypes from 'prop-types';
import shareIcon from '../images/shareIcon.svg';
import './carddss.css';
import { toClipboard } from '../Services/Utils';

const NewCard = ({ recipe, index, redirect }) => {
  const { type, id, area, category, alcoholicOrNot, name, image, tags, doneDate } = recipe;

  return (
    <div className="clipboard">
      <button onClick={() => redirect(`/${type}s/${id}`)}>
        <img
          className="card-img-1"
          src={image}
          alt="Done Food or Drink"
          data-testid={`${index}-horizontal-image`}
        />
      </button>
      <div>
        <button
          src={shareIcon}
          data-testid={`${index}-horizontal-share-btn`}
          onClick={() => toClipboard(`http://localhost:3000/${type}s/${id}`)}
        >
          <img src={shareIcon} alt="share" />
        </button>
        <div>
          {type === 'bebida' ? (
            <p
              className="card-title"
              data-testid={`${index}-horizontal-top-text`}
            >{`${alcoholicOrNot}`}</p>
          ) : (
            <p
              className="card-title"
              data-testid={`${index}-horizontal-top-text`}
            >{`${area} - ${category}`}</p>
          )}
        </div>
        <div>
          <button onClick={() => redirect(`/${type}s/${id}`)}>
            <p className="card-title" data-testid={`${index}-horizontal-name`}>
              {name}
            </p>
          </button>
        </div>
        <p className="card-title" data-testid={`${index}-horizontal-done-date`}>
          Feita em: {doneDate}
        </p>
      </div>
      <div>
        {tags.map((tag) => (
          <p className="card-title" data-testid={`${index}-${tag}-horizontal-tag`}>
            {tag}
          </p>
        ))}
      </div>
    </div>
  );
};
NewCard.propTypes = {
  recipe: PropTypes.instanceOf(PropTypes.array).isRequired,
  index: PropTypes.number.isRequired,
  redirect: PropTypes.func.isRequired,
};
export default NewCard;
