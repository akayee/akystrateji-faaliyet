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
class Raporlar extends React.Component {
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
    {id:'1',Adi:'Yol Asfalt',hedef:'70',ustBirimId:'0'},    
    {id:'4',Adi:'İnşaat Yapım',hedef:'78',ustBirimId:'0'},
    {id:'8',Adi:'Sinyalizasyon ve Altyapı',hedef:'78',ustBirimId:'0'}, 
    {id:'6',Adi:'Tahliye ve Yıkım',hedef:'79',ustBirimId:'0'},
    {id:'7',Adi:'Kaldırım Yapım ve Bakım Onarım',hedef:'80',ustBirimId:'0'}, 
    {id:'0',Adi:'Numarataj',hedef:'80',ustBirimId:'0'},
    {id:'5',Adi:'Afet Koordinasyon',hedef:'81',ustBirimId:'0'},
    {id:'3',Adi:'Aykome',hedef:'82',ustBirimId:'0'},
    {id:'2',Adi:'Kent Estetiği',hedef:'90',ustBirimId:'0'},  
    {id:'10',Adi:'Kamulaştırma',hedef:'60',ustBirimId:'1'},
    {id:'11',Adi:'Taşınmazlar',hedef:'65',ustBirimId:'1'},
    {id:'9',Adi:'İdari İşler',hedef:'78',ustBirimId:'1'},
    {id:'12',Adi:'Yeni Yerleşimler',hedef:'80',ustBirimId:'1'},
    {id:'13',Adi:'Araştırma İhale ve İdari İşler',hedef:'60',ustBirimId:'2'},
    {id:'14',Adi:'Bitkisel Üretim ve Uygulama',hedef:'70',ustBirimId:'2'},
    {id:'15',Adi:'İklim Değişikliği ve Uyum',hedef:'70',ustBirimId:'2'},
    {id:'16',Adi:'Proje ve Yapım İşleri',hedef:'72',ustBirimId:'2'},
    {id:'17',Adi:'Yeşil Alanlar',hedef:'75',ustBirimId:'2'},
    {id:'18',Adi:'Atık Yönetimi',hedef:'80',ustBirimId:'2'},  
    {id:'19',Adi:'Zabıta 1',hedef:'80',ustBirimId:'3'},  
    {id:'20',Adi:'Zabıta 2',hedef:'85',ustBirimId:'3'},  
    {id:'21',Adi:'Zabıta 3',hedef:'87',ustBirimId:'3'},  
    {id:'22',Adi:'Zabıta 4',hedef:'89',ustBirimId:'3'},  
    {id:'23',Adi:'Zabıta 5',hedef:'90',ustBirimId:'3'},  
    {id:'24',Adi:'Zabıta 6',hedef:'92',ustBirimId:'3'},  
    {id:'25',Adi:'Zabıta 7',hedef:'98',ustBirimId:'3'},  
    {id:'26',Adi:'Elektronik Sistemler ve Donanım',hedef:'81',ustBirimId:'4'},
    {id:'27',Adi:'İletişim',hedef:'85',ustBirimId:'4'},
    {id:'28',Adi:'Proje İhale ve İdari İşler',hedef:'89',ustBirimId:'4'},
    {id:'29',Adi:'Yazılım ve Yönetim',hedef:'99',ustBirimId:'4'},];
    const hesapTuru=['Cash','Bank','POS','Credit Card','Cheque','Multiple Owner'];
    const acoounttye=[
    {Adi:'Fen İşleri',id:'0',hedef:'80'},
    {Adi:'Emlak İstimlak',id:'1',hedef:'70'},
    {Adi:'Çevre Koruma',id:'2',hedef:'70'},
    {Adi:'Zabıta',id:'3',hedef:'92'},
    {Adi:'Bilgi İşlem',id:'4',hedef:'93'}]
    return (
    <div>
        <Card>
        <CardHeader color="success">
            <h4>Raporlar Ekranı</h4>
        </CardHeader>
        <CardBody>
        <GridContainer alignItems='center' justify='center'>
         
        <GridItem xs={4} sm={4} md={4}><Link  to={{
                          pathname: "/admin/accountdetail"
                        }}><h4 >2020 Faaliyet Raporu</h4 ></Link></GridItem>
         <GridItem xs={4} sm={4} md={4}><Link  to={{
                          pathname: "/admin/accountdetail"
                        }}><h4 >2020 Aylık Faaliyet</h4 ></Link></GridItem>
        <GridItem xs={4} sm={4} md={4}><Link  to={{
                          pathname: "/admin/accountdetail"
                        }}><h4 >2020 İlçe Bazlı Faaliyet</h4 ></Link></GridItem>
        </GridContainer>
        </CardBody>
        </Card>
        
     

      </div>
    )

  }
  
}
Raporlar.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Raporlar);
