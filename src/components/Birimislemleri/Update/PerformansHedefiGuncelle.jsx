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
import { updateFromPerformanslar } from '../../../store/actions/performanslar';
import Swal from 'sweetalert2';
import InputLabel from '@material-ui/core/InputLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";



class PerformansHedefiGuncelle extends React.Component {
    constructor(...args) {
        super(...args);
        this.state = {
            performansDetay: [],
            hedef:null
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
        this.props.updateModalOpen('performans');
    }
    handleSubmit = (e) => {
        let performans = this.props.data;
        performans.adi = this.state.performansDetay.Tanim;
        if(this.state.hedef){
            performans.hedeflerId=this.state.hedef
        }
        
         this.props.updateFromPerformanslar(performans);
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
        const { classes, data, showModal, hideButton,hedefler } = this.props;
        if (hideButton == true ) {
            return <div></div>
        }
        return <div key={this.props.showModal[data.id]}>
            
            <Dialog  open={showModal[data.id]||false} onClose={this.handleClose} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">Performans Hedefi Güncelle</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Bu ekrandan birim veya birimlerinize performans hedefi tanımlarını güncelleyebilirsiniz.
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
                                Performans Hedefi.
                            </InputLabel>
                            <Select
                                name="hedeflerId"
                                type="text"
                                required
                                value={this.state.hedef||data.hedeflerId}
                                defaultValue={this.state.hedef||data.hedeflerId}
                                onChange={this.handleChangeBirim}
                            >
                                {hedefler && hedefler.map((item, index) => {
                                    return <MenuItem style={{overflow: 'hidden'}} key={item.id} value={item.id}>{item.tanim} </MenuItem>
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
export default connect(mapStateToProps, { updateFromPerformanslar })(PerformansHedefiGuncelle)