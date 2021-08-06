import React, { Component } from "react";
import PropTypes from "prop-types";
// react plugin for creating charts
// @material-ui/core
import withStyles from "@material-ui/core/styles/withStyles";
import Icon from "@material-ui/core/Icon";
// @material-ui/icons
import Store from "@material-ui/icons/Store";
import DateRange from "@material-ui/icons/DateRange";
import LocalOffer from "@material-ui/icons/LocalOffer";
import Update from "@material-ui/icons/Update";
import Accessibility from "@material-ui/icons/Accessibility";
import GridItem from "components/Grid/GridItem.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";
import Table from "components/Table/Table.jsx";
import Danger from "components/Typography/Danger.jsx";
import Card from "components/Card/Card.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import CardIcon from "components/Card/CardIcon.jsx";
import CardBody from "components/Card/CardBody.jsx";
import CardFooter from "components/Card/CardFooter.jsx";
import axios from 'axios'
import LinearProgress from "@material-ui/core/LinearProgress";

import { BrowserRouter as Router, Route , Switch, Redirect } from "react-router-dom";

import firebase from "../../firebase/firebase"
import 'firebase/auth'

import dashboardStyle from "assets/jss/material-dashboard-react/views/dashboardStyle.jsx";

const API_URL = 'http://localhost:63544/api/hesaplar';
const API_URL_EXPENSE = 'http://localhost:63544/api/masraflar';
class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      accounts: [],
      expenses:[],
      FirmId:localStorage.getItem('FirmId'),
      loginOpen:false
    };
    
  }
 
  componentDidMount() {
    
    const url = `${API_URL}/get/${this.state.FirmId}`;
    axios.get(url).then(response => response.data)
    .then((data) => {
      this.setState({ 
        accounts: data
       })
     })

     const urlexpense = `${API_URL_EXPENSE}/get/${this.state.FirmaId}`;
    axios.get(urlexpense).then(response => response.data)
    .then((data) => {
      this.setState({ 
        expenses: data
       })
     })
  }
  
  render (){
    const { classes} = this.props;
    const {accounts,expenses}=this.state;
    //HESAP TÜRLERİ LİSTESİ BAŞLANGIÇ
    const ranges = [
      {
        value: '0',
        label: 'Cash',
      },
      {
        value: '1',
        label: 'Bank',
      },
      {
        value: '2',
        label: 'POS',
      },
      {
        value: '3',
        label: 'Credit Card',
      },
      {
        value: '4',
        label: 'Cheque',
      },
      {
        value: '5',
        label: 'Multiple Owner Account',
      },
    ];
    //HESAP TÜRLERİ LİSTESİ BAŞLANGIÇ
    
      
    return(
      <div>
        
        <GridContainer>
          <GridItem xs={12} sm={6} md={3}>
            <Card>
              <CardHeader color="success" stats icon>
                <CardIcon color="success">
                  <Icon>content_copy</Icon>
                </CardIcon>
                <p className={classes.cardCategory}>Faaliyet</p>
                <h3 className={classes.cardTitle}> %80</h3>

                <LinearProgress variant="determinate"  color='primary' value={80} />
              </CardHeader>
              <CardFooter stats>
                <div className={classes.stats}>
                  Tüm hedeflerin güncel tarihe göre oranı
                </div>
              </CardFooter>
            </Card>
          </GridItem>
          <GridItem xs={12} sm={6} md={3}>
            <Card>
              <CardHeader color="danger" stats icon>
                <CardIcon color="danger">
                  <Store />
                </CardIcon>
                <p className={classes.cardCategory}>Hedefin Gerisinde Kalan Birim Sayısı</p>
                <h3 className={classes.cardTitle}>5</h3>
              </CardHeader>
              <CardFooter stats>
                <div className={classes.stats}>
                  <DateRange />
                  Hedefin güncel tarihe oranına göre hesaplanır
                </div>
              </CardFooter>
            </Card>
          </GridItem>
          <GridItem xs={12} sm={6} md={3}>
            <Card>
              <CardHeader color="warning" stats icon>
                <CardIcon color="warning">
                  <Icon>info_outline</Icon>
                </CardIcon>
                <p className={classes.cardCategory}>Maaliyet</p>
                <h3 className={classes.cardTitle}>%40</h3>
                <LinearProgress variant="determinate"  color='primary' value={40} />
              </CardHeader>
              <CardFooter stats>
                <div className={classes.stats}>
                  <LocalOffer />
                  Tüm harcamalar baz alınmıştır.
                </div>
              </CardFooter>
            </Card>
          </GridItem>
          <GridItem xs={12} sm={6} md={3}>
            <Card>
              <CardHeader color="info" stats icon>
                <CardIcon color="info">
                  <Accessibility />
                </CardIcon>
                <p className={classes.cardCategory}>Çalışan Sayısı</p>
                <h3 className={classes.cardTitle}>2856</h3>
              </CardHeader>
              <CardFooter stats>
                <div className={classes.stats}>
                  <Update />
                  Güncel Sayı
                </div>
              </CardFooter>
            </Card>
          </GridItem>
        </GridContainer>
       
        <GridContainer>
          <GridItem xs={12} sm={12} md={12}>
          <Card>
              <CardHeader color="success">
                <h4 className={classes.cardTitleWhite}>Başarılı Birim Listesi</h4>
                <p className={classes.cardCategoryWhite}>
                Başarı Ortalaması %39</p>
                
                
              </CardHeader>
              <CardBody>
              <Table
                tableHeaderColor="success"
                tableHead={["Adı", "Tamamlanma Oranı", "Son İşlem Tarihi"]}
                tableData={[['Emlak İstimlak Dairesi Başkanlığı','%42','17/11/2020'],['Sosyal Hizmetler Dairesi Başkanlığı','%39','17/11/2020'],['Çevre Koruma Dairesi Başkanlığı','%42','17/11/2020']]}
              />
              </CardBody>
            </Card>
          </GridItem>
        </GridContainer>
      </div>
    )
    
  
}
}

Home.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(dashboardStyle)(Home);
