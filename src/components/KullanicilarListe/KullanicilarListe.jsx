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
    { id: '0', Adi: 'Ahmet Kemal YILMAZ', birimid: '0', ustBirimId: '3', unvan: 'Mühendis', mail: 'aky@outlook.com.tr', maas: '8000', yetkili: 'Evet', dogumTarihi: '11/10/1990', Mezuniyet: 'Lise' },
    { id: '1', Adi: 'Halil İbrahim YÜKSEL', birimid: '1', ustBirimId: '0', unvan: 'Mühendis', mail: 'halil_yuksel@hotmail.com', maas: '7000', yetkili: 'Hayır', dogumTarihi: '11/10/1990', Mezuniyet: 'Lise' },
    { id: '2', Adi: 'Cemal KAYA', birimid: '0', ustBirimId: '3', unvan: 'İşçi', mail: 'camalkaya99@gmail.com', maas: '3500', yetkili: 'Hayır', dogumTarihi: '11/10/1990', Mezuniyet: 'Lise' },
];
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
                                        <b>Doğum Tarihi:</b> {kullanici.dogumTarihi}
                                    </GridItem>
                                    <GridItem xs={4}>
                                        <b>Mezuniyet:</b> {kullanici.Mezuniyet}
                                    </GridItem>
                                    <GridItem xs={4}>
                                        <b>Ünvan: </b>{kullanici.unvan}
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
                        Daha az göster
                    </CardBody>
                </Card>
                </GridItem> : <GridItem><Card>
                    <CardBody style={{ textAlign: 'center' }}>
                        <IconButton color="primary" onClick={this.handleChangeListeleme}>
                            <ReorderIcon style={{ fontSize: 30, textAlign: 'center' }} />
                        </IconButton>
                        {(kullanicilar.length - 3)} Daha göster
                    </CardBody>
                </Card>
                </GridItem>}

            </GridContainer>
        </div>
    }
}

export default withStyles(styles)(KullanicilarListele)