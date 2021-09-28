import React from "react";
import PropTypes from "prop-types";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import { currentUser } from '../../firebase/auth';
import Grid from '@material-ui/core/Grid';
//componentler
import PersonelListesi from "../../components/Birimislemleri/PersonelListesi";
import Donanimlar from "../../components/Birimislemleri/Donanimlar";
import Yazilimlar from "../../components/Birimislemleri/Yazilimlar";
import AracListesi from "../../components/Birimislemleri/AracListesi";
import TeskilatSemasi from "../../components/Birimislemleri/TeskilatSemasi";
import FizikselYapi from "../../components/Birimislemleri/FizikselYapi";
import YetkiGorev from "../../components/Birimislemleri/YetkiGorev";
import Mevzuat from "../../components/Birimislemleri/Mevzuat";
import STRATEGYDATA from "../../data/dummydata";
import Skeleton from 'react-loading-skeleton';


import { connect} from 'react-redux';
import {getBirimBilgileri} from '../../store/actions/birimler';


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
class BirimBilgileri extends React.Component {
  constructor(...props) {
    super(...props);
    this.state = {
      amacData: STRATEGYDATA,
      secilibirim:null,
      birimbilgileri:[],
      user: currentUser(),
      expanded: false,
      hedefexpanded: false,
      performansexpanded: false,
      columns: [
        { title: 'Amaç Adı', field: 'adi' },
        {
          title: 'Üst Birim',
          field: 'birimId',
          lookup: { 0: 'Fen İşleri', 1: 'Emlak İstimlak', 2: 'Çevre Koruma', 3: 'Zabıta', 4: 'Bilgi İşlem' },
        }
      ],
    };
  }
  componentDidMount(){
    let a=[1,2];
    this.props.getBirimBilgileri(a);
    
}

  handleChange = (panel) => (event, isExpanded) => {
    this.setState({ expanded: isExpanded ? panel : false });
  };
  handleChangeHedef = (panel) => (event, isExpanded) => {
    this.setState({ hedefexpanded: isExpanded ? panel : false });
  };
  handleChangePerformans = (panel) => (event, isExpanded) => {
    this.setState({ performansexpanded: isExpanded ? panel : false });
  };


  render() {
    Number.prototype.format = function (n, x, s, c) {
      var re = '\\d(?=(\\d{' + (x || 3) + '})+' + (n > 0 ? '\\D' : '$') + ')',
        num = this.toFixed(Math.max(0, ~~n));

      return (c ? num.replace('.', c) : num).replace(new RegExp(re, 'g'), '$&' + (s || ','));
    };

    if (this.props.birimbilgileri.loading == true) {
      return <div>
        <Skeleton height={100} />
        <Skeleton count={6} /></div>
    }

    const {fizikselYapilar,donanimlar,mevzuatlar,yazilimlar,aracListesi,personeller,yetkiGorevTanimlari,yetkiliOlduguBirimler}= this.props.birimbilgileri;
    //const {fizikselyapilar}= this.props.birimbilgileri;
    return (
      <div>
        {/* Stratejik amaç ekleme popupı */ }
        
        <PersonelListesi birimler={yetkiliOlduguBirimler} personeller={personeller} />
        <Grid container justify="center" spacing={3}>
          <Grid item xs={4} >
            <Donanimlar birimler={yetkiliOlduguBirimler} donanimlar={donanimlar} />
          </Grid>
          <Grid item xs={4} >
            <Yazilimlar birimler={yetkiliOlduguBirimler} yazilimlar={yazilimlar} />
          </Grid>
          <Grid item xs={4} >
            <AracListesi birimler={yetkiliOlduguBirimler} araclar={aracListesi} />
          </Grid>
        </Grid>
        <Grid container justify="center" spacing={3}>
          <Grid item xs={12} >
            <TeskilatSemasi />
          </Grid>
          <Grid item xs={4} >
            <FizikselYapi birimler={yetkiliOlduguBirimler} fizikselyapilar={fizikselYapilar} />
          </Grid>
          <Grid item xs={4} >
            <YetkiGorev birimler={yetkiliOlduguBirimler} yetkiGorevTanimlari={yetkiGorevTanimlari} />
          </Grid>
          <Grid item xs={4} >
            <Mevzuat birimler={yetkiliOlduguBirimler} mevzuatlar={mevzuatlar} />
          </Grid>
        </Grid>



      </div>
    )

  }

}
BirimBilgileri.propTypes = {
  classes: PropTypes.object.isRequired
};
const mapStateToProps = (state) => ({ birimbilgileri: state.birimler.birimbilgileri, error: state.birimler.error })
export default connect(mapStateToProps,{getBirimBilgileri})(withStyles(styles)(BirimBilgileri));
