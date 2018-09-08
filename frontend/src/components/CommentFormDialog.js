import React, { Component } from 'react';
import * as R from 'ramda'
//import PropTypes from 'prop-types';

import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';

class CommentFormDialog extends Component {
  
  handleSubmit = (e) => {
    const { submitHandler, closeDialog } = this.props

    const comment = { 
      parentId: R.path(['parentId', 'value'], this.form),
      author: R.path(['author', 'value'], this.form),
      body: R.path(['body', 'value'], this.form),
    }

    e.preventDefault();

    submitHandler(comment)

    closeDialog()
  }

  render() {
    const {
        closeDialog,
        comment, 
        openDialog,
        title,
      } = this.props;

    return (
      <div>
        <Dialog
          open={openDialog}
          onClose={closeDialog}
          aria-labelledby="form-dialog-title"
        >
        <form id="commentForm" 
            onSubmit={this.handleSubmit} 
            ref={form => (this.form = form)}
            /*noValidate*/ 
            autoComplete="off">
          <DialogTitle id="form-dialog-title">{title}</DialogTitle>
          <DialogContent>
                <TextField
                  name="parentId"
                  type="hidden"
                  value={comment.parentId}
                />
                <TextField
                  name="author"
                  label="Author"
                  margin="dense"
                  required={true}
                  value={comment.author}
                  fullWidth
                />
                <TextField
                  name="body"
                  label="Body"
                  required={true}
                  multiline={true}
                  margin="dense"
                  value={comment.body}
                  fullWidth
                />
            </DialogContent>
            <DialogActions>
                <Button
                    variant="contained"
                    color="primary"
                    type="submit"
                    form="commentForm"
                >Submit</Button>
            </DialogActions>
          </form>
        </Dialog>
      </div>
    );
  }
}

export default CommentFormDialog