//import * as R from 'ramda'
import uid from 'uid'

import * as types from '../constants/ActionTypes'
import * as api from '../api'


//
// Category actions
//
const getCategoriesAction = (categories) => ({
  type: types.GET_CATEGORIES,
  categories
})

export const getAllCategories = () => dispatch =>
  api.getCategories().then(categories => dispatch(getCategoriesAction(categories)))


export const selectCategory = (categoryName) => dispatch => (dispatch({
  type: types.SELECT_CATEGORY,
  categoryName
}))

//
// Post actions
//
const getPostsAction = (posts, categoryName) => ({
  type: types.GET_POSTS,
  posts,
  categoryName
})

// export const getPosts = ({ categoryName, sortByProps }) => async dispatch => {
//   let posts = []

//   if (categoryName)

//   R.pipe(
//     R.sortBy(R.prop('sortByProps')),
//     R.prop('sort', sortBy(...sortByProps)),
//     getPostsAction,
//     dispatch
//   )(posts)

//   return dispatch(getPostsAction(posts.sort())
// }
export const selectPosts = (categoryName) => dispatch => (dispatch({
  type: types.SELECT_POSTS,
  categoryName
}))

export const getPostsByCategoryName = categoryName => dispatch =>
  api.getCategoryPosts(categoryName).then(posts => dispatch(getPostsAction(posts, categoryName)))

export const getAllPosts = () => dispatch =>
  api.getPosts().then(posts => dispatch(getPostsAction(posts)))  

const createPostAction = post => ({
  type: types.CREATE_POST,
  post
})

export const createPost = post => dispatch =>
  api.createPost({...post, id: uid(), timestamp: Date.now()}).then(newPost => dispatch(createPostAction(newPost)))


const getPostAction = post => ({
  type: types.GET_POST,
  post
})

export const getPostById = id => dispatch =>
  api.getPost(id).then(post => dispatch(getPostAction(post)))

const updatePostAction = post => ({
  type: types.UPDATE_POST,
  post
})

export const voteOnPost = (id, option) => dispatch =>
  api.voteOnPost(id, option).then(post => dispatch(updatePostAction(post)))

export const updatePost = (id, option) => dispatch =>
  api.updatePost(id, option).then(post => dispatch(updatePostAction(post)))

const deletePostAction = id => ({
  type: types.DELETE_POST,
  post: { id },
})

export const deletePost = id => dispatch =>
  api.deletePost(id).then(res => dispatch(deletePostAction(id)))

export const selectPost = postId => dispatch => (dispatch({
    type: types.SELECT_POST,
    postId
}))

//
// Comments actions
//
const getCommentsAction = comments => ({
  type: types.GET_COMMENTS,
  comments
})

export const getCommentsByPostId = postId => dispatch =>
  api.getPostComments(postId).then(comments => dispatch(getCommentsAction(comments)))


const createCommentAction = comment => ({
  type: types.CREATE_COMMENT,
  comment
})

export const createComment = comment => dispatch => 
  api.createComment({...comment, id: uid(), timestamp: Date.now()}).then(newComment => dispatch(createCommentAction(newComment)))


const getCommentAction = comment => ({
  type: types.GET_COMMENT,
  comment
})

export const getCommentById = id => dispatch => 
  api.getComment(id).then(comment => dispatch(getCommentAction(comment)))

const updateCommentAction = (id, option) => ({
  type: types.UPDATE_COMMENT,
  comment: { id },
  option
})

export const voteOnComment = (id, option) => dispatch =>
  api.voteOnComment(id, option).then(comment => dispatch(updateCommentAction(comment)))

export const updateComment = (id, option) => dispatch =>
  api.updateComment(id, option).then(comment => dispatch(updateCommentAction(comment)))

const deleteCommentAction = id => ({
  type: types.DELETE_COMMENT,
  comment: { id }
})

export const deleteComment = id => dispatch =>
  api.deleteComment(id).then(res => dispatch(deleteCommentAction(id)))