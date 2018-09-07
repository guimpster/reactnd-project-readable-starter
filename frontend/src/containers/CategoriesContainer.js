import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { selectCategory, getAllPosts, getAllCategories } from '../actions'

class CategoriesContainer extends Component {

  componentDidMount() {
    const { selectCategory, getAllCategories, getAllPosts } = this.props

    getAllCategories()
      .then(() => getAllPosts())
      .then(() => selectCategory("all categories"))
  }

  render() {
    const { selectCategory, categories, /*selectedCategory*/ } = this.props

    return (
      <div>
        <div className="menu">
          {categories.map((category, idx) => (
            <p key={idx}>
              <Link className="close-search" to={category.path} onClick={() => selectCategory(category.name)}>{category.name}</Link>
            </p>        
          ))}    
        </div>
      </div>
    )
  }
}

CategoriesContainer.propTypes = {
  categories: PropTypes.arrayOf(PropTypes.shape({
    key: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    path: PropTypes.string.isRequired,
  })).isRequired
}

const mapStateToProps = state => ({
  categories: state.categories.list,
  selectedCategory: state.categories.selected
})

const mapDispatchToProps = (dispatch) => ({
  selectCategory: (categoryName) => dispatch(selectCategory(categoryName)),
  getAllCategories: () => dispatch(getAllCategories()),
  getAllPosts: () => dispatch(getAllPosts())
})

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(CategoriesContainer)
