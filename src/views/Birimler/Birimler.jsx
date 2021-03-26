import React from "react";
import PropTypes from "prop-types";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import GridItem from "components/Grid/GridItem.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";
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
import Switch from '@material-ui/core/Switch';

import LinearProgress from "@material-ui/core/LinearProgress";

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
class Birimler extends React.Component {
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
      listtype:false,
      columns: [
        { title: 'Account ID', field: 'HesapNo' },
        { title: 'Name', field: 'Tanim' },
        {
          title: 'Account Type',
          field: 'HesapTuru',
          lookup: { 0: 'Cash', 1: 'Bank',2:'POS',3:'Credit Card',4:'Cheque',5:'Multiple Owner' },
        },
        { title: 'Current Balance', field: 'Stok'},
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
handleChangeSwitch=(e)=>{
  this.setState({listtype:!this.state.listtype})
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
    const accounts=[      
    {id:'1',Adi:'Yol Asfalt',stratejikHedef:'Yeni yol açımı yapılan alan',hedef:'70',ustBirimId:'0'},    
    {id:'4',Adi:'İnşaat Yapım',stratejikHedef:'Yapılan oto alt-üst geçit sayısı',hedef:'78',ustBirimId:'0'},
    {id:'8',Adi:'Sinyalizasyon ve Altyapı',stratejikHedef:'Yapılan yaya üst geçidi sayısı',hedef:'78',ustBirimId:'0'}, 
    {id:'6',Adi:'Tahliye ve Yıkım',stratejikHedef:'Kent içinde yapılacak köprü, alt-üst geçit ve köprülü kavşaklar yapımı ile yaya yolları, kavşak ve meydan düzenlemeleri yapmak',hedef:'79',ustBirimId:'0'},
    {id:'7',Adi:'Kaldırım Yapım ve Bakım Onarım',stratejikHedef:'Tretuvar çalışması yapılan alan',hedef:'80',ustBirimId:'0'}, 
    {id:'0',Adi:'Numarataj',stratejikHedef:'Kent içinde yeni tabela, idrek ve tamiri işleri.',hedef:'80',ustBirimId:'0'},
    {id:'5',Adi:'Afet Koordinasyon',stratejikHedef:'Karla mücadelede tuz alımı yapmak',hedef:'81',ustBirimId:'0'},
    {id:'3',Adi:'Aykome',stratejikHedef:'AYKOME kazı ruhsatı verilmesi süresi',hedef:'82',ustBirimId:'0'},
    {id:'2',Adi:'Kent Estetiği',stratejikHedef:'Yol çizgi boyası ve yatay işaretleme yaptırmak',hedef:'90',ustBirimId:'0'},  
    {id:'10',Adi:'Kamulaştırma',stratejikHedef:'KDP kapsamında teslim edilecek konut sayısı',hedef:'60',ustBirimId:'1'},
    {id:'11',Adi:'Taşınmazlar',stratejikHedef:'Halka arz edilecek konut sayısı',hedef:'65',ustBirimId:'1'},
    {id:'9',Adi:'İdari İşler',stratejikHedef:'Uzlaşma yolu veya hukuki yol ile kamulaştırılan taşınmaz alanı',hedef:'78',ustBirimId:'1'},
    {id:'12',Adi:'Yeni Yerleşimler',stratejikHedef:'Kuzey Ankara K.D.G.P. çalışmaları yapmak',hedef:'80',ustBirimId:'1'},
    {id:'13',Adi:'Araştırma İhale ve İdari İşler',stratejikHedef:'Karşıyaka Mezarlığı defin sayısı',hedef:'60',ustBirimId:'2'},
    {id:'14',Adi:'Bitkisel Üretim ve Uygulama',stratejikHedef:'Ortaköy Mezarlığı defin sayısı',hedef:'70',ustBirimId:'2'},
    {id:'15',Adi:'İklim Değişikliği ve Uyum',stratejikHedef:'Kişi başına düşen yeşil alan miktarı',hedef:'70',ustBirimId:'2'},
    {id:'16',Adi:'Proje ve Yapım İşleri',stratejikHedef:'Bakım yapılan yeşil alan miktarı',hedef:'72',ustBirimId:'2'},
    {id:'17',Adi:'Yeşil Alanlar',stratejikHedef:'Kemirici-vektörle mücadele edilen jit alanı',hedef:'75',ustBirimId:'2'},
    {id:'18',Adi:'Atık Yönetimi',stratejikHedef:'Hayvanat bahçesi ve akvaryum yapımı',hedef:'80',ustBirimId:'2'},  
    {id:'19',Adi:'Zabıta 1',stratejikHedef:'Ruhsatlı minibüs ve özel halk otobüsü denetimi',hedef:'80',ustBirimId:'3'},  
    {id:'20',Adi:'Zabıta 2',stratejikHedef:'Servis araçları ve korsan araç denetimi',hedef:'85',ustBirimId:'3'},  
    {id:'21',Adi:'Zabıta 3',stratejikHedef:'Ticari taksi denetimi',hedef:'87',ustBirimId:'3'},  
    {id:'22',Adi:'Zabıta 4',stratejikHedef:'GSM işyerleri ve sıhhi müesseselerin denetimi',hedef:'89',ustBirimId:'3'},  
    {id:'23',Adi:'Zabıta 5',stratejikHedef:'Benzin ve Lpg istasyonları denetimi',hedef:'90',ustBirimId:'3'},  
    {id:'24',Adi:'Zabıta 6',stratejikHedef:'Reklam tabela denetimi',hedef:'92',ustBirimId:'3'},  
    {id:'25',Adi:'Zabıta 7',stratejikHedef:'Otobüs yazıhanesi denetimi',hedef:'98',ustBirimId:'3'},  
    {id:'26',Adi:'Elektronik Sistemler ve Donanım',stratejikHedef:'Alımı yapılan sunucu, yedekleyici, firewall vb. önemli donanım ya da yazılım alımı oranı',hedef:'81',ustBirimId:'4'},
    {id:'27',Adi:'İletişim',stratejikHedef:'Sistem odasının modernizasyonu oranı',hedef:'85',ustBirimId:'4'},
    {id:'28',Adi:'Proje İhale ve İdari İşler',stratejikHedef:'Dağıtımı yapılan e- imza token cihazı sayısı',hedef:'89',ustBirimId:'4'},
    {id:'29',Adi:'Yazılım ve Yönetim',stratejikHedef:'E-devlete entegre e- Belediye modül sayısı',hedef:'99',ustBirimId:'4'},];
    const acoounttye=[
    {Adi:'Fen İşleri',id:'0',hedef:'80'},
    {Adi:'Emlak İstimlak',id:'1',hedef:'70'},
    {Adi:'Çevre Koruma',id:'2',hedef:'70'},
    {Adi:'Zabıta',id:'3',hedef:'92'},
    {Adi:'Bilgi İşlem',id:'4',hedef:'93'}]
    return (
    <div>
        <Button onClick={this.modalAccountOpen}>Yeni Birim Oluştur</Button>

          <div>{this.state.listtype?"Hedefler":"Birimler"}<Switch
          onChange={this.handleChangeSwitch}
          name="checkedA"
          inputProps={{ 'aria-label': 'secondary checkbox' }}
        /></div>
        <GridContainer>
         
            {acoounttye.map((i,index)=>
          
               <GridItem xs={12} sm={6} md={6}>
              <Card>
                <CardHeader color="success">
                  <GridContainer alignItems='center' justify='center'>
                <GridItem xs={12} sm={4} md={4}>
                  <h4>{i.Adi}</h4>
                </GridItem>
                <GridItem xs={6} sm={6} md={6}>
                  <LinearProgress variant="determinate"  color='secondary' value={i.hedef} /> 
                </GridItem>
                
                <GridItem xs={6} sm={2} md={2}><h4>%{i.hedef}</h4></GridItem>
                
                </GridContainer>
                </CardHeader>
                <CardBody>
                <GridContainer alignItems='center' justify='center'> 
                          <GridItem xs={5} sm={5} md={5}>
                        <div ><b>{this.state.listtype?"Birim Adı":"Hedef Adı"}</b></div ></GridItem>
                        <GridItem xs={7} sm={7} md={7}>
                        <b>Güncel Hedef Tamamlanma Yüzdesi</b>
                        </GridItem>
                        
                        
                        </GridContainer>
                  {
                  accounts.filter(i=>i.ustBirimId==index).map((item)=>
                 
                  <GridContainer alignItems='center' justify='center'> 
                    <GridItem xs={5} sm={5} md={5}>
                  <Link  to={{
                    pathname: "/admin/numarataj",
                    state: { detailData: item }
                  }}><div >{this.state.listtype?item.Adi:item.stratejikHedef}</div ></Link></GridItem>
                  <GridItem xs={4} sm={5} md={5}>
                  <LinearProgress variant="determinate"  color='primary' value={item.hedef} />
                  </GridItem>
                  <GridItem xs={3} sm={2} md={2}><div >%{item.hedef}</div></GridItem>
                  
                  
                  </GridContainer>
                    
                  
                
            
            )}
                </CardBody>
              </Card>
              </GridItem>

             
            )}
          

          
          
        </GridContainer>
        
      <Dialog open={this.state.modalAccountShow} onClose={this.modalAccountOpen} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Yeni Birim Oluştur</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Bu Ekrandan Yeni Birim Oluşturabilirsiniz.
          </DialogContentText>
          <Grid container spacing={3}>
          <TextField          
            name="Tanim"
            autoFocus
            margin="dense"
            id="name"
            label="Birim Adı"
            type="text"
            fullWidth
            onChange={this.handleChange}
          />
           <Grid item xs={4}>
          <FormControl className={classes.formControl}>
          <InputLabel shrink id="demo-simple-select-placeholder-label-label">
            Varsa Üst Birimi?
          </InputLabel>
          <Select
                name="Tanim"
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
              
          <FormHelperText>Var ise üst birimini seçiniz</FormHelperText>
          </FormControl> 
          </Grid>
         
           <Grid item xs={4}>
           <TextField
            name="Stok"
            margin="dense"
            id="Sale"
            label="Bu Yıl Ayrılan Bütçe"
            type="text"
            fullWidth
            onChange={this.handleChange}
          />
          <FormHelperText>İsteğe Bağlı</FormHelperText>
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
Birimler.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Birimler);
