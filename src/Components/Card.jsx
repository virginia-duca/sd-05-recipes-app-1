/** @format */

import React from 'react';
import PropTypes from 'prop-types';

import './Card.css';

const Card = ({ imageSrc, onClick, title, index }) => (
  <button
    className='card'
    onClick={(ev) => {
      onClick(ev);
    }}
    data-testid={`${index}-recipe-card`}>
    <div className='card-header'>
      <img
        src={imageSrc}
        data-testid={`${index}-card-img`}
        className='card-img'
        alt='Background Card'
      />
    </div>
    <div className='card-title'>
      <h3 data-testid={`${index}-card-name`}>{title}</h3>
    </div>
  </button>
);

Card.propTypes = {
  imageSrc: PropTypes.string,
  onClick: PropTypes.func,
  title: PropTypes.string.isRequired,
  index: PropTypes.number,
};

Card.defaultProps = {
  imageSrc: 'https://i.ytimg.com/vi/K4oJmxmuXYY/maxresdefault.jpg',
  onClick: () => {},
  index: 0,
};

export default Card;
