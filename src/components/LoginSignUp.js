import React, { Component } from 'react';
import '../App.css';
import {withRouter} from "react-router-dom";
import {Link} from "react-router-dom";
import {setLoginInfo,setLogin, getLogin, getLoginInfo, setCode} from "./data";
//import getLoginInfo from "./data";
import Navbar from "./Navbar";
import ProductsList from './ProductList';
import { Redirect } from 'react-router';

class Authorization extends Component {
  constructor (props){
  super(props);
  this.state={
    isLogin: true,
    isRegister:false,
    username:"",
    password:""
  };
}
onRegister=()=>{
  this.setState(()=>{
    return {isLogin:false,isRegister:true};
  });
}
onLogin=()=>{
  this.setState(()=>{
    return {isLogin:true,isRegister:false};
  });
}
  render() {
    return (
      <div className="root-container">
        <div className="box-container">
          <div className="box-controller">
            <div   className={"controller "+ (this.state.isLogin? "selected-controller":"")} onClick={this.onLogin.bind(this)}>
              Login
            </div>
            <div className={"controller "+ (this.state.isRegister? "selected-controller":"")} onClick={this.onRegister.bind(this)}>
              Register
            </div>
          </div>
          <div>
            {this.state.isLogin && <LoginBox/>}
            {this.state.isRegister && <RegisterBox/>}
          </div>
          </div>
        </div>  
    );
  }
}

export default Authorization;
class LoginBox extends  React.Component{
  constructor (props){
    super(props);
    this.state={
      error:"",
      username:"",
      password:"",
      redirect:false,
    };
  }
  setUsername=(user)=>{
    this.setState(
      {username:user.target.value}
    );
    this.clearError();
  }
  setPassword=(pswd)=>{
    this.setState(
      {password:pswd.target.value}
    );
    this.clearError();
  }
  clearError=()=>{
    this.setState({error:""});
  }
  submitLogin=()=>{
    var username=this.state.username;
    var password=this.state.password;

    var connection = new WebSocket('ws://127.0.0.1:8887');
        connection.onopen = function () {
            console.log('Connected!');
            connection.send("Login,"+username+","+password); // Send the message 
        };
               // Log errors
    connection.onerror = function (error) {
        console.log('WebSocket Error ' + error);
        };
        // Log messages from the server
        var message="";
        connection.onmessage = function (e) {
          var message=e.data;
          if(message==="Correct"){
            setLogin(username,password);
            console.log(getLogin());
            this.setState({
              redirect: true
            });
          }
          else if(message=="Incorrect"){
              this.setState(
                {error:"Usernma/Password is incorrect"}
              )
          }
        }.bind(this)

  }
   render(){
     if(this.state.redirect){
       return(
         <Redirect to="/"/>
       );
     }
     if(getLogin()){
      return(
        <Redirect to="/verify"/>
      )
    }
     else{
     return(
       <div className="inner-container">
       <center className="header">
          Login
       </center>
        <div className="box" >

        <div className="input-group">
          <label htmlFor="username"> Username</label>
          <input type="text" name="username" className="login-input" placeholder="Username" 
          onChange={this.setUsername.bind(this)}></input>
        </div>

        <div className="input-group">
          <label htmlFor="password" className="root-container"> Password</label>
          <input type="password" name="password" className="login-input" placeholder="Password" onChange={this.setPassword.bind(this)}
          ></input>
        </div>

      <center><button className="login-btn" type="button" onClick={this.submitLogin.bind(this)}> Login
        </button></center>
        <center><small className="danger-error">{this.state.error}</small></center>
        </div>
       </div>
     );
   }
  }
}
export class RegisterBox extends  React.Component{
    constructor (props){
        super(props);
        this.state={
          error:[],
          username:"",
          password:"",
          email:"",
          redirect: false,
        };
      }
  addError=(err,msg)=>{
    //console.log(this.state.error);
    this.setState((prevState)=>{
        return {error: [...prevState.error,{err,msg}]}; 
    })
  }
  clearError=(err)=>{
    let newArr=[];
    this.setState(()=>{
    for(let errs of this.state.error)
        if(err!==errs.err)
            newArr.push(errs);
    return {error: newArr};
    })
  }
  onUsernameChange=(e)=>{
      this.setState({username: e.target.value});
      this.clearError("username");
  }
  onPasswordChange=(e)=>{
    this.setState({password: e.target.value});
    this.clearError("password");
}
onEmailChange=(e)=>{
    this.setState({email: e.target.value});
    this.clearError("email");
}
submitAuth=()=>{
    if(this.state.username==="" || this.state.email==="" || this.state.password==="")
    {   if(this.state.username==="")
            this.addError("username","Username should not be empty");
        if(this.state.password==="")
            this.addError("password","Password should not be empty");
        if(this.state.email==="")
            this.addError("email","Email should not be empty");
    }
    else{
        var username=this.state.username;
        var password=this.state.password;
        var email=this.state.email;
        var connection = new WebSocket('ws://127.0.0.1:8887');
        connection.onopen = function () {
            console.log('Connected!');
            connection.send("Registration,"+username+","+email+","+password); // Send the message 'Ping' to the server
        };
               // Log errors
    connection.onerror = function (error) {
        console.log('WebSocket Error ' + error);
        };
        // Log messages from the server
        var message="";
        connection.onmessage = function (e) {
        console.log('Server: ' + e.data);
        message=e.data;
        if(message==="OK"){}
        else if(message.indexOf("my-app")>=0)
        {
       setLoginInfo(username,password,email);
       setCode(message);
       this.setState({
         redirect:true
       });
        }
        else if(message==="Incorrect Email Address"){
          this.addError("email","Incorrect Email Address");
        }
        else if(message=="Username already in use!")
        {
            this.addError("username","Username already in use!");
        }   
        else if(message=="Email aready exists!")
        {
            this.addError("email","Email already exists!");
        }
        }.bind(this);
}
}
   render(){
    let usernameErr = null,
    passwordErr = null,
    emailErr = null;
  //Loop and find which ones has the error
  for (let errs of this.state.error) {
    //Assign the validation error message 
    if (errs.err === "username") {
      usernameErr = errs.msg;
    }
    if (errs.err === "password") {
      passwordErr = errs.msg;
    }
    if (errs.err === "email") {
      emailErr = errs.msg;
    }
}     if(this.state.redirect){
      return (
        <Redirect to="/registerVerify"/>
      );
}
     return(
       <div className="inner-container">
       <center className="header">
          Register
       </center>
        <div className="box" >
        <div className="input-group">
          <label htmlFor="username"> Username</label>
          <input type="text" name="username" className="login-input"  placeholder="Username" onChange={this.onUsernameChange.bind(this)}></input>
          <small className="danger-error">{usernameErr?usernameErr:""}</small>
        </div>

        <div className="input-group">
          <label htmlFor="email"> Email</label>
          <input type="email" name="email" className="login-input" placeholder="Email" onChange={this.onEmailChange.bind(this)}></input>
          <small className="danger-error">{emailErr?emailErr:""}</small>
        </div>

        <div className="input-group">
          <label htmlFor="password"> Password</label>
          <input type="password" name="password" className="login-input" placeholder="Password" onChange={this.onPasswordChange.bind(this)}></input>
          <small className="danger-error">{passwordErr?passwordErr:""}</small>
        </div>
        <center >
          <button className="login-btn" onClick={this.submitAuth.bind(this)}>
            Register
          </button>
        </center>
        </div>
       </div>

     );
   }
}
