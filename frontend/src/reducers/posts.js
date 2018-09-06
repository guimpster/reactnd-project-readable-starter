import {
    CREATE_POST,
    UPDATE_POST,
    DELETE_POST
} from '../constants/ActionTypes'

const initialState = []

const post = (state = initialState, action) => {
    switch(action.type) {
        case CREATE_POST:
            return state
        case UPDATE_POST:
            return state
        case DELETE_POST:
            return state
        default:
            return state
    }
}

export default post