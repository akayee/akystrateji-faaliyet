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
import { getMevzuatlar, removeFromMevzuat } from '../../store/actions/birimislemleri/mevzuatlar';
import MevzuatEkle from './Add/MevzuatEkle';
import Divider from '../Ui/Divider';
import Skeleton from 'react-loading-skeleton';
import Swal from 'sweetalert2';
import MevzuatGuncelle from './Update/MevzuatGuncelle';


const options = [
  'Düzenle',
  'Sil'
];

const ITEM_HEIGHT = 48;
class Mevzuat extends React.Component {
  constructor(...args) {
    super(...args)
    this.state = {
      mevzuatlar: this.props.mevzuatlar,
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
    this.props.getMevzuatlar(BirimId);
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
          this.props.removeFromMevzuat(this.state.editData);
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
    const { mevzuatlar } = this.props.mevzuatlar;
    const { birimler } = this.props;
    if (this.props.mevzuatlar.loading == true) {
      return <div>
          <Skeleton height={100} />
          <Skeleton count={6} /></div>
  }
    return <div>
      <MevzuatEkle props={this.props} />
      <Card  >
        <CardHeader>
          <b>İlgili Mevzuatlar</b>
        </CardHeader>
        <CardBody>
          <Grid container justify="center" spacing={3}>
            <Grid item xs={5}><b>Mevzuat Adi</b></Grid> <Grid item xs={5}><b>Yönetmelik</b></Grid><Grid item xs={2}></Grid>
          </Grid>
          {typeof mevzuatlar != "undefined" && mevzuatlar.map((mevzuat, index) => <Grid container justify="center" spacing={3} key={index} >
                        <Grid item xs={5}>{mevzuat.adi} </Grid>
                        <Grid item xs={5}>{mevzuat.yonetmelik} </Grid>
                        <Grid item xs={2}>
                            <div>
                                <IconButton
                                    aria-label="more"
                                    aria-controls="long-menu"
                                    aria-haspopup="true"
                                    onClick={(e) => this.handleClick(e, mevzuat)}
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
        
        <MevzuatGuncelle open={this.state.openMenuGuncelle} mevzuat={this.state.editData} birimler={birimler} handleModalOpenGuncelle={this.handleModalOpenGuncelle} />
      </Card>
    </div>
  }
}

const mapStateToProps = (state) => ({ mevzuatlar: state.mevzuatlar, error: state.mevzuatlar.error })
export default connect(mapStateToProps, { getMevzuatlar, removeFromMevzuat })(Mevzuat)