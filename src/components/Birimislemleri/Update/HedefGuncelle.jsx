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
import { IconButton } from "@material-ui/core";
import EditIcon from '@material-ui/icons/Edit';
import { updateHedef } from '../../../store/actions/hedefler';
import Swal from 'sweetalert2';
import InputLabel from '@material-ui/core/InputLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";



class HedefGuncelle extends React.Component {
    constructor(...args) {
        super(...args);
        this.state = {
            hedefDetay: [],
            amac:null
        }
    }
    handleChange = (e) => {
        let val = e.target.value;
        this.setState({ hedefDetay: { ...this.state.hedefDetay, [e.target.name]: val } })

    }
    handleChangeBirim = (e) => {
        let val = e.target.value;
        this.setState({ amac: val })

    }
    handleClose=()=>{
        this.props.updateModalOpen('hedef');
    }
    handleSubmit = (e) => {
        let hedef = this.props.data;
        hedef.tanim = this.state.hedefDetay.Tanim;
        if(this.state.amac){
            hedef.amaclarId=this.state.amac
        }
        
        this.props.updateHedef(hedef);
        if (!this.props.error) {
            this.setState({
                hedefDetay: []
            })

            Swal.fire({
                title: 'Kayıt Başarılı!',
                position: 'top-end',
                icon: 'success',
                showConfirmButton: false,
                timer: 1500
            })
            this.handleClose('hedef')

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
        const { classes, data, showModal, hideButton,amaclar } = this.props;
        if (hideButton == true ) {
            return <div></div>
        }
        return <div key={this.props.showModal[data.id]}>
            
            <Dialog  open={showModal[data.id]||false} onClose={this.handleClose} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">Stratejik Hedef Güncelle</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Bu ekrandan birim veya birimlerinize stratejik hedef tanımlarını güncelleyebilirsiniz.
                    </DialogContentText>
                    <Grid container spacing={3}>
                        <TextField
                            name="Tanim"
                            margin="dense"
                            id="name"
                            multiline
                            rows={4}
                            label={this.state.hedefDetay.Tanim||data.tanim}
                            type="text"
                            fullWidth
                            onChange={this.handleChange}
                        />
                         <Grid item xs={4}>
                        <FormControl >
                            <InputLabel shrink id="demo-simple-select-placeholder-label-label">
                                Stratejik Amaç.
                            </InputLabel>
                            <Select
                                name="Birim"
                                type="text"
                                required
                                value={this.state.amac||data.amaclarId}
                                defaultValue={this.state.amac||data.amaclarId}
                                onChange={this.handleChangeBirim}
                            >
                                {amaclar && amaclar.map((item, index) => {
                                    return <MenuItem style={{overflow: 'hidden'}} key={item.id} value={item.id}>{item.adi} </MenuItem>
                                }
                                )}
                            </Select>
                            <FormHelperText>Stratejik Amaç Seçiniz</FormHelperText>
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
const mapStateToProps = (state) => ({ error: state.hedefler.error, errormessage: state.hedefler.errormessage })
export default connect(mapStateToProps, { updateHedef })(HedefGuncelle)