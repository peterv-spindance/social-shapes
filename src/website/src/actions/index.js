let nextShapeId = 0 // TODO: sync this initial value with the DB
const addShape = (sides, color) => ({
  type: 'ADD_SHAPE',
  id: nextShapeId++,
  sides,
  color
})

const setShapeFilter = filter => ({
  type: 'SET_SHAPE_FILTER',
  filter
})

const removeShape = id => ({
  type: 'REMOVE_SHAPE',
  id
})

const ShapeFilters = {
  SHOW_ALL: 'SHOW_ALL',
  SHOW_TRIANGLES: 'SHOW_TRIANGLES',
  SHOW_SQUARES: 'SHOW_SQUARES'
}

export {
  addShape,
  setShapeFilter,
  removeShape,
  ShapeFilters
}