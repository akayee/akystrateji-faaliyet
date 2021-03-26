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
class MyAccounts extends React.Component {
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
//ACCOUN BİLGİLERİNİ ÇEKME. SAYFA AÇILIRKEN YAPILIYOR
  componentDidMount() {
    var that=this;
    let newdata=takeData(this.state.user,dataAdress).then(function(snapshot){
      snapshot.forEach(item =>{
        that.setState({
          data:that.state.data.concat(item.exportVal()),
        })
      })
    });
    takeData(this.state.user,"whom").then(function(snapshot){
      snapshot.forEach(item =>{
        that.setState({
          whomData:that.state.data.concat(item.exportVal()),
        })
      })
    });
    if(newdata.length>0){
      this.setState({
        data:newdata
      })
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
     
  }
 

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

//Payment Collection dialog function
handlePaymentData=()=>{
  from.whom=this.state.to;
  addPaymentData(this.state.user,from,this.state.aciklama,this.state.count)
  let {data,from,to,count}=this.state;
  let fromStok=from[0].Stok;
  let i1=data.findIndex(element=>element.id==from[0].id);
  fromStok-=count;
  data[i1]={...data[i1],Stok:fromStok};
  this.setState({data,paymentShow:false});
}
//Money transfer dialog function
handleAddData=()=>{
  moneyTransfer(this.state.user,this.state.from,this.state.to,this.state.aciklama,this.state.count)
  let {data,from,to,count}=this.state;
  let fromStok=from[0].Stok;
  let toStok=to[0].Stok;
  let i1=data.findIndex(element=>element.id==from[0].id);
  let i2=data.findIndex(element=>element.id==to[0].id);
  fromStok-=count;
  toStok=parseInt(toStok)+parseInt(count);
  data[i1]={...data[i1],Stok:fromStok};
  data[i2]={...data[i2],Stok:toStok};
  this.setState({data,modalShow:false});
}
//Create Account function
handleNewData=()=>{
  let dat=this.state.data;
  let data={Tanim:this.state.Tanim,HesapTuru:this.state.HesapTuru,Stok:this.state.Stok}
  dat.push(data)
  addData(this.state.user,data,dataAdress);
  this.setState({modalAccountShow:false,data:dat});
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
    const accounts=this.state.data;
    const hesapTuru=['Cash','Bank','POS','Credit Card','Cheque','Multiple Owner'];
    return (
    <div>
        <Button onClick={this.modalOpen}>Money Transfer</Button> <Button onClick={this.modalAccountOpen}>Create Account</Button>
        <Button onClick={this.modalOpen}>Make Payment/Collection</Button>
        <GridContainer>
         
            {this.state.acoounttye.map((i,index)=>
          
               <GridItem xs={12} sm={6} md={6}>
              <Card>
                <CardHeader color="success">
                  
                <h4>{i}</h4>
                </CardHeader>
                <CardBody>
                  {
                  accounts.map((item)=>
                  {if(item.HesapTuru==index)
                    {
                      return(
                        <Link  to={{
                          pathname: "/admin/accountdetail",
                          state: { detailData: item }
                        }}>
                        <Card >
                            <Button>
                          <CardBody><div style={{float: "left"}}>{item.Tanim}</div ><div style={{float: "right"}}>£{item.Stok}</div></CardBody>
                          </Button>   
                        </Card>
                        </Link>
                          
                        
                      )}   
                  }
                  )}
                </CardBody>
              </Card>
              </GridItem>

             
            )}
          

          
          
        </GridContainer>
        <Dialog open={this.state.modalShow} onClose={this.modalOpen} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Make Money Transfer</DialogTitle>
        <DialogContent>
          <DialogContentText>
            You can make money transfer on this screen.
          </DialogContentText>
          <Grid container spacing={3}>
          <TextField          
            name="aciklama"
            autoFocus
            margin="dense"
            id="name"
            label="Description"
            type="text"
            fullWidth
            onChange={this.handleChange}
          />
           <Grid item xs={4}>
          <FormControl className={classes.formControl}>
          <InputLabel shrink id="demo-simple-select-placeholder-label-label">
            From?
          </InputLabel>
          <Select
                name="from"
                type="text"
                value={this.state.froma}
                onChange={e => {   
                  let value=e.target.value;
                  let whom=accounts;
                  console.log(whom)
                  whom=whom.filter(item => value.includes(item.Tanim));
                  console.log(whom)
                  this.setState({
                    from:whom,
                    froma:value
                  })
                }}
              >
                {accounts.map( (item,index)=> {
                  return <MenuItem key={index} value={item.Tanim}>{item.Tanim} </MenuItem>
                }
                )}
              </Select>
              
          <FormHelperText>Choose sender account</FormHelperText>
          </FormControl> 
          </Grid>
          <Grid item xs={4}>
          <FormControl className={classes.formControl}>
          <InputLabel shrink id="demo-simple-select-placeholder-label-label">
            To?
          </InputLabel>
          <Select
                name="to"
                type="text"
                value={this.state.toa}
                onChange={ e => {
                  let value=e.target.value;
                  let whom=accounts;
                  whom=whom.filter(item => (value.includes(item.Tanim)));
                  this.setState({
                    to:whom,
                    toa:value
                  }) 
              }}
              >
               {accounts.map( (item,index)=> {
                  return <MenuItem key={index} value={item.Tanim}>{item.Tanim} </MenuItem>
                }
                )}
              </Select>
              
          <FormHelperText>Choose sending account</FormHelperText>
          </FormControl>
          </Grid>
         
           <Grid item xs={4}>
           <TextField
            autoFocus
            name="count"
            margin="dense"
            id="Sale"
            label="Count"
            type="number"
            fullWidth
            onChange={this.handleChange}
          />
          <FormHelperText>Count</FormHelperText>
           </Grid>
             
          </Grid>
          
          
        </DialogContent>
        <DialogActions>
          <Button onClick={this.handleClose}>
            Cancel
          </Button>
          <Button onClick={this.handleAddData}>
            Transfer
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog open={this.state.modalAccountShow} onClose={this.modalAccountOpen} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Create Account</DialogTitle>
        <DialogContent>
          <DialogContentText>
            You can create an account on this screen.
          </DialogContentText>
          <Grid container spacing={3}>
          <TextField          
            name="Tanim"
            autoFocus
            margin="dense"
            id="name"
            label="Name"
            type="text"
            fullWidth
            onChange={this.handleChange}
          />
           <Grid item xs={4}>
          <FormControl className={classes.formControl}>
          <InputLabel shrink id="demo-simple-select-placeholder-label-label">
            From?
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
                {hesapTuru.map( (item,index)=> {
                  return <MenuItem key={index} value={index}>{item} </MenuItem>
                }
                )}
              </Select>
              
          <FormHelperText>Choose your account type</FormHelperText>
          </FormControl> 
          </Grid>
         
           <Grid item xs={4}>
           <TextField
            autoFocus
            name="Stok"
            margin="dense"
            id="Sale"
            label="Current Balance"
            type="text"
            fullWidth
            onChange={this.handleChange}
          />
          <FormHelperText>Current Balance</FormHelperText>
           </Grid>
             
          </Grid>
          
          
        </DialogContent>
        <DialogActions>
          <Button onClick={this.modalAccountOpen}>
            Cancel
          </Button>
          <Button onClick={this.handleNewData}>
            Add
          </Button>
        </DialogActions>
      </Dialog>


      <Dialog open={this.state.paymentShow} onClose={this.paymentOpen} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Make Payment or Collection</DialogTitle>
        <DialogContent>
          <DialogContentText>
            You can make payment or collection on this screen.
          </DialogContentText>
          <Grid container spacing={3}>
          <TextField          
            name="aciklama"
            autoFocus
            margin="dense"
            id="name"
            label="Description"
            type="text"
            fullWidth
            onChange={this.handleChange}
          />
           <Grid item xs={4}>
          <FormControl className={classes.formControl}>
          <InputLabel shrink id="demo-simple-select-placeholder-label-label">
            From?
          </InputLabel>
          <Select
                name="from"
                type="text"
                value={this.state.froma}
                onChange={e => {   
                  let value=e.target.value;
                  let whom=accounts;
                  console.log(whom)
                  whom=whom.filter(item => value.includes(item.Tanim));
                  console.log(whom)
                  this.setState({
                    from:whom,
                    froma:value
                  })
                }}
              >
                {accounts.map( (item,index)=> {
                  return <MenuItem key={index} value={item.Tanim}>{item.Tanim} </MenuItem>
                }
                )}
              </Select>
              
          <FormHelperText>Choose sender account</FormHelperText>
          </FormControl> 
          </Grid>
          <Grid item xs={4}>
          <FormControl className={classes.formControl}>
          <InputLabel shrink id="demo-simple-select-placeholder-label-label">
            To?
          </InputLabel>
          <Select
                name="to"
                type="text"
                value={this.state.toa}
                onChange={ e => {
                  let value=e.target.value;
                  let whom=this.state.whomData;
                  whom=whom.filter(item => (value.includes(item.Adi)));
                  this.setState({
                    to:whom,
                    toa:value
                  }) 
              }}
              >
               {accounts.map( (item,index)=> {
                  return <MenuItem key={index} value={item.Adi}>{item.Adi} </MenuItem>
                }
                )}
              </Select>
              
          <FormHelperText>Choose sending account</FormHelperText>
          </FormControl>
          </Grid>
         
           <Grid item xs={4}>
           <TextField
            autoFocus
            name="count"
            margin="dense"
            id="count"
            label="Count"
            type="number"
            fullWidth
            onChange={this.handleChange}
          />
          <FormHelperText>Count</FormHelperText>
           </Grid>
             
          </Grid>
          
          
        </DialogContent>
        <DialogActions>
          <Button onClick={this.paymentOpen}>
            Cancel
          </Button>
          <Button onClick={this.handlePaymentData}>
            Transfer
          </Button>
        </DialogActions>
      </Dialog>
      </div>
    )

  }
  
  
}
MyAccounts.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(MyAccounts);
