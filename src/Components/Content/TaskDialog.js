import React from "react";
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';
 
export const AddNewChecklistModel=(props)=>{
    return(
      <div>
        <Dialog
          open={props.open}
          onClose={props.handleClose}

          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">{props.edit?"Edit Task" : "Add Task"}</DialogTitle>
          <DialogContent>
              <TextField
                autoFocus
                margin="dense"
                name="name"
                label="Task"
                type="text"
                fullWidth
                onChange={props.handleChange.bind(this)}
              />
          </DialogContent>
          <DialogActions>
            <Button onClick={props.handleClose} color="primary">
              Cancel
            </Button>
            <Button onClick={props.handleSubmit} color="primary">
              {props.edit ?
                "Edit":"Add"}
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    )
}