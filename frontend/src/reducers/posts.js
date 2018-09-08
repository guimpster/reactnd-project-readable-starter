import {
    GET_POSTS,
    CREATE_POST,
    UPDATE_POST,
    DELETE_POST,
    SELECT_CATEGORY,
    SELECT_POST,
    CREATE_COMMENT,
    DELETE_COMMENT
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
        case SELECT_POST:
            return {
                ...state,
                selectedPost: (state.list || []).reduce((acc, val) => action.postId === val.id ? val : acc, {})
            }
        case CREATE_POST:
            return {
                ...state,
                list: [{...action.post, key: (state.list.length - 1)}].concat(state.list || []),
                selectedPosts: [{...action.post, key: (state.list.length - 1)}].concat(state.selectedPosts || [])
            }
        case UPDATE_POST:
            return {
                ...state,
                list: (state.list || []).reduce((acc, val) => action.post.id === val.id ? [...acc, {...action.post, key: val.key }] : [...acc, val], []),
                selectedPosts: (state.list || []).reduce((acc, val) => action.post.id === val.id ? [...acc, {...action.post, key: val.key }] : [...acc, val], []),
                selectedPost: { ...action.post }
            }
        case CREATE_COMMENT:
            return {
                ...state,
                selectedPost: { ...state.selectedPost, commentCount: state.selectedPost.commentCount+1 }
            }
        case DELETE_COMMENT:
            return {
                ...state,
                selectedPost: { ...state.selectedPost, commentCount: state.selectedPost.commentCount-1 }
            }
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