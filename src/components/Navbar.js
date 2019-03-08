import React,{Component } from 'react';
import {Link} from 'react-router-dom';
import logo from "../home.svg";
import styled from "styled-components";
import {ButtonContainer} from "./Button";
import {getLogin,getLoginInfo} from "./data";


export default class Navbar extends Component{
    render(){
        return(
         <NavWrapper className="navbar navbar-expand-sm navbar-dark px-sm-5">
            <Link to="/">
                <img src={logo} alt="store" className="navbar-brand"/>
            </Link>
            <ul className="navbar-nav align-items-center">
                <li className="nav-item ml-5">
                    <Link to="/" className="nav-link">
                    <font color="#0d47a1">Tasks</font>
                    </Link>
                </li>
            </ul>
            <div className="ml-auto navbar-nav">
            <Link to="/task">
                <ButtonContainer>
                    My Tasks
                </ButtonContainer>
            </Link>
            <Link to="/login">
                <ButtonContainer>
                    {getLogin()? "SignOut":"Login/Signup"}
                </ButtonContainer>
            </Link>
            </div>
         </NavWrapper>
        );
    }
}


    const NavWrapper=styled.nav`
    .nav-link{
        color: var(--mainWhite)!important;
        font-size: 1.3rem;
        text-transform: capitalize;
        }
    `;
