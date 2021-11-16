import React from "react";
import PropTypes from "prop-types";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import GridItem from "components/Grid/GridItem.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";
import Card from "components/Card/Card.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import CardBody from "components/Card/CardBody.jsx";
import CheckIcon from '@material-ui/icons/Check';
import { IconButton } from "@material-ui/core";
import Tooltip from '@material-ui/core/Tooltip';
import { Grid } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import Accordion from '@material-ui/core/Accordion';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { currentUser } from '../../firebase/auth';
import LinearProg from '../../components/LinearProg/LinearProgStrateji';
import { connect } from 'react-redux';
import Divider from '../../components/Ui/Divider.js';


import { getPerformansData } from '../../store/actions/performanslar';
import { getStrategyData } from '../../store/actions/birimsstratejibilgiler'


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
      performanslar: [],
      birimlerim: []
    };
  }

  componentDidMount() {
    this.props.getPerformansData();
    this.props.getStrategyData([2]);
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
    //DİZAYN CLASSLARININ PROPDAN ALINMA İŞLEMİ
    const strategydata = this.props.strategydata.strategydata;
    console.log(strategydata)
    return (
      <div>
        <GridContainer>

          {strategydata.isturleri && strategydata.isturleri.length > 0 ? <GridItem xs={12} sm={12} md={12}>
            <Card>
              <CardHeader color="warning">
                Açıklama Girilmesi Gereken Performans Göstergeleri
              </CardHeader>
              <CardBody>
                {
                  //WRN burada ilgili işlerin açıklama girilmesi gereken seviyesi sorgulanacak. Sadece açıklama girilmesi gerekenler listelenecek
                }
                {strategydata.isturleri.filter(obj => obj.aciklama == undefined).map((performans, index) =>
                  <div key={index}>
                    <GridContainer spacing={2}>
                      <Grid item xs={6}>{performans.adi}</Grid>
                      <Grid item xs={5}>
                        <TextField
                          name="Tanim"
                          multiline
                          margin="dense"
                          id="name"
                          type="text"
                          fullWidth
                        /></Grid>
                      <Grid item xs={1}>
                        <Tooltip title="Açıklamayı Kaydet">
                          <IconButton>
                            <CheckIcon />
                          </IconButton>
                        </Tooltip>
                      </Grid>
                    </GridContainer>
                  </div>)}
              </CardBody>
              <CardHeader color="warning">
                Açıklama Girilmesi Gereken Mali Faaliyetler
              </CardHeader>
              <CardBody>
                {strategydata.vmFaaliyetTurleri.filter(obj => obj.aciklama == undefined).map((performans, index) =>
                  <div key={index}>
                    <GridContainer spacing={2}>
                      <Grid item xs={6}>{performans.adi}</Grid>
                      <Grid item xs={5}>
                        <TextField
                          name="Tanim"
                          multiline
                          margin="dense"
                          id="name"
                          type="text"
                          fullWidth
                        /></Grid>
                      <Grid item xs={1}>
                        <Tooltip title="Açıklamayı Kaydet">
                          <IconButton>
                            <CheckIcon />
                          </IconButton>
                        </Tooltip>
                      </Grid>
                    </GridContainer>
                  </div>)}
              </CardBody>

            </Card>
          </GridItem> : null}
          <GridItem xs={12} sm={12} md={12}>
            <Card>
              <CardHeader color="success">
                <GridContainer alignItems='center' justify='center'>
                  <GridItem xs={12} sm={12} md={12}>
                    <h4>{strategydata && strategydata.birim && strategydata.birim.adi}</h4>
                  </GridItem>

                </GridContainer>
              </CardHeader>
              <CardBody>
                <GridContainer alignItems='center' justify='center'>
                  <GridItem xs={7} sm={7} md={7}>
                    <div ><b>Adi</b></div ></GridItem>
                  <GridItem xs={5} sm={5} md={5}>
                    <b>Tamamlanan Faaliyet / Kullanılan Maaliyet</b>
                  </GridItem>


                </GridContainer>

                <div style={{ width: '%100' }}>
                  {strategydata.performanslar && strategydata.performanslar ? strategydata.performanslar.map((performans, index) => <Accordion key={index} expanded={this.state.performansexpanded === performans.id} onChange={this.handleChangePerformans(performans.id)}>
                    <AccordionSummary
                      expandIcon={<ExpandMoreIcon />}
                      aria-controls="panel1bh-content"
                      id="panel1bh-header"
                    >
                      <Grid item xs={6}>P{performans.amaclarId}.{performans.hedeflerId + 1}.{performans.id + 1} : {performans.adi}</Grid>
                      <Grid item xs={6}>
                        <LinearProg
                          gerceklesmeOrani={strategydata.isturleri.filter(obj => obj.performansId == performans.id).map(item => item.toplamDeger).reduce((prev, next) => prev + next)}
                          yillikHedef={strategydata.vmFaaliyetTurleri.filter(obj => obj.performansId == performans.id).map(item => item.toplamDeger).reduce((prev, next) => prev + next)}
                          gosterilecekalan={["Faaliyet", "Maaliyet"]} />
                      </Grid>
                    </AccordionSummary>
                    <AccordionDetails>
                      <Grid container>
                        <Grid container><h4><b>Performans Göstergeleri</b></h4></Grid>
                        <Grid container>
                          <Grid item xs={2}><b>Adi</b></Grid>
                          <Grid item xs={2}><b>Ölçü Birimi</b></Grid>
                          <Grid item xs={2}><b>Hedef</b> </Grid>
                          <Grid item xs={2}><b>Gerçekleşme</b> </Grid>
                          <Grid item xs={4}><b>Açıklama</b></Grid>

                        </Grid>
                        {strategydata.isturleri && strategydata.isturleri.map((is, index) => <Grid key={index} container>
                          <Grid item xs={12}><b>{strategydata.yetkiliBirimler.adi}</b></Grid>
                          <Grid item xs={2}>{is.adi}</Grid>
                          <Grid item xs={2} style={{ textAlign: 'center' }}>{is.olcuBirimiId} </Grid>
                          <Grid item xs={2}>{is.yillikHedef} </Grid>
                          <Grid item xs={2}>{is.toplamDeger} </Grid>
                          <Grid item xs={4}>{is.aciklama} </Grid>
                          <Grid item xs={12}>
                            <LinearProg gerceklesmeOrani={is.toplamDeger}
                              yillikHedef={is.yillikHedef} gosterilecekalan={["Gerçekleşen", "Hedef"]}
                              parts={[(is.firstPart * 100) / is.yillikHedef, (is.secondPart * 100) / is.yillikHedef,
                              (is.thirdPart * 100) / is.yillikHedef, (is.lastPart * 100) / is.yillikHedef]}
                              gerceklesmeOrani={(is.toplamDeger * 100) / is.yillikHedef} /></Grid>

                          <Divider />

                        </Grid>)}
                        <Grid container><h4><b>Faaliyetler</b></h4></Grid>
                        <Grid container>
                          <Grid item xs={2}><b>Adi</b></Grid>
                          <Grid item xs={2} ><b>Ölçü Birimi</b></Grid>
                          <Grid item xs={2}><b>Hedef</b> </Grid>
                          <Grid item xs={2}><b>Gerçekleşme</b> </Grid>
                          <Grid item xs={4}><b>Açıklama</b></Grid>
                        </Grid>
                        {strategydata.vmFaaliyetTurleri && strategydata.vmFaaliyetTurleri.map((is, index) => <Grid key={index} container>
                          <Grid item xs={12}><b>{strategydata.yetkiliBirimler.adi}</b></Grid>
                          <Grid item xs={2}>{is.adi}</Grid>
                          <Grid item xs={2} style={{ textAlign: 'center' }}>{is.olcuBirimiId} </Grid>
                          <Grid item xs={2}>{is.yillikHedef} </Grid>
                          <Grid item xs={2}>{is.toplamDeger} </Grid>
                          <Grid item xs={4}>{is.aciklama} </Grid>
                          <Grid item xs={12}><LinearProg gerceklesmeOrani={is.toplamDeger}
                            yillikHedef={is.yillikHedef} gosterilecekalan={["Gerçekleşen", "Hedef"]}
                            parts={[(is.firstPart * 100) / is.yillikHedef, (is.secondPart * 100) / is.yillikHedef,
                            (is.thirdPart * 100) / is.yillikHedef, (is.lastPart * 100) / is.yillikHedef]}
                            gerceklesmeOrani={(is.toplamDeger * 100) / is.yillikHedef} /> </Grid>

                          <Divider />
                        </Grid>)}
                      </Grid>
                    </AccordionDetails>
                  </Accordion>) : null}
                </div>
              </CardBody>
            </Card>
          </GridItem>
        </GridContainer>

      </div>
    )

  }

}
Birimler.propTypes = {
  classes: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({ performanslar: state.performanslar, strategydata: state.strategydata })
export default connect(mapStateToProps, { getPerformansData, getStrategyData })(withStyles(styles)(Birimler));
