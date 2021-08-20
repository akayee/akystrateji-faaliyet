import React from "react";
import PropTypes from "prop-types";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import GridItem from "components/Grid/GridItem.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";
import Card from "components/Card/Card.jsx";
import CardBody from "components/Card/CardBody.jsx";
import IconButton from '@material-ui/core/IconButton';
import { Typography } from "@material-ui/core";
import KullanicilarListele from "../../components/KullanicilarListe/KullanicilarListe";
import YeniOlcuBirimiEkle from "../../components/YeniOlcuBirimiEkle/YeniOlcuBirimiEkle";
import YeniBirimEkle from "../../components/YeniBirimEkle/YeniBirimEkle";



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
//component/task table yapısı kullanılarak oradaki icon buttonlarla icon eklenecek
class Ayarlar extends React.Component {
  constructor(...args) {
    super(...args);
    this.state = {
      expanded: {}
    };
  }


  //Dialog yani popup yönetimi
  modalClose = () => this.setState({ modalShow: false });
  modalOpen = () => this.setState({ modalShow: !this.state.modalShow });
  paymentOpen = () => this.setState({ paymentShow: !this.state.paymentShow });
  handleClose = () => this.setState({ modalShow: false });
  modalAccountOpen = () => this.setState({ modalAccountShow: !this.state.modalAccountShow });
  modalClose = () => this.setState({ modalAccountShow: false });


  //Get money transfer screen datas
  handleChange = (e) => {
    let val = e.target.value;
    this.setState({ [e.target.name]: val })

  }
  handleExpandClick = (event, path) => {
    this.setState({
      expanded: { ...this.state.expanded, [path]: !this.state.expanded[path] }
    })
  }
  render() {
    Number.prototype.format = function (n, x, s, c) {
      var re = '\\d(?=(\\d{' + (x || 3) + '})+' + (n > 0 ? '\\D' : '$') + ')',
        num = this.toFixed(Math.max(0, ~~n));

      return (c ? num.replace('.', c) : num).replace(new RegExp(re, 'g'), '$&' + (s || ','));
    };


    //DİZAYN CLASSLARININ PROPDAN ALINMA İŞLEMİ
    const { classes } = this.props;

    //TODO Kullanicilar sistemden çekilerek ayarlancak

    const parametre = ['Adet', 'm²', 'km²', 'TL', 'm³', 'Litre']


    return (
      <div>
        <KullanicilarListele />


        <GridContainer alignItems='stretch' justify='center'>
          <GridItem xs={6} >
            <Typography variant="h4" component="h4">
              Ölçü Birimi
            </Typography>
            <Card>
              <CardBody>
                <YeniOlcuBirimiEkle classes={classes} />
              
              </CardBody>
            </Card>
          </GridItem>
          <GridItem xs={6} >
            <Typography variant="h4" component="h4">
              Birimler
            </Typography>
            <Card>
              <CardBody>
                <YeniBirimEkle classes={classes} />
                
              </CardBody>
            </Card>
          </GridItem>
        </GridContainer>



      </div>
    )

  }

}
Ayarlar.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Ayarlar);
