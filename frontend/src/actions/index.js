import fetch from "node-fetch";

import * as types from "../constants/ActionTypes";

const getCategories = categories => ({
  type: types.GET_CATEGORIES,
  categories
});

const api = "http://localhost:3001"

// Generate a unique token for storing your bookshelf data on the backend server.
let token = localStorage.token
if (!token)
  token = localStorage.token = Math.random().toString(36).substr(-8)

const headers = {
  'Accept': 'application/json',
  'Authorization': token
}

export const getAllCategories = oldCategories => dispatch =>
  fetch(`${api}/categories`, { headers }).then(res => res.json()).then(data => dispatch(getCategories(data.categories)));
