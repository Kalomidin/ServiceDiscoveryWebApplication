import React,{Component } from 'react'
import { Redirect } from 'react-router';
import { SSL_OP_EPHEMERAL_RSA } from 'constants';
import {Link} from "react-router-dom";
import Navbar from "./Navbar";
import { isRegExp } from 'util';
import { getLogin, getLoginInfo, setLogin } from './data';
var k=1;
export default class Verify extends Component{
signOut=()=>{
    setLogin("","");
}
    render(){
        if(getLogin()){
       return(
           <dev>
            <center><h1> Do you want to sign out</h1></center>
            <center>
            <button onClick={this.signOut.bind(this)}>
                <Link to="/">
                   Yes
                </Link>
            </button>
            <button>
                <Link to="/">
                   No
                </Link>
            </button>
            </center>
           </dev>
       );}
       else{
           return(
               <Redirect to="/"></Redirect>
           );
       }
}
}