import { connect } from 'react-redux'
import { removeShape } from '../actions'
import ShapeList from '../components/App/ShapeList/ShapeList'
import { ShapeFilters } from '../actions'

const getVisibleShapes = (shapes, filter) => {
  switch (filter) {
    case ShapeFilters.SHOW_ALL:
      return shapes
    case ShapeFilters.SHOW_TRIANGLES:
      return shapes.filter(s => s.sides === 3);
    case ShapeFilters.SHOW_SQUARES:
      return shapes.filter(s => s.sides === 4);
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