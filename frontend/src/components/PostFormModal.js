import * as R from 'ramda'

import React from 'react';
import PropTypes from 'prop-types';

import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Modal from '@material-ui/core/Modal';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import AddIcon from '@material-ui/icons/Add';

import If from './If'

function rand() {
  return Math.round(Math.random() * 20) - 10;
}

function getModalStyle() {
  const top = 50 + rand();
  const left = 50 + rand();

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const styles = theme => ({
  paper: {
    position: 'absolute',
    width: theme.spacing.unit * 50,
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing.unit * 4,
  },
  fab: {
    position: 'absolute',
    bottom: theme.spacing.unit * 2,
    right: theme.spacing.unit * 2,
  },
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 400,
  },
})

class SimpleModal extends React.Component {
  state = {
    open: false,
    post: {}
  }

  handleOpen = () => {
    const { post } = this.props
    this.setState({ open: true, post });
  }

  handleClose = () => {
    this.setState({ open: false });
  }

  handleSubmit = (e) => {
    const { submitHandler } = this.props

    const post = { 
      author: R.path(['author', 'value'], this.form),
      category: R.path(['category', 'value'], this.form),
      title: R.path(['title', 'value'], this.form),
      body: R.path(['body', 'value'], this.form),
    }

    e.preventDefault();

    this.handleClose()

    submitHandler(post)
  }

  render() {
    const {
      classes, 
      post, 
      selectedCategory,
      title,
      categories
    } = this.props;

    return (
      <div>
        <Button variant="fab" onClick={this.handleOpen} className={classes.fab} color="primary">
          <AddIcon/>
        </Button>
        <Modal
          aria-labelledby="simple-modal-title"
          aria-describedby="simple-modal-description"
          open={this.state.open}
          onClose={this.handleClose}
        >
          <div style={getModalStyle()} className={classes.paper}>
            <Typography variant="title">
              {title}
            </Typography>
            <Typography variant="subheading">
              <form id="postForm" 
                onSubmit={this.handleSubmit} 
                ref={form => (this.form = form)}
                className={classes.container} 
                /*noValidate*/ 
                autoComplete="off">
                <If test={selectedCategory.name !== "all categories"}>
                  <TextField
                    name="category"
                    type="hidden"
                    value={post.category}
                  />
                </If>
                <If test={selectedCategory.name === "all categories"}>
                  <TextField
                    name="category"
                    select
                    label="Category"
                    className={classes.textField}
                    value={post.category}
                    SelectProps={{
                      native: true,
                      MenuProps: {
                        className: classes.menu,
                      },
                    }}
                    helperText="Please select a category"
                    margin="normal"
                  >
                    {categories.filter(category => category.name !== "all categories").map(category => (
                      <option key={category.key} value={category.name}>
                        {category.name}
                      </option>
                    ))}
                  </TextField>
                </If>
                <TextField
                  id="title"
                  name="title"
                  label="Title"
                  required={true}
                  className={classes.textField}
                  value={post.title}
                  margin="normal"
                />
                <TextField
                  name="author"
                  label="Author"
                  required={true}
                  className={classes.textField}
                  value={post.author}
                  margin="normal"
                />
                <TextField
                  name="body"
                  label="Body"
                  required={true}
                  multiline={true}
                  className={classes.textField}
                  value={post.body}
                  margin="normal"
                />
                <Button
                  variant="contained"
                  color="primary"
                  type="submit"
                  form="postForm"
                >Submit</Button>
              </form>
            </Typography>
          </div>
        </Modal>
      </div>
    );
  }
}

SimpleModal.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SimpleModal);
