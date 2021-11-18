import React, { useState } from 'react';


import {connect} from 'react-redux';
import { addToPerformanslar } from '../../../store/actions/performanslar';
import { getHdedefData } from '../../../store/actions/hedefler'


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

import Swal from 'sweetalert2';


class PerformansEkle extends React.Component {
    constructor(...args){
        super(...args);
        this.state={
            modalopen:false,
            amacDetay:[],
            Hedef:null
        }
    }
    handleChange= (e)=>{
        let val = e.target.value;
        this.setState({amacDetay:{...this.state.amacDetay,[e.target.name]:val}})

    }
    handleChangeBirim= (e)=>{
        let val = e.target.value;
        this.setState({Hedef:val})

    }

    modalAccountOpen = () => {
        this.setState({
            modalopen:!this.state.modalopen
        })
    }
    componentDidMount()
    {
        this.props.getHdedefData();
    }
    handleSubmit =(e)=>{
        
        const {addToPerformanslar}=this.props;
        let performans = {
            adi:this.state.amacDetay.Adi,
            hedeflerId:this.props.hedef.id
        }
        addToPerformanslar(performans);
        this.setState({
            modalopen:!this.state.modalopen,
            amacDetay:[],
            Hedef:null
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
        const { classes,hedef,hedefler } = this.props;
        return <div><Button onClick={this.modalAccountOpen}><AddIcon /> Yeni Performans Hedefi Ekle</Button>
            <Dialog open={this.state.modalopen} onClose={this.modalAccountOpen} aria-labelledby="form-dialog-title" maxWidth="md">
                <DialogTitle id="form-dialog-title">Yeni Performans Hedefi Oluştur</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                    Stratejik Hedef: {this.props.hedefAdi}
            </DialogContentText>
                    <Grid container spacing={3}>
                        <TextField
                            name="Adi"
                            autoFocus
                            margin="dense"
                            id="name"
                            label="Performans Hedefi Tanımı"
                            type="text"
                            fullWidth
                            onChange={this.handleChange}
                        />
                        <Grid item xs={4}>
                            <FormControl className={classes.formControl}>
                                <InputLabel shrink id="demo-simple-select-placeholder-label-label">
                                    Stratejik Hedefi?
                                </InputLabel>
                                <Select
                                    name="Hedef"
                                    type="text"
                                    value={this.state.Hedef||hedef.id}
                                    onChange={this.handleChangeBirim}
                                >
                                    {hedefler.map((item, index) => {
                                        return <MenuItem key={item.id} value={item.id}>H{item.id} {item.tanim.slice(0,40)} </MenuItem>
                                    }
                                    )}
                                </Select>

                                <FormHelperText>Lütfen Bir Hedef Seçiniz</FormHelperText>
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

const mapStateToProps = (state) => ({ hedefler: state.hedefler.hedefler,loading:state.hedefler.loading})
export default connect(mapStateToProps,{addToPerformanslar,getHdedefData})(PerformansEkle)