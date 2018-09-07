import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Route, Switch } from 'react-router-dom'

import { createPost, deletePost, getPostsByCategoryName } from '../actions'

import PostItem from '../components/PostItem'
import PostsList from '../components/PostsList'
import PostFormModal from '../components/PostFormModal'
//import PostDetails from '../components/PostDetails'
//import OrderButton from '../components/OrderButton'

class PostContainer extends Component {

    savePost = (post) => this.props.createPost(post)

    removePost = (postId) => this.props.deletePost(postId)

    render() {
        const { categories, selectedPosts, selectedCategory } = this.props

        return (
            <div className="posts">
                <PostFormModal
                    selectedCategory={selectedCategory}
                    categories={categories}
                    submitHandler={this.savePost}
                    post={{ category: selectedCategory.name}}
                    btnText="Add New Post"
                    title="Add New Post"/>
                <br/><br/>
                Ordenar por 
                    {/* <OrderButton prop="voteScore" text="Votes" onClick={getPosts}/> 
                    <OrderButton prop="timestamp" text="Data" onClick={getPosts}/> */}
                <hr></hr>

                <Switch>
                    {categories.map((category, idx) => (
                        <Route key={idx} path={`/${category.path}`}> 
                            <div className="posts">
                                
                                <PostsList>
                                    {selectedPosts.map((post, idx) => (
                                        <PostItem key={idx} post={post} removePost={this.removePost}/>
                                    ))}
                                </PostsList>
                            </div>
                        </Route>
                    ))}
                </Switch>

                {/* <Route name="/:categoryPath/:postId">
                    <div className="post-details">
                        <PostDetails>

                        </PostDetails>
                    </div>
                </Route> */}
            </div>
        )
    }
}

PostContainer.propTypes = {
    posts: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.string.isRequired,
      timestamp: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
      body: PropTypes.string.isRequired,
      author: PropTypes.string.isRequired,
      category: PropTypes.string.isRequired,
      voteScore: PropTypes.number.isRequired,
      deleted: PropTypes.bool.isRequired
    })).isRequired
  }

const mapStateToProps = state => ({
    categories: state.categories.list,
    selectedCategory: state.categories.selectedCategory,
    selectedPosts: state.posts.selectedPosts,
    posts: state.posts.list,
})

const mapDispatchToProps = (dispatch) => ({
    createPost: post => dispatch(createPost(post)),
    deletePost: postId => dispatch(deletePost(postId)),
    getPostsByCategoryName: categoryName => dispatch(getPostsByCategoryName(categoryName))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PostContainer)
