const shapes = (state = {}, action) => {
  switch (action.type) {
    case 'REQUEST_ADD_SHAPE':
      return {
        ...state,
        [action.id]: {
          isSyncing: true,
          id: action.id,
          sides: action.sides,
          color: action.color
        }
      };
    case 'COMPLETE_ADD_SHAPE':
      return {
        ...state,
        [action.id]: {
          ...state[action.id],
          isSyncing: false,
        }
      };
    case 'REQUEST_REMOVE_SHAPE':
      return {
        ...state,
        [action.id]: {
          ...state[action.id],
          isSyncing: true,
        }
      };
    case 'COMPLETE_REMOVE_SHAPE':
      const { [action.id]: value, ...removed } = state;
      return removed;
    default:
      return state;
  }
}

export default shapes