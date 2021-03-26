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
import AddIcon from '@material-ui/icons/Add';
import {currentUser, addData, auth, takeData, updateData, deleteData,moneyTransfer,addPaymentData} from '../../firebase/auth';
import IconButton from '@material-ui/core/IconButton';
import EditIcon from '@material-ui/icons/Edit';
import { Button, Icon } from "@material-ui/core";
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
import { ThreeSixty } from "@material-ui/icons";

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
class Ayarlar extends React.Component {
  constructor(...args) {
    super(...args);
    this.state = { modalShow: false,
      modalAccountShow: false,
      isTuruSayisi:[{isTuru:'',parametre:0,hedef:'',ilce:false,mahalle:false,caddesokak:false}],
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
        { title: 'Adı', field: 'Adi' },
        { title: 'Birim', field: 'birimid',
        lookup: { 1: 'Yol Asfalt', 4: 'İnşaat Yapım',8:'Sinyalizasyon ve Altyapı',6:'Tahliye ve Yıkım',7:'Kaldırım Yapım ve Bakım Onarım',0:'Numarataj',5:'Afet Koordinasyon',3:'Aykome',2:'Kent Estetiği' }, },
        {
          title: 'Üst Birim',
          field: 'ustBirimId',
          lookup: { 0: 'Fen İşleri', 1: 'Emlak İstimlak',2:'Çevre Koruma',3:'Zabıta',4:'Bilgi İşlem' },
        },{ title: 'Ünvanı', field: 'unvan' },
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
    
    const kullanicilar=[
      {id:'0',Adi:'Ahmet Kemal YILMAZ',birimid:'0',ustBirimId:'3',unvan:'Mühendis',mail:'aky@outlook.com.tr',maas:'8000',yetkili:'Evet'},
      {id:'1',Adi:'Halil İbrahim YÜKSEL',birimid:'1',ustBirimId:'0',unvan:'Mühendis',mail:'halil_yuksel@hotmail.com',maas:'7000',yetkili:'Hayır'},
      {id:'2',Adi:'Cemal KAYA',birimid:'0',ustBirimId:'3',unvan:'İşçi',mail:'camalkaya99@gmail.com',maas:'3500',yetkili:'Hayır'},
  ]
    const parametre=['Adet','m²','km²','TL','m³','Litre']
    const isEmirleri=[{birimid:'1',isturu:'Yeni Yol Asfalt Dökümü',parametre:'m²',hedef:'50000'},
    {birimid:'1',isturu:'Yama İşlemleri',parametre:'m²',hedef:'10000'},
    {birimid:'1',isturu:'Yeni Yol Temel Yapımı',parametre:'m²',hedef:'50000'},
    {birimid:'4',isturu:'Yeni Birim İnşaatı',parametre:'m²',hedef:'10000'},
    {birimid:'8',isturu:'Yeni Alt Yapı Çalışması',parametre:'m²',hedef:'20000'},
    {birimid:'6',isturu:'Tahliye İşlemi',parametre:'Adet',hedef:'200'},
    {birimid:'7',isturu:'Kaldırım Yenilemesi',parametre:'m²',hedef:'12000'},
    {birimid:'0',isturu:'Tabela Montajı',parametre:'Adet',hedef:'11000'},
    {birimid:'0',isturu:'Direk Montajı',parametre:'Adet',hedef:'6000'},
    {birimid:'0',isturu:'Tabela Tamirat',parametre:'Adet',hedef:'8000'},
    {birimid:'0',isturu:'Numaratah Montajı',parametre:'Adet',hedef:'20000'},]
    const accounts=[      
    {Adi:'Asfalt Dökümü',id:'1',Birim:'Yol Asfalt',hedef:'70',ustBirimId:'0'},    
    {Adi:'Yeni Birim İnşaatı',id:'4',Birim:'İnşaat Yapım',hedef:'78',ustBirimId:'0'},
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
    const hesapTuru=['Cash','Bank','POS','Credit Card','Cheque','Multiple Owner'];
    const acoounttye=[
    {Adi:'Fen İşleri',id:'0',hedef:'80'},
    {Adi:'Emlak İstimlak',id:'1',hedef:'70'},
    {Adi:'Çevre Koruma',id:'2',hedef:'70'},
    {Adi:'Zabıta',id:'3',hedef:'92'},
    {Adi:'Bilgi İşlem',id:'4',hedef:'93'}]
    const columns=['Adi','Birimi','Ust Birimi']
    return (
    <div>
        <GridContainer>
        <Grid item xs={12} >
          <Card>
          <MaterialTable
          title="Kullanıcı Listesi"
          columns={this.state.columns}
          data={kullanicilar}
          localization={{
            
            body: {
              addTooltip:'Ekle',
              editTooltip:'Düzenle',
              deleteTooltip:'Sil'
            }
        }}
          options={{
            actionsColumnIndex: -1
          }}
          editable={{
            onRowAdd: newData =>
              new Promise((resolve, reject) => {
                setTimeout(() => {
                  
                  resolve();
                }, 1000)
              }),
            onRowUpdate: (newData, oldData) =>
              new Promise((resolve, reject) => {
                setTimeout(() => {
    
                  resolve();
                }, 1000)
              }),
            onRowDelete: oldData =>
              new Promise((resolve, reject) => {
                setTimeout(() => {
                  
                  resolve()
                }, 1000)
              }),
          }}
          
          detailPanel={rowData => {
            return (
              <div style={{width:"100%", marginLeft:"5rem"}} >
                <GridContainer alignItems='center' justify='center'>
                  <GridItem xs={3} sm={3} md={3}>
                    <b>Email</b>
                  </GridItem>
                  <GridItem xs={3} sm={3} md={3}>
                    <b>Maaş</b>
                  </GridItem>
                  <GridItem xs={3} sm={3} md={3}>
                    <b>Yetkili?</b>
                  </GridItem>
                
                </GridContainer>
                
                  {kullanicilar.filter(i=>i.id===rowData.id).map(item=><GridContainer alignItems='center' justify='center'>
                  <GridItem xs={3} sm={3} md={3}>
                    {item.mail}
                  </GridItem>
                  <GridItem xs={3} sm={3} md={3}>
                    {item.maas}
                  </GridItem>
                  <GridItem xs={3} sm={3} md={3}>
                    {item.yetkili}
                  </GridItem>
                  
                  </GridContainer>)}
                
                
              </div>
            )
          }}
          
        />
          </Card>
          </Grid>
          
          
        </GridContainer>
        <GridContainer alignItems='center' justify='center'>
        <Grid item xs={12} >
          <Card>
            <CardHeader color='success'>
              <GridContainer alignItems='center' justify='center'>
              <GridItem xs={6}> <h4>Parametreler</h4></GridItem>
              <GridItem xs={6}><IconButton color="primary">
                <AddIcon/>
              </IconButton> </GridItem>
              </GridContainer>
            </CardHeader>
            <CardBody>
              {parametre.map(i=><GridContainer alignItems='center' >
                <GridItem xs={3}>
                {i}
                </GridItem>
                <GridItem xs={3}>
                <IconButton >
                <EditIcon/>
              </IconButton> 
                </GridItem>

              </GridContainer>)}
            </CardBody>
          </Card>
          </Grid>
          </GridContainer>
        
     
      </div>
    )

  }
  
}
Ayarlar.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Ayarlar);
