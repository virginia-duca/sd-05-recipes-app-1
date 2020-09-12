/** @format */

import React from 'react';
import PropTypes from 'prop-types';
import SmallCards from './SmallCard';

const RenderCategories = ({ categories, getValue }) =>
  categories.map(({ strCategory, idCategory }) => (
    <SmallCards key={idCategory} title={strCategory} onClick={(value) => getValue(value)} />
  ));

RenderCategories.propTypes = {
  categories: PropTypes.arrayOf(PropTypes.object).isRequired,
  getValue: PropTypes.func,
};
RenderCategories.defaultProps = {
  categories: [],
};

export default RenderCategories;
