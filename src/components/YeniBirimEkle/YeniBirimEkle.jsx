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
import TextField from '@material-ui/core/TextField';
import AddIcon from '@material-ui/icons/Add';
import { addToBirim,getBirimData,removeFromBirim } from '../../store/actions/birimler';
import Swal from 'sweetalert2';
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import IconButton from '@material-ui/core/IconButton';
import { Delete } from "@material-ui/icons";
import BirimItem from '../../models/birim-item';



const accounts = [
    { Adi: 'Asfalt Dökümü', id: '1', Birim: 'Yol Asfalt', hedef: '70', ustBirimId: '0' },
    { Adi: 'Yeni Birim İnşaatı', id: '4', Birim: 'İnşaat Yapım', hedef: '78', ustBirimId: '0' },
    { Adi: 'Mamak Altyapı Çalışması', id: '8', Birim: 'Sinyalizasyon ve Altyapı', hedef: '78', ustBirimId: '0' },
    { Adi: 'Mamak Tahliye İşlemleri', id: '6', Birim: 'Tahliye ve Yıkım', hedef: '79', ustBirimId: '0' },
    { Adi: 'Keçiören Dutluk Kaldırım Çalışması', id: '7', Birim: 'Kaldırım Yapım ve Bakım Onarım', hedef: '80', ustBirimId: '0' },
    { Adi: 'Tabela Direk İşlemleri', id: '0', Birim: 'Numarataj', hedef: '80', ustBirimId: '0' },
    { Adi: 'Afet Müdahale Ekipmanları Alımı', id: '5', Birim: 'Afet Koordinasyon', hedef: '81', ustBirimId: '0' },
    { Adi: 'Fiber Altyapı Ruhsat İşlemleri', id: '3', Birim: 'Aykome', hedef: '82', ustBirimId: '0' },
    { Adi: 'Keşif', id: '2', Birim: 'Kent Estetiği', hedef: '90', ustBirimId: '0' },
    { Adi: 'Eski Binaların Kamulaştırılması', id: '10', Birim: 'Kamulaştırma', hedef: '60', ustBirimId: '1' },
    { Adi: 'Arsa Satın Alım İşlemleri', id: '11', Birim: 'Taşınmazlar', hedef: '65', ustBirimId: '1' },
    { Adi: 'Yazılım İhalesi', id: '9', Birim: 'İdari İşler', hedef: '78', ustBirimId: '1' },
    { Adi: 'Yeni Yerleşim Birimleri Oluşturulması', id: '12', Birim: 'Yeni Yerleşimler', hedef: '80', ustBirimId: '1' },
    { Adi: 'Yazılım İhalesi', id: '13', Birim: 'Araştırma İhale ve İdari İşler', hedef: '60', ustBirimId: '2' },
    { Adi: 'Yeni Sera Kurulumu', id: '14', Birim: 'Bitkisel Üretim ve Uygulama', hedef: '70', ustBirimId: '2' },
    { Adi: 'Çiftçilere Tohum Dağıtılması', id: '15', Birim: 'İklim Değişikliği ve Uyum', hedef: '70', ustBirimId: '2' },
    { Adi: 'Keçiören Yeni Park Projeleri', id: '16', Birim: 'Proje ve Yapım İşleri', hedef: '72', ustBirimId: '2' },
    { Adi: 'Refüj Bakım Çalışmaları', id: '17', Birim: 'Yeşil Alanlar', hedef: '75', ustBirimId: '2' },
    { Adi: 'Harfiyat İşlemleri', id: '18', Birim: 'Atık Yönetimi', hedef: '80', ustBirimId: '2' },
    { Adi: 'Denetimler', id: '19', Birim: 'Zabıta 1', hedef: '80', ustBirimId: '3' },
    { Adi: 'Denetimler', id: '20', Birim: 'Zabıta 2', hedef: '85', ustBirimId: '3' },
    { Adi: 'Denetimler', id: '21', Birim: 'Zabıta 3', hedef: '87', ustBirimId: '3' },
    { Adi: 'Denetimler', id: '22', Birim: 'Zabıta 4', hedef: '89', ustBirimId: '3' },
    { Adi: 'Denetimler', id: '23', Birim: 'Zabıta 5', hedef: '90', ustBirimId: '3' },
    { Adi: 'Denetimler', id: '24', Birim: 'Zabıta 6', hedef: '92', ustBirimId: '3' },
    { Adi: 'Denetimler', id: '25', Birim: 'Zabıta 7', hedef: '98', ustBirimId: '3' },
    { Adi: 'Bilgisayar Temini', id: '26', Birim: 'Elektronik Sistemler ve Donanım', hedef: '81', ustBirimId: '4' },
    { Adi: 'İnternet İhalesi', id: '27', Birim: 'İletişim', hedef: '85', ustBirimId: '4' },
    { Adi: 'Yazılım İhalesi', id: '28', Birim: 'Proje İhale ve İdari İşler', hedef: '89', ustBirimId: '4' },
    { Adi: 'Yazılım Geliştirme ve Bakım', id: '29', Birim: 'Yazılım ve Yönetim', hedef: '99', ustBirimId: '4' },];

