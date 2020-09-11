/** @format */

import React from 'react';
import PropTypes from 'prop-types';

const SmallCards = ({ title, onClick }) => (
  <button
    type="button"
    className="small-card"
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
