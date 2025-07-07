const username= document.getElementById("username");
const password= document.getElementById("password");
const Button=document.querySelector("button");

const submitHandler = (event) =>{
    event.preventDefault();

    fetch('https://fakestoreapi.com/auth/login',{
        method:'POST',
        body:JSON.stringify({
            "username": "mor_2314",
            "password": "83r5^_"
        }),
        headers : {"Content-Type": "application/json"},
    })
        .then(res=>res.json())
        .then(json=>setToken(json.token))

};

const setToken= (token)=>{
    document.cookie=`token=${token}`;
    location.assign("index.html");
}

const getCookie= ()=>{
    const cookie = document.cookie;

    if(cookie){
        const token = cookie.split("=")[1];
        return token;
    } else{
        return false;
    }
};


const authHandler= ()=>{
    const url = location.href;
    const cookie = getCookie();
    if(cookie && url.includes("login") || !cookie && url.includes("dash")){
        location.assign("index.html");
    }
}

Button.addEventListener("click", submitHandler);
document.addEventListener("DOMContentLoaded", authHandler);

