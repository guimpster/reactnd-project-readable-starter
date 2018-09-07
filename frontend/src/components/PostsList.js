import React from 'react'
import PropTypes from 'prop-types'

const PostsList = ({ title, children }) => (
  <div>
    <h3>{title}</h3>
    <div>{children}</div>
  </div>
)

PostsList.propTypes = {
  children: PropTypes.node,
  title: PropTypes.string.isRequired
}

export default PostsList
