const container = document.getElementById("container");
const logoutButton=document.getElementById("logoutButton");

const loadUserHandler = () =>{
    fetch('https://fakestoreapi.com/users')
            .then(res=>res.json())
            .then(json=>renderUsers(json))
} 

const renderUsers = (datas) =>{
    console.log(datas);
    datas.forEach(data => {
        container.innerHTML+=`
        <div id="card">
            <h3>${data.id}</h3>
            <div>
                <p>Name:</p>
                <span>${data.name.firstname} ${data.name.lastname}</span>
            </div>
            <div>
                <p>Username:</p>
                <span>${data.username}</span>
            </div>
            <div>
                <p>Phone:</p>
                <span>${data.phone}</span>
            </div>
            <div>
                <p>Address:</p>
                <span>${data.address.city}-${data.address.street}-${data.address.zipcode}</span>
            </div>
     `
    });
    
}

const logoutHandler=()=>{
    document.cookie = "token=; max-age=0; path=/";
    location.assign("index.html")
}

document.addEventListener("DOMContentLoaded", loadUserHandler);  
logoutButton.addEventListener("click", logoutHandler);

