import React from 'react'
import PropTypes from 'prop-types'
import capitalize from 'capitalize'
import { withStyles } from '@material-ui/core/styles'
import classnames from 'classnames'
import moment from 'moment'
import Card from '@material-ui/core/Card'
import CardHeader from '@material-ui/core/CardHeader'
import CardContent from '@material-ui/core/CardContent'
import CardActions from '@material-ui/core/CardActions'
import Collapse from '@material-ui/core/Collapse'
import Avatar from '@material-ui/core/Avatar'
import IconButton from '@material-ui/core/IconButton'
import Typography from '@material-ui/core/Typography'
import red from '@material-ui/core/colors/red'
import ThumbUp from '@material-ui/icons/ThumbUp'
import ThumbDown from '@material-ui/icons/ThumbDown'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';


const styles = theme => ({
  card: {
    marginLeft: 8,
    marginRight: 8,
    marginBottom: 8,
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
  actions: {
    display: 'flex',
  },
  edition: {
    marginRight: -8,
    marginLeft: 'auto',
  },
  avatar: {
    backgroundColor: red[500],
  },
});

class PostCard extends React.Component {
  state = { expanded: false };

  handleExpandClick = () => this.setState(state => ({ expanded: !state.expanded }));

  render() {
    const { classes, post, removePost, vote, editPost } = this.props;

    return (
      <Card className={classes.card}>
        <CardHeader
          avatar={
            <Avatar aria-label="Avatar" className={classes.avatar}>
              {capitalize(post.author.charAt(0))}
            </Avatar>
          }
          action={
            <IconButton aria-label="Remove" onClick={() => removePost(post.id)}>
              <DeleteIcon />
            </IconButton>
          }
          title={post.title}
          subheader={`by ${post.author} \u00B7 ${moment(post.timestamp).fromNow()} \u00B7 99 comments`}
        />
        <CardActions className={classes.actions} disableActionSpacing>
          <IconButton color="secondary" aria-label="Like" onClick={() => vote({ postId: post.id, option: "upVote" })}>
            <ThumbUp /> 
          </IconButton> {post.voteScore}
          <IconButton color="primary" aria-label="Dislike" onClick={() => vote({ postId: post.id, option: "downVote" })}>
            <ThumbDown />
          </IconButton>
          <IconButton className={classes.edition} aria-label="Edit" onClick={() => editPost(post.id)}>
            <EditIcon />
          </IconButton>
        </CardActions>
      </Card>
    )
  }
}

// const PostItem = ({ post, removePost }) => (
//   <div style={{ marginBottom: 20 }}>
//     Post: {post.title}
//     <button className='icon-btn' onClick={() => removePost(post.id)}>
//         Remove Post
//     </button>
//   </div>
// )

PostCard.propTypes = {
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

export default withStyles(styles)(PostCard)
