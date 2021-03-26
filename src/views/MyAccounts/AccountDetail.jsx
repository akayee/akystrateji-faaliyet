import React from "react";
import PropTypes from "prop-types";
import { Link } from 'react-router-dom'
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import Grid from '@material-ui/core/Grid';
import GridItem from "components/Grid/GridItem.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";
import Card from "components/Card/Card.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import CardBody from "components/Card/CardBody.jsx";
import { Button } from "@material-ui/core";
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';

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
class AccountDetail extends React.Component {
  constructor(...args) {
    super(...args);
    this.state={
      showAccount:false
    }
  }



  render(){
    Number.prototype.format = function(n, x, s, c) {
      var re = '\\d(?=(\\d{' + (x || 3) + '})+' + (n > 0 ? '\\D' : '$') + ')',
          num = this.toFixed(Math.max(0, ~~n));
    
      return (c ? num.replace('.', c) : num).replace(new RegExp(re, 'g'), '$&' + (s || ','));
    };
    

    //DİZAYN CLASSLARININ PROPDAN ALINMA İŞLEMİ
    const { classes } = this.props;
    const accounts=this.props.location.state.detailData;    
    const hesapTuru=['Cash','Bank','POS','Credit Card','Cheque','Multiple Owner'];
    return (
      
      <div>
        <Link to={{
            pathname: `/admin/myaccounts`
        }} >
        <Button>Back</Button> 
        </Link>
        <Link to={{
            pathname: `/admin/editaccount`,
            state: { detailData: accounts }
        }} >
        <Button>Edit</Button> 
        </Link>
        
        <GridContainer>
        <GridItem xs={12} sm={12} md={6}>
          <Card>
            <CardHeader>
              <div style={{float: "left",fontWeight : "bold"}}>
              {accounts.Tanim}
              </div>
              <div style={{float: "right",fontWeight : "bold"}}>
              {accounts.Stok}
              </div>
            </CardHeader>
            <CardBody>
              <div style={{float: "left"}}>
                <div>
                Account Type: {hesapTuru[accounts.HesapTuru]}
                </div>
                <div>
                Account ID: {hesapTuru[accounts.HesapNo]}
                </div>
              </div>
              
            </CardBody>
          </Card>
        <Card >
        <CardHeader color="success">
        Payment
        </CardHeader>
        {
        accounts.AccountActivities && Object.keys( accounts.AccountActivities).map(function(key, index)
                  {if(accounts.AccountActivities[key].isPayment== true)
                    {
                      return(
                      <div>
                         <Grid container spacing={2}>
                         <CardBody>
                            <section >{accounts.AccountActivities[key].aciklama}</section > 
                            <article > asd{accounts.AccountActivities[key].whom}</article>
                            <aside style={{float: "right",fontWeight : "bold"}}></aside>
                            
                            </CardBody>
                            <Grid item>
                            <Typography variant="subtitle1" spacing={3} style={{marginRight:'0.8rem'}}>£{accounts.AccountActivities[key].count}</Typography>
                          </Grid>
                         </Grid>
                         
                         <Divider />
                          </div>         
                       
                      )}
                  }
                  )}
                   </Card>
                  </GridItem>
                  <GridItem xs={12} sm={12} md={6}>
        <Card >
        <CardHeader color="danger">
        Expenses
        </CardHeader>
        {
        accounts.AccountActivities && Object.keys( accounts.AccountActivities).map(function(key, index)
                  {if(accounts.AccountActivities[key].isPayment== false)
                    {
                      return(
                        <div>
                        <Grid container spacing={2}>
                        <CardBody>
                           <section >{accounts.AccountActivities[key].aciklama}</section > 
                           <article > asd{accounts.AccountActivities[key].whom}</article>
                           <aside style={{float: "right",fontWeight : "bold"}}></aside>
                           
                           </CardBody>
                           <Grid item>
                           <Typography variant="subtitle1" spacing={3} style={{marginRight:'0.8rem'}}>£{accounts.AccountActivities[key].count}</Typography>
                         </Grid>
                        </Grid>
                        
                        <Divider />
                         </div>          
                       
                      )}
                  }
                  )}
                   </Card>
                  </GridItem>
          

          </GridContainer>
      </div>
    )

  }
  
  
}
AccountDetail.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(AccountDetail);
