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



class PerformansGostergesiGuncelle extends React.Component {
    constructor(...args) {
        super(...args);
        this.state = {
            performansDetay: [],
            performans:null
        }
    }
    handleChange = (e) => {
        let val = e.target.value;
        this.setState({ performansDetay: { ...this.state.performansDetay, [e.target.name]: val } })

    }
    handleChangeBirim = (e) => {
        let val = e.target.value;
        this.setState({ performans: val })

    }
    handleClose=()=>{
        this.props.updateModalOpen('performansgostergesi');
    }
    handleSubmit = (e) => {
        let performans = this.props.data;
        performans.adi = this.state.performansDetay.Tanim;
        if(this.state.performans){
            performans.performansId=this.state.performans
        }
        
         this.props.updateToPerformansGostergesi(performans);
        if (!this.props.error) {
            this.setState({
                performansDetay: []
            })

            Swal.fire({
                title: 'Kayıt Başarılı!',
                position: 'top-end',
                icon: 'success',
                showConfirmButton: false,
                timer: 1500
            })
            this.handleClose('performans')

        } else {
            Swal.fire({
                title: 'İşlem Başarısız!',
                text: this.props.errormessage,
                position: 'top-end',
                icon: 'danger',
                showConfirmButton: false,
                timer: 1500
            })
        }

    }
    render() {
        const { classes, data, showModal, hideButton,performanslar } = this.props;
        if (hideButton == true ) {
            return <div></div>
        }
        return <div key={showModal[data.id]}>
            
            <Dialog  open={showModal[data.id]||false} onClose={this.handleClose} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">Performans Göstergesi Güncelle</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Bu ekrandan birim veya birimlerinize performans göstergesi tanımlarını güncelleyebilirsiniz.
                    </DialogContentText>
                    <Grid container spacing={3}>
                        <TextField
                            name="Tanim"
                            margin="dense"
                            id="name"
                            multiline
                            rows={4}
                            label={this.state.performansDetay.Tanim||data.adi}
                            type="text"
                            fullWidth
                            onChange={this.handleChange}
                        />
                         <Grid item xs={4}>
                        <FormControl >
                            <InputLabel shrink id="demo-simple-select-placeholder-label-label">
                                Performans Gsötergesi.
                            </InputLabel>
                            <Select
                                name="performansId"
                                type="text"
                                required
                                value={this.state.performans||data.performansId}
                                defaultValue={this.state.performans||data.performansId}
                                onChange={this.handleChangeBirim}
                            >
                                {performanslar && performanslar.map((item, index) => {
                                    return <MenuItem style={{overflow: 'hidden'}} key={item.id} value={item.id}>{item.adi} </MenuItem>
                                }
                                )}
                            </Select>
                            <FormHelperText>Performans Hedefi Seçiniz</FormHelperText>
                        </FormControl>
                    </Grid>
                    </Grid>
                   

                </DialogContent>
                <DialogActions>
                    <Button onClick={this.handleClose}>
                        İptal
                    </Button>
                    <Button onClick={this.handleSubmit} >
                        Güncelle
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    }

}
const mapStateToProps = (state) => ({ error: state.performanslar.error, errormessage: state.performanslar.errormessage })
export default connect(mapStateToProps, { updateToPerformansGostergesi })(PerformansGostergesiGuncelle)