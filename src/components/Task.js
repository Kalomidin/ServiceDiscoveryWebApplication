import React,{Component } from 'react'
import {ProductConsumer} from "./Context";
import {ButtonContainer} from "./Button";
import {Link} from "react-router-dom";

export default class Cart extends Component{
    render(){
        return(
            <div>
                <h1>
                    Below mentioned tasks in progress:<br/>
                </h1>
            <ProductConsumer>
            {value=>{
                var i=0;
                var j=0;
                return value.products.map(product => {
                    console.log(j+" and "+i+" and");
                    i++;
                    if(product.inCart){
                        j++;
                       return(
                           <h3>
                              {product.title}<br/>
                           </h3>
                       );
                   }
                   else if(j===0 && i===value.products.length){
                       return (
                            <h3>
                                <font color="#f44336">Task list is empty</font><br/>
                            </h3>
                       
                       );
                   }
                })
            }
            }
            </ProductConsumer>
            <center>
            <Link to="/">
            <ButtonContainer>
                Back to Menu
            </ButtonContainer>
            </Link>
            </center>
            </div>
        );
    }
}