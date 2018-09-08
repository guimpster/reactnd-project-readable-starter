import React from 'react'
import PropTypes from 'prop-types'

const PostsList = ({ children }) => (
  <div>
    <div>{children}</div>
  </div>
)

PostsList.propTypes = {
  children: PropTypes.node,
}

export default PostsList
