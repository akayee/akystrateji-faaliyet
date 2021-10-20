import React from 'react';

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
import AddIcon from '@material-ui/icons/Add';
import { addToStratejiYili,getStratejiYiliData } from '../../store/actions/stratejikyil';
import Swal from 'sweetalert2';
import StratejiYilItem from '../../models/stratejiyil_item';


class StratejikYilEkle extends React.Component {
    constructor(...args) {
        super(...args);
        this.state = {
            modalopen: false,
            Date: new Date().getFullYear(),
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
        const { addToStratejiYili } = this.props;
        let yeniyil = new StratejiYilItem(0,this.state.Birim);
        addToStratejiYili(yeniyil);
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
    componentDidMount(){
        this.props.getStratejiYiliData();
    }
    render() {
        const { classes,stratejikyillar } = this.props;
        return <div><Button onClick={this.modalAccountOpen}><AddIcon /> Yeni Stratejik Yıl Ekle</Button>
            <Dialog open={this.state.modalopen} onClose={this.modalAccountOpen} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">Strateji Yılı Oluştur</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Bu ekrandan yeni strateji yılı tanımlayabilirsiniz.
                    </DialogContentText>
                    <Grid container spacing={3}>
                        <Grid item xs={4}>
                            <FormControl className={classes.formControl}>
                                <InputLabel shrink id="demo-simple-select-placeholder-label-label">
                                    Strateji Yılı?
                                </InputLabel>
                                <Select
                                    name="Birim"
                                    type="text"
                                    value={this.state.Birim}
                                    onChange={this.handleChangeBirim}
                                >
                                    {this.props.gosterilecekyil.map((item, index) => {
                                        let max =this.state.Date
                                        if(stratejikyillar.length>0 && stratejikyillar!='Veri Bulunmuyor'){
                                            max = stratejikyillar.reduce((prev, current) => (prev.yil > current.yil) ? prev : current).yil +1
                                        }
                                        
                                        return <MenuItem key={item} value={max + item}>{max + item} </MenuItem>
                                    }
                                    )}
                                </Select>

                                <FormHelperText>Lütfen Bir Yıl Seçiniz</FormHelperText>
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

const mapStateToProps = (state) => ({ stratejikyillar: state.stratejikyillar.yillar,gosterilecekyil:state.stratejikyillar.gosterilecekYil,loading:state.stratejikyillar.loading })
export default connect(mapStateToProps,{addToStratejiYili,getStratejiYiliData})(StratejikYilEkle)