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
import AddIcon from '@material-ui/icons/Add';
import { addToAmaclar } from '../../../store/actions/amaclar';
import Swal from 'sweetalert2';
import AmacItem from '../../../models/amac_item';


class AmacEkle extends React.Component {
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

    modalAccountOpen = () => {
        this.setState({
            modalopen: !this.state.modalopen
        })
    }

    handleSubmit = (e) => {
        const { addToAmaclar } = this.props;
        let yeniamac= new AmacItem(0,this.state.amacDetay.Adi)
        addToAmaclar(yeniamac);
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
        return <div><Button onClick={this.modalAccountOpen}><AddIcon /> Yeni Stratejik Amaç Ekle</Button>
            <Dialog open={this.state.modalopen} onClose={this.modalAccountOpen} aria-labelledby="form-dialog-title" maxWidth="md">
                <DialogTitle id="form-dialog-title">Yeni Stratejik Amaç Oluştur</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Bu ekrandan birim veya birimlerinize stratejik amaç tanımlayabilirsiniz.
                    </DialogContentText>
                    <Grid container spacing={3}>
                        <TextField
                            name="Adi"
                            autoFocus
                            margin="dense"
                            id="name"
                            label="Stratejik Amaç Adı"
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

const mapStateToProps = (state) => ({ amaclar: state.amaclar.amaclar })
export default connect(mapStateToProps, { addToAmaclar })(AmacEkle)