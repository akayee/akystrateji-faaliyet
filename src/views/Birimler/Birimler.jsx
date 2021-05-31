import React from "react";
import PropTypes from "prop-types";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import GridItem from "components/Grid/GridItem.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";
import Card from "components/Card/Card.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import CardBody from "components/Card/CardBody.jsx";
import { Link } from 'react-router-dom';
import {  Grid } from '@material-ui/core';
import axios from 'axios';
import Accordion from '@material-ui/core/Accordion';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { currentUser, addData, auth, takeData, updateData, deleteData, moneyTransfer, addPaymentData } from '../../firebase/auth';
import LinearProg from '../../components/LinearProg/LinearProg';
import { connect} from 'react-redux'

import BIRIMSTRATEGYDATA from "../../data/birimstrategydata";
import BIRIMLER from "../../data/birimler";
import birimler from "../../store/reducers/birimler";

const API_URL = 'http://localhost:63544/api/hesaplar';
const dataAdress = 'Hesaplar';

const mapStateToProps = state => {
  return{
    birimlerim: state.birimler
  }
  
};
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
class Birimler extends React.Component {
  constructor(...args) {
    super(...args);
    this.state = {
      modalShow: false,
      modalAccountShow: false,
      hedefexpanded: false,
      performansexpanded: false,
      user: currentUser(),
      data:BIRIMSTRATEGYDATA
    };
  }
  
  modalClose = () => this.setState({ modalShow: false });
  modalOpen = () => this.setState({ modalShow: !this.state.modalShow });
  paymentOpen = () => this.setState({ paymentShow: !this.state.paymentShow });
  handleClose = () => this.setState({ modalShow: false });
  modalAccountOpen = () => this.setState({ modalAccountShow: !this.state.modalAccountShow });
  modalClose = () => this.setState({ modalAccountShow: false });
  handleChangeHedef = (panel) => (event, isExpanded) => {
    this.setState({ hedefexpanded: isExpanded ? panel : false });
  };
  handleChangePerformans = (panel) => (event, isExpanded) => {
      this.setState({ performansexpanded: isExpanded ? panel : false });
  };

