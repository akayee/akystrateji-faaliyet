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
import { getDonanimData, removeFromDonanim } from '../../store/actions/birimislemleri/donanimlar';
import Divider from '../Ui/Divider';
import Skeleton from 'react-loading-skeleton';
import Swal from 'sweetalert2';
import DonanimEkle from './Add/DonanimEkle';
import DonanimGuncelle from './Update/DonanimGuncelle';


const options = [
  'Düzenle',
  'Sil'
];

const ITEM_HEIGHT = 48;
class Donanimlar extends React.Component {
  constructor(...args) {
    super(...args)
    this.state = {
      donanimlar: this.props.donanimlar,
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
    this.props.getDonanimData(BirimId);
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
        confirmButtonText: 'Kaydet',
        denyButtonText: `İptal`,
      }).then((result) => {
        /* Read more about isConfirmed, isDenied below */
        if (result.isConfirmed) {
          Swal.fire('Silme işlemi başarılı!', '', 'success')
          this.props.removeFromDonanim(this.state.editData);
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
    const { donanimlar } = this.props.donanimlar;
    const { birimler } = this.props;
    if (this.props.donanimlar.loading == true) {
      return <div>
          <Skeleton height={100} />
          <Skeleton count={6} /></div>
  }
    return <div>
      <DonanimEkle   props={this.props} />
      <Card  >
        <CardHeader>
          <b>Donanımlar</b>
        </CardHeader>
        <CardBody>
        <Grid container justify="center" spacing={3}>
            <Grid item xs={5}><b>Donanim Adı</b></Grid> <Grid item xs={5}><b>Sayısı</b></Grid><Grid item xs={2}></Grid>
          </Grid>
          {typeof donanimlar != "undefined" && donanimlar.map((donanim, index) => <Grid container justify="center" spacing={3} key={index} >
                        <Grid item xs={5}>{donanim.adi} </Grid>
                        <Grid item xs={5}>{donanim.sayi} </Grid>
                        <Grid item xs={2}>
                            <div>
                                <IconButton
                                    aria-label="more"
                                    aria-controls="long-menu"
                                    aria-haspopup="true"
                                    onClick={(e) => this.handleClick(e, donanim)}
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
        <DonanimGuncelle open={this.state.openMenuGuncelle} donanim={this.state.editData} birimler={birimler} handleModalOpenGuncelle={this.handleModalOpenGuncelle} />
      </Card>
    </div>

  }
}

const mapStateToProps = (state) => ({ donanimlar: state.donanimlar, error: state.donanimlar.error })
export default connect(mapStateToProps, { getDonanimData, removeFromDonanim })(Donanimlar)