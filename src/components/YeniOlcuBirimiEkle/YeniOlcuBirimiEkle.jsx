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
import { addToAmaclar } from '../../store/actions/amaclar';
import Swal from 'sweetalert2';
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import IconButton from '@material-ui/core/IconButton';

const mapDispatchToProps = {
    addToAmaclar

};

const mapStateToProps = state => {
    return {
        amaclar: state.amaclar
    }
}
class YeniOlcuBirimiEkle extends React.Component {
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
        const { classes } = this.props;
        return <div><GridContainer alignItems='center' >
        <GridItem xs={3}>
          Yeni Ölçü Birimi Ekle
        </GridItem>
        <GridItem xs={3}>
          <IconButton onClick={this.modalAccountOpen} >
            <AddIcon />
          </IconButton>
        </GridItem>

      </GridContainer>
            <Dialog open={this.state.modalopen} onClose={this.modalAccountOpen} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">Yeni Ölçü Birimi Oluştur</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Bu ekrandan yeni ölçü birimi oluşturabilirsiniz.
                    </DialogContentText>
                    <Grid container spacing={3}>
                        <TextField
                            name="Tanim"
                            autoFocus
                            margin="dense"
                            id="name"
                            label="Ölçü Birimi"
                            type="text"
                            fullWidth
                            onChange={this.handleChange}
                        />
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

export default connect(mapStateToProps, mapDispatchToProps)(YeniOlcuBirimiEkle)