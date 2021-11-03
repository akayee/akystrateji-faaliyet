import React from 'react';

import { Button} from "@material-ui/core";
import AddIcon from '@material-ui/icons/Add';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import InputLabel from '@material-ui/core/InputLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import {connect} from 'react-redux';

import { addToPerformanslar } from '../../store/actions/performanslar';
import {getOlcuBirimiData} from '../../store/actions/olcubirimi';
import {getPerformansData} from '../../store/actions/performanslar';
import {getBirimData} from '../../store/actions/birimler';

class PerformansGostergesiEkle extends React.Component {
    constructor(...args) {
        super(...args);
        this.state = {
            modalopen: false,
            date: new Date().getFullYear(),
            amacDetay: [],
            Birim: [],
            OlcuBirimi: [],
            isTuru: [{ adi: '', OlcuBrimi: null, hedef: '', adam: '', gun: '', Birim: [] }]
        }
    }
    componentDidMount(){
        this.props.getOlcuBirimiData();
        this.props.getPerformansData();
        this.props.getBirimData();
    }
    handleChange = (e) => {
        let val = e.target.value;
        this.setState({ isTuru: { ...this.state.isTuru, [e.target.name]: val } })

    }
    handleChangeBirim = (e) => {
        let val = e.target.value;
        this.setState({ Birim: val })

    }
    handleChangeOlcuBirimi = (e) => {
        let val = e.target.value;
        this.setState({ OlcuBirimi: val })

    }

    modalAccountOpen = () => {
        this.setState({
            modalopen: !this.state.modalopen
        })
    }
    render() {
        const { classes, performans,performanslar,olcubirimi } = this.props;
        return <div><Button onClick={this.modalAccountOpen}><AddIcon /> Yeni Performans Göstergesi Ekle</Button>
            <Dialog open={this.state.modalopen} onClose={this.modalAccountOpen} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">Yeni Performans Göstergesi Oluştur</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Eklediğiniz Performansın Hedefi Adı: {performans.adi}
                    </DialogContentText>
                    <Grid container spacing={3} >
                        <Grid item xs={6}>
                            <TextField
                                name="adi"
                                autoFocus
                                margin="dense"
                                id="name"
                                multiline
                                label="Adı"
                                type="text"
                                fullWidth
                                onChange={this.handleChange}
                            />
                        </Grid>

                        <Grid item xs={6}>
                            <FormControl className={classes.formControl}>
                                <InputLabel shrink id="demo-simple-select-placeholder-label-label">
                                    Ölçü Birimi?
                                </InputLabel>
                                <Select
                                    name="OlcuBirimi"
                                    type="text"
                                    multiple
                                    value={this.state.OlcuBirimi}
                                    onChange={this.handleChangeOlcuBirimi}
                                >
                                    {this.props.birimler.map((item, index) => {
                                        return <MenuItem key={item.id} value={item.id}>{item.Adi} </MenuItem>
                                    }
                                    )}
                                </Select>

                                <FormHelperText>Lütfen Birimi Seçiniz</FormHelperText>
                            </FormControl>
                        </Grid>



                        <Grid item xs={6}>
                            <FormControl className={classes.formControl}>
                                <InputLabel shrink id="demo-simple-select-placeholder-label-label">
                                    Birimi?
                                </InputLabel>
                                <Select
                                    name="Birim"
                                    type="text"
                                    value={this.state.Birim}
                                    onChange={this.handleChangeBirim}
                                >
                                    {this.props.birimler.map((item, index) => {
                                        return <MenuItem key={item.id} value={item.id}>{item.Adi} </MenuItem>
                                    }
                                    )}
                                </Select>

                                <FormHelperText>Lütfen Birimi Seçiniz</FormHelperText>
                            </FormControl>
                        </Grid>
                        <Grid item xs={6}>
                            <FormControlLabel
                                control={<Checkbox checked={true} name="gilad" />}
                                label="Stratejik Performans?"
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <FormControl className={classes.formControl}>
                                <InputLabel shrink id="demo-simple-select-placeholder-label-label">
                                    Performans Hedefi
                                </InputLabel>
                                <Select
                                    name="Birim"
                                    type="text"
                                    value={this.state.Birim}
                                    onChange={this.handleChangeBirim}
                                >
                                    {this.props.birimler.map((item, index) => {
                                        return <MenuItem key={item.id} value={item.id}>{item.Adi} </MenuItem>
                                    }
                                    )}
                                </Select>

                                <FormHelperText>Lütfen Bir Performans Hedefi Seçiniz</FormHelperText>
                            </FormControl>
                        </Grid>


                    </Grid>




                </DialogContent>
                <DialogActions>
                    <Button onClick={this.modalAccountOpen}>
                        İptal
                    </Button>
                    <Button >
                        Ekle
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    }

}

const mapStateToProps = (state) => ({ hedefler: state.hedefler.hedefler,loading:state.performanslar.loading, olcuBirimi:state.olcubirimi.olcubirimi })
export default connect(mapStateToProps,{getPerformansData,getOlcuBirimiData,addToPerformanslar,getBirimData})(PerformansGostergesiEkle)