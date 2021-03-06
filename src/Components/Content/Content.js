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
import {AddNewChecklistModel} from './TaskDialog'
import CheckList from './CheckList';
import {styles} from './Style';
import { deleteCard, addInnerCard, deleteInnerCard, addCkeckList, handleCheckBox, deleteChecked, editCkeckList } from './actions';

class ContentCards extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            open: false,
            checkListTask:'',
            id:'',
            story:'',
            listNumber:'',
            edit:false,
            addInner:false
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

    handleClickOpenToAddInnerCard = (id) =>{
      this.setState({
       open: true,
        id:id,
        addInner:true
       });
    }
 
    handleCheckBox = (id, story, listNumber) => {
      this.props.handleCheckBox(id, story, listNumber);
      };
   
      handleClose = () => {
        this.setState({ open: false, edit:false, addInner:false });
      };
   
      handleChange(event){
        event.preventDefault(); 
        let checkListTask = event.target.value;
        this.setState({checkListTask})
      }
   
      handleSubmit = () => {
        if(this.state.edit === true){
          this.props.editCkeckList(
            this.state.checkListTask,
            this.state.id,
            this.state.story,
            this.state.listNumber
            )
        }
        else if (this.state.addInner === true) {
          this.props.addInnerCard(
            this.state.id,
            this.state.checkListTask
            )
        } else{
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
    // addInnerCard = (id) => {
    //     this.props.addInnerCard(id)
    // }
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
                                            onClick = {() =>this.handleClickOpenToAddInnerCard(val.id)}>
                                            <AddIcon />
                                        </Fab>
                                        {val.innerCard.map((iVal)=>{
                                            return (
                                              <Card className={classes.innerCard}>
                                                <CardContent>
                                                    <label className={classes.cardLable}><b>{iVal.name}</b></label>                                  
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
                                                        return (<CheckList
                                                                  task={cVal.task}
                                                                  isChecked={cVal.isChecked}
                                                                  handleCheckBox={() => this.props.handleCheckBox(val.id, iVal.story, cVal.listNumber)}
                                                                  handleClickOpenToEdit={() => this.handleClickOpenToEdit(val.id, iVal.story, cVal.listNumber)}
                                                                />)
                                                        })}
                                                      </div>
                                                      <Button
                                                      variant="contained"
                                                      color="gray"
                                                      style={(iVal.checkList.length === 0)? {display:'none'}:{display:'block'}}
                                                      className={classes.button}
                                                      onClick={() => this.props.deleteChecked(val.id, iVal.story)}
                                                      >                                                     
                                                      Delete Tasks
                                                      </Button>
                                                  </CardContent>
                                                </Card>
                                                  )
                                                  })}                                               
                                    </CardContent>
                                </Card>)}
                    )}
                </div>
                <AddNewChecklistModel
                open={this.state.open}
                edit={this.state.edit}
                addInner={this.state.addInner}
                handleClose={this.handleClose}
                handleChange={this.handleChange.bind(this)}
                handleSubmit={this.handleSubmit}
                />
            </>
        );
    }
}

ContentCards.propTypes = {
  classes: PropTypes.object.isRequired
};
 
const mapStateToProps = state => ({
    cardArrayNames: state.cardArrayNames,
})

const mapDispatchToProps = dispatch => ({
    deleteCard: cardNumber => dispatch(deleteCard(cardNumber)),
    addInnerCard: (id, cardName) => dispatch(addInnerCard(id, cardName)),
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