import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Route, Switch } from 'react-router-dom'

import { createPost, deletePost, updatePost, voteOnPost, selectPost, createComment, updateComment, getCommentsByPostId } from '../actions'

import PostCard from '../components/PostCard'
import PostCardDetails from './PostCardDetails'
import PostFormDialog from '../components/PostFormDialog'
//import PostDetails from '../components/PostDetails'
import OrderByMenu from '../components/OrderByMenu'

import { withStyles } from '@material-ui/core/styles'
import AddIcon from '@material-ui/icons/Add'
import Button from '@material-ui/core/Button';

const styles = theme => ({
    fab: {
      position: 'absolute',
      bottom: theme.spacing.unit * 2,
      right: theme.spacing.unit * 2,
    },
})
class PostsView extends Component {
    state = {
        postForm: {},
        openDialog: false,
    }

    submitHandler = postForm => {
        const { createPost, updatePost } = this.props

        debugger;

        postForm.id ? updatePost(postForm) : createPost(postForm)
    }

    closeDialog = () => 
        this.setState({ postForm: {}, openDialog: false })
    

    addPost = () => {
        const { selectedCategory } = this.props

        this.setState({ postForm: { category: selectedCategory.name}, openDialog: true })
    }

    editPost = post =>
        this.setState({ postForm: post, openDialog: true })
    

    render() {
        const { 
            classes,
            categories, 
            selectedPosts, 
            selectedCategory, 
            vote, 
            removePost, 
            sortPosts,
            posts,
            selectPost,
        } = this.props

        const { postForm, openDialog } = this.state

        return (
            <div style={ { height: 500, "overflowY": "auto" } }>

                <Button variant="fab" onClick={this.addPost} className={classes.fab} color="primary">
                    <AddIcon/>
                </Button>
                <PostFormDialog
                    selectedCategory={selectedCategory}
                    categories={categories}
                    submitHandler={this.submitHandler}
                    closeDialog={this.closeDialog}
                    openDialog={openDialog}
                    post={postForm}/>

                <OrderByMenu 
                    sortBy={ [{name: "voteScore", text: "vote"}, {name: "timestamp", text: "date"}]} 
                    toggleClickHandler={sortPosts}
                />

                <Switch>
                    {categories.map((category, idx) => (
                        <Route key={idx} exact path={`/${category.path}`}> 
                            <div className="posts">
                                {selectedPosts.map((post, idx) => (
                                    <PostCard 
                                        key={idx} 
                                        post={post} 
                                        vote={vote}
                                        removePost={removePost}
                                        editPost={this.editPost}
                                        selectPost={selectPost}/>
                                ))}
                            </div>
                        </Route>
                    ))}

                    {posts.map((post, idx) => (
                         <Route 
                            key={categories.length+idx} 
                            exact path={`/${post.category}/${post.id}`}
                            render={(props) => 
                                <PostCardDetails
                                    { ...props }
                                    key={categories.length+idx}
                                    post={post}
                                    vote={vote}
                                    removePost={removePost}
                                    editPost={this.editPost}/>}
                            >
                            
                        </Route>
                    ))}
                </Switch>
                <br/><br/><br/>

            </div>
        )
    }
}

PostsView.propTypes = {
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
    selectedComments: state.comments.selectedComments,
    comments: state.comments.list,    
})

const mapDispatchToProps = (dispatch) => ({
    createPost: post => dispatch(createPost(post)),
    removePost: postId => dispatch(deletePost(postId)),
    vote: ({ postId, option }) => dispatch(voteOnPost(postId, option)),
    sortPosts: (param, direction) => {
        console.log(param, direction)
        //dispatch(getPostsByCategoryName())
    },
    updatePost: post => dispatch(updatePost(post)),
    selectPost: postId => dispatch(selectPost(postId)),
    getCommentsByPostId: () => dispatch(getCommentsByPostId()),
    createComment: comment => dispatch(createComment(comment)),
    updateComment: comment => dispatch(updateComment(comment))
})


export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(PostsView))
