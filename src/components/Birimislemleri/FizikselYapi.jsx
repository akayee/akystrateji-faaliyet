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
      openMenuGuncelle: false
    }
  }
  componentDidMount() {
    let BirimId = 2;
    this.props.getFizikselYapiData(BirimId);
  }
  handleClick = (event) => {
    this.setState({
      anchorEl: event.currentTarget
    })
  }
  handleClose = (e, key) => {
    if (key == 'Düzenle') {

      this.setState({
        anchorEl: null,
        openMenu: { [key]: true },
        openMenuGuncelle: true

      })
    }else{
      this.setState({
        anchorEl: null,
        openMenu: { [key]: true }

      })
    }
  }
  handleModalOpenGuncelle = () =>{
    this.setState({
      openMenuGuncelle:!this.state.openMenuGuncelle
    })
  }
  render() {


    const { fizikselyapilar } = this.props.fizikselyapilar;
    const {birimler} = this.props;
    console.log(birimler)
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
            <Grid item xs={3}>{fizikselyapi.metreKare}</Grid>
            <Grid item xs={1}>
              <div>
                <IconButton
                  aria-label="more"
                  aria-controls="long-menu"
                  aria-haspopup="true"
                  onClick={this.handleClick}
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
                    <MenuItem key={option} onClick={(e) => this.handleClose(e, option)}>
                      {option}
                    </MenuItem>
                  ))}
                </Menu>
              </div>
            </Grid>
          </Grid>)}
        </CardBody>
      </Card>
      <FizikselYapiGuncelle open={this.state.openMenuGuncelle} birimler={birimler} handleModalOpenGuncelle={this.handleModalOpenGuncelle} />
    </div>
  }
}

const mapStateToProps = (state) => ({ fizikselyapilar: state.fizikselyapilar, error: state.fizikselyapilar.error })
export default connect(mapStateToProps, { getFizikselYapiData })(FizikselYapi)