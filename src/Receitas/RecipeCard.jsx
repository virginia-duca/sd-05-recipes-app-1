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
      <button
        onClick={() => redirect(`/${type}s/${id}`)}
        className="card-panel grey lighten-5 z-depth-1"
      >
        <div className="row valign-wrapper">
          <div className="col s4">
            <img src={image} alt="image" className="circle responsive-img" data-testid={`${index}-horizontal-image`} />
          </div>
          <div className="col s8">
            <div>
              {type === 'bebida' ? (
                <strong
                  className="card-title"
                  data-testid={`${index}-horizontal-top-text`}
                >{`${alcoholicOrNot}`}</strong>
              ) : (
                <strong
                  className="card-title"
                  data-testid={`${index}-horizontal-top-text`}
                >{`${area} - ${category}`}</strong>
              )}
            </div>
            {tags.map((tag) => (
              <div className="card-title" data-testid={`${index}-${tag}-horizontal-tag`}>
                {tag}
              </div>
            ))}
            <div className="card-title" data-testid={`${index}-horizontal-done-date`}>
              Feita em: {doneDate}
            </div>
            <hr />
            <div className="navigation">
              <button
                className="btn-floating btn"
                src={shareIcon}
                data-testid={`${index}-horizontal-share-btn`}
                onClick={() => toClipboard(`http://localhost:3000/${type}s/${id}`)}
              >
                <i class="material-icons white-text">share</i>
              </button>

            </div>
          </div>
        </div>
      </button>
    </div>
  );
};
NewCard.propTypes = {
  recipe: PropTypes.instanceOf(PropTypes.array).isRequired,
  index: PropTypes.number.isRequired,
  redirect: PropTypes.func.isRequired,
};
export default NewCard;
