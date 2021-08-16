import React from "react";
import PropTypes from "prop-types";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import Card from "components/Card/Card.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import CardBody from "components/Card/CardBody.jsx";
import { currentUser, addData, addMultipleData, auth, takeData, updateData, deleteData, moneyTransfer, addPaymentData } from '../../firebase/auth';
import numData from "../../firebase/data.json"
import { Link } from 'react-router-dom'
import LinearProgress from "@material-ui/core/LinearProgress";
import GridItem from "components/Grid/GridItem.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";
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
import DateFnsUtils from '@date-io/date-fns';
import { KeyboardDatePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
import MaterialTable from 'material-table';
import { BorderRight } from "@material-ui/icons";
const hesapTuru = [
  'Tabela Montaj', 'Yeni Direk', 'Mevcut Direk Tamirati', 'Direk Boyama', 'Tabela Tamirat', 'Numarataj Bilgi Stikırı Montaj', 'Numarataj Yazim', 'Tespit', 'Kapi Numarasi Montaji', 'Çift Taraflı Tabela Yapımı', 'Tek Taraflı Tabela Yapımı', 'Kelepçe Hazırlama', 'Kapi Numarasi Üretimi'
];

const Ilceler = [
  'AKYURT', 'ALTINDAĞ', 'AYAŞ', 'BALA', 'BEYPAZARI', 'ÇAMLIDERE', 'ÇANKAYA', 'ÇUBUK', 'ELMADAĞ', 'ETİMESGUT', 'EVREN', 'GÖLBAŞI', 'GÜDÜL', 'HAYMANA', 'KAHRAMANKAZAN', 'KALECİK', 'KEÇİÖREN', 'KIZILCAHAMAM', 'MAMAK', 'NALLIHAN', 'POLATLI', 'PURSAKLAR', 'SİNCAN', 'ŞEREFLİKOÇHİSAR', 'YENİMAHALLE', 'GENEL'
];
const IlcelerGenel = [
  'GENEL', 'AKYURT', 'ALTINDAĞ', 'AYAŞ', 'BALA', 'BEYPAZARI', 'ÇAMLIDERE', 'ÇANKAYA', 'ÇUBUK', 'ELMADAĞ', 'ETİMESGUT', 'EVREN', 'GÖLBAŞI', 'GÜDÜL', 'HAYMANA', 'KAHRAMANKAZAN', 'KALECİK', 'KEÇİÖREN', 'KIZILCAHAMAM', 'MAMAK', 'NALLIHAN', 'POLATLI', 'PURSAKLAR', 'SİNCAN', 'ŞEREFLİKOÇHİSAR', 'YENİMAHALLE'
];
const Aylar = [
  'Ocak', 'Şubat', 'Mart', 'Nisan', 'Mayıs', 'Haziran', 'Temmuz', 'Ağustos', 'Eylül', 'Ekim', 'Kasım', 'Aralık'];

const API_URL = 'http://localhost:63544/api/hesaplar';
const dataAdress = 'Numarataj';
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
// task table yapısı kullanılarak oradaki icon buttonlarla icon eklenecek
class Numarataj extends React.Component {
  constructor(...args) {
    super(...args);
    this.state = {
      modalShow: false,
      yearData: [],
      modalAccountShow: false,
      faaliyet: [],
      ilceFaaliyet: [],
      ayFaaliyet: [],
      paymentShow: false,
      detailData: [],
      Tanim: '',
      date: new Date(),
      formatdate: "",
      isEmri: [],
      EkipNo: "",
      Stok: null,
      accounts: [],
      Mahalle: null,
      HesapTuru: '',
      Ilce: '',
      HesapTuru: null,
      Tanim: "",
      user: currentUser(),
      HesapEkleme: null,
      data: [],
      acoounttye: [
        'Tabela Montaj', 'Yeni Direk', 'Mevcut Direk Tamirati', 'Direk Boyama', 'Tabela Tamirat', 'Numarataj Yazim', 'Tespit', 'Kapi Numarasi Montaji'
      ],
      changedData: [],
      year: new Date().getFullYear()
    };
  }
  //ACCOUN BİLGİLERİNİ ÇEKME. SAYFA AÇILIRKEN YAPILIYOR
  componentDidMount() {
    var that = this;
    // let newdata = takeData(this.state.user, dataAdress).then(function (snapshot) {
    //   let data = [];
    //   snapshot.forEach(item => {
    //     data.push(item.exportVal())
    //   })
    //   data.reverse();
    //   let newdat = data;
    //   let isler = [];
    //   newdat.filter(dat => {
    //     let dt = new Date(dat.date);        
    //     let string = dat.date.toString().split("/")
    //     if (20+string[2] === that.state.year.toString()) {
    //       isler.push(dat)
    //       return true
    //     }
    //     return false

    //   })
    //   that.setState({
    //     data,
    //     yearData: isler
    //   })
    // });
    
    // if (newdata.length > 0) {
    //   this.setState({
    //     data: newdata
    //   })
    // }
    /*
    let numdata= JSON.stringify(numData);
    let newData=JSON.parse(numdata, (key, value) => {
      return value;
    });
    let Numarataj=[];
    console.log(newData);
    for(var i=0;i<784;i++){      
      let item=newData.Sayfa1[i];
      let confirmeditem=[];
      let lastitem={};
      Object.keys(item).map((key,index)=>{
        hesapTuru.map((tur,tindex)=>{
          if(tur==key){            
            let isemri={Adet:item[key],id:tindex}
            confirmeditem.push(isemri);
            lastitem={...lastitem,isEmri:confirmeditem}
          }         
        })


      });
      let changedate= item.date;
      if(item.EkipNo=="ATÖLYELER")
      {
        lastitem={...lastitem,EkipNo:item.EkipNo,date:changedate}
        addData(this.state.user,lastitem,dataAdress);
      }
      else{
        Ilceler.map((ilce,iindex)=>{
          if(ilce==item.Ilce)
          {
            lastitem={...lastitem,Ilce:iindex}
          }
        })
        if(item.Mahalle){
          lastitem={...lastitem,Mahalle:item.Mahalle,EkipNo:item.EkipNo,date:changedate}
          addData(this.state.user,lastitem,dataAdress);
        }else{
          lastitem={...lastitem,EkipNo:item.EkipNo,date:changedate}
          addData(this.state.user,lastitem,dataAdress);
        }
        
        Numarataj.push(lastitem);
        console.log(lastitem)
        
      }
      
      
    }
    
   */

    /*
      let faaliyet=[];
    
      hesapTuru.map((i,index)=>{
    
        
    
        let adi='';
    
        let adet=0;
    
        adi=index;
    
        adet=this.state.data.reduce(function(sum, item){
    
          item.isEmri&&Object.keys(item.isEmri).map((key,index1)=>{
    
            if(item.isEmri[key].id==index){
    
              sum = parseInt(sum)+ parseInt(item.isEmri[key].Adet)
    
            }
    
            }) 
    
          return sum
    
          
    
        },0);
    
        let isemri={isinAdi:adi,Adet:adet};
    
        faaliyet.push(isemri);
    
      })
    
      
    
      console.log(faaliyet);
    
     
    
      let ilecelerDagilim=[];
    
      Ilceler.map((i,index)=>{
    
        let ilceadi='';
    
        let isadi='';
    
        let adet='';
        ilceadi=i;
        let isler=[];
        let isemri={};
    
        hesapTuru.map((is,isindex)=>{
    
          isadi=isindex;
    
          adet=this.state.data.filter(dat=>dat.Ilce==index).reduce(function(sum, item){
             item.isEmri&&Object.keys(item.isEmri).map((key,index1)=>{
    
              if(item.isEmri[key].id==isindex){
    
                sum = parseInt(sum)+ parseInt(item.isEmri[key].Adet)
              }}) 
    
            return sum},0)
              
          isemri={...isemri,isinAdi:isadi,Adet:adet}
          
          isler.push(isemri);
    
          })
          isemri={Ilce:ilceadi,isEmri:isler}
          ilecelerDagilim.push(isemri)
        
      })
      console.log(ilecelerDagilim);
        
    */


    /*const url = `${API_URL}/getlist/${this.state.FirmaId}`;
    axios.get(url).then(response => response.data)
    .then((data) => {
      this.setState({ 
        accounts: data,
        data:data
       });
       console.log('bu data',data)
     })*/

  }


  //Dialog yani popup yönetimi
  modalClose = () => this.setState({ modalShow: false });
  modalOpen = () => this.setState({ modalShow: !this.state.modalShow });
  paymentOpen = () => this.setState({ paymentShow: !this.state.paymentShow });
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
  handleChange = (e) => {
    let val = e.target.value;
    this.setState({ [e.target.name]: val })

  }
  handleChangeIsEmri = (e) => {
    let val = e.target.value;
    let isEmri = this.state.isEmri;
    let dat = { id: e.target.name, Adet: val }
    if (isEmri.some(i => i.id == e.target.name)) {
      let index = isEmri.findIndex(i => i.id == e.target.name)
      isEmri[index] = dat
    } else {
      isEmri.push(dat);
    }
    this.setState({ isEmri });

  }
  handleChangeDate = date => {
    let string = [];
    let sdate = ""
    sdate = date.getFullYear()
    string = sdate.toString().split("")
    let newdate =  parseInt(date.getMonth()+1) + "/" +date.getDate() + "/" + string[2] + string[3]
    this.setState({ date, formatdate: newdate });
  }



  //Create Account function
  handleNewData = () => {    
    let dat = this.state.data;
    let date = this.state.date;
    let newdate= "";
    if(!this.state.formatdate){      
      let string = [];
      let sdate = ""
      sdate = date.getFullYear();
      string = sdate.toString().split("")
      newdate = parseInt(date.getMonth()+1) + "/" + date.getDate() + "/" +  string[2] + string[3];    
    }else{
      newdate=this.state.formatdate
    }
    let data = { Tanim: this.state.Tanim, isEmri: this.state.isEmri, Ilce: this.state.Ilce, Mahalle: this.state.Mahalle, date: newdate, EkipNo: this.state.EkipNo }
    dat.push(data)
    // addData(this.state.user,data,dataAdress);
    dat.reverse();
    this.setState({ modalAccountShow: false, data: dat, Tanim: "",yearData:dat, isEmri: [], EkipNo: "" });
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
  render() {
    Number.prototype.format = function (n, x, s, c) {
      var re = '\\d(?=(\\d{' + (x || 3) + '})+' + (n > 0 ? '\\D' : '$') + ')',
        num = this.toFixed(Math.max(0, ~~n));

      return (c ? num.replace('.', c) : num).replace(new RegExp(re, 'g'), '$&' + (s || ','));
    };


    //DİZAYN CLASSLARININ PROPDAN ALINMA İŞLEMİ
    const { classes } = this.props;
    const accounts = this.state.yearData;
    const acoounttye = [
      { Adi: 'Harita Şefliği', id: '0', hedef: '85' },
      { Adi: 'Numarataj Şefliği', id: '1', hedef: '75' }]
    const columns = [
      { title: 'Ekip No', field: 'EkipNo' },
      { title: 'Ilce', field: 'Ilce', render: rowData => Ilceler[rowData.Ilce] || "GENEL" },
      { title: 'Mahalle', field: 'Mahalle' },
      { title: 'Tarih', field: 'date', type: 'date',render:rowData=> {
        let string = rowData.date.toString().split("/");
        let newdate= string[0]+"/"+string[1]+"/"+20+string[2]
        return new Date(newdate).toLocaleDateString()}}
    ]
    const hedefler = [
      { id: '0', hedef: '11000' },
      { id: '1', hedef: '6000' },
      { id: '2', hedef: '2000' },
      { id: '3', hedef: '4500' },
      { id: '4', hedef: '3000' },
      { id: '5', hedef: '250' },
      { id: '6', hedef: '9000' },
      { id: '7', hedef: '14000' },
      { id: '8', hedef: '14500' },
      { id: '9', hedef: '8000' },
      { id: '10', hedef: '3000' },
      { id: '11', hedef: '30' },
      { id: '12', hedef: '18000' }
    ]

    return (
      <div>


        <GridItem xs={12} sm={6} md={6}>
          <Card>
            <CardHeader color="success">
              <GridContainer alignItems='center' justify='center'>
                <GridItem xs={12} sm={4} md={4}>
                  <h4>Numarataj Müdürlüğü</h4>
                </GridItem>
                <GridItem xs={6} sm={6} md={6}>
                  <LinearProgress variant="determinate" color='secondary' value={80} />
                </GridItem>

                <GridItem xs={6} sm={2} md={2}><h4>%80</h4></GridItem>

              </GridContainer>
            </CardHeader>
            <CardBody>
              <GridContainer alignItems='center' justify='center'>
                <GridItem xs={5} sm={5} md={5}>
                  <div ><b>Birim Adı</b></div ></GridItem>
                <GridItem xs={7} sm={7} md={7}>
                  <b>Güncel Hedef Tamamlanma Yüzdesi</b>
                </GridItem>


              </GridContainer>
              {
                acoounttye.map((item) =>

                  <GridContainer alignItems='center' justify='center'>
                    <GridItem xs={5} sm={5} md={5}>
                      <Link to={{
                        pathname: "/admin/numarataj",
                        state: { detailData: item }
                      }}><div >{item.Adi}</div ></Link></GridItem>
                    <GridItem xs={4} sm={5} md={5}>
                      <LinearProgress variant="determinate" color='primary' value={item.hedef} />
                    </GridItem>
                    <GridItem xs={3} sm={2} md={2}><div >%{item.hedef}</div></GridItem>


                  </GridContainer>




                )}
            </CardBody>
          </Card>
        </GridItem>
        <Grid xs={12} style={{display:"flex",flexDirection:"row",justifyContent:"space-between"}}>

        <div><Button onClick={this.modalAccountOpen}>İş Emri Oluştur</Button> </div>
        <div> <InputLabel shrink id="demo-simple-select-placeholder-label-label">
                    Yıl  {this.state.year}
          </InputLabel>
        <Select
                    name="Yıl"
                    type="text"
                    value={this.state.year}
                    onChange={e => {
                      let value = e.target.value;
                      let newdat = this.state.data;
                      let isler = [];
                      newdat.filter(dat => {
                        let dt = new Date(dat.date);        
                        let string = dat.date.toString().split("/")
                        if (20+string[2] === value.toString()) {
                          isler.push(dat)
                          return true
                        }
                        return false

                      })
                      this.setState({
                        year: value,
                        yearData: isler
                      })
                    }}
                  >
                    
                  <MenuItem key={"2020"} value={"2020"}>2020 </MenuItem>                  
                  <MenuItem key={"2021"} value={"2021"}>2021 </MenuItem>                  
                  <MenuItem key={"2022"} value={"2022"}>2022 </MenuItem>                  
                  <MenuItem key={"2023"} value={"2023"}>2023 </MenuItem>                 
                  <MenuItem key={"2024"} value={"2024"}>2024 </MenuItem>                 
                  <MenuItem key={"2025"} value={"2025"}>2025 </MenuItem>
                   
                  </Select></div>
         
       
        </Grid>
       

        <Grid container spacing={3}>


          <Grid item xs={12} >
            <Card>
              <MaterialTable
                title="İş Emirleri"
                columns={columns}
                data={this.state.yearData}
                actions={[
                  {
                    icon: 'delete',
                    tooltip: 'Delete Invoice',
                    onClick: (event, rowData) => {
                      let data=this.state.data.filter(item=>item.id!=rowData.id);
                      this.setState({data,yearData:data})              
                      deleteData(this.state.user,rowData,dataAdress)
                    }
                  }
                ]}

                detailPanel={rowData => {
                  return (
                    <div style={{ width: "100%", marginLeft: "5rem" }} >
                      <Grid container spacing={3}>
                        {rowData.isEmri && Object.keys(rowData.isEmri).map((key, index) => <Grid item xs={4}>
                          <div style={{ float: "left" }}><b>{hesapTuru[rowData.isEmri[key].id]}</b>:</div><div style={{ float: "right" }}>{rowData.isEmri[key].Adet}</div>
                        </Grid>) || <Grid item xs={4}>Kayıt Yok</Grid>}

                      </Grid>
                    </div>
                  )
                }}

              />
            </Card>
            <Card>
              <CardHeader color="info">
                Faliyet Raporu  Çalışmaları Toplamı
                </CardHeader>
              <CardBody>
                <Grid container spacing={2}>
                  {hesapTuru.map((i, index) =>
                    <Grid item xs={3}>
                      <b>{i}</b>
                      <div>
                        {this.state.yearData.reduce(function (sum, item) {
                          item.isEmri && Object.keys(item.isEmri).map((key, index1) => {
                            if (item.isEmri[key].id == index) {
                              sum = parseInt(sum) + parseInt(item.isEmri[key].Adet)
                            }                          
                            //Yanlış veri kontrolü 
                            //console.log(item.id,item.isEmri[key].Adet)
                            
                          })
                          return sum

                        }, 0)}
                        <i style={{ color: "#C04752" }}>/{hedefler.filter(hedef => hedef.id == index).map(i => i.hedef)}</i></div>
                    </Grid>



                  )}
                </Grid>
              </CardBody>
            </Card>
            <Card>
              <CardHeader color="info">
                MAVİ MASA  ÇALIŞMALARI
                </CardHeader>
              <CardBody>
                <Grid container spacing={2}>
                  {hesapTuru.map((i, index) =>
                    <Grid item xs={3}>
                      <b>{i}</b>
                      <div>
                        {this.state.yearData.filter(item => item.Mahalle == "MAVİMASA" || item.Mahalle =="MAVİ MASA").reduce(function (sum, item) {
                          item.isEmri && Object.keys(item.isEmri).map((key, index1) => {
                            if (item.isEmri[key].id == index) {
                              sum = parseInt(sum) + parseInt(item.isEmri[key].Adet)
                            }
                          })
                          return sum

                        }, 0)}
                      </div>
                    </Grid>



                  )}
                </Grid>
              </CardBody>
            </Card>
          </Grid>
          <Grid item xs={12} >
            <Card>
              <CardHeader color="info">
                <h4>İlçelere Göre Dağılım</h4>
              </CardHeader>
              <CardBody>
                <Grid container spacing={1}>
                <Grid item xs={2} > <b >İlçeler</b></Grid>
                  { hesapTuru.map((is, isindex) => <Grid item xs={1} >
                              {isindex < 9 ? <div><div style={{ writingMode:'vertical-rl',textOrientation:'mixed',border:'1px solid black',padding:'2px'}}><b>{is}</b></div></div>:null}</Grid>)}
                  {Ilceler.map((i, index) =>
                    <Grid item xs={12} >

                        
                        
                        <Grid container spacing={2}>
                        <Grid item xs={2} >{i} </Grid>
                          {
                            hesapTuru.map((is, isindex) => <Grid item xs={1} >
                              {isindex < 9 ? <div stlye={{marginLeft: "2rem"}} >
                                <div style={{border:'1px solid black',paddingLeft:'3%'}}> {this.state.yearData.filter(dat => dat.Ilce == index).reduce(function (sum, item) {
                                  //hesapTuru array olacak. Id ve Adet barındıracak. Aşağıya item.isEmri.map(i=>{if(i.id==isindex) return sum = parseInt(sum)+ parseInt(i.Adet) kodu yazılacak })

                                  item.isEmri && Object.keys(item.isEmri).map((key, index1) => {
                                    if (item.isEmri[key].id == isindex) {
                                      sum = parseInt(sum) + parseInt(item.isEmri[key].Adet)

                                    }



                                  })
                                  return sum

                                }, 0)}</div></div> : null}


                            </Grid>)
                          }

                        </Grid>
                    </Grid>
                  )}
                </Grid>
              </CardBody>
            </Card>
          </Grid>
          <Grid item xs={12} >
            <Card>
              <CardHeader color="success">
                <h4>Aylara Göre Dağılım</h4>
              </CardHeader>
              <CardBody>
                <Grid container spacing={2} >

                <Grid item xs={2} > <b >Aylar</b></Grid>
                { hesapTuru.map((is, isindex) => <Grid item xs={1} >
                              {isindex < 9 ? <div><div style={{ writingMode:'vertical-rl',textOrientation:'mixed',border:'1px solid black',padding:'2px'}}><b>{is}</b></div></div>:null}</Grid>)}
                  
                  {Aylar.map((i, index) =>
                    <Grid item xs={12} >
                        <Grid container spacing={1}>
                        <Grid item xs={2} > {i} </Grid>

                          {
                            hesapTuru.map((is, isindex) => <Grid item xs={1} >
                              {isindex < 9 ? <div style={{border:'1px solid black'}}> {this.state.yearData.filter(dat => dat.date.split("/")[0] == index + 1).reduce(function (sum, item) {
                                //hesapTuru array olacak. Id ve Adet barındıracak. Aşağıya item.isEmri.map(i=>{if(i.id==isindex) return sum = parseInt(sum)+ parseInt(i.Adet) kodu yazılacak })

                                item.isEmri && Object.keys(item.isEmri).map((key, index1) => {
                                  if (item.isEmri[key].id == isindex) {
                                    sum = parseInt(sum) + parseInt(item.isEmri[key].Adet)

                                  }



                                })
                                return sum

                              }, 0)}</div> :null}

                             

                            </Grid>)
                          }

                        </Grid>
                    </Grid>
                  )}
                </Grid>
              </CardBody>
            </Card>
          </Grid>





        </Grid>

        <Dialog open={this.state.modalAccountShow} onClose={this.modalAccountOpen} aria-labelledby="form-dialog-title">
          <DialogTitle id="form-dialog-title">Create Account</DialogTitle>
          <DialogContent>
            <DialogContentText>
              You can create an account on this screen.
          </DialogContentText>
            <Grid container spacing={3}>
            <Grid item xs={4}>
                <TextField
                  autoFocus
                  name="EkipNo"
                  margin="dense"
                  id="EkipNo"
                  label="Ekip No"
                  type="text"
                  fullWidth
                  onChange={this.handleChange}
                />
                <FormHelperText>Ekip No</FormHelperText>
              </Grid>

              {hesapTuru.map((item, index) =>
                <Grid item xs={4}>
                  <FormControl>
                    <TextField
                      name={index}
                      margin="dense"
                      id="Adet"
                      label="Adet"
                      type="text"
                      fullWidth
                      onChange={this.handleChangeIsEmri}
                    />
                    <FormHelperText>{item}</FormHelperText>
                  </FormControl>
                </Grid>)}

              <Grid item xs={4}>
                <FormControl className={classes.formControl}>
                  <InputLabel shrink id="demo-simple-select-placeholder-label-label">
                    İlçeler
          </InputLabel>
                  <Select
                    name="Ilce"
                    type="text"
                    value={this.state.Ilce}
                    onChange={e => {
                      let value = e.target.value;
                      this.setState({
                        Ilce: value
                      })
                    }}
                  >
                    {Ilceler.map((item, index) => {
                      return <MenuItem key={index} value={index}>{item} </MenuItem>
                    }
                    )}
                  </Select>

                  <FormHelperText>İlçe Seçiniz</FormHelperText>
                </FormControl>
              </Grid>
              <Grid item xs={4}>
                <TextField
                  name="Mahalle"
                  margin="dense"
                  id="Mahalle"
                  label="Mahalle"
                  type="text"
                  fullWidth
                  onChange={this.handleChange}
                />
                <FormHelperText>Mahalle</FormHelperText>
              </Grid>
              
              <Grid item xs={4}>
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                  <KeyboardDatePicker
                    disableToolbar
                    variant="inline"
                    format="dd/MM/yyyy"
                    margin="normal"
                    id="date-picker-inline"
                    label="Date picker inline"
                    value={this.state.date}
                    onChange={this.handleChangeDate}
                    KeyboardButtonProps={{
                      'aria-label': 'change date',
                    }}
                  />
                </MuiPickersUtilsProvider>
              </Grid>

            </Grid>


          </DialogContent>
          <DialogActions>
            <Button onClick={this.modalAccountOpen}>
              İptal
          </Button>
            <Button onClick={this.handleNewData}>
              Ekle
          </Button>
          </DialogActions>
        </Dialog>



      </div>
    )

  }


}
Numarataj.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Numarataj);
