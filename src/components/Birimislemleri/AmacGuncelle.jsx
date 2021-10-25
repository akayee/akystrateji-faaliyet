import React, { useState } from 'react';

import { connect } from 'react-redux';

import { Button } from '@material-ui/core';
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
import AddIcon from '@material-ui/icons/Add';
import { updateAmac } from '../../store/actions/amaclar';
import Swal from 'sweetalert2';



class AmacGuncelle extends React.Component {
    constructor(...args) {
        super(...args);
        this.state = {
            modalopen: false,
            amacDetay: [],
            Birim: []
        }
    }
    handleChange = (e) => {
        let val = e.target.value;
        this.setState({ amacDetay: { ...this.state.amacDetay, [e.target.name]: val } })

    }
    handleChangeBirim = (e) => {
        let val = e.target.value;
        this.setState({ Birim: val })

    }

    modalAccountOpen = () => {
        this.setState({
            modalopen: !this.state.modalopen
        })
    }

    handleSubmit = (e) => {
        const { addToAmaclar } = this.props;
        addToAmaclar(this.state.amacDetay);
        this.setState({
            modalopen: !this.state.modalopen,
            amacDetay: [],
            Birim: []
        })
        Swal.fire({
            title: 'Kayıt Başarılı!',
            position: 'top-end',
            icon: 'success',
            showConfirmButton: false,
            timer: 1500
        })
    }
    render() {
        const { classes,amac } = this.props;
        return <div><Button onClick={this.modalAccountOpen}><AddIcon /> Yeni Stratejik Amaç Ekle</Button>
            <Dialog open={this.state.modalopen} onClose={this.modalAccountOpen} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">Yeni Stratejik Amaç Oluştur</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Bu ekrandan birim veya birimlerinize stratejik amaç tanımlayabilirsiniz.
                    </DialogContentText>
                    <Grid container spacing={3}>
                        <TextField
                            name="Tanim"
                            autoFocus
                            margin="dense"
                            id="name"
                            label={amac.adi}
                            type="text"
                            fullWidth
                            onChange={this.handleChange}
                        />
                        <Grid item xs={4}>
                            <FormControl className={classes.formControl}>
                                <InputLabel shrink id="demo-simple-select-placeholder-label-label">
                                    Strateji Yılı?
                                </InputLabel>
                                <Select
                                    name="Birim"
                                    type="text"
                                    multiple
                                    value={this.state.Birim||amac.birimId}
                                    onChange={this.handleChangeBirim}
                                >
                                    {this.props.birimler.map((item, index) => {
                                        return <MenuItem key={item.id} value={item.id}>{item.Adi} </MenuItem>
                                    }
                                    )}
                                </Select>

                                <FormHelperText>Lütfen Bir Yıl Seçiniz</FormHelperText>
                            </FormControl>
                        </Grid>
                    </Grid>


                </DialogContent>
                <DialogActions>
                    <Button onClick={this.modalAccountOpen}>
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
const mapStateToProps = (state) => ({ amaclar: state.amaclar, error: state.amaclar.error })
export default connect(mapStateToProps, {updateAmac})(AmacGuncelle)