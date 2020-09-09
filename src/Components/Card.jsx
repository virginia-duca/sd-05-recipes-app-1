import React from 'react';
import PropTypes from 'prop-types';

import './Card.css';

const Card = ({ imageSrc, onClick, title }) => {
  return (
    <div as="Button" className="card" onClick={(ev) => { onClick(ev); }}>
      <div className="card-header">
        <img src={imageSrc} className="card-img" alt="Background Card" />
      </div>
      <div className="card-title">
        <h3>{title}</h3>
      </div>
    </div>
  )
};

Card.propTypes = {
  imageSrc: PropTypes.string,
  onClick: PropTypes.func,
  title: PropTypes.string.isRequired,
}

Card.defaultProps = {
  imageSrc: 'https://i.ytimg.com/vi/K4oJmxmuXYY/maxresdefault.jpg',
  onClick: () => {},
};

export default Card;
