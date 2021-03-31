import React, { useState } from 'react';

import { Button, IconButton } from "@material-ui/core";
import AddIcon from '@material-ui/icons/Add';
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

class YeniFaaliyetEkle extends React.Component {
    constructor(...args) {
        super(...args);
        this.state = {
            modalopen: false,
            amacDetay: [],
            Birim: [],
            isTuru: [{ adi: '', OlcuBrimi: null, hedef: '', adam: '', gun: '', Birim: [] }]
        }
    }
    handleChange = (e) => {
        let val = e.target.value;
        this.setState({ isTuru: { ...this.state.isTuru, [e.target.name]: val } })

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
    render() {
        const { classes } = this.props;
        const isler = this.state.isTuru
        return <div><Button onClick={this.modalAccountOpen}><AddIcon /> Yeni Faaliyet Ekle</Button>
            <Dialog open={this.state.modalopen} onClose={this.modalAccountOpen} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">Yeni Faaliyet Oluştur</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Eklediğiniz Performansın Adı: {this.props.performansAdi}
                    </DialogContentText>
                    
                        {isler && isler.map((is, index) => <Grid container spacing={3}key={index}>
                           
                                <Grid item xs={4}>
                                    <TextField
                                        name="adi"
                                        autoFocus
                                        margin="dense"
                                        id="name"
                                        label="Adı"
                                        type="text"
                                        fullWidth
                                        onChange={this.handleChange}
                                    />
                                </Grid>

                                <Grid item xs={4}>
                                    <TextField
                                        name="OlcuBirimi"
                                        autoFocus
                                        margin="dense"
                                        id="name"
                                        label="Ölçü Birimi"
                                        type="text"
                                        fullWidth
                                        onChange={this.handleChange}
                                    />
                                </Grid>

                            <Grid item xs={4}>
                                    <TextField
                                        name="hedef"
                                        autoFocus
                                        margin="dense"
                                        id="name"
                                        label="Toplam Bütçe"
                                        type="text"
                                        fullWidth
                                        onChange={this.handleChange}
                                        />
                            </Grid>


                      
                            
                            <Grid item xs={8}>
                                <FormControl className={classes.formControl}>
                                    <InputLabel shrink id="demo-simple-select-placeholder-label-label">
                                        Birimi?
                                </InputLabel>
                                    <Select
                                        name="Birim"
                                        type="text"
                                        multiple
                                        value={this.state.Birim}
                                        onChange={this.handleChangeBirim}
                                    >
                                        {this.props.birimler.map((item, index) => {
                                            return <MenuItem key={item.id} value={item.id}>{item.Adi} </MenuItem>
                                        }
                                        )}
                                    </Select>

                                    <FormHelperText>Lütfen Birimi Seçiniz</FormHelperText>
                                </FormControl>
                            </Grid>
                            
                            
                            </Grid>)}
                        
                    


                </DialogContent>
                <DialogActions>
                    <Button onClick={this.modalAccountOpen}>
                        İptal
                    </Button>
                    <Button >
                        Ekle
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    }

}

export default YeniFaaliyetEkle