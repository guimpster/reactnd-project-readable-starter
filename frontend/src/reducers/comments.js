import {
    GET_COMMENTS,
    CREATE_COMMENT,
    UPDATE_COMMENT,
    DELETE_COMMENT,
    SELECT_POST
  } from '../constants/ActionTypes'

const initialState = {
    list: [],
    selectedComments: []
}

const comment = (state = initialState, action) => {
    switch(action.type) {
        case GET_COMMENTS:
            return {
                ...state,
                list: (action.comments || []).map((comment, idx) => ({ key: idx, ...comment }))
            }
        case SELECT_POST:
            return {
                ...state,
                selectedComments: state.list.filter(comment => comment.parentId === action.postId)
            }
        case CREATE_COMMENT:
            return {
                ...state,
                list: [{...action.comment, key: (state.list.length - 1)}].concat(state.list || []),
                selectedComments: [{...action.comment, key: (state.list.length - 1)}].concat(state.selectedComments || [])
            }
        case UPDATE_COMMENT:
            return {
                ...state,
                list: (state.list || []).reduce((acc, val) => action.comment.id === val.id ? [...acc, {...action.comment, key: val.key }] : [...acc, val], []),
                selectedComments: (state.selectedComments || []).reduce((acc, val) => action.comment.id === val.id ? [...acc, {...action.comment, key: val.key }] : [...acc, val], []),
            }
        case DELETE_COMMENT:
            return {
                ...state,
                list: (state.list || []).filter(comment => comment.id !== action.comment.id),
                selectedComments: (state.selectedComments || []).filter(comment => comment.id !== action.comment.id),
            }
        default:
            return state
    }
}

export default comment