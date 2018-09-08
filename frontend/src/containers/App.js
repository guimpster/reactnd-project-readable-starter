import React from 'react'
import CategoriesHeader from './CategoriesHeader'
import PostsBody from './PostsBody'

import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
  root: {
    backgroundColor: theme.palette.background.paper,
    width: 600,
    position: 'relative',
    minHeight: 200,
  },
})

const App = ({ classes }) => (
  <div className={classes.root}>
    <CategoriesHeader />
    <PostsBody />
  </div>
)

export default withStyles(styles, { withTheme: true })(App);
