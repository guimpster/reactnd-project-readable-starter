import {
    GET_CATEGORIES,
    SELECT_CATEGORY
  } from '../constants/ActionTypes'

const initialState = {
    list: [],
    selectedCategory: {}
}

const categories = (state = initialState, action) => {
    switch(action.type) {
        case GET_CATEGORIES:
            return {
                ...state,
                list: (action.categories || []).map((category, idx) => ({ key: idx, ...category }))
            }
        case SELECT_CATEGORY:
            return {
                ...state,
                selectedCategory: (state.list || []).reduce((acc, val) => action.categoryName === val.name ? val : acc, {})
            }
        default:
            return state
    }
}

export default categories
