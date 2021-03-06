import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import { red } from '@material-ui/core/colors';
import withStyles from "@material-ui/core/styles/withStyles";
import Card from "components/Card/Card.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import CardBody from "components/Card/CardBody.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import AddIcon from '@material-ui/icons/Add';
import ReorderIcon from '@material-ui/icons/Reorder';
import IconButton from '@material-ui/core/IconButton';
import EditIcon from '@material-ui/icons/Edit';
import Collapse from '@material-ui/core/Collapse';
import { Button, CardActions, CardContent, Typography } from "@material-ui/core";
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormControl from '@material-ui/core/FormControl';
import SearchIcon from '@material-ui/icons/Search';
import KullaniciEkle from '../KullaniciEkle/KullaniciEkle';
const useStyles = makeStyles((theme) => ({
    root: {
        maxWidth: 345,
    },
    media: {
        height: 0,
        paddingTop: '56.25%', // 16:9
    },
    expand: {
        transform: 'rotate(0deg)',
        marginLeft: 'auto',
        transition: theme.transitions.create('transform', {
            duration: theme.transitions.duration.shortest,
        }),
    },
    expandOpen: {
        transform: 'rotate(180deg)',
    },
    avatar: {
        backgroundColor: red[500],
    },
}));
const styles = {
    cardCategoryWhite: {
        color: "rgba(255,255,255,.62)",
        margin: "0",
        fontSize: "14px",
        marginTop: "0",
        marginBottom: "0"
    },
    cardTitleWhite: {
        color: "#FFFFFF",
        marginTop: "0px",
        minHeight: "auto",
        fontWeight: "300",
        fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
        marginBottom: "3px",
        textDecoration: "none"
    }
};
const kullanicilar = [
    { id: '0', Adi: 'Ahmet Kemal YILMAZ', birimid: '0', ustBirimId: '3', unvan: 'M??hendis', mail: 'aky@outlook.com.tr', maas: '8000', yetkili: 'Evet', dogumTarihi: '11/10/1990', Mezuniyet: 'Lise' },
    { id: '1', Adi: 'Halil ??brahim Y??KSEL', birimid: '1', ustBirimId: '0', unvan: 'M??hendis', mail: 'halil_yuksel@hotmail.com', maas: '7000', yetkili: 'Hay??r', dogumTarihi: '11/10/1990', Mezuniyet: 'Lise' },
    { id: '2', Adi: 'Cemal KAYA', birimid: '0', ustBirimId: '3', unvan: '??????i', mail: 'camalkaya99@gmail.com', maas: '3500', yetkili: 'Hay??r', dogumTarihi: '11/10/1990', Mezuniyet: 'Lise' },
];
const accounts = [
    { Adi: 'Asfalt D??k??m??', id: '1', Birim: 'Yol Asfalt', hedef: '70', ustBirimId: '0' },
    { Adi: 'Yeni Birim ??n??aat??', id: '4', Birim: '??n??aat Yap??m', hedef: '78', ustBirimId: '0' },
    { Adi: 'Mamak Altyap?? ??al????mas??', id: '8', Birim: 'Sinyalizasyon ve Altyap??', hedef: '78', ustBirimId: '0' },
    { Adi: 'Mamak Tahliye ????lemleri', id: '6', Birim: 'Tahliye ve Y??k??m', hedef: '79', ustBirimId: '0' },
    { Adi: 'Ke??i??ren Dutluk Kald??r??m ??al????mas??', id: '7', Birim: 'Kald??r??m Yap??m ve Bak??m Onar??m', hedef: '80', ustBirimId: '0' },
    { Adi: 'Tabela Direk ????lemleri', id: '0', Birim: 'Numarataj', hedef: '80', ustBirimId: '0' },
    { Adi: 'Afet M??dahale Ekipmanlar?? Al??m??', id: '5', Birim: 'Afet Koordinasyon', hedef: '81', ustBirimId: '0' },
    { Adi: 'Fiber Altyap?? Ruhsat ????lemleri', id: '3', Birim: 'Aykome', hedef: '82', ustBirimId: '0' },
    { Adi: 'Ke??if', id: '2', Birim: 'Kent Esteti??i', hedef: '90', ustBirimId: '0' },
    { Adi: 'Eski Binalar??n Kamula??t??r??lmas??', id: '10', Birim: 'Kamula??t??rma', hedef: '60', ustBirimId: '1' },
    { Adi: 'Arsa Sat??n Al??m ????lemleri', id: '11', Birim: 'Ta????nmazlar', hedef: '65', ustBirimId: '1' },
    { Adi: 'Yaz??l??m ??halesi', id: '9', Birim: '??dari ????ler', hedef: '78', ustBirimId: '1' },
    { Adi: 'Yeni Yerle??im Birimleri Olu??turulmas??', id: '12', Birim: 'Yeni Yerle??imler', hedef: '80', ustBirimId: '1' },
    { Adi: 'Yaz??l??m ??halesi', id: '13', Birim: 'Ara??t??rma ??hale ve ??dari ????ler', hedef: '60', ustBirimId: '2' },
    { Adi: 'Yeni Sera Kurulumu', id: '14', Birim: 'Bitkisel ??retim ve Uygulama', hedef: '70', ustBirimId: '2' },
    { Adi: '??ift??ilere Tohum Da????t??lmas??', id: '15', Birim: '??klim De??i??ikli??i ve Uyum', hedef: '70', ustBirimId: '2' },
    { Adi: 'Ke??i??ren Yeni Park Projeleri', id: '16', Birim: 'Proje ve Yap??m ????leri', hedef: '72', ustBirimId: '2' },
    { Adi: 'Ref??j Bak??m ??al????malar??', id: '17', Birim: 'Ye??il Alanlar', hedef: '75', ustBirimId: '2' },
    { Adi: 'Harfiyat ????lemleri', id: '18', Birim: 'At??k Y??netimi', hedef: '80', ustBirimId: '2' },
    { Adi: 'Denetimler', id: '19', Birim: 'Zab??ta 1', hedef: '80', ustBirimId: '3' },
    { Adi: 'Denetimler', id: '20', Birim: 'Zab??ta 2', hedef: '85', ustBirimId: '3' },
    { Adi: 'Denetimler', id: '21', Birim: 'Zab??ta 3', hedef: '87', ustBirimId: '3' },
    { Adi: 'Denetimler', id: '22', Birim: 'Zab??ta 4', hedef: '89', ustBirimId: '3' },
    { Adi: 'Denetimler', id: '23', Birim: 'Zab??ta 5', hedef: '90', ustBirimId: '3' },
    { Adi: 'Denetimler', id: '24', Birim: 'Zab??ta 6', hedef: '92', ustBirimId: '3' },
    { Adi: 'Denetimler', id: '25', Birim: 'Zab??ta 7', hedef: '98', ustBirimId: '3' },
    { Adi: 'Bilgisayar Temini', id: '26', Birim: 'Elektronik Sistemler ve Donan??m', hedef: '81', ustBirimId: '4' },
    { Adi: '??nternet ??halesi', id: '27', Birim: '??leti??im', hedef: '85', ustBirimId: '4' },
    { Adi: 'Yaz??l??m ??halesi', id: '28', Birim: 'Proje ??hale ve ??dari ????ler', hedef: '89', ustBirimId: '4' },
    { Adi: 'Yaz??l??m Geli??tirme ve Bak??m', id: '29', Birim: 'Yaz??l??m ve Y??netim', hedef: '99', ustBirimId: '4' },];
