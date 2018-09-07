import React from 'react'
import CategoriesContainer from './CategoriesContainer'
import PostsContainer from './PostsContainer'

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
    <h2>Readable</h2>
    <hr/>
      <CategoriesContainer />
      <PostsContainer />
    <hr/>
  </div>
)

export default withStyles(styles, { withTheme: true })(App);
