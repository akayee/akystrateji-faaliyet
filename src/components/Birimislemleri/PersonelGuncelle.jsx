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
import { updatePersonelData } from '../../store/actions/birimislemleri/personeller';
import PersonelItem from '../../models/personel-item';
import { KeyboardDatePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
import DateFnsUtils from '@date-io/date-fns';


class PersonelGuncelle extends React.Component {
    constructor(...args) {
        super(...args)
        this.state = {
            modalopen: this.props.open,
            Birim: null,
            yapiBilgileri: this.props.personeller,
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

        var yapi = new PersonelItem(this.props.personel.id, this.state.yapiBilgileri.Adi || this.props.personel.adi,
            this.state.yapiBilgileri.Kadro || this.props.personel.kadro,
            this.state.yapiBilgileri.Mezuniyet || this.props.personel.mezuniyet,
            this.state.yapiBilgileri.Cinsiyet || this.props.personel.cinsiyet,
            this.state.yapiBilgileri.IseGirisTarihi || this.props.personel.iseGirisTarihi,
            this.state.yapiBilgileri.Unvan || this.props.personel.unvan,
            this.state.yapiBilgileri.DogumTarihi || this.props.personel.dogumTarihi,
            this.state.yapiBilgileri.KisaKod || this.props.personel.tel,
            false,
            this.state.Birim || this.props.personel.birimId);
        yapi.OlusturmaTarihi = this.props.personel.olusturmaTarihi;
        this.props.updatePersonelData(yapi);

        if (this.props.error === false) {
            this.setState({
                modalopen: !this.state.modalopen,
                amacDetay: [],
                Birim: null,
                TahisisTuru: null,
                AracCinsi: null
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

    
    handleChangeDateDogumTarihi = date => {
        this.setState({ yapiBilgileri: { ...this.state.yapiBilgileri, DogumTarihi: date } })
    }
    handleChangeDateIseGiris = date => {
        this.setState({ yapiBilgileri: { ...this.state.yapiBilgileri, IseGirisTarihi: date } })
    }
    render() {
        const { birimler, personel } = this.props;
        return <div>
            <Dialog open={this.props.open} onClose={this.props.handleModalOpenGuncelle} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">Personel Bilgilerini Güncelle</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Bu ekrandan personel bilgileri güncelleme işlemlerini tanımlayabilirsiniz.
                    </DialogContentText>
                    <Grid container spacing={4}>
                        <Grid item xs={4}>
                            <TextField
                                name="Adi"
                                autoFocus
                                required
                                margin="dense"
                                id="name"
                                label={personel.adi}
                                type="text"
                                fullWidth
                                onChange={this.handleChange}
                            />
                        </Grid>
                        <Grid item xs={4}>
                            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                <KeyboardDatePicker
                                    disableToolbar
                                    name='IseGirisTarihi'
                                    variant="inline"
                                    format="dd/MM/yyyy"
                                    margin="normal"
                                    id="date-picker-inline"
                                    label="İşe Giriş Tarihi"
                                    value={this.state.yapiBilgileri.IseGirisTarihi||personel.iseGirisTarihi}
                                    onChange={this.handleChange}
                                    KeyboardButtonProps={{
                                        'aria-label': 'change date',
                                    }}
                                />
                            </MuiPickersUtilsProvider>
                        </Grid>
                        <Grid item xs={4}>
                            <FormControl >
                                <InputLabel shrink id="demo-simple-select-placeholder-label-label">
                                    Cinsiyet
                                </InputLabel>
                                <Select
                                    name="Cinsiyet"
                                    type="text"
                                    required
                                    fullWidth
                                    value={this.state.yapiBilgileri.Cinsiyet||personel.cinsiyet==false?0:1}
                                    onChange={this.handleChange}
                                >
                                    {this.props.personeller.cinsiyet && this.props.personeller.cinsiyet.map((item, index) => {
                                        return <MenuItem key={index} value={index}>{item} </MenuItem>
                                    }
                                    )}
                                </Select>

                                <FormHelperText>Cinsiyet Seçiniz</FormHelperText>
                            </FormControl>
                        </Grid>
                        <Grid item xs={4}>
                            <FormControl >
                                <InputLabel shrink id="demo-simple-select-placeholder-label-label">
                                    Mezuniyeti
                                </InputLabel>
                                <Select
                                    name="Mezuniyet"
                                    type="text"
                                    required
                                    fullWidth
                                    value={this.state.yapiBilgileri.Mezuniyet||personel.mezuniyet}
                                    onChange={this.handleChange}
                                >
                                    {this.props.personeller.mezuniyet && this.props.personeller.mezuniyet.map((item, index) => {
                                        return <MenuItem key={index} value={index}>{item} </MenuItem>
                                    }
                                    )}
                                </Select>

                                <FormHelperText>Mezuniyet Seçiniz</FormHelperText>
                            </FormControl>
                        </Grid>
                        <Grid item xs={4}>
                            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                <KeyboardDatePicker
                                    disableToolbar
                                    name='DogumTarihi'
                                    variant="inline"
                                    format="dd/MM/yyyy"
                                    margin="normal"
                                    id="date-picker-inline"
                                    label="Doğum Tarihi"
                                    value={this.state.yapiBilgileri.DogumTarihi||personel.dogumTarihi}
                                    onChange={this.handleChangeDateDogumTarihi}
                                    KeyboardButtonProps={{
                                        'aria-label': 'change date',
                                    }}
                                />
                            </MuiPickersUtilsProvider>
                        </Grid>
                        <Grid item xs={4}>
                            <FormControl >
                                <InputLabel shrink id="demo-simple-select-placeholder-label-label">
                                    Kadrosu
                                </InputLabel>
                                <Select
                                    name="Kadro"
                                    type="text"
                                    required
                                    fullWidth
                                    value={this.state.yapiBilgileri.Kadro||personel.kadro}
                                    onChange={this.handleChange}
                                >
                                    {this.props.personeller.kadro && this.props.personeller.kadro.map((item, index) => {
                                        return <MenuItem key={index} value={index}>{item} </MenuItem>
                                    }
                                    )}
                                </Select>

                                <FormHelperText>Kadro Seçiniz</FormHelperText>
                            </FormControl>
                        </Grid>
                        <Grid item xs={4}>
                            <FormControl >
                                <InputLabel shrink id="demo-simple-select-placeholder-label-label">
                                    Ünvanı
                                </InputLabel>
                                <Select
                                    name="Unvan"
                                    type="text"
                                    required
                                    fullWidth
                                    value={this.state.yapiBilgileri.Unvan||personel.unvan}
                                    onChange={this.handleChange}
                                >
                                    {this.props.personeller.unvan && this.props.personeller.unvan.map((item, index) => {
                                        return <MenuItem key={index} value={index}>{item} </MenuItem>
                                    }
                                    )}
                                </Select>

                                <FormHelperText>Ünvan Seçiniz</FormHelperText>
                            </FormControl>
                        </Grid>
                        <Grid item xs={4}>
                            <TextField
                                name="KisaKod"
                                margin="dense"
                                id="name"
                                label={this.state.yapiBilgileri.KisaKod||personel.tel}
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
                                    value={parseInt(personel.birimId) || this.state.Birim}
                                    defaultValue={personel.birimId}
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

const mapStateToProps = (state) => ({ personeller: state.personeller, error: state.personeller.error })
export default connect(mapStateToProps, { updatePersonelData })(PersonelGuncelle)