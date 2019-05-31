import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
 
const styles = {
  root: {
    position: "fixed",
    bottom: 0,
    width:"100%",
  },
};
 
function Footer(props) {
  const { classes } = props;
  return (
    <div className={classes.root}>
      <AppBar position="static" color="blue">
        <Toolbar>
          <Typography color="inherit">
            @copy rights
          </Typography>
        </Toolbar>
      </AppBar>
    </div>
  );
}
 
Footer.propTypes = {
  classes: PropTypes.object.isRequired,
};
 
export default withStyles(styles)(Footer);