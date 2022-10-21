import { ADD2, MINUS2 } from "../../action-types";

const initialState = {
  number: 0
}

function reducer(state = initialState, action: {type: string}) {
  switch(action.type) {
    case ADD2:
      return {
        number: state.number + 1,
      }
    case MINUS2:
      return {
        number: state.number - 1,
      }
    default:
      return state;
  }
}

export default reducer;