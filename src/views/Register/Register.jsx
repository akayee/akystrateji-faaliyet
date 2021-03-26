import React from 'react';
import { Paper, withStyles, Grid, TextField, Button } from '@material-ui/core';
import { Face, Fingerprint } from '@material-ui/icons'
import "firebase/auth";
import "firebase/database";

import { Switch, Route, Redirect } from "react-router-dom";

import { login, resetPassword, auth } from '../../firebase/auth';

import GridItem from "components/Grid/GridItem.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";
import Card from "components/Card/Card.jsx";
const styles = theme => ({
    margin: {
        margin: theme.spacing.unit * 2,
    },
    padding: {
        padding: theme.spacing.unit
    }
});

class LoginTab extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      mail:null,
      password:null,
      firmname:null,
      user:[],
      modal: false,
      logged:false
    };
    this.signup=this.signup.bind(this);
    this.loginAccount=this.loginAccount.bind(this);    
    this.toggle=this.toggle.bind(this);
    this.handleChange=this.handleChange.bind(this);    
    this.resetPassword=this.resetPassword.bind(this);
   
  }
  toggle = () => {
    this.setState({
      modal: !this.state.modal
    });
  }
  resetPassword = () => {
    resetPassword(this.mail.value)
      .then(alert(`Password reset email sent to ${this.mail.value}.`))
      .catch((error) => alert(`Email address not found.`))
  }
  signup=()=>{
      var that=this;
    auth(this.state.mail, this.state.password,this.state.firmname).then(that.props.checklogin)
      .catch(e =>alert(e.message))
  }
  componentDidMount(){
      this.props.checklogin();
  }

  
  loginAccount=()=>{
      
    var that=this;
    
    login(this.state.mail, this.state.password).then(that.props.checklogin).catch((e)=> alert(e.message))
    
  }
  handleChange=(event)=>{
    this.setState({
      [event.target.name]:event.target.value
    });

  }
    render() {
      
        const { classes,history } = this.props;
        return (
          <GridContainer>
            {this.state.logged ?<Redirect to="/" />:null}
          <GridItem xs={12} sm={6} md={3}>
            <Card className={classes.padding}>
            <Paper className={classes.padding}>
                <div className={classes.margin}>
                    <Grid container spacing={8} alignItems="flex-end">
                        <Grid item>
                            <Face />
                        </Grid>
                        <Grid item md={true} sm={true} xs={true}>
                            <TextField id="username" label="Email" name="mail" onChange={this.handleChange} type="email" fullWidth autoFocus required />
                        </Grid>
                    </Grid>
                    <Grid container spacing={8} alignItems="flex-end">
                        <Grid item>
                            <Fingerprint />
                        </Grid>
                        <Grid item md={true} sm={true} xs={true}>
                            <TextField id="username" label="Password" onChange={this.handleChange} name="password" type="password" fullWidth required />
                        </Grid>
                    </Grid>
                    <Grid container alignItems="center" justify="space-between">
                        
                        <Grid item>
                            <Button disableFocusRipple disableRipple style={{ textTransform: "none" }} onClick={this.resetPassword} variant="text" color="primary">Forgot password ?</Button>
                        </Grid>
                        <Grid item>
                            <Button disableFocusRipple disableRipple style={{ textTransform: "none" }} variant="text" onClick={this.toggle} color="primary">Create Account ?</Button>
                        </Grid>
                    </Grid>
                    <Grid container justify="center" style={{ marginTop: '10px' }}>
                        <Button variant="outlined" color="primary" onClick={this.loginAccount} style={{ textTransform: "none" }}>Login</Button>
                    </Grid>
                </div>
            </Paper>
            </Card>
            </GridItem>
            {this.state.modal ? <GridItem xs={12} sm={6} md={6}>
           
           <Card className={classes.padding}>
           <Paper className={classes.padding}>
               <div className={classes.margin}>
                   <Grid container spacing={8} alignItems="flex-end">
                       <Grid item>
                           <Face />
                       </Grid>
                       <Grid item md={true} sm={true} xs={true}>
                           <TextField id="username" label="Email" onChange={this.handleChange} name="mail" type="email" fullWidth autoFocus required />
                       </Grid>
                   </Grid>
                   <Grid container spacing={8} alignItems="flex-end">
                       <Grid item>
                           <Fingerprint />
                       </Grid>
                       <Grid item md={true} sm={true} xs={true}>
                           <TextField id="username" label="Password" onChange={this.handleChange} name="password" type="password" fullWidth required />
                       </Grid>
                   </Grid>
                   <Grid container spacing={8} alignItems="flex-end">
                       <Grid item>
                           <Fingerprint />
                       </Grid>
                       <Grid item md={true} sm={true} xs={true}>
                           <TextField id="firmname" label="Firm Name" onChange={this.handleChange} name="firmname" type="name" fullWidth required />
                       </Grid>
                   </Grid>
                   
                   <Grid container justify="center" style={{ marginTop: '10px' }}>
                       <Button variant="outlined" color="primary" onClick={this.signup} style={{ textTransform: "none" }}>Create Account</Button>
                   </Grid>
               </div>
           </Paper>
           <Button color="secondary" onClick={this.toggle}>Close</Button>
           </Card>
             
               
           </GridItem>:null}
            
            </GridContainer>
        );
    }
}

export default withStyles(styles)(LoginTab);