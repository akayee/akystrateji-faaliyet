import React from 'react';
import Accordion from '@material-ui/core/Accordion';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { Grid } from '@material-ui/core';
import LinearProg from '../../components/LinearProg/LinearProgStrateji';
import { connect } from 'react-redux';
import { getStrategyData } from '../../store/actions/birimsstratejibilgiler';
import Divider from '../../components/Ui/Divider.js';


class Stratejiler extends React.Component {

    constructor(...args) {
        super(...args);
        this.state = {
            data: null,
            expanded: false,
            hedefexpanded: false,
            performansexpanded: false
        }
    }
    handleChange = (panel) => (event, isExpanded) => {
        this.setState({ expanded: isExpanded ? panel : false });
    };
    handleChangeHedef = (panel) => (event, isExpanded) => {
        this.setState({ hedefexpanded: isExpanded ? panel : false });
    };
    handleChangePerformans = (panel) => (event, isExpanded) => {
        this.setState({ performansexpanded: isExpanded ? panel : false });
    };
    componentDidMount() {
        this.props.getStrategyData([2]);
    }

    render() {
        function amount(item) {
            return item.Amount;
        }

        function sum(prev, next) {
            return prev + next;
        }
        const { stratejikAmac, hedefler, performanslar, isturleri, vmFaaliyetTurleri, birim } = this.props.strategydata.strategydata;
        const { birimler } = this.props.strategydata;

        return <div>
            {stratejikAmac && stratejikAmac.map((strateji, index) => <Accordion key={index} expanded={this.state.expanded === strateji.path} onChange={this.handleChange(strateji.path)}>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1bh-content"
                    id="panel1bh-header"
                >
                    A{strateji.id + 1}:{strateji.adi}
                </AccordionSummary>
                <AccordionDetails>
                    <div style={{ width: '%100' }}>
                        {hedefler.map((hedef, index) => <Accordion key={index} expanded={this.state.hedefexpanded === hedef.path} onChange={this.handleChangeHedef(hedef.path)}>
                            <AccordionSummary
                                expandIcon={<ExpandMoreIcon />}
                                aria-controls="panel1bh-content"
                                id="panel1bh-header"
                            >
                                <Grid xs={5}>H{strateji.id + 1}.{hedef.id + 1} : {hedef.tanim}</Grid>
                            </AccordionSummary>
                            <AccordionDetails>
                                <div style={{ width: '%100' }}>
                                    {performanslar ? performanslar.map((performans, index) => <Accordion key={index} expanded={this.state.performansexpanded === performans.path} onChange={this.handleChangePerformans(performans.path)}>
                                        <AccordionSummary
                                            expandIcon={<ExpandMoreIcon />}
                                            aria-controls="panel1bh-content"
                                            id="panel1bh-header"
                                        >
                                            <Grid xs={5}>P{strateji.id + 1}.{hedef.id + 1}.{performans.id + 1} : {performans.adi}</Grid>
                                            <Grid xs={2} style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                                                {
                                                    //birim && birim.find(obj=>obj.id ==isturleri.find(o=>o).birimId).adi 
                                                }
                                            </Grid>
                                            <Grid item xs={5}><LinearProg
                                                gerceklesmeOrani={isturleri.filter(obj => obj.performansId == performans.id).map(item => item.toplamDeger).reduce((prev, next) => prev + next)}
                                                yillikHedef={vmFaaliyetTurleri.filter(obj => obj.performansId == performans.id).map(item => item.toplamDeger).reduce((prev, next) => prev + next)}
                                                gosterilecekalan={["Faaliyet", "Maaliyet"]} /> </Grid>
                                        </AccordionSummary>
                                        <AccordionDetails>
                                            <Grid container>
                                                <Grid container><h4><b>Performans Göstergeleri</b></h4></Grid>
                                                <Grid container>
                                                    <Grid item xs={2}><b>Adi</b></Grid>
                                                    <Grid item xs={2}><b>Ölçü Birimi</b></Grid>
                                                    <Grid item xs={2}><b>Hedef</b> </Grid>
                                                    <Grid item xs={2}><b>Gerçekleşme</b> </Grid>
                                                    <Grid item xs={4}><b>Açıklama</b></Grid>
                                                </Grid>
                                                {isturleri && isturleri.map((is, index) => <Grid key={index} container>
                                                    <Grid item xs={2}>{is.adi}</Grid>
                                                    <Grid item xs={2} style={{ textAlign: 'center' }}>{is.OlcuBrimi} </Grid>
                                                    <Grid item xs={2}>{is.yillikHedef} </Grid>
                                                    <Grid item xs={2}>{is.toplamDeger} </Grid>
                                                    <Grid item xs={4}>{is.aciklama} </Grid>
                                                    <Grid item xs={12}><LinearProg gerceklesmeOrani={is.toplamDeger}
                                                        yillikHedef={is.yillikHedef} gosterilecekalan={["Gerçekleşen", "Hedef"]}
                                                        parts={[(is.firstPart * 100) / is.yillikHedef, (is.secondPart * 100) / is.yillikHedef,
                                                        (is.thirdPart * 100) / is.yillikHedef, (is.lastPart * 100) / is.yillikHedef]}
                                                        gerceklesmeOrani={(is.toplamDeger * 100) / is.yillikHedef} /> </Grid>
                                                    <Divider />
                                                </Grid>)}

                                                <Grid container><h4><b>Maaliyetler</b></h4></Grid>
                                                <Grid container>
                                                    <Grid item xs={2}><b>Adi</b></Grid>
                                                    <Grid item xs={2} ><b>Ölçü Birimi</b></Grid>
                                                    <Grid item xs={2}><b>Hedef</b> </Grid>
                                                    <Grid item xs={2}><b>Gerçekleşme</b> </Grid>
                                                    <Grid item xs={4}><b>Açıklama</b></Grid>
                                                </Grid>
                                                {vmFaaliyetTurleri && vmFaaliyetTurleri.map((is, index) => <Grid key={index} container>
                                                    <Grid item xs={2}>{is.adi}</Grid>
                                                    <Grid item xs={2} style={{ textAlign: 'center' }}>{is.OlcuBrimi} </Grid>
                                                    <Grid item xs={2}>{is.yillikHedef} </Grid>
                                                    <Grid item xs={2}>{is.toplamDeger} </Grid>
                                                    <Grid item xs={4}>{is.aciklama} </Grid>
                                                    <Grid item xs={12}><LinearProg gerceklesmeOrani={is.toplamDeger}
                                                        yillikHedef={is.yillikHedef} gosterilecekalan={["Gerçekleşen", "Hedef"]}
                                                        parts={[(is.firstPart * 100) / is.yillikHedef,
                                                        (is.secondPart * 100) / is.yillikHedef, (is.thirdPart * 100) / is.yillikHedef, (is.lastPart * 100) / is.yillikHedef]}
                                                        gerceklesmeOrani={(is.toplamDeger * 100) / is.yillikHedef} /> </Grid>
                                                    <Divider />
                                                </Grid>)}
                                            </Grid>
                                        </AccordionDetails>
                                    </Accordion>) : null}
                                </div>
                            </AccordionDetails>

                        </Accordion>)}

                    </div>

                </AccordionDetails>
            </Accordion>)}



        </div>
    }
}

const mapStateToProps = (state) => ({ strategydata: state.strategydata })
export default connect(mapStateToProps, { getStrategyData })(Stratejiler);