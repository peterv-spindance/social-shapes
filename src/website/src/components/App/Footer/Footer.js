import React from 'react';
import FilterLink from '../../../containers/FilterLink';
import { ShapeFilters } from '../../../actions';

const Footer = () => (
  <p>
    Show: <FilterLink filter={ShapeFilters.SHOW_ALL}>All</FilterLink>
    {', '}
    <FilterLink filter={ShapeFilters.SHOW_TRIANGLES}>Triangles</FilterLink>
    {', '}
    <FilterLink filter={ShapeFilters.SHOW_SQUARES}>Squares</FilterLink>
  </p>
);

export default Footer;