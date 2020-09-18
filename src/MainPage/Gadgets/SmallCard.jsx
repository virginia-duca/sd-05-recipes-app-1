import React from 'react';
import PropTypes from 'prop-types';

import './style.css';

const SmallCards = ({ title, onClick }) => (
  <button
    type="button"
    className="btn btn-small btn-flat white-text btn-category"
    data-testid={`${title}-category-filter`}
    onClick={() => {
      onClick(title);
    }}
  >
    {title}
  </button>
);

SmallCards.propTypes = {
  title: PropTypes.string.isRequired,
  onClick: PropTypes.func,
};

SmallCards.defaultProps = {
  onClick: () => {},
};

export default SmallCards;
