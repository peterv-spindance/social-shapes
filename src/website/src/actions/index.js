let nextShapeId = 0 // TODO: sync this initial value with the DB
const addShape = (sides, color) => {
  return async dispatch => {
    const shapeId = nextShapeId++;
    dispatch(requestAddShape(sides, color, shapeId));

    const response = await fetch(`https://buwrvdekig.execute-api.us-east-2.amazonaws.com/default/socialShapes`, {
      method: 'POST',
      body: JSON.stringify({
        TableName: 'shapes',
        Item: {
          shapeId,
          sides,
          color
        }
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    });

    // TODO: here is where we would add error handling by adding another action called ERROR_ADD_SHAPE and dispatching it if something went wrong
    if (response.ok) {
      dispatch(completeAddShape(shapeId));
    } else {
      console.dir(response);
    }
  }
}

const requestAddShape = (sides, color, id) => ({
  type: 'REQUEST_ADD_SHAPE',
  id,
  sides,
  color
})

const completeAddShape = (id) => ({
  type: 'COMPLETE_ADD_SHAPE',
  id
})

const removeShape = id => {
  return async dispatch => {
    dispatch(requestRemoveShape(id));

    const response = await fetch(`https://buwrvdekig.execute-api.us-east-2.amazonaws.com/default/socialShapes`, {
      method: 'DELETE',
      body: JSON.stringify({
        TableName: 'shapes',
        Key: {
          shapeId: id
        }
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    });

    // TODO: here is where we would add error handling by adding another action called ERROR_ADD_SHAPE and dispatching it if something went wrong
    if (response.ok) {
      dispatch(completeRemoveShape(id));
    } else {
      console.dir(response);
    }
  }
}

const requestRemoveShape = id => ({
  type: 'REQUEST_REMOVE_SHAPE',
  id
})

const completeRemoveShape = id => ({
  type: 'COMPLETE_REMOVE_SHAPE',
  id
})

const ShapeFilters = {
  SHOW_ALL: 'SHOW_ALL',
  SHOW_TRIANGLES: 'SHOW_TRIANGLES',
  SHOW_SQUARES: 'SHOW_SQUARES'
}

const setShapeFilter = filter => ({
  type: 'SET_SHAPE_FILTER',
  filter
})

export {
  addShape,
  removeShape,
  setShapeFilter,
  ShapeFilters
}