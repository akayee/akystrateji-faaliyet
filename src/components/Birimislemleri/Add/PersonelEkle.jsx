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
import { addToPersoneller } from '../../../store/actions/birimislemleri/personeller';
import PersonelItem from '../../../models/personel-item';
import DateFnsUtils from '@date-io/date-fns';
import { KeyboardDatePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";

class PersonelEkle extends React.Component {
    constructor(...args) {
        super(...args)
        this.state = {
            modalopen: false,
            Birim: '',
            yapiBilgileri: { cinsiyet: '', kadro: '', unvan: '', mezuniyet: '' }
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
    handleChangeAracBilgisi = (e) => {
        let val = e.target.value;
        this.setState({ yapiBilgileri: { ...this.state.yapiBilgileri, [e.target.name]: val } })

    }
    handleChange = (e) => {
        let val = e.target.value;
        this.setState({ yapiBilgileri: { ...this.state.yapiBilgileri, [e.target.name]: val } })
    }
    handleChangeDateDogumTarihi = date => {
        this.setState({ yapiBilgileri: { ...this.state.yapiBilgileri, DogumTarihi: date } })
    }
    handleChangeDateIseGiris = date => {
        this.setState({ yapiBilgileri: { ...this.state.yapiBilgileri, IseGirisTarihi: date } })
    }
    handleSubmit = (e) => {
        if (this.state.yapiBilgileri.Adi != null) {

            var yapi = new PersonelItem(0, this.state.yapiBilgileri.Adi,
                this.state.yapiBilgileri.Kadro,
                this.state.yapiBilgileri.Mezuniyet,
                Boolean(this.state.yapiBilgileri.Cinsiyet),
                this.state.yapiBilgileri.IseGirisTarihi,
                this.state.yapiBilgileri.Unvan,
                this.state.yapiBilgileri.DogumTarihi,
                this.state.yapiBilgileri.KisaKod,
                false,
                parseInt(this.state.Birim));
            this.props.addToPersoneller(yapi);
            console.log(yapi)
            if (this.props.error === false) {

                Swal.fire({
                    title: 'Kay??t Ba??ar??l??!',
                    position: 'top-end',
                    icon: 'success',
                    showConfirmButton: false,
                    timer: 1500
                })

                this.setState({
                    modalopen: !this.state.modalopen,
                    amacDetay: [],
                    Birim: null
                })
            }
            else {
                Swal.fire({
                    title: 'Oops...',
                    position: 'top-end',
                    icon: 'error',
                    text: 'Hata Olu??tu',
                    showConfirmButton: false,
                    timer: 1500
                })
            }
        } else {
            Swal.fire({
                title: 'Oops...',
                position: 'top-end',
                icon: 'error',
                text: 'Y??ld??zl?? alanlar??n hepsini doldurunuz',
                showConfirmButton: false,
                timer: 1500
            })
        }


    }
    render() {
        const { birimler } = this.props.props;
        return <div>
            <Button onClick={this.modalAccountOpen} >Personel Ekle</Button>
            <Dialog open={this.state.modalopen} onClose={this.modalAccountOpen} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">Yeni Personel Olu??tur.</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Bu ekrandan biriminizin personel tan??mlar??n?? yapabilirsiniz.
                    </DialogContentText>
                    <Grid container spacing={4}>
                        <Grid item xs={4}>
                            <TextField
                                name="Adi"
                                autoFocus
                                required
                                margin="dense"
                                id="name"
                                label="Personel Ad??"
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
                                    label="????e Giri?? Tarihi"
                                    value={this.state.yapiBilgileri.IseGirisTarihi}
                                    onChange={this.handleChangeDateIseGiris}
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
                                    value={this.state.yapiBilgileri.Cinsiyet}
                                    onChange={this.handleChangeAracBilgisi}
                                >
                                    {this.props.personeller.cinsiyet && this.props.personeller.cinsiyet.map((item, index) => {
                                        return <MenuItem key={index} value={index}>{item} </MenuItem>
                                    }
                                    )}
                                </Select>

                                <FormHelperText>Cinsiyet Se??iniz</FormHelperText>
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
                                    value={this.state.yapiBilgileri.Mezuniyet}
                                    onChange={this.handleChangeAracBilgisi}
                                >
                                    {this.props.personeller.mezuniyet && this.props.personeller.mezuniyet.map((item, index) => {
                                        return <MenuItem key={index} value={index}>{item} </MenuItem>
                                    }
                                    )}
                                </Select>

                                <FormHelperText>Mezuniyet Se??iniz</FormHelperText>
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
                                    label="Do??um Tarihi"
                                    value={this.state.yapiBilgileri.DogumTarihi}
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
                                    value={this.state.yapiBilgileri.Kadro}
                                    onChange={this.handleChangeAracBilgisi}
                                >
                                    {this.props.personeller.kadro && this.props.personeller.kadro.map((item, index) => {
                                        return <MenuItem key={index} value={index}>{item} </MenuItem>
                                    }
                                    )}
                                </Select>

                                <FormHelperText>Kadro Se??iniz</FormHelperText>
                            </FormControl>
                        </Grid>
                        <Grid item xs={4}>
                            <FormControl >
                                <InputLabel shrink id="demo-simple-select-placeholder-label-label">
                                    ??nvan??
                                </InputLabel>
                                <Select
                                    name="Unvan"
                                    type="text"
                                    required
                                    fullWidth
                                    value={this.state.yapiBilgileri.Unvan}
                                    onChange={this.handleChangeAracBilgisi}
                                >
                                    {this.props.personeller.unvan && this.props.personeller.unvan.map((item, index) => {
                                        return <MenuItem key={index} value={index}>{item} </MenuItem>
                                    }
                                    )}
                                </Select>

                                <FormHelperText>??nvan Se??iniz</FormHelperText>
                            </FormControl>
                        </Grid>
                        <Grid item xs={4}>
                            <TextField
                                name="KisaKod"
                                margin="dense"
                                id="name"
                                label="K??sa Kod"
                                type="text"
                                fullWidth
                                onChange={this.handleChange}
                            />
                        </Grid>
                        <Grid item xs={4}>
                            <FormControl >
                                <InputLabel shrink id="demo-simple-select-placeholder-label-label">
                                    Ekleyece??iniz Birim.
                                </InputLabel>
                                <Select
                                    name="Birim"
                                    type="text"
                                    required
                                    value={this.state.Birim}
                                    onChange={this.handleChangeBirim}
                                >
                                    {birimler && birimler.map((item, index) => {
                                        return <MenuItem key={item.id} value={item.id}>{item.adi} </MenuItem>
                                    }
                                    )}
                                </Select>

                                <FormHelperText>Birim Se??iniz</FormHelperText>
                            </FormControl>
                        </Grid>
                    </Grid>


                </DialogContent>
                <DialogActions>
                    <Button onClick={this.modalAccountOpen}>
                        ??ptal
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
export default connect(mapStateToProps, { addToPersoneller })(PersonelEkle)