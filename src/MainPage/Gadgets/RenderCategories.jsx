import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import SmallCards from './SmallCard';

const RenderCategories = ({ categories, getValue }) => {

  return categories.map(({ strCategory, idCategory }) => (
    <SmallCards
      key={`${idCategory}-${Math.random() * 1E5}`}
      title={strCategory.split('/')[0].trim()}
      onClick={(value) => getValue(value)}
    />
  ));
}


RenderCategories.propTypes = {
  categories: PropTypes.arrayOf(PropTypes.object).isRequired,
  getValue: PropTypes.func,
};
RenderCategories.defaultProps = {
  categories: [],
};

export default RenderCategories;
