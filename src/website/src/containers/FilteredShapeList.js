import { connect } from 'react-redux'
import { removeShape } from '../actions'
import ShapeList from '../components/App/ShapeList/ShapeList'
import { ShapeFilters } from '../actions'

const getVisibleShapes = (shapes, filter) => {
  switch (filter) {
    case ShapeFilters.SHOW_ALL:
      return shapes
    case ShapeFilters.SHOW_TRIANGLES:
      return Object.keys(shapes)
        .filter(key => shapes[key].sides === 3)
        .reduce((acc, nextKey) => {
          acc[nextKey] = shapes[nextKey];
          return acc;
        }, {});
    case ShapeFilters.SHOW_SQUARES:
      return Object.keys(shapes)
        .filter(key => shapes[key].sides === 4)
        .reduce((acc, nextKey) => {
          acc[nextKey] = shapes[nextKey];
          return acc;
        }, {});
    default:
      throw new Error('Unknown filter: ' + filter);
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    shapes: getVisibleShapes(state.shapes, ownProps.filter)
  }
}

const mapDispatchToProps = dispatch => ({
  removeShape: id => dispatch(removeShape(id))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ShapeList);