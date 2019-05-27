
import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import { connect } from 'react-redux';
import Button from '@material-ui/core/Button';
import Checkbox from '@material-ui/core/Checkbox';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import { deleteCard, addInnerCard, deleteInnerCard, addCkeckList } from './actions'
 
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
  addCheckBut:{
      marginTop:40,
      height:20,
  }
};

 
class ContentCards extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            open: false,
            checkListTask:'',
            id:'',
            story:''
        };
    }

    handleClickOpen = (id, story) => {
        this.setState({ 
          open: true,
          id:id,
          story:story
         });
      };

      handleClose = () => {
        this.setState({ open: false });
      };

      handleChange(event){
        event.preventDefault(); 
        let checkListTask = event.target.value;
        this.setState({checkListTask})
      };

      handleSubmit = () => {
        this.props.addCkeckList(this.state.checkListTask, this.state.id, this.state.story)
        this.handleClose()
      };

    deleteCard = (id) => {
        console.log(id);
        this.props.deleteCard(id)
    }
    addInnerCard = (id) => {
        this.props.addInnerCard(id)
    }
    deleteInnerCard = (storyNo) => {
        this.props.deleteInnerCard(storyNo)
    }
    render(){
        const { classes } = this.props;
        //console.log('state', this.state);
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
                                        {this.props.innerCard.map((iVal)=>{
                                            return (iVal.id === val.id ? <Card className={classes.innerCard}>
                                                        <CardContent>
                                                            <label className={classes.cardLable}><b>{iVal.name} {iVal.story}</b></label>                                 
                                                            <IconButton
                                                                size="small"
                                                                aria-label="Delete"
                                                                className={classes.delBut}
                                                                onClick={() => this.deleteInnerCard(iVal.story)}
                                                                >
                                                                <DeleteIcon />
                                                            </IconButton>
                                                            <Fab
                                                                variant="extended"
                                                                size="small"
                                                                color="primary"
                                                                aria-label="Add"
                                                                className={classes.addBut}
                                                                onClick={() => this.handleClickOpen(iVal.id, iVal.story)}
                                                                >
                                                                <AddIcon />
                                                            </Fab>
                                                            {this.props.checkList.map((cVal) =>{
                                                              console.log( iVal.story, iVal.id)
                                                              return (iVal.story === val.id ? 
                                                                <div>
                                                                  <Checkbox
                                                                    value="checked"
                                                                    color="primary"
                                                                  />
                                                                <span>{cVal.task}</span>                                                                
                                                              </div>
                                                              :null)
                                                            })}
                                                                  <Button variant="contained" color="secondary" className={classes.button}>
                                                                  Delete
                                                                  <DeleteIcon className={classes.rightIcon} />
                                                                </Button>
                                                        </CardContent>
                                                    </Card> : null
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
    deleteInnerCard: storyNo => dispatch(deleteInnerCard(storyNo)),
    addCkeckList: (task, id, story) => dispatch(addCkeckList(task, id, story))
  })

  export default connect(
    mapStateToProps,
    mapDispatchToProps
  )(withStyles(styles)(ContentCards))