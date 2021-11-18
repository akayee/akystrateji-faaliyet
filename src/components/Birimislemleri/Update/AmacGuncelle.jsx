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
import { updateAmac } from '../../../store/actions/amaclar';
import Swal from 'sweetalert2';



class AmacGuncelle extends React.Component {
    constructor(...args) {
        super(...args);
        this.state = {
            amacDetay: [],
            Birim: []
        }
    }
    handleChange = (e) => {
        let val = e.target.value;
        this.setState({ amacDetay: { ...this.state.amacDetay, [e.target.name]: val } })

    }
    handleSubmit = (e) => {
        let amac = this.props.data;
        amac.tanim = this.state.amacDetay.Tanim
        this.props.updateAmac(amac);
        if (!this.props.error) {
            this.setState({
                amacDetay: []
            })
            Swal.fire({
                title: 'Kayıt Başarılı!',
                position: 'top-end',
                icon: 'success',
                showConfirmButton: false,
                timer: 1500
            })

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
        const { classes, data, showModal, hideButton, modalName } = this.props;
        if (hideButton == true) {
            return <div></div>
        }
        return <div>
            <IconButton>
                <EditIcon onClick={(e) => this.props.updateModalOpen('amac', modalName, e)} />
            </IconButton>
            <Dialog open={showModal.amac[modalName]} onClose={(e) => this.props.updateModalOpen('amac', modalName, e)} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">Stratejik Amaç Güncelle</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Bu ekrandan birim veya birimlerinize stratejik amaç tanımlarını güncelleyebilirsiniz.
                    </DialogContentText>
                    <Grid container spacing={3}>
                        <TextField
                            name="Tanim"
                            margin="dense"
                            id="name"
                            multiline
                            rows={4}
                            label={this.state.amacDetay.Tanim || data.adi}
                            type="text"
                            fullWidth
                            onChange={this.handleChange}
                        />
                    </Grid>


                </DialogContent>
                <DialogActions>
                    <Button onClick={(e) => this.props.updateModalOpen('amac', modalName, e)}>
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
const mapStateToProps = (state) => ({ error: state.amaclar.error, errormessage: state.amaclar.errormessage })
export default connect(mapStateToProps, { updateAmac })(AmacGuncelle)