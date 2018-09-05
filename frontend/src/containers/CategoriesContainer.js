import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import { getCategories } from '../reducers/categories'

import CategoryItem from '../components/CategoryItem'
import CategoriesList from '../components/CategoriesList'

const CategoriesContainer = ({ categories }) => (
  <CategoriesList title="Categories">
    {categories.map(category =>
      <CategoryItem
        key={category.id}
        category={category}
        />
    )}
  </CategoriesList>
)

CategoriesContainer.propTypes = {
  categories: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    path: PropTypes.string.isRequired,
  })).isRequired
}

const mapStateToProps = state => ({
  categories: getCategories(state.categories)
})

export default connect(
  mapStateToProps,
)(CategoriesContainer)
