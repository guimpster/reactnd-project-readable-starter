import {
    GET_CATEGORIES
  } from '../constants/ActionTypes'

const initialState = []

const categories = (state = initialState, action) => {
    switch(action.type) {
        case GET_CATEGORIES:
            return (action.categories || []).map((category, idx) => ({ key: idx, ...category }))
        default:
            return state
    }
}

export default categories
