import React,{Component } from 'react'
import {Link} from "react-router-dom";
import styled from "styled-components";
import {ProductConsumer} from "./Context";
import {storeProducts} from "../data";

export default class Product extends Component{
    render(){
            if(typeof(this.props.product)!='undefined'){
                const {id, title, img, price, inCart}=this.props.product;
            console.log(inCart);
            return(
            <ProductWrapper className="col-9  mx-auto col-md-6 col-lg-3 my-3">
                <div className="card">
                <ProductConsumer>
                    {(value)=>(
                        <div>
                            <div className="img-container p-5" onClick={()=>{
                            value.handleDetails(id);
                            value.setServices(id)}
                            }>
                            <Link to="/details">
                                <img src={img} alt="picture" className="card-img-top"/>
                            </Link>
                         </div>
                         <div className="cart-footer d-flex p-2">
                            <p className="align-self-center mb-1">{title}</p>
                         </div>
                         </div>)}
                </ProductConsumer>
                </div>
            </ProductWrapper>
        );
    }
    return (
        <dev>

        </dev>
    );
}
}




const ProductWrapper=styled.div`
    .card{
        height: 500px;
        width: 350px;
        transition: all 1s linear;
        background:#00ffd0;
        position: relative;
    }
    .cart-footer{
        border-top: transparent;
        transition: all 1s linear;
    }
    &:hover{
        .card{
            border: 0.4rem ;
            box-shadow: 2px 2px 5px 0px ; 
        }
        .cart-footer{
            background:#00ccff;
        }
    }
    .img-container{
        position: relative;

    }
    .img-container:hover .card-img-top{
        transform: scale(1.2);
        transition: all 1s linear;
    }

`;