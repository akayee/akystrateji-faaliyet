import React from "react";
import PropTypes from "prop-types";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import GridItem from "components/Grid/GridItem.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";
import Card from "components/Card/Card.jsx";
import { currentUser } from '../../firebase/auth';
import { IconButton } from "@material-ui/core";
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import Grid from '@material-ui/core/Grid';
//componentler
import AmacEkle from "../../components/Birimislemleri/AmacEkle";
import HedefEkle from "../../components/Birimislemleri/HedefEkle";
import PersonelListesi from "../../components/Birimislemleri/PersonelListesi";
import Donanimlar from "../../components/Birimislemleri/Donanimlar";
import Yazilimlar from "../../components/Birimislemleri/Yazilimlar";
import AracListesi from "../../components/Birimislemleri/AracListesi";
import TeskilatSemasi from "../../components/Birimislemleri/TeskilatSemasi";
import FizikselYapi from "../../components/Birimislemleri/FizikselYapi";
import YetkiGorev from "../../components/Birimislemleri/YetkiGorev";
import Mevzuat from "../../components/Birimislemleri/Mevzuat";
import STRATEGYDATA from "../../data/dummydata";

import Accordion from '@material-ui/core/Accordion';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import BIRIMLER from "../../data/birimler";
import PerformansEkle from "../../components/Birimislemleri/PerformansEkle";
import YeniIsEkle from "../../components/Birimislemleri/YeniIsEkle";
import YeniFaaliyetEkle from "../../components/Birimislemleri/YeniFaaliyetEkle";
import Swal from 'sweetalert2';

import { connect} from 'react-redux';
import {getStrategyData} from '../../store/actions/birimsstratejibilgiler';


const personeller = [
  { Adi: 'Ahmet YILMAZ', kadro: 'Şirket', id: '1', Birim: 'Yol Asfalt', cinsiyet: 'Erkek', ustBirimId: '0', girisTarihi: '10/10/2019', gorevi: 'Ofis Mühendisi' },
  { Adi: 'Kemal Ecevit', id: '4', Birim: 'İnşaat Yapım', kadro: 'Memur', ustBirimId: '0', cinsiyet: 'Erkek', girisTarihi: '10/05/1995', gorevi: 'Şube Müdürü' },];
const donanimlar = [
  { Adi: 'Masaüstü Bilgisayar', Adet: 15 },
  { Adi: 'Yazıcı', Adet: 10 },];
const yazilimlar = [
  { Adi: 'Araç Takip Sistemi' },
  { Adi: 'İhbarname Takip Sistemi' },];
const araclar = [
  { Adi: 'Renault Megane 2011', Cinsi: 'Binek', SahiplikTuru: 'Resmi' },
  { Adi: 'Ford Transit', Cinsi: 'Pickup', SahiplikTuru: 'Kiralık' },];
const acoounttye = [
  { Adi: 'Fen İşleri', id: '0', hedef: '80' },
  { Adi: 'Emlak İstimlak', id: '1', hedef: '70' },
  { Adi: 'Çevre Koruma', id: '2', hedef: '70' },
  { Adi: 'Zabıta', id: '3', hedef: '92' },
  { Adi: 'Bilgi İşlem', id: '4', hedef: '93' }]

