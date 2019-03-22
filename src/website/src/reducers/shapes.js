const shapes = (state = [], action) => {
  switch (action.type) {
    case 'ADD_SHAPE':
      return [
        ...state,
        {
          id: action.id,
          sides: action.sides,
          color: action.color
        }
      ];
    case 'REMOVE_SHAPE':
      return state.filter(s => s.id !== action.id);
    default:
      return state;
  }
}

export default shapes