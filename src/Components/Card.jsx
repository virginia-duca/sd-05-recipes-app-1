/** @format */

import React from 'react';
import PropTypes from 'prop-types';

import './Card.css';

const Card = ({ imageSrc, onClick, title, index, testIdArray, className }) => (
  <div
    className={`card ${className}`}
    onClick={(ev) => { onClick(ev); }}
    data-testid={`${index}${testIdArray[0]}`}
    
  >
    <div className="card-header">
      <img
        src={imageSrc}
        data-testid={`${index}${testIdArray[1]}`}
        className="card-img"
        alt="Background Card"
      />
    </div>
    <div className="card-title">
      <h3 data-testid={`${index}${testIdArray[2]}`}>{title}</h3>
    </div>
  </div>
);

Card.propTypes = {
  imageSrc: PropTypes.string,
  onClick: PropTypes.func,
  title: PropTypes.string.isRequired,
  testIdArray: PropTypes.arrayOf(PropTypes.string).isRequired,
  index: PropTypes.number,
  className: PropTypes.string,
};

Card.defaultProps = {
  className: '',
  imageSrc: 'https://i.ytimg.com/vi/K4oJmxmuXYY/maxresdefault.jpg',
  onClick: () => {},
  index: 0,
};

export default Card;
