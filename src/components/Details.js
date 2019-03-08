import React,{Component } from 'react';
import {Link} from "react-router-dom";
import {ProductConsumer} from "./Context";
import {ButtonContainer} from "./Button";
import {getLogin, getLoginInfo} from "./data";
var service=false;
export default class Details extends Component{
    render(){
        return(
        <ProductConsumer>
            {value =>{
                const{id, img, info, title, inCart,services}=value.detailProduct;
                return(
                    <div className="container py-10">
                        <center>
                        <div className="col-10 mx-auto col-md-6 my-3">
                                <img src={img} className="img-fluid" alt="picture"/>
                            </div>
                            </center>
                            <div className="col-10 mx-auto text-center text-slanted text-blue my-5">
                                <h1>Task: {title}</h1>
                                <div className="d-flex justify-content-around ">
                                </div>
                                <p>
                                    {info}
                                </p>
                                <h2>
                                Click button below to see the List of Services Available:
                                </h2>
                                <Link to="/services">
                                <ButtonContainer>
                                Services
                                </ButtonContainer>
                                </Link>
                                <div className="d-flex justify-content-between ">
                                <Link to="/">
                                <ButtonContainer>
                                    Back to Tasks
                                </ButtonContainer>
                                </Link>
                                <ButtonContainer
                                    onClick={()=>{  
                                    value.addToCart(id);
                                    }}
                                    >
                                    {inCart?( 
                                    "In Progress"
                                    ): (
                                    "Start the Task"
                                    )}
                                </ButtonContainer>
                                </div>
                            </div>
                    </div>
                );
            }}
        </ProductConsumer>
        );
    }
}