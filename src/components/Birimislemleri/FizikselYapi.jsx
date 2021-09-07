import React from 'react';
import { connect } from 'react-redux';

import Card from "components/Card/Card.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import CardBody from "components/Card/CardBody.jsx";
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import FizikselYapiEkle from './FizikselYapiEkle';
import { getFizikselYapiData } from '../../store/actions/birimislemleri/fizikselyapilar';
import FizikselYapiGuncelle from './FizikselYapiGuncelle';
import Divider from '../Ui/Divider';


const options = [
  'Düzenle',
  'Sil'
];

const ITEM_HEIGHT = 48;
class FizikselYapi extends React.Component {
  constructor(...args) {
    super(...args)
    this.state = {
      fizikselyapilar: this.props.fizikselyapilar,
      anchorEl: null,
      open: false,
      openMenu: {},
      openMenuGuncelle: false,
      editData:'',
      isLoading:false
    }
  }
  componentDidMount() {
    let BirimId = 2;
    this.props.getFizikselYapiData(BirimId);
    if(this.props.error != true)
    {
      this.setState({
        isLoading:true
      })
    }else{
      this.setState({
        isLoading:true
      })
    }
    
  }
  handleClick = (event,fizikselyapi) => {
    this.setState({
      anchorEl: event.currentTarget,
      editData:fizikselyapi
      
    })
  }
  handleClose = ( key) => {
    if (key == 'Düzenle') {

      this.setState({
        anchorEl: null,
        openMenu: { [key]: true },
        openMenuGuncelle: true

      })
    } else {
      this.setState({
        anchorEl: null,
        openMenu: { [key]: true }

      })
    }
  }
  handleModalOpenGuncelle = () => {
    this.setState({
      openMenuGuncelle: !this.state.openMenuGuncelle
    })
  }
  render() {


    const { fizikselyapilar } = this.props.fizikselyapilar;
    const { birimler } = this.props;
    console.log(this.props)
    if(this.props.fizikselyapilar.loading==true){
      return <div>Loading</div>
    }
    return <div>
      <FizikselYapiEkle props={this.props} />
      <Card  >
        <CardHeader>
          <b>Yapı Listesi</b>
        </CardHeader>
        <CardBody>
          <Grid container justify="center" spacing={3}>
            <Grid item xs={4}><b>Adi</b></Grid> <Grid item xs={4}><b>Konum</b></Grid> <Grid item xs={4}><b>m²</b></Grid>
          </Grid>
          {typeof fizikselyapilar != "undefined" && fizikselyapilar.map((fizikselyapi) => <Grid container justify="center" spacing={3}>
            
            <Grid item xs={4}>{fizikselyapi.adi}</Grid>
            <Grid item xs={4}>{fizikselyapi.konum} </Grid>
            <Grid item xs={2}>{fizikselyapi.metreKare}</Grid>
            <Grid item xs={2}>
              <div>
                <IconButton
                  aria-label="more"
                  aria-controls="long-menu"
                  aria-haspopup="true"
                  onClick={(e)=>this.handleClick(e,fizikselyapi)}
                >
                  <MoreVertIcon />
                </IconButton>
                <Menu
                  id="long-menu"
                  anchorEl={this.state.anchorEl}
                  keepMounted
                  open={Boolean(this.state.anchorEl)}
                  onClose={this.handleClose}
                  PaperProps={{
                    style: {
                      maxHeight: ITEM_HEIGHT * 4.5,
                      width: '20ch',
                      position: 'relative'
                    },
                  }}
                >
                  {options.map((option) => (
                    <MenuItem key={option} onClick={()=>this.handleClose( option)}>
                      {option}
                    </MenuItem>
                  ))}
                </Menu>
              </div>
            </Grid>
            <Divider />
          </Grid>)}
          <FizikselYapiGuncelle open={this.state.openMenuGuncelle} fizikselyapi={this.state.editData}  birimler={birimler} handleModalOpenGuncelle={this.handleModalOpenGuncelle} />
        </CardBody>
      </Card>
    </div>
  }
}

const mapStateToProps = (state) => ({ fizikselyapilar: state.fizikselyapilar, error: state.fizikselyapilar.error })
export default connect(mapStateToProps, { getFizikselYapiData })(FizikselYapi)