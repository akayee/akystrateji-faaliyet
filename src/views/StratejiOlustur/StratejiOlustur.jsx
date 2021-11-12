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
import STRATEGYDATA from "../../data/dummydata";
import Accordion from '@material-ui/core/Accordion';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import BIRIMLER from "../../data/birimler";
import PerformansEkle from "../../components/Birimislemleri/PerformansEkle";
import PerformansGostergesiEkle from "../../components/Birimislemleri/PerformansGostergesiEkle";
import YeniFaaliyetTuruEkle from "../../components/Birimislemleri/YeniFaaliyetTuruEkle";
import Swal from 'sweetalert2';
import { connect } from 'react-redux';
import { getAmacData } from '../../store/actions/amaclar';
import { getStratejiYiliData } from '../../store/actions/stratejikyil';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import Divider from '../../components/Ui/Divider.js';
import Skeleton from 'react-loading-skeleton';
import StratejikYilEkle from "../../components/Birimislemleri/StratejikYilEkle";
const acoounttye = [
  { Adi: 'Fen İşleri', id: '0', hedef: '80' },
  { Adi: 'Emlak İstimlak', id: '1', hedef: '70' },
  { Adi: 'Çevre Koruma', id: '2', hedef: '70' },
  { Adi: 'Zabıta', id: '3', hedef: '92' },
  { Adi: 'Bilgi İşlem', id: '4', hedef: '93' }]

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
      Yil:null,
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
  componentDidMount() {
    this.props.getAmacData();
    this.props.getStratejiYiliData();

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
  handleChangeYil=(e)=>{
    this.setState({
      yil:e.target.value
    })
  }


  render() {
    Number.prototype.format = function (n, x, s, c) {
      var re = '\\d(?=(\\d{' + (x || 3) + '})+' + (n > 0 ? '\\D' : '$') + ')',
        num = this.toFixed(Math.max(0, ~~n));

      return (c ? num.replace('.', c) : num).replace(new RegExp(re, 'g'), '$&' + (s || ','));
    };

    if(this.props.loading== true){
      return <div>
      <Skeleton height={100} />
      <Skeleton count={6} /></div>
    }
    const {stratejikAmac,hedefler,performanslar,isturleri,vmFaaliyetTurleri}=this.props.strategydata
    console.log(this.props.strategydata)
    return (
      <div>
        {/* Stratejik amaç ekleme popupı */}
        <div style={{float:'right'}}>
          <Grid item xs={4}>
            <FormControl >
              <InputLabel shrink id="demo-simple-select-placeholder-label-label">
                Yıl
              </InputLabel>
              <Select
                name="Yil"
                type="text"
                required
                value={this.state.Yil }
                defaultValue={this.state.Yil}
                onChange={this.handleChangeYil}
              >
                {this.props.Yillar && this.props.Yillar.map((item, index) => {
                  return <MenuItem key={item.id} value={item.id}>{item.yil} </MenuItem>
                }
                )}
              </Select>
            </FormControl>
          </Grid>
        </div>
        <GridContainer>
          <Grid item xs={3} >
            <AmacEkle classes={this.props.classes} birimler={acoounttye} />
          </Grid>
          <Grid item xs={3} >
            <StratejikYilEkle classes={this.props.classes} />
          </Grid>
          <Grid item xs={12} >
            <Card>
              {/* Stratejik amaç tablosu */}

              {stratejikAmac.map(strateji => <Accordion expanded={this.state.expanded === strateji.id} onChange={this.handleChange(strateji.id)}>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel1bh-content"
                  id="panel1bh-header"
                >
                  <Grid item xs={10} >A{strateji.id}:{strateji.adi}</Grid>
                  <Grid item xs={2} style={{ textAlign: 'right' }}>
                    <IconButton>
                      <DeleteIcon />
                    </IconButton>

                    <IconButton>
                      <EditIcon onClick={e => { e.stopPropagation(); }} />
                    </IconButton>
                  </Grid>
                </AccordionSummary>
                <AccordionDetails>
                  <div style={{ width: "100%", marginLeft: "5rem" }} >
                    <GridContainer alignItems='center' justify='center'>
                      <GridItem xs={12} sm={12} md={12}>
                        <HedefEkle classes={this.props.classes} birimler={acoounttye} amac={strateji} amacAdi={strateji.adi} amacId={strateji.id} />
                      </GridItem>
                    </GridContainer>

                    {
                      hedefler.filter(obj=>obj.amaclarId==strateji.id).map((item,hedeflerindex) =>
                        <Accordion expanded={this.state.hedefexpanded === strateji.id +'/'+item.id} onChange={this.handleChangeHedef(strateji.id +'/'+item.id)}>
                          <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls="panel1bh-content"
                            id="panel1bh-header"
                          >
                            <Grid xs={5}>H{strateji.id }.{hedeflerindex+1} : <div >{item.tanim}</div ></Grid>
                            <Grid item xs={7} style={{ textAlign: 'right' }}>
                              <IconButton onClick={e => {
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
                                <EditIcon onClick={e => { e.stopPropagation(); }} />
                              </IconButton>
                            </Grid>
                          </AccordionSummary>
                          <AccordionDetails>
                            <div style={{ width: '%100' }}>
                              <GridContainer alignItems='center' justify='center'>
                                <GridItem xs={12} sm={12} md={12}>
                                  <PerformansEkle birimler={BIRIMLER} classes={this.props.classes} hedef={item} />
                                </GridItem>
                              </GridContainer>
                              {performanslar ? performanslar.filter(obj=>obj.hedeflerId==item.id).map((performans,performansindex) => <Accordion expanded={this.state.performansexpanded === strateji.id +'/'+item.id+'/'+performans.id} onChange={this.handleChangePerformans(strateji.id +'/'+item.id+'/'+performans.id)}>
                                <AccordionSummary
                                  expandIcon={<ExpandMoreIcon />}
                                  aria-controls="panel1bh-content"
                                  id="panel1bh-header"
                                >
                                  <Grid xs={5}>P{strateji.id }.{hedeflerindex+1}.{performansindex+1} : {performans.adi}</Grid>
                                  <Grid item xs={7} style={{ textAlign: 'right' }}>
                                    <IconButton>
                                      <DeleteIcon />
                                    </IconButton>

                                    <IconButton>
                                      <EditIcon onClick={e => { e.stopPropagation(); }} />
                                    </IconButton>
                                  </Grid>
                                </AccordionSummary>
                                <AccordionDetails>
                                  <Grid container>
                                    <Grid item xs={4}><PerformansGostergesiEkle performans={performans} performansAdi={performans.adi} birim={performans.birimId} classes={this.props.classes} birimler={BIRIMLER} /></Grid>
                                    <Grid item xs={6}><YeniFaaliyetTuruEkle performans={performans} performansAdi={performans.adi} birim={performans.birimId} classes={this.props.classes} birimler={BIRIMLER} /> </Grid>
                                    <Grid container><h4><b>Performans Göstergeleri</b></h4></Grid>
                                    <Grid container>
                                      <Grid item xs={8}><b>Adi</b></Grid>
                                      <Grid item xs={2} style={{ textAlign: 'center' }}><b>Ölçü Birimi</b></Grid>
                                    </Grid>
                                    {isturleri && isturleri.filter(obj=>obj.performansId==performans.id).map((is, index) => <Grid container>
                                      <Grid item xs={12}><b>Birim Adi</b></Grid>
                                      <Grid item xs={8}>PG {strateji.id }.{hedeflerindex+1}.{performansindex+1}.{index+1}-{is.adi}</Grid>
                                      <Grid item xs={2} style={{ textAlign: 'center' }}>{is.olcuBirimiTanimi} </Grid>
                                      <Divider />

                                    </Grid>)}
                                    <Grid container><h4><b>Faaliyetler</b></h4></Grid>
                                    <Grid container>
                                      <Grid item xs={8}><b>Adi</b></Grid>
                                      <Grid item xs={2} style={{ textAlign: 'center' }} ><b>Ölçü Birimi</b></Grid>
                                    </Grid>
                                    {vmFaaliyetTurleri && vmFaaliyetTurleri.filter(obj=>obj.performansId==performans.id).map((is, index) => <Grid container>
                                      <Grid item xs={12}><b>Birim Adı</b></Grid>
                                      <Grid item xs={8}>PF {strateji.id }.{hedeflerindex+1}.{performansindex+1}.{index+1}-{is.adi}</Grid>
                                      <Grid item xs={2} style={{ textAlign: 'center' }}>{is.olcuBirimiTanimi} </Grid>
                                      <Divider />
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
      </div>
    )

  }

}
StratejiOlustur.propTypes = {
  classes: PropTypes.object.isRequired
};
const mapStateToProps = (state) => ({ strategydata: state.amaclar.stratejidata,loading:state.amaclar.loading , Yillar: state.stratejikyillar.yillar })
export default connect(mapStateToProps, { getAmacData,getStratejiYiliData })(withStyles(styles)(StratejiOlustur));
