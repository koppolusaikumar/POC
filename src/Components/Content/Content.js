import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import Checkbox from '@material-ui/core/Checkbox';
import { connect } from 'react-redux';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
 
import { deleteCard, addInnerCard, deleteInnerCard, addCkeckList, handleCheckBox, deleteChecked, editCkeckList } from './actions'
 
const styles = {
  allCards:{
    position: 'relative',
    display:'flex',
    flexFlow: 'wrap',
  },
  card: {
    minWidth: 500,
    minHeight:300,
    margin:30,
    height:500,
    overflow: 'auto',
  },
  cardLable:{
    margin:10,
  },
  addBut:{
      float: 'right'
  },
  delBut:{
    float: 'right',
    color: 'red',
    marginLeft: 20,
  },
  innerCard:{
    minWidth: 200,
    minHeight:200,
    margin:30,
    marginTop:50,
  },
  rightIcon:{
    top: 7,
    position: "relative",
  },
  editButton:{
    float:'right',
    color:'blue',
    marginTop:10,
  },
  checkListMain:{
    marginTop:30,
  }
 
};
 
class ContentCards extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            open: false,
            checkListTask:'',
            id:'',
            story:'',
            listNumber:'',
            edit:false
        };
    }
 
    handleClickOpen = (id, story) => {
        this.setState({ 
          open: true,
          id:id,
          story:story
         });
      };
    handleClickOpenToEdit = (id, story, listNumber) =>{
      this.setState({ 
        open: true,
        id:id,
        story:story,
        listNumber:listNumber,
        edit:true
       });
    }
 
    handleCheckBox = (id, story, listNumber) => {
      this.props.handleCheckBox(id, story, listNumber);
      };
    
      handleClose = () => {
        this.setState({ open: false, edit:false });
      };
    
      handleChange(event){
       event.preventDefault();  
        let checkListTask = event.target.value;
    
        this.setState({checkListTask})
      };
    
      handleSubmit = () => {
        console.log(this.state.edit)
        if(this.state.edit === true){
          this.props.editCkeckList(
            this.state.checkListTask,
            this.state.id,
            this.state.story,
            this.state.listNumber
            )
        }
        else{
          this.props.addCkeckList(
            this.state.checkListTask,
            this.state.id,
            this.state.story
          )
        }
        this.handleClose()
      };
 
    deleteCard = (id) => {
        this.props.deleteCard(id)
    }
    addInnerCard = (id) => {
        this.props.addInnerCard(id)
    }
    deleteInnerCard = (id, storyNo) => {
        this.props.deleteInnerCard(id, storyNo)
    }
   
    render(){
        const { classes } = this.props;
        return (
            <>
                <div className={classes.allCards}>
                    {this.props.cardArrayNames.map((val) =>{
                    return ( <Card className={classes.card} key={val.id}>
                                    <CardContent>
                                        <label className={classes.cardLable}>{val.name}</label>                                  
                                        <IconButton 
                                            aria-label="Delete" 
                                            className={classes.delBut} 
                                            onClick={() => this.deleteCard(val.id)}
                                            >
                                            <DeleteIcon />
                                        </IconButton>
                                        <Fab 
                                            size="small" 
                                            color="primary" 
                                            aria-label="Add" 
                                            className={classes.addBut} 
                                            onClick = {() =>this.addInnerCard(val.id)}>
                                            <AddIcon />
                                        </Fab>
                                        {val.innerCard.map((iVal)=>{
                                            return (
                                              <Card className={classes.innerCard}>
                                                <CardContent>
                                                    <label className={classes.cardLable}><b>{iVal.name} {iVal.story}</b></label>                                  
                                                    <IconButton 
                                                        size="small" 
                                                        aria-label="Delete" 
                                                        className={classes.delBut} 
                                                        onClick={() => this.deleteInnerCard(val.id, iVal.story)}
                                                        >
                                                        <DeleteIcon />
                                                    </IconButton>
                                                    <Fab
                                                        variant="extended"
                                                        size="small"
                                                        color="primary"
                                                        aria-label="Add"
                                                        className={classes.addBut}
                                                        onClick={() => this.handleClickOpen(val.id, iVal.story)}
                                                          
                                                        >
                                                        <AddIcon />
                                                    </Fab>
                                                    <div className={classes.checkListMain}>
                                                      {iVal.checkList.map((cVal)=>{
                                                        return (<div>
                                                        <Checkbox 
                                                          value="checked" 
                                                          color="primary" 
                                                          checked={cVal.isChecked}
                                                          onChange={() => this.props.handleCheckBox(val.id, iVal.story, cVal.listNumber)}
                                                        />
                                                        <span>{cVal.task}</span>
                                                        <Button 
                                                        size="small" 
                                                        color="secondary" 
                                                        className={classes.editButton} 
                                                        onClick={() => this.handleClickOpenToEdit(val.id, iVal.story, cVal.listNumber)}
                                                        >
                                                          Edit
                                                        </Button>
                                                        </div>
                                                        )
                                                        })}
                                                      </div>
                                                      <Button
                                                      variant="contained"
                                                      color="secondary"
                                                      style={(iVal.checkList.length === 0)? {display:'none'}:{display:'block'}}
                                                      className={classes.button}
                                                      onClick={() => this.props.deleteChecked(val.id, iVal.story)}
                                                      >
                                                      
                                                      Delete
                                                      <DeleteIcon
                                                      className={classes.rightIcon}
                                                      />
                                                      </Button>
                                                  </CardContent>
                                                </Card>
                                                  )
                                                  })}                                               
                                    </CardContent>
                                </Card>)}
                    )}
                </div>
                {this.addNewChecklistModel()}
            </>
        );
    }
 
    addNewChecklistModel=()=>{
        return(
          <div>
            <Dialog
              open={this.state.open}
              onClose={this.handleClose}
              aria-labelledby="form-dialog-title"
            >
              <DialogTitle id="form-dialog-title">Add Task</DialogTitle>
              <DialogContent>
                  <TextField
                    autoFocus
                    margin="dense"
                    name="name"
                    label="Task"
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
 
ContentCards.propTypes = {
  classes: PropTypes.object.isRequired
};
 
const mapStateToProps = state => ({
    cardArrayNames: state.cardArrayNames,
    cardNumber: state.cardNumber,
    innerCard:state.innerCard,
    checkList:state.checkList
})
 
const mapDispatchToProps = dispatch => ({
    deleteCard: cardNumber => dispatch(deleteCard(cardNumber)),
    addInnerCard: id => dispatch(addInnerCard(id)),
    deleteInnerCard: (id, storyNo) => dispatch(deleteInnerCard(id, storyNo)),
    addCkeckList: (task, id, story) => dispatch(addCkeckList(task, id, story)),
    handleCheckBox: (id, story, listNumber) => dispatch(handleCheckBox(id, story, listNumber)),
    deleteChecked: (id, story) => dispatch(deleteChecked(id, story)),
    editCkeckList: (task, id, story, listNumber) => dispatch(editCkeckList(task, id, story, listNumber))
  })
  
  export default connect(
    mapStateToProps,
    mapDispatchToProps
  )(withStyles(styles)(ContentCards))
 
