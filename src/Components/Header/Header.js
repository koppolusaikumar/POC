import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import { connect } from 'react-redux'
 
import {addNewCard} from './actions'
 
const styles = {
  root: {
    flexGrow: 1,
  },
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
};
 
class ButtonAppBar extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      open: false,
      cardName:''
    }
  }
  handleClickOpen = () => {
    this.setState({ open: true });
  };
 
  handleClose = () => {
    this.setState({ open: false });
  };
 
  handleChange(event){
    event.preventDefault();  
    let cardName = event.target.value;
    this.setState({cardName})
  };
 
 handleSubmit = () => {
    this.props.addNewCard(this.state.cardName)
    this.handleClose()
  };
 
  render(){
    const { classes } = this.props;
    return (
      <>
        <div className={classes.root}>
          <AppBar position="static">
            <Toolbar>
              <IconButton className={classes.menuButton} color="inherit" aria-label="Menu">
                <MenuIcon />
              </IconButton>
              <Typography variant="h6" color="inherit" className={classes.grow}>
                Card Management System
              </Typography>
              <Button color="inherit" onClick={this.handleClickOpen}>Add Card</Button>
            </Toolbar>
          </AppBar>
        </div>
        {this.addNewModel()}
      </>
  );
  }
  addNewModel=()=>{
    return(
      <div>
        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">Add New Card</DialogTitle>
          <DialogContent>
              <TextField
                autoFocus
                margin="dense"
                name="name"
                label="Name"
                type="text"
                fullWidth
                onChange={this.handleChange.bind(this)}
              />
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color="primary">
              Cancel
            </Button>
            <Button onClick={this.handleSubmit} color="primary">
              Add
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    )
  }
}
 
ButtonAppBar.propTypes = {
  classes: PropTypes.object.isRequired,
};
 
// const mapStateToProps = state => ({
//   todos: getVisibleTodos(state.todos, state.visibilityFilter)
// })
 
const mapDispatchToProps = dispatch => ({
  addNewCard: name => dispatch(addNewCard(name))
})
 
export default connect(
  null,
  mapDispatchToProps
)(withStyles(styles)(ButtonAppBar))
