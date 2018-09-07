import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Route, Switch } from 'react-router-dom'
import Modal from 'react-modal'
import * as R from 'ramda'
//import { ArrowCircleRight } from 'react-icons/fa'

import { createPost, deletePost, getPostsByCategoryName } from '../actions'

import If from '../components/If'
import PostItem from '../components/PostItem'
import PostsList from '../components/PostsList'
//import PostDetails from '../components/PostDetails'
//import OrderButton from '../components/OrderButton'

Modal.setAppElement('#root');

class PostContainer extends Component {
    state = {
        postModalOpen: false
    }

    openPostModal = () => this.setState(() => ({ postModalOpen: true }))
    closePostModal = () => this.setState(() => ({ postModalOpen: false }))

    savePost = (e) => {
        const { createPost, getPosts } = this.props

        // TODO: better check
        e.preventDefault()

        const newPost = { 
            author: R.path(['author', 'value'], this.form),
            category: R.path(['category', 'value'], this.form),
            title: R.path(['title', 'value'], this.form),
            body: R.path(['body', 'value'], this.form),
        }

        createPost(newPost)
            .then(() => this.closePostModal())
            .then(() => getPosts())
    }

    removePost = (postId) => {
        const { deletePost, selectedCategory } = this.props

        deletePost(postId)
            .then(() => getPostsByCategoryName(selectedCategory.name))
    }

    render() {
        const { categories, selectedPosts, selectedCategory } = this.props
        const { postModalOpen } = this.state

        return (
            <div className="posts">
                <button className='icon-btn' onClick={() => this.openPostModal()}>
                    Add Post
                </button>

                <Switch>
                    {categories.map((category, idx) => (
                        <Route key={idx} path={`/${category.path}`}> 
                            <div className="posts">
                                Ordenar por 
                                    {/* <OrderButton prop="voteScore" text="Votes" onClick={getPosts}/> 
                                    <OrderButton prop="timestamp" text="Data" onClick={getPosts}/> */}
                                <PostsList title={`${category.name} posts`}>
                                    {selectedPosts.map((post, idx) => (
                                        <PostItem key={idx} post={post} removePost={this.removePost}/>
                                    ))}
                                </PostsList>
                            </div>
                        </Route>
                    ))}
                </Switch>

                <Modal
                    className='modal'
                    overlayClassName='overlay'
                    isOpen={postModalOpen}
                    onRequestClose={this.closePostModal}
                    contentLabel='Modal'
                >
                    <div>
                        <div className='form-container'>
                            <If test={selectedCategory.name}>
                                <h3 className='form-header'>
                                    Adding Post to {selectedCategory.name}
                                </h3>
                            </If>

                            <div className='form'>
                                <form onSubmit={this.savePost} ref={form => this.form = form}>
                                    <If test={selectedCategory.name}>
                                        <input
                                            type='hidden'
                                            value={selectedCategory.name}
                                            name="category"/>
                                    </If>
                                    <If test={!selectedCategory.name}>
                                        Category: <select name="category">
                                            {categories.map(category => (
                                                <option key={category.key} value={category.name}>{category.name}</option>
                                            ))}
                                        </select>
                                    </If>
                                    Title: <input
                                        className='post-input'
                                        type='text'
                                        placeholder='Title'
                                        name="title"
                                    />
                                    Author: <input
                                        className='post-input'
                                        type='text'
                                        placeholder='Author'
                                        name="author"
                                    />
                                    <textarea
                                        className='post-input'
                                        placeholder='Body'
                                        name="body"
                                    />

                                    <input type="submit" value="Submit" />
                                </form>
                            </div>
                        </div>
                    </div>
                </Modal>

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
