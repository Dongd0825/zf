import { ADD1, MINUS1, AsyncADD1 } from "../../action-types";

const initialState = {
  number: 0
}

function reducer(state = initialState, action: {type: string}) {
  switch(action.type) {
    case ADD1:
      return {
        number: state.number + 1,
      }
    case MINUS1:
      return {
        number: state.number - 1,
      }
    default:
      return state;
  }
}

export default reducer;