const API_URL = 'http://localhost:63544/api/hesaplar';
const dataAdress = 'Hesaplar';
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
class StratejiOlustur extends React.Component {
  constructor(...args) {
    super(...args);
    this.state = {
      amacData: STRATEGYDATA,
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
    this.props.getStrategyData()
    
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

    
    const strategydata= this.props.strategydata
    console.log(strategydata)
    return (
      <div>
        {/* Stratejik amaç ekleme popupı */}
        
        <GridContainer>

          <Grid item xs={4} >
            <AmacEkle classes={this.props.classes} birimler={acoounttye} />
          </Grid>
          <Grid item xs={4} >
            <YeniIsEkle performansAdi={''} birim={''} classes={this.props.classes} birimler={BIRIMLER} />
          </Grid>
          <Grid item xs={4} >
            <YeniFaaliyetEkle performansAdi={''} birim={''} classes={this.props.classes} birimler={BIRIMLER} />
          </Grid>
          <Grid item xs={12} >
            
            <Card>
              {/* Stratejik amaç tablosu */}

              {this.state.amacData.map(strateji => <Accordion expanded={this.state.expanded === strateji.path} onChange={this.handleChange(strateji.path)}>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel1bh-content"
                  id="panel1bh-header"
                >
                  <Grid item xs={10} >A{strateji.id + 1}:{strateji.adi}</Grid>
                  <Grid item xs={2} style={{ textAlign: 'right' }}>
                    <IconButton>
                      <DeleteIcon />
                    </IconButton>

                    <IconButton>
                      <EditIcon />
                    </IconButton>
                  </Grid>
                </AccordionSummary>
                <AccordionDetails>
                  <div style={{ width: "100%", marginLeft: "5rem" }} >
                    <GridContainer alignItems='center' justify='center'>
                      <GridItem xs={12} sm={12} md={12}>
                        <HedefEkle classes={this.props.classes} birimler={acoounttye} amacAdi={strateji.adi}  amacId={strateji.id} />
                      </GridItem>
                    </GridContainer>

                    {
                      strateji.hedefler.map((item) =>
                        <Accordion expanded={this.state.hedefexpanded === item.path} onChange={this.handleChangeHedef(item.path)}>
                          <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls="panel1bh-content"
                            id="panel1bh-header"
                          >
                            <Grid xs={5}>H{strateji.id + 1}.{item.id + 1} : <div >{item.adi}</div ></Grid>
                            <Grid item xs={7} style={{ textAlign: 'right' }}>
                              <IconButton onClick={e=>{
                                e.stopPropagation();// **ÖNEMLİ** // Butona tıklanınca akordiyonun açılmasını engelliyor.
                                Swal.fire({
                                  title: 'Emin Misin?',
                                  text: "Bu işlemi geri döndüremeyebilirsin!",
                                  icon: 'warning',
                                  showCancelButton: true,
                                  confirmButtonColor: '#3085d6',
                                  cancelButtonColor: '#d33',
                                  confirmButtonText: 'Evet, Sil!'
                                }).then((result) => {
                                  if (result.isConfirmed) {
                                    Swal.fire(
                                      'Silindi!',
                                      'İlgili veri silindi.',
                                      'success'
                                    )
                                  }
                                })
                              }}>
                                <DeleteIcon />
                              </IconButton>

                              <IconButton>
                                <EditIcon />
                              </IconButton>
                            </Grid>
                          </AccordionSummary>
                          <AccordionDetails>
                            <div style={{ width: '%100' }}>
                              <GridContainer alignItems='center' justify='center'>
                                <GridItem xs={12} sm={12} md={12}>
                                  <PerformansEkle birimler={BIRIMLER} hedefAdi={item.adi} classes={this.props.classes} amacId={strateji.id} hedefId={item.id} />
                                </GridItem>
                              </GridContainer>
                              {item.performanslar ? item.performanslar.map(performans => <Accordion expanded={this.state.performansexpanded === performans.path} onChange={this.handleChangePerformans(performans.path)}>
                                <AccordionSummary
                                  expandIcon={<ExpandMoreIcon />}
                                  aria-controls="panel1bh-content"
                                  id="panel1bh-header"
                                >
                                  <Grid xs={5}>P{strateji.id + 1}.{item.id + 1}.{performans.id + 1} : {performans.adi}</Grid>
                                  <Grid item xs={7} style={{ textAlign: 'right' }}>
                                    <IconButton>
                                      <DeleteIcon />
                                    </IconButton>

                                    <IconButton>
                                      <EditIcon />
                                    </IconButton>
                                  </Grid>
                                </AccordionSummary>
                                <AccordionDetails>
                                  <Grid container>
                                    <Grid item xs={4}><YeniIsEkle performansAdi={performans.adi} birim={performans.birimId} classes={this.props.classes} birimler={BIRIMLER}/></Grid>
                                    <Grid item xs={6}><YeniFaaliyetEkle performansAdi={performans.adi} birim={performans.birimId} classes={this.props.classes} birimler={BIRIMLER} /> </Grid>
                                    <Grid container><h4><b>Performans Göstergeleri</b></h4></Grid>
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
                                      <Grid item xs={2} style={{ textAlign: 'center' }}>{is.OlcuBrimi} </Grid>
                                      <Grid item xs={2}>{is.hedef} </Grid>
                                      <Grid item xs={2}>{is.gerceklesme} </Grid>
                                      <Grid item xs={4}>{is.aciklama} </Grid>

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
                                      <Grid item xs={2} style={{ textAlign: 'center' }}>{is.OlcuBrimi} </Grid>
                                      <Grid item xs={2}>{is.hedef} </Grid>
                                      <Grid item xs={2}>{is.gerceklesme} </Grid>
                                      <Grid item xs={4}>{is.aciklama} </Grid>
                                    </Grid>)}
                                  </Grid>
                                </AccordionDetails>
                              </Accordion>) : null}
                            </div>
                          </AccordionDetails>
                        </Accordion>
                      )}
                  </div>
                </AccordionDetails>
              </Accordion>)}


            </Card>
          </Grid>


        </GridContainer>

        <PersonelListesi personeller={personeller} />
        <Grid container justify="center" spacing={3}>
          <Grid item xs={4} >
            <Donanimlar donanimlar={donanimlar} />
          </Grid>

          <Grid item xs={4} >
            <Yazilimlar yazilimlar={yazilimlar} />
          </Grid>
          <Grid item xs={4} >
            <AracListesi araclar={araclar} />
          </Grid>
        </Grid>
        <Grid container justify="center" spacing={3}>
          <Grid item xs={12} >
            <TeskilatSemasi />
          </Grid>
          <Grid item xs={4} >
            <FizikselYapi />
          </Grid>
          <Grid item xs={4} >
            <YetkiGorev />
          </Grid>
          <Grid item xs={4} >
            <Mevzuat />
          </Grid>
        </Grid>



      </div>
    )

  }

}
StratejiOlustur.propTypes = {
  classes: PropTypes.object.isRequired
};
const mapStateToProps = (state)=>({strategydata:state.strategydata})
export default connect(mapStateToProps,{getStrategyData})(withStyles(styles)(StratejiOlustur));
