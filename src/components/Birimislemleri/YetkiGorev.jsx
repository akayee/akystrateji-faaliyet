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
import { getYetkiGorev, removeFromYetkiGorev } from '../../store/actions/birimislemleri/yetkigorev';
import Divider from '../Ui/Divider';
import Skeleton from 'react-loading-skeleton';
import Swal from 'sweetalert2';
import YetkiGorevEkle from './Add/YetkiGorevEkle';
import YetkiGorevGuncelle from './Update/YetkiGorevGuncelle';

const options = [
    'Düzenle',
    'Sil'
];

const ITEM_HEIGHT = 48;
class YetkiGorev extends React.Component {
    constructor(...args) {
        super(...args)
        this.state = {
            yetkigorevler: this.props.yetkigorevler,
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
        this.props.getYetkiGorev(BirimId);
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
                    this.props.removeFromYetkiGorev(this.state.editData);
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

        const { yetkigorevler } = this.props.yetkigorevler;
        const { birimler } = this.props;
        if (this.props.yetkigorevler.loading == true) {
            return <div>
                <Skeleton height={100} />
                <Skeleton count={6} /></div>
        }
        return <div>
            <YetkiGorevEkle props={this.props} />
            <Card  >
                <CardHeader>
                    <b>Yetkiler ve Görev Tanımları</b>
                </CardHeader>
                <CardBody>
                    <Grid container justify="center" spacing={3}>
                        <Grid item xs={5}><b>Adi</b></Grid> <Grid item xs={5}><b>Kanun</b></Grid><Grid item xs={2}></Grid>

                    </Grid>
                    {typeof yetkigorevler != "undefined" && yetkigorevler.map((yetkiGorev, index) => <Grid container justify="center" spacing={3} key={index} >
                        <Grid item xs={5}>{yetkiGorev.adi} </Grid>
                        <Grid item xs={5}>{yetkiGorev.kanun} </Grid>
                        <Grid item xs={2}>
                            <div>
                                <IconButton
                                    aria-label="more"
                                    aria-controls="long-menu"
                                    aria-haspopup="true"
                                    onClick={(e) => this.handleClick(e, yetkiGorev)}
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
                <YetkiGorevGuncelle open={this.state.openMenuGuncelle} yetkigorev={this.state.editData} birimler={birimler} handleModalOpenGuncelle={this.handleModalOpenGuncelle} />
            </Card>
        </div>
    }
}
const mapStateToProps = (state) => ({ yetkigorevler: state.yetkigorevler, error: state.yetkigorevler.error })
export default connect(mapStateToProps, { getYetkiGorev, removeFromYetkiGorev })(YetkiGorev)