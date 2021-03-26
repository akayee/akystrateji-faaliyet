import React from "react";
import PropTypes from "prop-types";
import { Link } from 'react-router-dom'
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import Grid from '@material-ui/core/Grid';
import GridItem from "components/Grid/GridItem.jsx";
import InputLabel from '@material-ui/core/InputLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import Card from "components/Card/Card.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import CardBody from "components/Card/CardBody.jsx";
import CardFooter from "components/Card/CardFooter.jsx";
import { Button } from "@material-ui/core";
import TextField from '@material-ui/core/TextField';
import {currentUser, updateData } from '../../firebase/auth';

const styles = {
  cardCategoryWhite: {
    color: "rgba(255,255,255,.62)",
    margin: "0",
    fontSize: "14px",
    marginTop: "0",
    marginBottom: "0"
  },
  cardTitleWhite: {
    color: "#FFFFFF",
    marginTop: "0px",
    minHeight: "auto",
    fontWeight: "300",
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    marginBottom: "3px",
    textDecoration: "none"
  }
};
//component/task table yapısı kullanılarak oradaki icon buttonlarla icon eklenecek
class EditAccount extends React.Component {
  constructor(...args) {
    super(...args);
    this.state={
      showAccount:false,
      data:this.props.location.state.detailData,   
      user:currentUser(),
      Hesapturu:''
    }

  }

  handleChange=(e)=>{
    let val=e.target.value;
    let data =this.state.data;
    
    data={...data,[e.target.name]:val};
    this.setState({data})
    
  }
  handleChangeData=()=>{
    updateData(this.state.user,this.state.data,"Hesaplar");
  }

  render(){
    Number.prototype.format = function(n, x, s, c) {
      var re = '\\d(?=(\\d{' + (x || 3) + '})+' + (n > 0 ? '\\D' : '$') + ')',
          num = this.toFixed(Math.max(0, ~~n));
    
      return (c ? num.replace('.', c) : num).replace(new RegExp(re, 'g'), '$&' + (s || ','));
    };
    

    //DİZAYN CLASSLARININ PROPDAN ALINMA İŞLEMİ
    const { classes } = this.props;    
    const hesapTuru=['Cash','Bank','POS','Credit Card','Cheque','Multiple Owner'];
    return (
      
      <div>
        <Link to={{
            pathname: `/admin/accountdetail`,
            state: { detailData: this.props.location.state.detailData }
        }} >
        <Button>Back</Button> 
        </Link>
        {console.log(this.state.Hesapturu)}
        <Grid container >
        <GridItem xs={12} sm={12} md={12}>
            <Card >
            <CardHeader color="warning">
            Edit Account
            </CardHeader>
            <CardBody>
              
            <Grid item xs={6}>
          <TextField          
            name="Tanim"
            autoFocus
            margin="dense"
            value={this.state.data.Tanim}
            id="name"
            label="Name"
            type="text"
            fullWidth
            onChange={this.handleChange}
          />
          
          </Grid>
           <Grid item xs={6}>
          <FormControl className={classes.formControl}>
          <Select
                name="HesapTuru"
                type="text"
                value={this.state.HesapTuru}
                defaultValue={this.props.location.state.detailData.HesapTuru}
                onChange={e => {   
                  let value=e.target.value;              
                  this.setState({
                    HesapTuru:value
                  })
                }}
              >
                {hesapTuru.map( (item,index)=> {
                  return <MenuItem key={index} value={index}>{item} </MenuItem>
                }
                )}
              </Select>
              
          <FormHelperText>Choose your account type</FormHelperText>
          </FormControl> 
          </Grid>
         
           
           
           <Grid item xs={4}>
           <TextField
            autoFocus
            name="Stok"
            margin="dense"
            value={this.state.data.Stok}
            id="Sale"
            label="Current Balance"
            type="text"
            fullWidth
            onChange={this.handleChange}
          />
          <FormHelperText>Current Balance</FormHelperText>
           </Grid>

           <Grid item xs={4}>
           <TextField
            autoFocus
            name="HesapNo"
            margin="dense"
            value={this.state.data.HesapNo}
            id="HesapNo"
            label="Account ID"
            type="numeric"
            fullWidth
            onChange={this.handleChange}
          />
          <FormHelperText>Account ID</FormHelperText>
           </Grid>
             
           
             
          
          
            </CardBody>
            <CardFooter>
            <Link to={{
                pathname: `/admin/myaccounts`
            }} >
            <Button>Back</Button> 
            </Link>
            <Button onClick={this.handleChangeData}>
                Add
            </Button>
            </CardFooter>
            </Card>
        </GridItem>
                  
          

          </Grid>
      </div>
    )

  }
  
  
}
EditAccount.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(EditAccount);
