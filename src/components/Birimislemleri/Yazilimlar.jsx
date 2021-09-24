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
import { getYazilimlarData, removeFromYazilimlar } from '../../store/actions/birimislemleri/yazilimlar';
import Divider from '../Ui/Divider';
import Skeleton from 'react-loading-skeleton';
import Swal from 'sweetalert2';
import YazilimEkle from './YazilimEkle';
import YazilimGuncelle from './YazilimGuncelle';


const options = [
  'Düzenle',
  'Sil'
];

const ITEM_HEIGHT = 48;
class Yazilimlar extends React.Component {
  constructor(...args) {
    super(...args)
    this.state = {
      yazilimlar: this.props.yazilimlar,
      anchorEl: null,
      open: false,
      openMenu: {},
      openMenuGuncelle: false,
      editData: '',
      isLoading: false
    }
  }

  componentDidMount() {
    let BirimId = 2;
    this.props.getYazilimlarData(BirimId);
    if (this.props.error != true) {
      this.setState({
        isLoading: true
      })
    } else {
      this.setState({
        isLoading: true
      })
    }
  }

  handleClick = (event, fizikselyapi) => {
    this.setState({
      anchorEl: event.currentTarget,
      editData: fizikselyapi
    })
  }
  handleClose = (key) => {
    if (key == 'Düzenle') {

      this.setState({
        anchorEl: null,
        openMenu: { [key]: true },
        openMenuGuncelle: true
      })
    } else if (key == 'Sil') {
      Swal.fire({
        title: 'Silmek istediğinize emin misiniz?',
        showDenyButton: true,
        confirmButtonText: 'Sil',
        denyButtonText: `İptal`,
      }).then((result) => {
        /* Read more about isConfirmed, isDenied below */
        if (result.isConfirmed) {
          Swal.fire('Silme işlemi başarılı!', '', 'success')
          this.props.removeFromYazilimlar(this.state.editData);
        } else if (result.isDenied) {
          Swal.fire('Silme işlemi iptal edildi', '', 'info')
        }
      })
      this.setState({
        anchorEl: null,
        openMenu: { [key]: true }
      });
    } else {
      this.setState({
        anchorEl: null,
        openMenu: { [key]: true }
      });
    }
  }
  handleModalOpenGuncelle = () => {
    this.setState({
      openMenuGuncelle: !this.state.openMenuGuncelle
    })
  }

  render() {
    const { yazilimlar } = this.props.yazilimlar;
    const { birimler } = this.props;
    if (this.props.yazilimlar.loading == true) {
      return <div>
        <Skeleton height={100} />
        <Skeleton count={6} /></div>
    }
    return <div>
      <YazilimEkle props={this.props} />
      <Card  >
        <CardHeader>
          <b>Yazılımlar</b>
        </CardHeader>
        <CardBody>
          <Grid container justify="center" spacing={3}>
            <Grid item xs={10}><b>Yazılım Adı</b></Grid> <Grid item xs={2}></Grid>
          </Grid>
          {typeof yazilimlar != "undefined" && yazilimlar.map((yazilim, index) => <Grid container justify="center" spacing={3} key={index} >
                        <Grid item xs={5}>{yazilim.adi} </Grid>
                        <Grid item xs={5}>{yazilim.sayi} </Grid>
                        <Grid item xs={2}>
                            <div>
                                <IconButton
                                    aria-label="more"
                                    aria-controls="long-menu"
                                    aria-haspopup="true"
                                    onClick={(e) => this.handleClick(e, yazilim)}
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
                                        <MenuItem key={option} onClick={() => this.handleClose(option)}>
                                            {option}
                                        </MenuItem>
                                    ))}
                                </Menu>
                            </div>
                        </Grid>

                        <Divider />
                    </Grid>

                    )}
        </CardBody>
        <YazilimGuncelle open={this.state.openMenuGuncelle} yazilim={this.state.editData} birimler={birimler} handleModalOpenGuncelle={this.handleModalOpenGuncelle} />
      </Card>
    </div>
  }
}

const mapStateToProps = (state) => ({ yazilimlar: state.yazilimlar, error: state.yazilimlar.error })
export default connect(mapStateToProps, { getYazilimlarData, removeFromYazilimlar })(Yazilimlar)