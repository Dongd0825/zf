import { useDispatch, useSelector } from "../../react-redux";
import { ADD2, MINUS2 } from "../action-types";

function counter2Fun() {
  const store = useSelector((state) => state.counter2);
  const dispatch = useDispatch();

  return (
    <>
    {store.number}
    <button onClick={() => dispatch({type: ADD2})}>+</button>
    <button onClick={() => dispatch({type: MINUS2})}>-</button>
    </>
  )
}

export default counter2Fun;