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
import { getAraclarData, removeFromAraclar } from '../../store/actions/birimislemleri/araclistesi';
import Divider from '../Ui/Divider';
import Skeleton from 'react-loading-skeleton';
import Swal from 'sweetalert2';
import AracEkle from './Add/AracEkle';
import AracGuncelle from './Update/AracGuncelle';

const options = [
    'Düzenle',
    'Sil'
];

const ITEM_HEIGHT = 48;
class AracListesi extends React.Component {
    constructor(...args) {
        super(...args)
        this.state = {
            araclar: this.props.araclar,
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
        this.props.getAraclarData(BirimId);
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
                    this.props.removeFromAraclar(this.state.editData);
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
        
        const { araclar } = this.props.araclar;
        const { birimler } = this.props;

        if (this.props.araclar.loading == true) {
            return <div>
              <Skeleton height={100} />
              <Skeleton count={6} /></div>
          }
        return <div>
            <AracEkle props={this.props} />
            <Card  >
                <CardHeader>
                    <b>Araç Listesi</b>
                </CardHeader>
                <CardBody>
                    <Grid container justify="center" spacing={3}>
                        <Grid item xs={4}><b>Adi</b></Grid> <Grid item xs={4}><b>Cinsi</b></Grid> <Grid item xs={4}><b>Sahiplenme Türü </b></Grid>
                    </Grid>
                    {typeof araclar != "undefined" && araclar.map((arac, index) => <Grid container justify="center" spacing={3} key={index} >
                        <Grid item xs={4}>{arac.adi} </Grid>
                        <Grid item xs={3}>{this.props.araclar.aracCinsi[arac.aracCinsi]} </Grid>
                        <Grid item xs={3}>{this.props.araclar.tahsisTuru[arac.tahsisTuru]} </Grid>
                        <Grid item xs={2}>
                            <div>
                                <IconButton
                                    aria-label="more"
                                    aria-controls="long-menu"
                                    aria-haspopup="true"
                                    onClick={(e) => this.handleClick(e, arac)}
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
                <AracGuncelle  open={this.state.openMenuGuncelle} arac={this.state.editData} birimler={birimler} handleModalOpenGuncelle={this.handleModalOpenGuncelle} />
            </Card>
        </div>
    }
}

    const mapStateToProps = (state) => ({ araclar: state.araclar, error: state.araclar.error })
export default connect(mapStateToProps, { getAraclarData, removeFromAraclar })(AracListesi)