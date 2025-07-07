const loginIcon= document.getElementById("logbutt");
const dashboard= document.getElementById("dashbutt");
const products=document.getElementById("products");
const searchButton=document.getElementById("searchButton");
const selectItems=document.querySelectorAll("li");
let selectedItem="all";
let search= document.getElementById("inputBox").value.trim().toLowerCase();
let datas=null;

const init= ()=>{
    if(getCookie()){
        console.log("find")
        loginIcon.style.display= "none"
    } else{
        dashboard.style.display= "none"
    }

    fetch('https://fakestoreapi.com/products')
            .then(res=>res.json())
            .then(json=>setData(json))
}


const loader = document.getElementById('loader');

loader.classList.remove('hidden');


setTimeout(() => {
  loader.classList.add('hidden');
}, 800);

const setData=(data)=>{
    datas=data;
    showProduct(data);
}

const showProduct = (data)=>{       
    products.innerHTML=""
    console.log(data);
    data.forEach(element => {
        products.innerHTML+=`
        <div>  
            <img alt=${element.title} src=${element.image} />
            <h4>${element.title}</h4>
            <div id="price">
                <p>$ ${element.price} </p>
                 <button>
                    buy
                    <i class="fa-solid fa-cart-shopping" </i>
                 </button>
            </div>
            <div id="rate">
                <i class="fa-solid fa-star"</i>
                <span>${element.rating.rate}</span>
            </div> 
            <div id="count">
                <i class="fa-solid fa-user"</i>
                <span>${element.rating.count}</span>
            </div> 
        </div>
        `
    });

}

const getCookie= ()=>{
    const cookie = document.cookie;

    if(cookie){
        const token = cookie.split("=")[1];
        return token;
    } else{
        return false;
    }

}

const searchHandler=()=>{
    search= document.getElementById("inputBox").value.trim().toLowerCase();
    if(!search){
        showProduct(datas);
        return
    }

    const searched = datas.filter(element => {
        if(selectedItem==="all"){
           return element.title.toLowerCase().includes(search);
        } else{
         return element.title.toLowerCase().includes(search) && element.category.toLowerCase().includes(selectedItem);
        }});
    showProduct(searched);
}

const selectHandler=(element)=>{
    const item=element.target.innerText.toLowerCase();
    selectedItem=item;
    console.log(item);

    selectItems.forEach(element =>{
        if(element.innerText.toLowerCase()===item){
            element.className ="selected";
        } else{
            element.className ="";
        }
    });
    
    if(search){
        if(item==="all"){
            showProduct(datas);
            return;
        }
        const selected = datas.filter(element => {
            element.category.toLowerCase()===(item);
            });
        showProduct(selected);
    } else{
        if(item==="all"){
            searchHandler();
            return;
        }
        const selected = datas.filter(element => {
            return element.category.toLowerCase() === item && element.title.toLowerCase().includes(search);
            });
            console.log(selected);
        showProduct(selected);
    }
   
}






document.addEventListener("DOMContentLoaded", init);
searchButton.addEventListener("click", searchHandler);
selectItems.forEach(element => {
    element.addEventListener("click", selectHandler);
});