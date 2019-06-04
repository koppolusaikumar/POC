import React from "react";
import Checkbox from '@material-ui/core/Checkbox';
import Button from '@material-ui/core/Button';
import { withStyles } from "@material-ui/core/styles";
 
const styles = {
    editButton:{
        float:'right',
        color:'blue',
        marginTop:10,
      },
  };
 
function CheckList(props){
    const { classes } = props;
    return(<div>
        <Checkbox 
            value="checked" 
            color="primary" 
            checked={props.isChecked}
            onChange={props.handleCheckBox}
        />
        <span>{props.task}</span>
        <Button 
        size="small" 
        className={classes.editButton} 
        onClick={props.handleClickOpenToEdit}
        >
            Edit
        </Button>
    </div>)
}
 
export default withStyles(styles)(CheckList);
 

 
