import {
    CREATE_COMMENT,
    UPDATE_COMMENT,
    DELETE_COMMENT
  } from '../constants/ActionTypes'

const initialState = []

const comment = (state = initialState, action) => {
    switch(action.type) {
        case CREATE_COMMENT:
            return state
        case UPDATE_COMMENT:
            return state
        case DELETE_COMMENT:
            return state
        default:
            return state
    }
}

export default comment