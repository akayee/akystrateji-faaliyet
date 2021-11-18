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
import { updateAraclar } from '../../../store/actions/birimislemleri/araclistesi';
import AracItem from '../../../models/arac-item';


class AracGuncelle extends React.Component {
    constructor(...args) {
        super(...args)
        this.state = {
            modalopen: this.props.open,
            Birim: null,
            yapiBilgileri: this.props.araclar,
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
        this.setState({ [e.target.name]: val })

    }
    handleChange = (e) => {
        let val = e.target.value;
        this.setState({ yapiBilgileri: { ...this.state.yapiBilgileri, [e.target.name]: val } })

    }
    handleSubmit = (e) => {

        var yapi = new AracItem(this.props.arac.id,this.state.yapiBilgileri.Adi || this.props.arac.adi,
            this.state.yapiBilgileri.AracCinsi || this.props.arac.aracCinsi,this.state.yapiBilgileri.TahsisTuru || this.props.arac.tahsisTuru,
            false,
            this.state.Birim || this.props.arac.birimId);
        yapi.olusturmaTarihi = this.props.arac.olusturmaTarihi;
        this.props.updateAraclar(yapi);

        if (this.props.error === false) {
            this.setState({
                modalopen: !this.state.modalopen,
                amacDetay: [],
                Birim: null,
                TahisisTuru:null,
                AracCinsi:null
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
        const { birimler, arac,araclar } = this.props;
        return <div>
            <Dialog open={this.props.open} onClose={this.props.handleModalOpenGuncelle} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">Araç Güncelle</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Bu ekrandan araç güncelleme işlemlerini tanımlayabilirsiniz.
                    </DialogContentText>
                    <Grid container spacing={4}>
                        <Grid item xs={5}>
                            <TextField
                                name="Adi"
                                autoFocus
                                required
                                margin="dense"
                                id="name"
                                label={arac.adi}
                                type="text"
                                fullWidth
                                onChange={this.handleChange}
                            />
                        </Grid>
                        <Grid item xs={4}>
                            <FormControl >
                                <InputLabel shrink id="demo-simple-select-placeholder-label-label">
                                    Ekleyeceğiniz Aracın Cinsi.
                                </InputLabel>
                                <Select
                                    name="AracCinsi"
                                    type="text"
                                    required
                                    value={parseInt(arac.aracCinsi)||this.state.yapiBilgileri.AracCinsi}
                                    defaultValue={arac.aracCinsi}
                                    onChange={this.handleChangeBirim}
                                >
                                    {this.props.araclar.aracCinsi && this.props.araclar.aracCinsi.map((item, index) => {
                                        return <MenuItem key={index} value={index}>{item} </MenuItem>
                                    }
                                    )}
                                </Select>
                                <FormHelperText>Lütfen Bir Araç Cinsi Seçiniz</FormHelperText>
                            </FormControl>
                        </Grid>
                        <Grid item xs={4}>
                            <FormControl >
                                <InputLabel shrink id="demo-simple-select-placeholder-label-label">
                                    Ekleyeceğiniz Aracın Sahiplenme Turu.
                                </InputLabel>
                                <Select
                                    name="TahsisTuru"
                                    type="text"
                                    required
                                    value={parseInt(arac.tahsisTuru)||this.state.yapiBilgileri.TahisisTuru}
                                    defaultValue={arac.tahsisTuru}
                                    onChange={this.handleChangeBirim}
                                >
                                    {this.props.araclar.tahsisTuru && this.props.araclar.tahsisTuru.map((item, index) => {
                                        return <MenuItem key={index} value={index}>{item} </MenuItem>
                                    }
                                    )}
                                </Select>
                                <FormHelperText>Lütfen Bir Araç Cinsi Seçiniz</FormHelperText>
                            </FormControl>
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
                                    value={parseInt(arac.birimId)||this.state.Birim}
                                    defaultValue={arac.birimId}
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

const mapStateToProps = (state) => ({ araclar: state.araclar, error: state.araclar.error })
export default connect(mapStateToProps, { updateAraclar})(AracGuncelle)