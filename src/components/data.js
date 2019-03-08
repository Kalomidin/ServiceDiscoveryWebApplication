export const logininfo ={
    username:"",
    password:"",
    email:"",
}
export function setLoginInfo(username,password,email){
    logininfo.username=username;
    logininfo.password=password;
    logininfo.email=email;
}
export function getLoginInfo(){
    console.log(logininfo.username==="" || logininfo.password==="" || logininfo.email==="");
    if(logininfo.username==="" || logininfo.password==="" || logininfo.email==="")
        return false;
    return true;
}


const Login={
    username:"",
    password:"",
}
export function setLogin(username,password){
    Login.username=username;
    Login.password=password;
}
export function getLogin(){
    return (!(Login.username==="" || Login.password===""));
}


const Code={
    code:""
}
export function setCode(code){
    Code.code=code;
}
export function getCode(code){
    return Code.code;
}