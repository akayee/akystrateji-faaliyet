import React,{Component} from 'react';
import {
    showLoadingSpinner,
    getHomeAccounts,
    getHomeExpenses
} from '../actions'
import { connect } from 'net';
import Home from '../../views/Home/Home';

class HomeContainer extends Component {
   componentDidMount(){
       this.getData();
   }
   getData=()=>{
       this.props.showLoadingSpinner();
       this.props.getHomeAccounts();
       this.props.getHomeExpenses();
   }
   render(){
       return(
           <Home{...this.props}
           />
       );
   }

}

const mapStateToProps = state =>{
    return state.home;
}

const mapDispatchToProps ={
    getHomeAccounts,
    getHomeExpenses,
    showLoadingSpinner
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(HomeContainer)