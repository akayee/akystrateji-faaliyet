import React from 'react';
import { connect } from 'react-redux';
import { Button } from "@material-ui/core";
import Grid from '@material-ui/core/Grid';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';
import InputLabel from '@material-ui/core/InputLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import Swal from 'sweetalert2';
import { addToYetkiGorev,removeFromYetkiGorev} from '../../../store/actions/birimislemleri/yetkigorev';
import YetkiGorevItem from '../../../models/yetkigorev-item';

class YetkiGorevEkle extends React.Component{
    constructor(...args){
        super(...args)
        this.state={            
            modalopen:false,
            Birim:'',
            yapiBilgileri:{}
        }
    }
    modalAccountOpen = () => {
        this.setState({
            modalopen:!this.state.modalopen
        })
    }
    handleChangeBirim= (e)=>{
        let val = e.target.value;
        this.setState({Birim:val})

    }
    handleChange = (e) => {
        let val = e.target.value;
        this.setState({ yapiBilgileri: { ...this.state.yapiBilgileri, [e.target.name]: val } })

    }
    handleSubmit = (e) => {
        if(this.state.yapiBilgileri.Adi!=null&&this.state.yapiBilgileri.Kanun!=null)
        {
            var yapi = new YetkiGorevItem(0,this.state.yapiBilgileri.Adi,this.state.yapiBilgileri.Kanun,false,parseInt(this.state.Birim));
            this.props.addToYetkiGorev(yapi);
            if (this.props.error === false) {
    
                Swal.fire({
                    title: 'Kayıt Başarılı!',
                    position: 'top-end',
                    icon: 'success',
                    showConfirmButton: false,
                    timer: 1500
                })
    
                this.setState({
                    modalopen: !this.state.modalopen,
                    amacDetay: [],
                    Birim: null
                })
            }
            else {
                Swal.fire({
                    title: 'Oops...',
                    position: 'top-end',
                    icon: 'error',
                    text: 'Hata Oluştu',
                    showConfirmButton: false,
                    timer: 1500
                })
            }
        }else{
            Swal.fire({
                title: 'Oops...',
                position: 'top-end',
                icon: 'error',
                text: 'Yıldızlı alanların hepsini doldurunuz',
                showConfirmButton: false,
                timer: 1500
            })
        }
        

    }
    render () {
        const {birimler}=this.props.props
        return <div>
            <Button onClick={this.modalAccountOpen} >Yetki Görev Tanımı Ekle</Button>
            <Dialog open={this.state.modalopen} onClose={this.modalAccountOpen} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">Yeni Yetki Görev Tanımı Oluştur.</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Bu ekrandan biriminizin yetki görevlerini tanımlayabilirsiniz.
            </DialogContentText>
                    <Grid container spacing={4}>
                        <Grid item xs={3}>
                            <TextField
                            name="Adi"
                            autoFocus
                            required
                            margin="dense"
                            id="name"
                            label="Yetki Adı"
                            type="text"
                            fullWidth
                            onChange={this.handleChange}
                        />
                        </Grid>
                        <Grid item xs={4}>
                            <TextField
                            name="Kanun"
                            margin="dense"
                            required
                            id="name"
                            label="Kanun"
                            type="text"
                            fullWidth
                            onChange={this.handleChange}
                        />
                        </Grid>
                        <Grid item xs={4}>
                            <FormControl >
                                <InputLabel shrink id="demo-simple-select-placeholder-label-label">
                                   Ekleyeceğiniz Birim.
                                </InputLabel>
                                <Select
                                    name="Birim"
                                    type="text"
                                    required
                                    value={this.state.Birim}
                                    onChange={this.handleChangeBirim}
                                >
                                    {birimler&&birimler.map((item, index) => {
                                        return <MenuItem key={item.id} value={item.id}>{item.adi} </MenuItem>
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

const mapStateToProps = (state) => ({ yetkigorevler: state.yetkigorevler, error: state.yetkigorevler.error })
export default connect(mapStateToProps, {addToYetkiGorev,removeFromYetkiGorev })(YetkiGorevEkle)