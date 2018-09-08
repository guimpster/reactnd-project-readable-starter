import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Route, Switch } from 'react-router-dom'

import { createPost, deletePost, getPostsByCategoryName, voteOnPost } from '../actions'

import PostCard from '../components/PostCard'
import PostFormModal from '../components/PostFormModal'
//import PostDetails from '../components/PostDetails'
//import OrderButton from '../components/OrderButton'

class PostsBody extends Component {
    render() {
        const { categories, selectedPosts, selectedCategory, vote, createPost, removePost } = this.props

        return (
            <div style={ { height: 500, "overflow-y": "auto" } }>
                <PostFormModal
                    selectedCategory={selectedCategory}
                    categories={categories}
                    submitHandler={createPost}
                    post={{ category: selectedCategory.name}}
                    btnText="Add New Post"
                    title="Add New Post"/>
                <br/><br/>
                Ordenar por 
                    {/* <OrderButton prop="voteScore" text="Votes" onClick={getPosts}/> 
                    <OrderButton prop="timestamp" text="Data" onClick={getPosts}/> */}

                <Switch>
                    {categories.map((category, idx) => (
                        <Route key={idx} path={`/${category.path}`}> 
                            <div className="posts">
                                {selectedPosts.map((post, idx) => (
                                    <PostCard 
                                        key={idx} 
                                        post={post} 
                                        vote={vote}
                                        removePost={removePost}/>
                                ))}
                            </div>
                        </Route>
                    ))}
                </Switch>
                <br/><br/><br/>

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

PostsBody.propTypes = {
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
    removePost: postId => dispatch(deletePost(postId)),
    vote: ({ postId, option }) => dispatch(voteOnPost(postId, option)),
    getPostsByCategoryName: categoryName => dispatch(getPostsByCategoryName(categoryName))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PostsBody)
