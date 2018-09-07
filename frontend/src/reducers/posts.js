import {
    GET_POSTS,
    CREATE_POST,
    UPDATE_POST,
    DELETE_POST,
    SELECT_CATEGORY
} from '../constants/ActionTypes'

const initialState = {
    list: [],
    selectedPosts: [],
    selectedPost: {}
}

const post = (state = initialState, action) => {
    switch(action.type) {
        case GET_POSTS:
            return {
                ...state,
                list: (action.posts || []).map((post, idx) => ({ key: idx, ...post }))
            }
        case SELECT_CATEGORY:
            return {
                ...state,
                selectedPosts: action.categoryName === "all categories" ? state.list.slice() :
                                    state.list.filter(post => post.category === action.categoryName)

            }
        case CREATE_POST:
            return {
                ...state,
                list: [{...action.post, key: (state.list.length - 1)}].concat(state.list || []),
                selectedPosts: [{...action.post, key: (state.list.length - 1)}].concat(state.selectedPosts || [])
            }
        case UPDATE_POST:
            return state
        case DELETE_POST:
            return {
                ...state,
                list: (state.list || []).filter(post => post.id !== action.post.id),
                selectedPosts: (state.selectedPosts || []).filter(post => post.id !== action.post.id),
            }
        default:
            return state
    }
}

export default post