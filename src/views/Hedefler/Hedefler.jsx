import React from "react";
import PropTypes from "prop-types";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import GridItem from "components/Grid/GridItem.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";
import MaterialTable from 'material-table';
import Card from "components/Card/Card.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import CardBody from "components/Card/CardBody.jsx";
import { Link } from 'react-router-dom'
import axios from 'axios'
import {currentUser, addData, auth, takeData, updateData, deleteData,moneyTransfer,addPaymentData} from '../../firebase/auth';
import { Button } from "@material-ui/core";
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import InputLabel from '@material-ui/core/InputLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';

import LinearProgress from "@material-ui/core/LinearProgress";
import { Col, Row } from "react-bootstrap";

const API_URL = 'http://localhost:63544/api/hesaplar';
const dataAdress='Hesaplar';
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
class Hedefler extends React.Component {
  constructor(...args) {
    super(...args);
    this.state = { modalShow: false,
      modalAccountShow: false,
      paymentShow:false,
      detailData:[],
      Tanim:'',
      Stok:null,
      accounts:[],
      HesapNo:null,
      HesapTuru:'',
      from:[],
      froma:[],
      to:[],
      toa:[],
      count:null,
      aciklama:null,
      HesapTuru:null,
      Tanim:null,
      ParaBirimi:null,
      Stok:null,
      user:currentUser(),
      HesapEkleme:null,
      columns: [
        { title: 'Amaç Adı', field: 'Adi' },
        { title: 'Hedef Adı', field: 'hedefAdi' },
        { title: 'Birim', field: 'Birim' },
        {
          title: 'Üst Birim',
          field: 'ustBirimId',
          lookup: { 0: 'Fen İşleri', 1: 'Emlak İstimlak',2:'Çevre Koruma',3:'Zabıta',4:'Bilgi İşlem' },
        }
      ],
      personelcolumns: [
        { title: 'Adı', field: 'Adi' },
        { title: 'Kadro', field: 'kadro' },
        { title: 'Birim', field: 'Birim' },
        {
          title: 'Üst Birim',
          field: 'ustBirimId',
          lookup: { 0: 'Fen İşleri', 1: 'Emlak İstimlak',2:'Çevre Koruma',3:'Zabıta',4:'Bilgi İşlem' },
        },
        {
          title:'İşe Giriş Tarihi',field:'girisTarihi'
        },
        {
          title:'Cinsiyet',field:'cinsiyet'
        }
      ],
      data: [],
      whomData:[],
      acoounttye:[
        'Cash', 'Bank','POS','Credit Card','Cheque','Multiple Owner'
    ],
      changedData:[]
    };
  }

    /*const url = `${API_URL}/getlist/${this.state.FirmaId}`;
    axios.get(url).then(response => response.data)
    .then((data) => {
      this.setState({ 
        accounts: data,
        data:data
       });
       console.log('bu data',data)
     })*/
   

