import { ShapeFilters } from '../actions';

const shapeFilter = (state = ShapeFilters.SHOW_ALL, action) => {
  switch (action.type) {
    case 'SET_SHAPE_FILTER':
      return action.filter
    default:
      return state
  }
}

export default shapeFilter;