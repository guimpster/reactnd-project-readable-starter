import React from 'react'
import PropTypes from 'prop-types'

const PostsList = ({ children }) => (
  <div>
    <h3></h3>
    <div>{children}</div>
  </div>
)

PostsList.propTypes = {
  children: PropTypes.node,
}

export default PostsList
