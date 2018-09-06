import React from 'react'
import PropTypes from 'prop-types'

const CategoryItem = ({ category }) => (
  <div style={{ marginBottom: 20 }}>
    {category.name}
  </div>
)

CategoryItem.propTypes = {
  category: PropTypes.shape({
    key: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    path: PropTypes.string.isRequired,
  }).isRequired
}

export default CategoryItem
