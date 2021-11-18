import React, { useState } from 'react';

import {connect} from 'react-redux';
import { addToHedefler } from '../../../store/actions/hedefler';
import {getAmacData} from '../../../store/actions/amaclar';

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
import Skeleton from 'react-loading-skeleton';
import HedefItem from '../../../models/hedef-item';


import Swal from 'sweetalert2';



class HedefEkle extends React.Component {
    constructor(...args){
        super(...args);
        this.state={
            modalopen:false,
            amacDetay:[],
            Amaclar:null,
            amac:this.props.amac
        }
    }
    handleChange= (e)=>{
        let val = e.target.value;
        this.setState({amacDetay:{...this.state.amacDetay,[e.target.name]:val}})

    }
    handleChangeBirim= (e)=>{
        let val = e.target.value;
        this.setState({Amaclar:val})

    }

    modalAccountOpen = () => {
        this.setState({
            modalopen:!this.state.modalopen
        })
    }
    handleSubmit =(e)=>{
        
        const {addToHedefler}=this.props;
        const hedef= new HedefItem(0,this.state.amacDetay.Tanim,this.props.amac.id)
        
        
        addToHedefler(hedef);
        this.setState({
            modalopen:!this.state.modalopen,
            amacDetay:[],
            Amaclar:null
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
        const {amaclar} = this.props;
        if(this.props.loading== true){
            return <div>
            <Skeleton height={100} />
            <Skeleton count={6} /></div>
          }
        return <div><Button onClick={this.modalAccountOpen}><AddIcon /> Yeni Stratejik Hedef Ekle</Button>
            <Dialog open={this.state.modalopen} onClose={this.modalAccountOpen} aria-labelledby="form-dialog-title" maxWidth="md">
                <DialogTitle id="form-dialog-title">Yeni Stratejik Hedef Oluştur</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Stratejik Amaç: {this.props.amacAdi}
                </DialogContentText>
                    <Grid container spacing={3}>
                        <TextField
                            name="Tanim"
                            autoFocus
                            margin="dense"
                            id="name"
                            label="Stratejik Hedef Tanımı"
                            type="text"
                            fullWidth
                            onChange={this.handleChange}
                        />
                        <Grid item xs={4}>
                            <FormControl className={classes.formControl}>
                                <InputLabel shrink id="demo-simple-select-placeholder-label-label">
                                    Stratejik Amaç?
                                </InputLabel>
                                <Select
                                    name="Birim"
                                    type="text"
                                    value={this.state.Amaclar||amac.id}
                                    onChange={this.handleChangeBirim}
                                >
                                    {amaclar&&amaclar.map((item, index) => {
                                        return <MenuItem key={item.id} value={item.id}>A{item.id} {item.adi.slice(0,40)} </MenuItem>
                                    }
                                    )}
                                </Select>

                                <FormHelperText>Lütfen Bir Amaç Seçiniz</FormHelperText>
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

const mapStateToProps = (state) => ({ amaclar: state.amaclar.amaclar,loading:state.amaclar.loading })
export default connect(mapStateToProps,{getAmacData,addToHedefler})(HedefEkle)