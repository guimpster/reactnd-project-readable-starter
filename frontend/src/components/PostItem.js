import React from 'react'
import PropTypes from 'prop-types'

const PostItem = ({ post, removePost }) => (
  <div style={{ marginBottom: 20 }}>
    Post: {post.title}
    <button className='icon-btn' onClick={() => removePost(post.id)}>
        Remove Post
    </button>
  </div>
)

PostItem.propTypes = {
  post: PropTypes.shape({
    key: PropTypes.number.isRequired,
    author: PropTypes.string.isRequired,
    body: PropTypes.string.isRequired,
    category: PropTypes.string.isRequired,
    commentCount: PropTypes.number.isRequired,
    deleted: PropTypes.bool.isRequired,
    id: PropTypes.string.isRequired,
    timestamp: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    voteScore: PropTypes.number.isRequired,
  }).isRequired
}

export default PostItem