class YeniBirimEkle extends React.Component {
    constructor(...args) {
        super(...args);
        this.state = {
            modalopen: false,
            amacDetay: [],
            Birim: null,
            error:false
        }
    }

    componentDidMount() {
        this.props.getBirimData();
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
    handleBirimDelete=(e,birim)=>{
        this.props.removeFromBirim(birim);
        if(this.props.error)
        {
            
        Swal.fire({
            title: 'Kayıt Başarıyla Silindi!',
            position: 'top-end',
            icon: 'success',
            showConfirmButton: false,
            timer: 1500
        })
        }else{
            
        Swal.fire({
            title: 'Oops...',
            position: 'top-end',
            icon: 'error',
            text: 'Hata Oluştu',
            showConfirmButton: false,
            timer: 1500
        })
        }
    }

    handleSubmit = (e) => {
        var birim = new BirimItem(0,this.state.amacDetay.Tanim,this.state.Birim,4,false,Date.now);
        this.props.addToBirim(birim);
        this.setState({
            modalopen: !this.state.modalopen,
            amacDetay: [],
            Birim: null
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
        const {birimler} = this.props.birimler;
        return <div ><GridContainer alignItems='center' >
            <GridItem xs={3}>
                Yeni Birim Ekle
            </GridItem>
            <GridItem xs={3}>
                <IconButton onClick={this.modalAccountOpen} >
                    <AddIcon />
                </IconButton>
            </GridItem>
        </GridContainer>
        {console.log(birimler)}
        {birimler&&birimler.map((birim,index) => <GridContainer alignItems='center' key={index} >
                  <GridItem xs={10}>
                    {birim.adi}
                  </GridItem>
                  <GridItem xs={2}>
                    <IconButton onClick={(e)=>this.handleBirimDelete(e,birim)} >
                      <Delete />
                    </IconButton>
                  </GridItem>
                </GridContainer>)}
            <Dialog open={this.state.modalopen} onClose={this.modalAccountOpen} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">Yeni Birim Oluştur</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Bu ekrandan yeni birim oluşturabilirsiniz.
                    </DialogContentText>
                    <Grid container spacing={3}>
                        <Grid item xs={6}>
                            <TextField
                                name="Tanim"
                                autoFocus
                                margin="dense"
                                id="name"
                                label="Birim Adı"
                                type="text"
                                fullWidth
                                onChange={this.handleChange}
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <FormControl className={classes.formControl}>
                                <InputLabel shrink id="demo-simple-select-placeholder-label-label">
                                    Birim Tipi
                                </InputLabel>
                                <Select
                                    name="Birim"
                                    type="text"
                                    value={this.state.Birim}
                                    onChange={this.handleChangeBirim}
                                >
                                    {birimler&&birimler.map((item, index) => {
                                        return <MenuItem key={index} value={item.id}>{item.adi} </MenuItem>
                                    }
                                    )}
                                </Select>

                                <FormHelperText>Lütfen Bir Birim Tipi Seçiniz</FormHelperText>
                            </FormControl>
                        </Grid>
                        <Grid item xs={6}>
                            <FormControl className={classes.formControl}>
                                <InputLabel shrink id="demo-simple-select-placeholder-label-label">
                                    Varsa Üst Birimi?
                                </InputLabel>
                                <Select
                                    name="Birim"
                                    type="text"
                                    value={this.state.Birim}
                                    onChange={this.handleChangeBirim}
                                >
                                    {birimler&&birimler.map((item, index) => {
                                        return <MenuItem key={index} value={item.id}>{item.adi} </MenuItem>
                                    }
                                    )}
                                </Select>

                                <FormHelperText>Lütfen Bir Birim Seçiniz</FormHelperText>
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

const mapStateToProps = (state) => ({ birimler: state.birimler,error:state.error })
export default connect(mapStateToProps,{getBirimData,addToBirim,removeFromBirim})(YeniBirimEkle)