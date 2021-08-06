import React from "react";
import TransferList from "../../components/TransferList/TransferList";
import withStyles from "@material-ui/core/styles/withStyles";
import { connect} from 'react-redux';


import InputLabel from '@material-ui/core/InputLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';

const mapStateToProps = state => {
    return{
      birimlerim: state.birimler
    }
    
  };
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

  const acoounttye = [
    { Adi: 'Stratejik Amaç', id: '0', hedef: '80' },
    { Adi: 'Stratejik Hedef', id: '1', hedef: '70' },
    { Adi: 'Stratejik Performans', id: '2', hedef: '70' },
    { Adi: 'Faaliyet', id: '3', hedef: '92' },
    { Adi: 'Maaliyet', id: '4', hedef: '93' }]
  class YilSonuDevir extends React.Component{
      constructor(...args){
          super(...args);
          this.state = {
              elma:null,
              Birim:0       
            
          }
      }

      
    handleChangeBirim= (e)=>{
        let val = e.target.value;
        this.setState({Birim:val})

    }

      render (){
        const { classes } = this.props;
        return (<div>
            <Grid item xs={4}>
                            <FormControl className={classes.formControl}>
                                <InputLabel shrink id="demo-simple-select-placeholder-label-label">
                                    Amaçlar
                                </InputLabel>
                                <Select
                                    name="Birim"
                                    type="text"
                                    value={this.state.Birim}
                                    onChange={this.handleChangeBirim}
                                >
                                    {acoounttye.map((item, index) => {
                                        return <MenuItem key={item.id} value={item.id}>{item.Adi} </MenuItem>
                                    }
                                    )}
                                </Select>

                                <FormHelperText>Aktarım Yapacağınız Türü Seçiniz</FormHelperText>
                            </FormControl>
                        </Grid>
            <TransferList />
        </div>)
      }
  }

  export default connect(mapStateToProps)(withStyles(styles)(YilSonuDevir));