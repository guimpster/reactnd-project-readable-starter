import React from 'react'
import CategoriesContainer from './CategoriesContainer'
import PostsContainer from './PostsContainer'

const App = () => (
  <div>
    <h2>Readable</h2>
    <hr/>
      <CategoriesContainer />
      <PostsContainer />
    <hr/>
  </div>
)

export default App