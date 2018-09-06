import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import CategoryItem from '../components/CategoryItem'
import CategoriesList from '../components/CategoriesList'

const CategoriesContainer = ({ categories }) => (
  <CategoriesList title="Categories">
    {categories.map(category =>
      <CategoryItem
        key={category.key}
        category={category}
        />
    )}
  </CategoriesList>
)

CategoriesContainer.propTypes = {
  categories: PropTypes.arrayOf(PropTypes.shape({
    key: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    path: PropTypes.string.isRequired,
  })).isRequired
}

const mapStateToProps = state => ({
  categories: state.categories
})

export default connect(
  mapStateToProps,
)(CategoriesContainer)