 //Dialog yani popup yönetimi
 modalClose = () => this.setState({ modalShow: false });
 modalOpen = () => this.setState({ modalShow: !this.state.modalShow });
 paymentOpen=()=> this.setState({ paymentShow: !this.state.paymentShow });
 handleClose = () => this.setState({ modalShow: false }); 
 modalAccountOpen = () => this.setState({ modalAccountShow: !this.state.modalAccountShow });
 modalClose = () => this.setState({ modalAccountShow: false });
 

 
 /*
 addNewOne= (data)=>{
   //DATA TAPLODAKİ GİRİLEN VERİYİ İÇERİR.
  try
  {axios( {
    method:'post',
    url:API_URL+'/post', 
    data:data  }).then(obj=>{
      this.setState({modalShow:false,
      HesapEkleme:null});
      //İŞLEM BİTTİKTEN SONRA YENİ BİR İŞLEM İÇİN HESAP EKLEME NULLA ÇEKİLİYOR.
    })
  }
  catch(err){
    console.error(err);
  }
 }
 //YENİ ACCOUNT EKLEME FONKSİYONLARI BİTİŞ
 */
/*
//DELETE ACCOUNT FONKSİYONU BAŞLANGIÇ
 deleteAccount= (acc)=>{
   //ACC DEĞERİ SİLİNECEK OLAN VERİYİ İÇERİR
  const id=acc;
  try
  {axios( {
    method:'delete',
    url:API_URL+'/delete/'+id, 
      }).then(obj=>{
        this.setState({HesapEkleme:null});
        //İŞLEM BİTTİKTEN SONRA YENİ BİR İŞLEM İÇİN HESAP EKLEME NULLA ÇEKİLİYOR.
      })
  }
  catch(err){
    console.error(err);
  }
 }
//DELETE ACCOUNT FONKSİYONU BİTİŞ
*/
//Get money transfer screen datas
handleChange=(e)=>{
  let val=e.target.value;
  this.setState({[e.target.name]:val})
  
}

/*
//UPDATE APP
updateOne=(acc)=>{
  //ACC DEĞERİ DEĞİŞTİRİLECEK OLAN VERİYİ İÇERİR
  const id=acc.Id;
  try
  {axios( {
    method:'put',
    url:API_URL+'/put/'+id+'/', 
    data:acc  }).then(obj=>{
      this.setState({HesapEkleme:null});
      //İŞLEM BİTTİKTEN SONRA YENİ BİR İŞLEM İÇİN HESAP EKLEME NULLA ÇEKİLİYOR.
    })
  }
  catch(err){
    console.error(err);
  }
}
//UPDATE APP
*/
  render(){
    Number.prototype.format = function(n, x, s, c) {
      var re = '\\d(?=(\\d{' + (x || 3) + '})+' + (n > 0 ? '\\D' : '$') + ')',
          num = this.toFixed(Math.max(0, ~~n));
    
      return (c ? num.replace('.', c) : num).replace(new RegExp(re, 'g'), '$&' + (s || ','));
    };
    

    //DİZAYN CLASSLARININ PROPDAN ALINMA İŞLEMİ
    const { classes } = this.props;
    const isEmirleri=[{birimid:'1',isturu:'Yeni Yol Asfalt Dökümü',parametre:'m²',hedef:'50000'},
    {birimid:'1',isturu:'Yama İşlemleri',parametre:'m²',hedef:'10000'},
    {birimid:'1',isturu:'Yeni Yol Temel Yapımı',parametre:'m²',hedef:'50000'},
    {birimid:'4',isturu:'Üstgeçit İnşaatı',parametre:'m²',hedef:'10000'},
    {birimid:'8',isturu:'Yeni Alt Yapı Çalışması',parametre:'m²',hedef:'20000'},
    {birimid:'6',isturu:'Tahliye İşlemi',parametre:'Adet',hedef:'200'},
    {birimid:'7',isturu:'Kaldırım Yenilemesi',parametre:'m²',hedef:'12000'},
    {birimid:'0',isturu:'Tabela Montajı',parametre:'Adet',hedef:'11000'},
    {birimid:'0',isturu:'Direk Montajı',parametre:'Adet',hedef:'6000'},
    {birimid:'0',isturu:'Tabela Tamirat',parametre:'Adet',hedef:'8000'},
    {birimid:'0',isturu:'Numaratah Montajı',parametre:'Adet',hedef:'20000'},]
    const accounts=[      
    {Adi:'Toplu taşıma odaklı, güvenli, hızlı, konforlu, çevre dostu, kentin ekonomik ve sosyal gelişimine uyumlu, teknolojik yeniliklere açık, engelsiz ve sürdürülebilir modern ulaşım sağlamak.',hedefAdi:'Ulaşım yapısını güçlendirmek',id:'1',Birim:'Yol Asfalt',hedef:'70',ustBirimId:'0'},    
    {Adi:'Toplu taşıma odaklı, güvenli, hızlı, konforlu, çevre dostu, kentin ekonomik ve sosyal gelişimine uyumlu, teknolojik yeniliklere açık, engelsiz ve sürdürülebilir modern ulaşım sağlamak.',hedefAdi:'Ulaşım yapısını güçlendirmek',id:'4',Birim:'İnşaat Yapım',hedef:'78',ustBirimId:'0'},
    {Adi:'Mamak Altyapı Çalışması',id:'8',Birim:'Sinyalizasyon ve Altyapı',hedef:'78',ustBirimId:'0'}, 
    {Adi:'Mamak Tahliye İşlemleri',id:'6',Birim:'Tahliye ve Yıkım',hedef:'79',ustBirimId:'0'},
    {Adi:'Keçiören Dutluk Kaldırım Çalışması',id:'7',Birim:'Kaldırım Yapım ve Bakım Onarım',hedef:'80',ustBirimId:'0'}, 
    {Adi:'Tabela Direk İşlemleri',id:'0',Birim:'Numarataj',hedef:'80',ustBirimId:'0'},
    {Adi:'Afet Müdahale Ekipmanları Alımı',id:'5',Birim:'Afet Koordinasyon',hedef:'81',ustBirimId:'0'},
    {Adi:'Fiber Altyapı Ruhsat İşlemleri',id:'3',Birim:'Aykome',hedef:'82',ustBirimId:'0'},
    {Adi:'Keşif',id:'2',Birim:'Kent Estetiği',hedef:'90',ustBirimId:'0'},  
    {Adi:'Eski Binaların Kamulaştırılması',id:'10',Birim:'Kamulaştırma',hedef:'60',ustBirimId:'1'},
    {Adi:'Arsa Satın Alım İşlemleri',id:'11',Birim:'Taşınmazlar',hedef:'65',ustBirimId:'1'},
    {Adi:'Yazılım İhalesi',id:'9',Birim:'İdari İşler',hedef:'78',ustBirimId:'1'},
    {Adi:'Yeni Yerleşim Birimleri Oluşturulması',id:'12',Birim:'Yeni Yerleşimler',hedef:'80',ustBirimId:'1'},
    {Adi:'Yazılım İhalesi',id:'13',Birim:'Araştırma İhale ve İdari İşler',hedef:'60',ustBirimId:'2'},
    {Adi:'Yeni Sera Kurulumu',id:'14',Birim:'Bitkisel Üretim ve Uygulama',hedef:'70',ustBirimId:'2'},
    {Adi:'Çiftçilere Tohum Dağıtılması',id:'15',Birim:'İklim Değişikliği ve Uyum',hedef:'70',ustBirimId:'2'},
    {Adi:'Keçiören Yeni Park Projeleri',id:'16',Birim:'Proje ve Yapım İşleri',hedef:'72',ustBirimId:'2'},
    {Adi:'Refüj Bakım Çalışmaları',id:'17',Birim:'Yeşil Alanlar',hedef:'75',ustBirimId:'2'},
    {Adi:'Harfiyat İşlemleri',id:'18',Birim:'Atık Yönetimi',hedef:'80',ustBirimId:'2'},  
    {Adi:'Denetimler',id:'19',Birim:'Zabıta 1',hedef:'80',ustBirimId:'3'},  
    {Adi:'Denetimler',id:'20',Birim:'Zabıta 2',hedef:'85',ustBirimId:'3'},  
    {Adi:'Denetimler',id:'21',Birim:'Zabıta 3',hedef:'87',ustBirimId:'3'},  
    {Adi:'Denetimler',id:'22',Birim:'Zabıta 4',hedef:'89',ustBirimId:'3'},  
    {Adi:'Denetimler',id:'23',Birim:'Zabıta 5',hedef:'90',ustBirimId:'3'},  
    {Adi:'Denetimler',id:'24',Birim:'Zabıta 6',hedef:'92',ustBirimId:'3'},  
    {Adi:'Denetimler',id:'25',Birim:'Zabıta 7',hedef:'98',ustBirimId:'3'},  
    {Adi:'Bilgisayar Temini',id:'26',Birim:'Elektronik Sistemler ve Donanım',hedef:'81',ustBirimId:'4'},
    {Adi:'İnternet İhalesi',id:'27',Birim:'İletişim',hedef:'85',ustBirimId:'4'},
    {Adi:'Yazılım İhalesi',id:'28',Birim:'Proje İhale ve İdari İşler',hedef:'89',ustBirimId:'4'},
    {Adi:'Yazılım Geliştirme ve Bakım',id:'29',Birim:'Yazılım ve Yönetim',hedef:'99',ustBirimId:'4'},];
    const personeller=[      
      {Adi:'Ahmet YILMAZ',kadro:'Şirket',id:'1',Birim:'Yol Asfalt',cinsiyet:'Erkek',ustBirimId:'0',girisTarihi:'10/10/2019',gorevi:'Ofis Mühendisi'},    
      {Adi:'Kemal Ecevit',id:'4',Birim:'İnşaat Yapım',kadro:'Memur',ustBirimId:'0',cinsiyet:'Erkek',girisTarihi:'10/05/1995',gorevi:'Şube Müdürü'},];
    const donanimlar=[      
      {Adi:'Masaüstü Bilgisayar',Adet:15},    
      {Adi:'Yazıcı',Adet:10},];
    const yazilimlar=[      
      {Adi:'Araç Takip Sistemi'},    
      {Adi:'İhbarname Takip Sistemi'},];
    const araclar=[      
      {Adi:'Renault Megane 2011',Cinsi:'Binek',SahiplikTuru:'Resmi'},    
      {Adi:'Ford Transit',Cinsi:'Pickup',SahiplikTuru:'Kiralık'},];
    const acoounttye=[
    {Adi:'Fen İşleri',id:'0',hedef:'80'},
    {Adi:'Emlak İstimlak',id:'1',hedef:'70'},
    {Adi:'Çevre Koruma',id:'2',hedef:'70'},
    {Adi:'Zabıta',id:'3',hedef:'92'},
    {Adi:'Bilgi İşlem',id:'4',hedef:'93'}]
    const columns=['Adi','Birimi','Ust Birimi']
    return (
    <div>
        <Button onClick={this.modalAccountOpen}>Yeni Stratejik Amaç Oluştur</Button>
        <GridContainer>
        <Grid item xs={12} >
          <Card>
          <MaterialTable
          title="Stratejik Amaç Listesi"
          columns={this.state.columns}
          data={accounts}
          actions={[            
            {
              icon: 'delete',
              tooltip: 'Sil',
              onClick: (event, rowData) => {
            }
            },
            {
                icon: 'edit',
                tooltip: 'Düzenle',
                onClick: (event, rowData) => {
              }
              }
          ]} 
          options={{
            actionsColumnIndex: -1
          }}
          
          detailPanel={rowData => {
            return (
              <div style={{width:"100%", marginLeft:"5rem"}} >
                <GridContainer alignItems='center' justify='center'>
                  <GridItem xs={12} sm={12} md={12}>
                    <Button variant="outlined" color="primary">Yeni Stratejik Hedef Ekle</Button>
                    <Button variant="outlined" color="secondary">Yeni Performans Ekle</Button>
                    <Button variant="outlined">Yeni İş Türü Ekle</Button>
                  </GridItem>
                  <GridItem xs={4} sm={4} md={4}>
                    <b>İş Türü</b>
                  </GridItem>
                  <GridItem xs={4} sm={4} md={4}>
                    <b>Parametre</b>
                  </GridItem>
                  <GridItem xs={4} sm={4} md={4}>
                    <b>Hedef</b>
                  </GridItem>
                  
                
                </GridContainer>
                
                  {isEmirleri.filter(i=>i.birimid===rowData.id).map(item=><GridContainer alignItems='center' justify='center'>
                  <GridItem xs={4} sm={4} md={4}>
                    {item.isturu}
                  </GridItem>
                  <GridItem xs={4} sm={4} md={4}>
                    {item.parametre}
                  </GridItem>
                  <GridItem xs={4} sm={4} md={4}>
                    {item.hedef}
                  </GridItem>
                  
                  </GridContainer>)}
                
                
              </div>
            )
          }}
          
        />
          </Card>
          </Grid>
          
          
        </GridContainer>

        <Button >Yeni Personel Ekle</Button>
        <GridContainer>
        <Grid item xs={12} >
          <Card>
          <MaterialTable
          title="Personel Listesi"
          columns={this.state.personelcolumns}
          data={personeller}
          actions={[            
            {
              icon: 'delete',
              tooltip: 'Sil',
              onClick: (event, rowData) => {
            }
            },
            {
                icon: 'edit',
                tooltip: 'Düzenle',
                onClick: (event, rowData) => {
              }
              }
          ]} 
          options={{
            actionsColumnIndex: -1
          }}

          detailPanel={rowData => {
            return (
              <div style={{width:"100%", marginLeft:"5rem"}} >
                <GridContainer alignItems='center' justify='center'>
                  <GridItem xs={4} sm={4} md={4}>
                    <b>İşe Giriş Tarihi</b>
                  </GridItem>
                  <GridItem xs={4} sm={4} md={4}>
                    <b>Unvan</b>
                  </GridItem>
                </GridContainer>
                
                  <GridContainer alignItems='center' justify='center'>
                  <GridItem xs={4} sm={4} md={4}>
                    {rowData.girisTarihi}
                  </GridItem>
                  <GridItem xs={4} sm={4} md={4}>
                    {rowData.gorevi}
                  </GridItem>
                  </GridContainer>
                
                
              </div>
            )
          }}
          
        />
          
         
          </Card>
          </Grid>
          
          
        </GridContainer>
        <Grid container justify="center" spacing={3}> 
          <Grid item xs={4} >       
          <Button >Yeni Donanım Ekle</Button>
          <Card  >
            <CardHeader>
              <b>Donanımlar</b>
            </CardHeader>
            <CardBody>
                {donanimlar.map((donanim,index)=><Grid  container justify="center" spacing={3}>
                  
                  <Grid item xs={6}>{donanim.Adi}</Grid> <Grid item xs={6}>{donanim.Adet}</Grid> 
              
                  </Grid>)}
            </CardBody>
          </Card>
          </Grid>

          <Grid item xs={4} >       
          <Button >Yeni Yazılım Ekle</Button>
          <Card  >
            <CardHeader>
              <b>Yazılımlar</b>
            </CardHeader>
            <CardBody>
                {yazilimlar.map((yazilim,index)=><div>
                  
                   {index+1 }-{yazilim.Adi} 
                
                </div>)}
            </CardBody>
          </Card>
          </Grid>
          <Grid item xs={4} >       
          <Button >Yeni Araç Ekle</Button>
          <Card  >
            <CardHeader>
             <b>Araç Listesi</b> 
            </CardHeader>
            <CardBody>
            <Grid  container justify="center" spacing={3}>
            <Grid item xs={4}><b>Adi</b></Grid> <Grid item xs={4}><b>Cinsi</b></Grid> <Grid item xs={4}><b>Sahiplenme Türü </b></Grid>
            </Grid>
                {araclar.map((arac,index)=><Grid  container justify="center" spacing={3}>
                  
                    <Grid item xs={4}>{arac.Adi}</Grid> <Grid item xs={4}>{arac.Cinsi}</Grid> <Grid item xs={4}>{arac.SahiplikTuru} </Grid>
                
                    </Grid>)}
            </CardBody>
          </Card>
          </Grid>
        </Grid>
        <Grid container justify="center" spacing={3}> 
          <Grid item xs={12} >       
          <Card  >
            <CardHeader>
              <b>Teşkilat Şeması</b>
            </CardHeader>
            <CardBody>
            </CardBody>
          </Card>
          </Grid>
          <Grid item xs={4} >       
          <Button >Fiziksel Yapı Ekle</Button>
          <Card  >
            <CardHeader>
             <b>Yapı Listesi</b> 
            </CardHeader>
            <CardBody>
            <Grid  container justify="center" spacing={3}>
            <Grid item xs={4}><b>Adi</b></Grid> <Grid item xs={4}><b>Konum</b></Grid> <Grid item xs={4}><b>m²</b></Grid>
            </Grid>
            </CardBody>
          </Card>
          </Grid>
          <Grid item xs={4} >       
          <Button >Yetki ve Görev Tanımı Ekle</Button>
          <Card  >
            <CardHeader>
             <b>Yetkiler ve Görev Tanımları</b> 
            </CardHeader>
            <CardBody>
            <Grid  container justify="center" spacing={3}>
            <Grid item xs={4}><b>Adi</b></Grid> <Grid item xs={4}><b>Kanun</b></Grid> 
            </Grid>
            </CardBody>
          </Card>
          </Grid>
          <Grid item xs={4} >       
          <Button >Mevzuat Ekle</Button>
          <Card  >
            <CardHeader>
             <b>İlgili Mevzuatlar</b> 
            </CardHeader>
            <CardBody>
            <Grid  container justify="center" spacing={3}>
            <Grid item xs={4}><b>Yönetmelik</b></Grid> <Grid item xs={4}><b>Tanım</b></Grid> 
            </Grid>
            </CardBody>
          </Card>
          </Grid>
        </Grid>
        
      <Dialog open={this.state.modalAccountShow} onClose={this.modalAccountOpen} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Yeni Stratejik Hedef Oluştur</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Bu ekrandan biriminize stratejik hedef ve iş türlerini girebilirsiniz.
          </DialogContentText>
          <Grid container spacing={3}>
          <TextField          
            name="Tanim"
            autoFocus
            margin="dense"
            id="name"
            label="Hedef Adı"
            type="text"
            fullWidth
            onChange={this.handleChange}
          />
           <Grid item xs={4}>
          <FormControl className={classes.formControl}>
          <InputLabel shrink id="demo-simple-select-placeholder-label-label">
            Birimi?
          </InputLabel>
          <Select
                name="Birim"
                type="text"
                value={this.state.HesapTuru}
                onChange={e => {   
                  let value=e.target.value;               
                  this.setState({
                    HesapTuru:value
                  })
                }}
              >
                {acoounttye.map( (item,index)=> {
                  return <MenuItem key={item.id} value={item.id}>{item.Adi} </MenuItem>
                }
                )}
              </Select>
              
          <FormHelperText>Lütfen Birimi Seçiniz</FormHelperText>
          </FormControl> 
          </Grid>
          <Grid item xs={4}>
          <FormControl className={classes.formControl}>
          <InputLabel shrink id="demo-simple-select-placeholder-label-label">
            Alt Birimi?
          </InputLabel>
          <Select
                name="Birim"
                type="text"
                value={this.state.HesapTuru}
                onChange={e => {   
                  let value=e.target.value;               
                  this.setState({
                    HesapTuru:value
                  })
                }}
              >
                {accounts.map( (item,index)=> {
                  return <MenuItem key={item.id} value={item.id}>{item.Birim} </MenuItem>
                }
                )}
              </Select>
              
          <FormHelperText>Lütfen Birimi Seçiniz</FormHelperText>
          </FormControl> 
          </Grid>
         
           <Grid item xs={4}>
           <TextField
            name="Stok"
            margin="dense"
            id="Sale"
            label="Hedef Sayısı"
            type="text"
            fullWidth
            onChange={this.handleChange}
          />
          <FormHelperText>Hedef Sayısı</FormHelperText>
           </Grid>
             
          </Grid>
          
          
        </DialogContent>
        <DialogActions>
          <Button onClick={this.modalAccountOpen}>
            Cancel
          </Button>
          <Button >
            Add
          </Button>
        </DialogActions>
      </Dialog>

      </div>
    )

  }
  
}
Hedefler.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Hedefler);
