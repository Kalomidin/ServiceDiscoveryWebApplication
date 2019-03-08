import React,{Component } from 'react'
import {Link} from "react-router-dom";
import {Redirect} from "react-router-dom";
import styled from "styled-components";
import { getCode, logininfo } from './data';



export default class RegisterVerify extends Component{
constructor(props){
    super(props);
    this.state={
        verify: false
    }
}
checkCode=(str)=>{
    console.log("The value is: "+str.target.value);
    if(str.target.value===getCode())
    {
        var connection = new WebSocket('ws://127.0.0.1:8887');
        connection.onopen = function () {
            console.log('Connected!');
            connection.send("Verified,"+logininfo.username+","+logininfo.email+","+logininfo.password); // Send the  server
            connection.close();
        };
               // Log errors
        connection.onerror = function (error) {
        console.log('WebSocket Error ' + error);
        };
        this.setState(
            {verify: true}
        )
    }
}
    render(){
        if(this.state.verify){
            return(
                <Redirect to="/"></Redirect>
            );
        }
        return(
           <center>
            <h2>
                Please Check Your Email Address to Verify Your Registration
            <center>
            <div className="input-group">
          <input type="password" name="password" className="login-input" placeholder="Code" onChange={this.checkCode.bind(this)}></input>
            </div>
            <ButtonContainer>
                verify
            </ButtonContainer>
            </center>
            </h2>
            </center> 
        );
    }
}

export const ButtonContainer=styled.button`
    text-transformation: capitalize;
    font-size: 1.4rem;
    background: var(--lightBlue);
    border: 0.04rem solid var(--lightBlue);
    border-radius: 1rem;
    padding: 0.2rem 0.5rem; 
    margin: 0.2rem 0.5 rem;
    transition: all 0.5s ease-in-out;
    cursor: pointer;
    &:hover{
        backround: var(--mainDark);
        color: var(--mainBlue);
    }
    &:focus{
        outline:none;
    }
    `;