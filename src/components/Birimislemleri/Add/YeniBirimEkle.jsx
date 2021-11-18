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
import Skeleton from 'react-loading-skeleton';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import AddIcon from '@material-ui/icons/Add';
import { addToBirim, getBirimData, removeFromBirim } from '../../../store/actions/birimler';
import Swal from 'sweetalert2';
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import IconButton from '@material-ui/core/IconButton';
import { Delete } from "@material-ui/icons";
import BirimItem from '../../../models/birim-item';

class YeniBirimEkle extends React.Component {
    constructor(...args) {
        super(...args);
        this.state = {
            modalopen: false,
            amacDetay: [],
            Birim: null,
            error: false
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
    handleBirimDelete = (e, birim) => {
        this.props.removeFromBirim(birim);
        if (this.props.error === false) {

            Swal.fire({
                title: 'Kayıt Başarıyla Silindi!',
                position: 'top-end',
                icon: 'success',
                showConfirmButton: false,
                timer: 1500
            })
        } else {

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
        var birim = new BirimItem(0, this.state.amacDetay.Tanim, this.state.Birim, 4, false, Date.now);
        this.props.addToBirim(birim);
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

    }
    render() {
        const { classes } = this.props;
        const { birimler } = this.props.birimler;

        if (this.props.birimler.loading === true) {
            return <div>
              <Skeleton height={100} />
              <Skeleton count={6} /></div>
          }
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
            {birimler && birimler.map((birim, index) => <GridContainer alignItems='center' key={index} >
                <GridItem xs={10}>
                    {birim.adi}
                </GridItem>
                <GridItem xs={2}>
                    <IconButton onClick={(e) => {Swal.fire({
                      title: 'Silmek istediğinize emin misiniz? ',
                      showDenyButton: true,
                      text: 'Birime kayıtlı veriler var ise silme gerçekleşemez!',
                      confirmButtonText: 'Sil',
                      denyButtonText: `İptal`,
                  }).then((result) => {
                      /* Read more about isConfirmed, isDenied below */
                      if (result.isConfirmed) {
                          Swal.fire('Silme işlemi başarılı!', '', 'success')
                          this.handleBirimDelete(e, birim)
                      } else if (result.isDenied) {
                          Swal.fire('Silme işlemi iptal edildi', '', 'info')
                      }
                  })} } >
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
                                    {birimler && birimler.map((item, index) => {
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
                                    {birimler && birimler.map((item, index) => {
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

const mapStateToProps = (state) => ({ birimler: state.birimler, error: state.birimler.error })
export default connect(mapStateToProps, { getBirimData, addToBirim, removeFromBirim })(YeniBirimEkle)