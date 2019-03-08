import React,{Component } from 'react'
import {ProductConsumer} from "./Context";
import {Link} from "react-router-dom";
import {ButtonContainer} from "./Button";
import {Fragment} from "react";
var abc="Hello"+"<br></br>"+" Hello";
export default class Services extends Component{
    render(){
        return(
            <ProductConsumer>
            {value=>{
                 const{services,requiredServices}=value.detailProduct;
                return(
                    <div>
                    <h2>
                    Information about Services are below:    
                    </h2>
                    <h3>
                    Needed services:
                    </h3>
                    <h4>
                    {requiredServices.map((item, key) => {
                            return <Fragment key={key}>{item}<br/></Fragment>
                    })}
                    </h4>
                    <h4>Currently information about services are below:</h4>
                    <h4>
                    {services.map((item, key) => {
                            return <Fragment key={key}>{item}<br/></Fragment>
                    })}
                    </h4>
                    <center>
                    <Link to="/details">
                    <ButtonContainer>
                        Back to Details
                    </ButtonContainer>
                    </Link>
                    </center>
                    </div>
                );
            }

            }
            </ProductConsumer>
        );
    }
}