class KullanicilarListele extends React.Component {
    constructor(...props) {
        super(...props);
        this.state = {
            expanded: {},
            listelemesayisi: 3,
            tumliste: false,
            kullanicilar: kullanicilar,
            degismeyenListe: kullanicilar
        }
    }
    handleExpandClick = (event, path) => {
        this.setState({
            expanded: { ...this.state.expanded, [path]: !this.state.expanded[path] }
        })
    }
    handleChangeListeleme = () => {
        let count = kullanicilar.length;
        this.setState({
            listelemesayisi: count,
            tumliste: !this.state.tumliste
        })
    }
    handleChangeListeKaldir = () => {
        this.setState({
            listelemesayisi: 3,
            tumliste: !this.state.tumliste
        })
    }
    handleTextChange = (e) => {
        let kullaniciliste = this.state.degismeyenListe.filter(kul => kul.Adi.toLowerCase().indexOf(e.target.value.toLowerCase()) > -1);
        this.setState({
            kullanicilar: kullaniciliste
        })
    }
    render() {

        const { classes } = this.props;

        return <div>
            <GridContainer>
                <GridItem>
                    <Typography variant="h4" component="h4">
                        Kullanicilar
                    </Typography>
                </GridItem>
                <GridItem style={{ alignSelf: 'flex-end' }}>
                    <FormControl >
                        <InputLabel htmlFor="input-with-icon-adornment">Arama Yap</InputLabel>
                        <Input
                            id="input-with-icon-adornment"
                            startAdornment={
                                <InputAdornment position="start">
                                    <SearchIcon />
                                </InputAdornment>
                            }
                            onChange={this.handleTextChange}
                        />
                    </FormControl>
                </GridItem>
            </GridContainer>


            <GridContainer spacing={2}
                justifyContent="flex-start"
                alignItems="stretch">
                <KullaniciEkle classes={classes} birimler={accounts} />
                {this.state.kullanicilar.slice(0, this.state.listelemesayisi).map((kullanici, index) => <GridItem key={index}>
                    <Card>
                        <CardHeader>{kullanici.Adi} ({kullanici.id})
                            <IconButton >
                                <EditIcon />
                            </IconButton>

                        </CardHeader>
                        <CardBody>
                            <GridContainer>
                                <GridItem>
                                    <b>Birimi:</b>{accounts[kullanici.birimid].Adi}
                                </GridItem>
                                <GridItem>
                                    <b>Yetki:</b> Birim
                                </GridItem>
                            </GridContainer>


                        </CardBody>
                        <CardActions>
                            <IconButton
                                className={clsx(classes.expand, {
                                    [classes.expandOpen]: this.state.expanded[kullanici.id],
                                })}
                                onClick={(e) => { this.handleExpandClick(e, kullanici.id) }}
                                aria-expanded={this.state.expanded[kullanici.id]}
                                aria-label="show more"
                            >
                                <ExpandMoreIcon />
                            </IconButton>
                            Personel Bilgileri
                        </CardActions>
                        <Collapse in={this.state.expanded[kullanici.id]} timeout="auto" unmountOnExit>
                            <CardContent>
                                <GridContainer spacing={3}>
                                    <GridItem xs={4} spacing={3}>
                                        <b>Do??um Tarihi:</b> {kullanici.dogumTarihi}
                                    </GridItem>
                                    <GridItem xs={4}>
                                        <b>Mezuniyet:</b> {kullanici.Mezuniyet}
                                    </GridItem>
                                    <GridItem xs={4}>
                                        <b>??nvan: </b>{kullanici.unvan}
                                    </GridItem>
                                    <GridItem xs={4}>
                                        <b>Mail: </b>{kullanici.mail}
                                    </GridItem>
                                </GridContainer>
                            </CardContent>
                        </Collapse>
                    </Card>
                </GridItem>)}

                {this.state.tumliste ? <GridItem><Card>
                    <CardBody style={{ textAlign: 'center' }}>
                        <IconButton color="primary" onClick={this.handleChangeListeKaldir}>
                            <ReorderIcon style={{ fontSize: 30, textAlign: 'center' }} />
                        </IconButton>
                        Daha az g??ster
                    </CardBody>
                </Card>
                </GridItem> : <GridItem><Card>
                    <CardBody style={{ textAlign: 'center' }}>
                        <IconButton color="primary" onClick={this.handleChangeListeleme}>
                            <ReorderIcon style={{ fontSize: 30, textAlign: 'center' }} />
                        </IconButton>
                        {(kullanicilar.length - 3)} Daha g??ster
                    </CardBody>
                </Card>
                </GridItem>}

            </GridContainer>
        </div>
    }
}

export default withStyles(styles)(KullanicilarListele)