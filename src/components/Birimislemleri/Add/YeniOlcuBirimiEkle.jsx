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
import { addToOlcuBirimi, removeFromOlcuBirimi, getOlcuBirimiData } from '../../../store/actions/olcubirimi';
import Swal from 'sweetalert2';
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import IconButton from '@material-ui/core/IconButton';
import { Delete } from "@material-ui/icons";
import OlcuBirimiItem from '../../../models/olcubirimi_item';

class YeniOlcuBirimiEkle extends React.Component {
    constructor(...args) {
        super(...args);
        this.state = {
            modalopen: false,
            OlcuBirimi: []
        }
    }
    componentDidMount() {
        this.props.getOlcuBirimiData();
    }
    handleChange = (e) => {
        let val = e.target.value;
        this.setState({ OlcuBirimi: { ...this.state.amacDetay, [e.target.name]: val } })

    }

    modalAccountOpen = () => {
        this.setState({
            modalopen: !this.state.modalopen
        })
    }

    handleSubmit = (e) => {
        var olcubirimi = new OlcuBirimiItem(0, this.state.OlcuBirimi.tanim, false);
        console.log(olcubirimi);
        this.props.addToOlcuBirimi(olcubirimi);
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
    
    handleBirimDelete = (e, birim) => {
        this.props.removeFromOlcuBirimi(birim);
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
    render() {
        const { olcubirimi } = this.props.olcubirimi;
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
            {olcubirimi&&olcubirimi.map((i, index) => <GridContainer alignItems='center' key={index} >
                <GridItem xs={9}>
                    {i.tanim}
                </GridItem>
                <GridItem xs={3}>
                    <IconButton onClick={(e) =>{Swal.fire({
                      title: 'Silmek istediğinize emin misiniz?',
                      showDenyButton: true,
                      confirmButtonText: 'Sil',
                      denyButtonText: `İptal`,
                  }).then((result) => {
                      /* Read more about isConfirmed, isDenied below */
                      if (result.isConfirmed) {
                          Swal.fire('Silme işlemi başarılı!', '', 'success')
                          this.handleBirimDelete(e, i);
                      } else if (result.isDenied) {
                          Swal.fire('Silme işlemi iptal edildi', '', 'info')
                      }
                  })} } >
                        <Delete />
                    </IconButton>
                </GridItem>

            </GridContainer>)}


            <Dialog open={this.state.modalopen} onClose={this.modalAccountOpen} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">Yeni Ölçü Birimi Oluştur</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Bu ekrandan yeni ölçü birimi oluşturabilirsiniz.
                    </DialogContentText>
                    <Grid container spacing={3}>
                        <TextField
                            name="tanim"
                            autoFocus
                            margin="dense"
                            id="name"
                            label="Ölçü Birimi Adı"
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



const mapStateToProps = (state) => ({ olcubirimi: state.olcubirimi, error: state.olcubirimi.error })
export default connect(mapStateToProps, { getOlcuBirimiData,removeFromOlcuBirimi,addToOlcuBirimi })(YeniOlcuBirimiEkle)