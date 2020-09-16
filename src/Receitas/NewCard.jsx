import React from 'react';
import PropTypes from 'prop-types';
import shareIcon from '../images/shareIcon.svg';
import { toClipboard } from '../Services/Utils';

const NewCard = ({ recipe, index }) => {
  const {
    type,
    id,
    area,
    category,
    alcoholicOrNot,
    name,
    image,
    tags,
    doneDate,
  } = recipe;

  return (
    <div className="clipboard">
      <img
        src={image}
        alt="Done Food or Drink"
        data-testid={`${index}-horizontal-image`}
      />
      <div>
        {type === 'bebida' ? (
          <p
            data-testid={`${index}-horizontal-top-text`}
          >{`${alcoholicOrNot}`}</p>
        ) : (
          <p
            data-testid={`${index}-horizontal-top-text`}
          >{`${area} - ${category}`}</p>
        )}
      </div>
      <button
        src={shareIcon}
        data-testid={`${index}-horizontal-share-btn`}
        onClick={() => toClipboard(`http://localhost:3000/${type}s/${id}`)}
      >
        <img src={shareIcon} alt="share" />
      </button>
      <div>
        <p data-testid={`${index}-horizontal-name`}>{name}</p>
        <p data-testid={`${index}-horizontal-done-date`}>
          Feita em: {doneDate}
        </p>
      </div>
      <div>
        {tags.map((tag, i) => (
          <p data-testid={`${i}-${tag}-horizontal-tag`}>{tag}</p>
        ))}
      </div>
    </div>
  );
};

NewCard.propTypes = {
  recipes: PropTypes.instanceOf(PropTypes.any).isRequired,
  index: PropTypes.number.isRequired,
};

export default NewCard;
