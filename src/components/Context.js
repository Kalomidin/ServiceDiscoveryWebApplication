import React,{Component } from "react";
import {storeProducts, detailProduct} from "../data";
import axios from 'axios' //this is to make http requests


const ProductContext=React.createContext();

class ProductProvider extends Component{
    state={
        products: [],
        detailProduct: detailProduct,
        cart: [],
        services:""
    };
    componentDidMount(){
        this.setProducts();
    }
    setProducts=()=>{
        let tempProducts=[];
        storeProducts.forEach(item =>{
            const singleItem={...item};
            tempProducts=[...tempProducts,singleItem];
        });
        this.setState(()=>{
            return {products:tempProducts};
        });
    }
    handleDetails=id=>{
        const product=this.state.products.find(item => item.id===id);
        this.setState(()=>{
            return {detailProduct:product};
    })}
    addToCart=id=>{
    const product=this.state.products.find(item => item.id===id);
    if(product.inCart===false){
        product.inCart=true;
        product.failConnecting=false;
        //product.inProgress=true;
        var i=0;
        for(i=0;i<product.urls.length;i++){
            axios({
                method:"post",
                url: product.urls[i],
                data: product.mes[i],
            })
            .then(message=>{
                console.log("Message for on: "+message.data);
            })
            .catch(err=>console.log(err))
        }
    }
    else if(product.inCart===true){
        //product.inProgress=true;
        product.inCart=false;
        product.failConnecting=false;
        var i=0;
        for(i=0;i<product.urls.length;i++){
            axios({
                method:"post",
                url: product.urls[i],
                data: "{\"on\":false}",
            })
            .then(message=>{
                console.log("Message for off: "+message.data);
            })
            .catch(err=>console.log(err))
        }
    }
  
    this.setState(()=>{
        return {detailProduct:product};
    });
    }
    setServices=id=>{
        const product=this.state.products.find(item => item.id===id);
        const serviceSearcherUrl="http://localhost:7070/";//connect to servicesearcher
        axios({
            method: 'post',
            url:serviceSearcherUrl,
            data:id, //send id to get corresponding services
        })
        .then(data=>{ console.log(data.data);//message from servicesearcher
            product.requiredServices=data.data.split(",");
            const ServiceRegisterUrl="http://localhost:7171";// connect to serviceregistry
            axios({
                method: 'post',
                url:ServiceRegisterUrl,
                data:data.data,//send data you got from serviceregistry to get corresponding urls
            })
            .then(message=>{ //message from serviceregistry
                console.log("Message is: "+message.data);
                var addrs=message.data.split(",");
                var i=0;
                for(i=0;i<addrs.length;i++){
                    var addr=addrs[i].split(" ");
                    if(addr[1]==0){
                        product.services[i]=addr[0]+" service is not available";
                    }
                    else{
                        product.serviceId[i]=addr[0];
                        product.urls[i]=addr[1];
                        product.services[i]=addr[0]+" service is available";
                    }
                }
                //connect to serviceSelector
                if(product.serviceId.length==0){
                    console.log("No service Available to use ServiceSelector service\n");
                    return;
                }
                const ServiceSelectorUrl="http://localhost:7272";
                var totalMes=(new Date())+"|"+id+"|";
                var j=0;
                totalMes+=product.serviceId[0];
                for(j=1;j<product.serviceId.length;j++){
                    totalMes+=","+product.serviceId[j];
                }
                console.log("Message to serviceSelector is: "+totalMes);
                axios({
                    method:"post",
                    url: ServiceSelectorUrl,
                    data:totalMes,
                })
                .then(message=>{
                    console.log("Instructions to be done: "+ message.data)
                    var i=0;
                    if(product.serviceId.length==1){
                        product.mes[0]=message.data.split("|")[1];
                    }
                    else{
                        for( i=0;i<message.data.split(" ");i++){
                            product.mes[i]=message.data.split(",")[i].split("|")[1];
                        }
                    }
                    console.log("Instr: "+product.mes);
                    console.log("Urls: "+product.urls)
                })//message from serviceselector

                .catch(err=>console.log("Error while reaching ServiceSelector: "+err))
            })
            .catch(err=>console.log("Error while reaching ServiceRegister: "+err))
        })
        .catch(err=>console.log("Caught error while reaching ServiceSearcher: "+err))
        this.setState(()=>{
            return {detailProduct:product}
        })
    }
    render(){ 
        return (<ProductContext.Provider value={{
            ...this.state,
            handleDetails:this.handleDetails,
            addToCart:this.addToCart,
            setServices: this.setServices,
        }}>
        {this.props.children}
        </ProductContext.Provider>
            
    );
}
}
const ProductConsumer=ProductContext.Consumer;
export {ProductProvider,ProductConsumer}