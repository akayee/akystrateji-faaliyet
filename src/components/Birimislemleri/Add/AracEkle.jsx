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
import { addToAraclar } from '../../../store/actions/birimislemleri/araclistesi';
import AracItem from '../../../models/arac-item';

class AracEkle extends React.Component {
    constructor(...args) {
        super(...args)
        this.state = {
            modalopen: false,
            Birim: '',
            yapiBilgileri: { AracCinsi:'',TahsisTuru:''}
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
        this.setState({yapiBilgileri:{...this.state.yapiBilgileri,[e.target.name]: val}  })

    }
    handleChange = (e) => {
        let val = e.target.value;
        this.setState({ yapiBilgileri: { ...this.state.yapiBilgileri, [e.target.name]: val } })

    }
    handleSubmit = (e) => {
        if (this.state.yapiBilgileri.Adi != null || this.state.yapiBilgileri.AracCinsi != null || this.state.yapiBilgileri.TahsisTuru != null) {
            var yapi = new AracItem(0, this.state.yapiBilgileri.Adi,this.state.yapiBilgileri.Cinsi,this.state.yapiBilgileri.TahsisTuru, false, parseInt(this.state.Birim));
            this.props.addToAraclar(yapi);
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
        const { birimler } = this.props.props
        return <div>
            <Button onClick={this.modalAccountOpen} >Ara?? Ekle</Button>
            <Dialog open={this.state.modalopen} onClose={this.modalAccountOpen} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">Yeni Ara?? Tan??m?? Olu??tur.</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Bu ekrandan biriminizin ara?? tan??mlar??n?? yapabilirsiniz.
                    </DialogContentText>
                    <Grid container spacing={4}>
                        <Grid item xs={3}>
                            <TextField
                                name="Adi"
                                autoFocus
                                required
                                margin="dense"
                                id="name"
                                label="Ara?? Ad??"
                                type="text"
                                fullWidth
                                onChange={this.handleChange}
                            />
                        </Grid>
                        
                        <Grid item xs={4}>
                            <FormControl >
                                <InputLabel shrink id="demo-simple-select-placeholder-label-label">
                                    Ekleyece??iniz Arac??n Cinsi.
                                </InputLabel>
                                <Select
                                    name="AracCinsi"
                                    type="text"
                                    required
                                    value={this.state.yapiBilgileri.Cinsi}
                                    onChange={this.handleChangeAracBilgisi}
                                >
                                    {this.props.araclar.aracCinsi && this.props.araclar.aracCinsi.map((item, index) => {
                                        return <MenuItem key={index} value={index}>{item} </MenuItem>
                                    }
                                    )}
                                </Select>

                                <FormHelperText>L??tfen Bir Ara?? Cinsi Se??iniz</FormHelperText>
                            </FormControl>
                        </Grid>
                        <Grid item xs={4}>
                            <FormControl >
                                <InputLabel shrink id="demo-simple-select-placeholder-label-label">
                                    Ekleyece??iniz Arac??n Sahiplenme Turu.
                                </InputLabel>
                                <Select
                                    name="TahsisTuru"
                                    type="text"
                                    required
                                    value={this.state.yapiBilgileri.TahsisTuru}
                                    onChange={this.handleChangeAracBilgisi}
                                >
                                    {this.props.araclar.tahsisTuru && this.props.araclar.tahsisTuru.map((item, index) => {
                                        return <MenuItem key={index} value={index}>{item} </MenuItem>
                                    }
                                    )}
                                </Select>

                                <FormHelperText>L??tfen Bir Ara?? Cinsi Se??iniz</FormHelperText>
                            </FormControl>
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

                                <FormHelperText>L??tfen Bir Birim Se??iniz</FormHelperText>
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

const mapStateToProps = (state) => ({ araclar: state.araclar, error: state.araclar.error })
export default connect(mapStateToProps, { addToAraclar })(AracEkle)