  handleChange = (e) => {
    let val = e.target.value;
    this.setState({ [e.target.name]: val })

  }
  handleChangeSwitch = (e) => {
    this.setState({ listtype: !this.state.listtype })
  }
  render() {
    Number.prototype.format = function (n, x, s, c) {
      var re = '\\d(?=(\\d{' + (x || 3) + '})+' + (n > 0 ? '\\D' : '$') + ')',
        num = this.toFixed(Math.max(0, ~~n));
      const groupBy = (items, key) => items.reduce(
        (result, item) => ({
          ...result,
          [item[key]]: [
            ...(result[item[key]] || []),
            item,
          ],
        }),
        {},
      );
      return (c ? num.replace('.', c) : num).replace(new RegExp(re, 'g'), '$&' + (s || ','));
    };
    

    //DİZAYN CLASSLARININ PROPDAN ALINMA İŞLEMİ
    const { classes } = this.props;
    const birimlerim= this.props.birimlerim
    
    return (
      <div>
        <GridContainer>
          {console.log(birimlerim)}
          {this.state.data.map((i, index) =>

            <GridItem xs={12} sm={12} md={12}>
              <Card>
                <CardHeader color="success">
                  <GridContainer alignItems='center' justify='center'>
                    <GridItem xs={12} sm={12} md={12}>
                      <h4>{BIRIMLER[i.id].Adi}</h4>
                    </GridItem>

                  </GridContainer>
                </CardHeader>
                <CardBody>
                  <GridContainer alignItems='center' justify='center'>
                    <GridItem xs={5} sm={5} md={5}>
                      <div ><b>Adi</b></div ></GridItem>
                    <GridItem xs={7} sm={7} md={7}>
                      <b>Güncel Hedef Tamamlanma Yüzdesi</b>
                    </GridItem>


                  </GridContainer>
                  {
                    i.hedefler.map((item) =>
                      <Accordion expanded={this.state.hedefexpanded === item.path} onChange={this.handleChangeHedef(item.path)}>
                        <AccordionSummary
                          expandIcon={<ExpandMoreIcon />}
                          aria-controls="panel1bh-content"
                          id="panel1bh-header"
                        >
                          <Grid xs={6}>H{item.id + 1} : <Link to={{
                            pathname: "/admin/numarataj",
                            state: { detailData: item }
                          }}><div >{item.adi}</div ></Link></Grid>
                          <Grid xs={6}> <LinearProg gerceklesmeOrani={item.hedefGerceklesmeOrani} /> </Grid>
                        </AccordionSummary>
                        <AccordionDetails>
                          <div style={{ width: '%100' }}>
                            {item.performanslar ? item.performanslar.map(performans=><Accordion expanded={this.state.performansexpanded === performans.path} onChange={this.handleChangePerformans(performans.path)}>
                                        <AccordionSummary
                                            expandIcon={<ExpandMoreIcon />}
                                            aria-controls="panel1bh-content"
                                            id="panel1bh-header"
                                        >
                                            <Grid xs={6}>P{performans.id + 1} : {performans.adi}</Grid>
                                            <Grid xs={6}><LinearProg gerceklesmeOrani={performans.gerceklesmeOrani} /> </Grid>
                                        </AccordionSummary>
                                        <AccordionDetails>
                                            <Grid container>
                                                <Grid container><h4><b>İşler</b></h4></Grid>
                                                <Grid container>
                                                    <Grid item xs={2}><b>Adi</b></Grid>
                                                    <Grid item xs={2}><b>Ölçü Birimi</b></Grid>
                                                    <Grid item xs={2}><b>Hedef</b> </Grid>
                                                    <Grid item xs={2}><b>Gerçekleşme</b> </Grid>
                                                    <Grid item xs={4}><b>Açıklama</b></Grid>
                                                </Grid>
                                                {performans.isler && performans.isler.map((is, index) => <Grid container>                                                  
                                                  <Grid item xs={12}><b>{BIRIMLER[is.birimId].Adi}</b></Grid>
                                                    <Grid item xs={2}>{is.adi}</Grid>
                                                    <Grid item xs={2} style={{textAlign:'center'}}>{is.OlcuBrimi} </Grid>
                                                    <Grid item xs={2}>{is.hedef} </Grid>
                                                    <Grid item xs={2}>{is.gerceklesme} </Grid>
                                                    <Grid item xs={4}>{is.aciklama} </Grid>
                                                    <Grid item xs={12}><LinearProg gerceklesmeOrani={is.gerceklesmeOrani} /></Grid>
                                                    
                                                </Grid>)}
                                                <Grid container><h4><b>Faaliyetler</b></h4></Grid>
                                                <Grid container>
                                                    <Grid item xs={2}><b>Adi</b></Grid>
                                                    <Grid item xs={2} ><b>Ölçü Birimi</b></Grid>
                                                    <Grid item xs={2}><b>Hedef</b> </Grid>
                                                    <Grid item xs={2}><b>Gerçekleşme</b> </Grid>
                                                    <Grid item xs={4}><b>Açıklama</b></Grid>
                                                </Grid>
                                                {performans.isler && performans.faaliyetler.map((is, index) => <Grid container>
                                                  <Grid item xs={12}><b>{BIRIMLER[is.birimId].Adi}</b></Grid>
                                                    <Grid item xs={2}>{is.adi}</Grid>
                                                    <Grid item xs={2} style={{textAlign:'center'}}>{is.OlcuBrimi} </Grid>
                                                    <Grid item xs={2}>{is.hedef} </Grid>
                                                    <Grid item xs={2}>{is.gerceklesme} </Grid>
                                                    <Grid item xs={4}>{is.aciklama} </Grid>
                                                    <Grid item xs={12}><LinearProg gerceklesmeOrani={is.gerceklesmeOrani} /> </Grid>
                                                </Grid>)}
                                            </Grid>
                                        </AccordionDetails>
                                    </Accordion>):null}
                          </div>
                        </AccordionDetails>
                      </Accordion>


                    )}
                </CardBody>
              </Card>
            </GridItem>


          )}




        </GridContainer>

      </div>
    )

  }

}
Birimler.propTypes = {
  classes: PropTypes.object.isRequired
};

export default connect(mapStateToProps)(withStyles(styles)(Birimler));
