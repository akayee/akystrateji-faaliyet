import React from 'react';
import { connect } from 'react-redux';
import { Button } from "@material-ui/core";
import Grid from '@material-ui/core/Grid';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';
import InputLabel from '@material-ui/core/InputLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import Swal from 'sweetalert2';
import { updateYetkiGorev, removeFromYetkiGorev } from '../../store/actions/birimislemleri/yetkigorev';
import YetkiGorevItem from '../../models/yetkigorev-item';

class YetkiGorevGuncelle extends React.Component {
    constructor(...args) {
        super(...args)
        this.state = {
            modalopen: this.props.open,
            Birim: this.props.yetkigorev.birimId,
            yapiBilgileri: this.props.yetkigorev,
            birimler: this.props.birimler
        }
    }
    modalAccountOpen = () => {
        this.setState({
            modalopen: !this.state.modalopen
        })
    }
    handleChangeBirim = (e) => {
        let val = e.target.value;
        this.setState({ Birim: val })

    }
    handleChange = (e) => {
        let val = e.target.value;
        this.setState({ yapiBilgileri: { ...this.state.yapiBilgileri, [e.target.name]: val } })

    }
    handleSubmit = (e) => {

        var yapi = new YetkiGorevItem(this.props.yetkigorev.id,this.state.yapiBilgileri.Adi || this.props.yetkigorev.adi,
            this.state.yapiBilgileri.Konum || this.props.yetkigorev.kanun,
            false,
            this.state.Birim || this.props.yetkigorev.birimId);
        yapi.OlusturmaTarihi = this.props.yetkigorev.olusturmaTarihi;
        this.props.updateYetkiGorev(yapi);

        if (this.props.error === false) {
            this.setState({
                modalopen: !this.state.modalopen,
                amacDetay: [],
                Birim: null
            })

            Swal.fire({
                title: 'Kayıt Başarılı!',
                position: 'top-end',
                icon: 'success',
                showConfirmButton: false,
                timer: 1500
            })
            this.props.handleModalOpenGuncelle(e)

        }
        else {

            this.setState({
                modalopen: !this.state.modalopen
            })
            Swal.fire({
                title: 'Oops...',
                position: 'top-end',
                icon: 'error',
                text: 'Hata Oluştu',
                showConfirmButton: false,
                timer: 1500
            })

            this.props.handleModalOpenGuncelle(e)
        }


    }
    render() {
        const { birimler, yetkigorev } = this.props
        return <div>
            <Dialog open={this.props.open} onClose={this.props.handleModalOpenGuncelle} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">Yeni Stratejik Amaç Oluştur</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Bu ekrandan birim veya birimlerinize stratejik amaç tanımlayabilirsiniz.
                    </DialogContentText>
                    <Grid container spacing={4}>
                        <Grid item xs={3}>
                            <TextField
                                name="Adi"
                                autoFocus
                                required
                                margin="dense"
                                id="name"
                                label={yetkigorev.adi}
                                type="text"
                                fullWidth
                                onChange={this.handleChange}
                            />
                        </Grid>
                        <Grid item xs={4}>
                            <TextField
                                name="Kanun"
                                margin="dense"
                                required
                                id="name"
                                label={yetkigorev.kanun}
                                type="text"
                                fullWidth
                                onChange={this.handleChange}
                            />
                        </Grid>
                        <Grid item xs={4}>
                            <FormControl >
                                <InputLabel shrink id="demo-simple-select-placeholder-label-label">
                                    Birimi
                                </InputLabel>
                                <Select
                                    name="Birim"
                                    type="text"
                                    required
                                    value={this.state.Birim || yetkigorev.birimId}
                                    defaultValue={this.state.Birim}
                                    onChange={this.handleChangeBirim}
                                >
                                    {birimler && birimler.map((item, index) => {
                                        return <MenuItem key={item.id} value={item.id}>{item.adi} </MenuItem>
                                    }
                                    )}
                                </Select>
                                <FormHelperText>Lütfen Bir Birim Seçiniz</FormHelperText>
                            </FormControl>
                        </Grid>
                    </Grid>


                </DialogContent>
                <DialogActions>
                    <Button onClick={this.props.handleModalOpenGuncelle}>
                        İptal
                    </Button>
                    <Button onClick={this.handleSubmit} >
                        Ekle
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    }
}

const mapStateToProps = (state) => ({ yetkigorevler: state.yetkigorevler, error: state.yetkigorevler.error })
export default connect(mapStateToProps, { updateYetkiGorev, removeFromYetkiGorev })(YetkiGorevGuncelle)