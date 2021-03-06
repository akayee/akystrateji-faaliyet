import React from 'react';

import { connect } from 'react-redux';

import { Button } from '@material-ui/core';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import { updateToPerformansGostergesi } from '../../../store/actions/performansgostergesi';
import Swal from 'sweetalert2';
import InputLabel from '@material-ui/core/InputLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import {getBirimData} from '../../../store/actions/birimler';
import {getOlcuBirimiData} from '../../../store/actions/olcubirimi';



class PerformansGostergesiGuncelle extends React.Component {
    constructor(...args) {
        super(...args);
        this.state = {
            performansDetay: [],
            performans: null
        }
    }
    componentDidMount(){
        this.props.getOlcuBirimiData();
        this.props.getBirimData();
    }
    handleChange = (e) => {
        let val = e.target.value;
        this.setState({ performansDetay: { ...this.state.performansDetay, [e.target.name]: val } })

    }
    handleChangeBirim = (e) => {
        let val = e.target.value;
        this.setState({ performans: val })

    }
    handleClose = () => {
        this.props.updateModalOpen('performansgostergesi');
    }
    handleSubmit = (e) => {
        let performans = this.props.data;
        performans.adi = this.state.performansDetay.Tanim||performans.adi;
        if (this.state.performans) {
            performans.performansId = this.state.performans
        }
        performans.olcuBirimi=this.state.performansDetay.olcuBirimi|| performans.olcuBirimi;
        performans.birimId=this.state.performansDetay.birimId|| performans.birimId;
        console.log(performans)
        this.props.updateToPerformansGostergesi(performans);
        if (!this.props.error) {
            this.setState({
                performansDetay: []
            })

            Swal.fire({
                title: 'Kay??t Ba??ar??l??!',
                position: 'top-end',
                icon: 'success',
                showConfirmButton: false,
                timer: 1500
            })
            this.handleClose('performans')

        } else {
            Swal.fire({
                title: '????lem Ba??ar??s??z!',
                text: this.props.errormessage,
                position: 'top-end',
                icon: 'danger',
                showConfirmButton: false,
                timer: 1500
            })
        }

    }
    render() {
        const { classes, data, showModal, hideButton, performanslar,olcuBirimi,birimler } = this.props;
        if (hideButton == true) {
            return <div></div>
        }
        return <div key={showModal[data.id]}>

            <Dialog open={showModal[data.id] || false} onClose={this.handleClose} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">Performans G??stergesi G??ncelle</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Bu ekrandan birim veya birimlerinize performans g??stergesi tan??mlar??n?? g??ncelleyebilirsiniz.
                    </DialogContentText>
                    <Grid container spacing={3}>
                        <TextField
                            name="Tanim"
                            margin="dense"
                            id="name"
                            multiline
                            rows={4}
                            label={this.state.performansDetay.Tanim || data.adi}
                            type="text"
                            fullWidth
                            onChange={this.handleChange}
                        />
                        <Grid item xs={6}>
                            <FormControl >
                                <InputLabel shrink id="demo-simple-select-placeholder-label-label">
                                    ??l???? Birimi?
                                </InputLabel>
                                <Select
                                    name="olcuBirimi"
                                    type="text"
                                    value={ this.state.performansDetay.olcuBirimi|| data.olcuBirimi}
                                    onChange={this.handleChange}
                                >
                                    {olcuBirimi.map((item, index) => {
                                        return <MenuItem key={item.id} value={item.id}>{item.tanim} </MenuItem>
                                    }
                                    )}
                                </Select>

                                <FormHelperText>L??tfen Birimi Se??iniz</FormHelperText>
                            </FormControl>
                        </Grid>
                        <Grid item xs={6}>
                            <FormControl >
                                <InputLabel shrink id="demo-simple-select-placeholder-label-label">
                                    Birimi?
                                </InputLabel>
                                <Select
                                    name="birimId"
                                    type="text"
                                    value={this.state.performansDetay.birimId||data.birimId}
                                    onChange={this.handleChange}
                                >
                                    {birimler.map((item, index) => {
                                        return <MenuItem key={item.id} value={item.id}>{item.adi} </MenuItem>
                                    }
                                    )}
                                </Select>

                                <FormHelperText>L??tfen Birimi Se??iniz</FormHelperText>
                            </FormControl>
                        </Grid>
                        <Grid item xs={4}>
                            <FormControl >
                                <InputLabel shrink id="demo-simple-select-placeholder-label-label">
                                    Performans Gs??tergesi.
                                </InputLabel>
                                <Select
                                    name="performansId"
                                    type="text"
                                    required
                                    value={this.state.performans || data.performansId}
                                    defaultValue={this.state.performans || data.performansId}
                                    onChange={this.handleChangeBirim}
                                >
                                    {performanslar && performanslar.map((item, index) => {
                                        return <MenuItem style={{ overflow: 'hidden' }} key={item.id} value={item.id}>{item.adi} </MenuItem>
                                    }
                                    )}
                                </Select>
                                <FormHelperText>Performans Hedefi Se??iniz</FormHelperText>
                            </FormControl>
                        </Grid>
                    </Grid>


                </DialogContent>
                <DialogActions>
                    <Button onClick={this.handleClose}>
                        ??ptal
                    </Button>
                    <Button onClick={this.handleSubmit} >
                        G??ncelle
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    }

}
const mapStateToProps = (state) => ({ error: state.performanslar.error, errormessage: state.performanslar.errormessage, olcuBirimi:state.olcubirimi.olcubirimi,birimler:state.birimler.birimler })
export default connect(mapStateToProps, { updateToPerformansGostergesi,getOlcuBirimiData,getBirimData })(PerformansGostergesiGuncelle)