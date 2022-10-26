import { reject } from 'lodash';
import * as types from '../../action-types';

const actions = {
    add1() {
        return { type: types.ADD1 };
    },
    minus1() {
        return { type: types.MINUS1 };
    },
    thunkAdd() {
        return function({getState, dispatch}) {
            setTimeout(() => {
                dispatch({
                    type: types.ADD1
                })
            }, 1000)
        }
    },
    promiseAdd() {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve({
                    type: types.ADD1
                });
            }, 1000)
        })
    }
}
export default actions;