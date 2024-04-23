var star = document.getElementsByClassName('star')

var numF = 2 


function remove() {
    let i = 0;
    while (i < 5) {
        star[i].className = "star";
        star[i].style.color = ''
        i++;
    }
}

function gfg(n){
    remove();
    for (let i = 0; i < n; i++){
        star[i].style.color = "yellow";
    }
    
    console.log('your rating is ', n,'/5');
}


function showLogin(){
    var coverDivs = document.getElementsByClassName("cover");
    var loginDiv = document.getElementsByClassName("div");

    for (var i=0; i<coverDivs.length; i+=1){
        coverDivs[i].style.display = 'block';
    }
    
    for (var i=0; i<loginDiv.length; i+=1){
        loginDiv[i].style.display = 'flex';
    }
 
}

function registerShow(){
    var loginDiv = document.getElementsByClassName("div");

    for (var i=0; i<loginDiv.length; i+=1){
        loginDiv[i].style.display = 'none';
    }

    var registerDiv = document.getElementsByClassName("rdiv");

    for (var i=0; i<loginDiv.length; i+=1){
        registerDiv[i].style.display = 'flex';
    }

}

function returnLogin(){
    var coverDivs = document.getElementsByClassName("cover");
    var loginDiv = document.getElementsByClassName("div");

    for (var i=0; i<coverDivs.length; i+=1){
        coverDivs[i].style.display = 'none';
    }
    
    for (var i=0; i<loginDiv.length; i+=1){
        loginDiv[i].style.display = 'none';
    }
}

function returnRegister(){
    var coverDivs = document.getElementsByClassName("cover");
    var registerDiv = document.getElementsByClassName("rdiv");

    for (var i=0; i<coverDivs.length; i+=1){
        coverDivs[i].style.display = 'none';
    }

    for (var i=0; i<registerDiv.length; i+=1){
        registerDiv[i].style.display = 'none';
    }

}

function changeTab1(){
    var cnt = document.getElementsByClassName("cntinforamtionproduct");
    var cnt2 = document.getElementsByClassName("cntinforamtionproduct2");
    var cnt3 = document.getElementsByClassName("cntinforamtionproduct3");

    cnt[0].style.display = 'flex';
    cnt2[0].style.display = 'none';
    cnt3[0].style.display = 'none';

}

function changeTab2(){
    var cnt = document.getElementsByClassName("cntinforamtionproduct");
    var cnt2 = document.getElementsByClassName("cntinforamtionproduct2");
    var cnt3 = document.getElementsByClassName("cntinforamtionproduct3");

    cnt[0].style.display = 'none';
    cnt2[0].style.display = 'flex';
    cnt3[0].style.display = 'none';

}

function changeTab3(){
    var cnt = document.getElementsByClassName("cntinforamtionproduct");
    var cnt2 = document.getElementsByClassName("cntinforamtionproduct2");
    var cnt3 = document.getElementsByClassName("cntinforamtionproduct3");

    cnt[0].style.display = 'none';
    cnt2[0].style.display = 'none';
    cnt3[0].style.display = 'flex';

}

function colorpriceChange(currentColor){
    var clr = document.getElementsByClassName('color1');
    var clr2 = document.getElementsByClassName('color2');
    var clr3 = document.getElementsByClassName('color3');
    var clr4 = document.getElementsByClassName('color4');

    var price = document.getElementsByClassName('price');


    clr[0].classList.remove('borderselected');
    clr2[0].classList.remove('borderselected');
    clr3[0].classList.remove('borderselected');
    clr4[0].classList.remove('borderselected');

    currentColor.classList.add('borderselected');

    if(currentColor == clr[0])
    {
        price[0].innerHTML = "<br>$1999.00<br>"
    }
    else if(currentColor == clr2[0])
    {
        price[0].innerHTML = "<br>$2999.00<br>"
    }
    else if(currentColor == clr3[0])
    {
        price[0].innerHTML = "<br>$3999.00<br>"
    }
    else if(currentColor == clr4[0])
    {
        price[0].innerHTML = "<br>$4999.00<br>"
    }

}


function incrementNumberShop(){
    var number = document.getElementById('numbershop');
    numF += 1;
    number.innerText = numF;

}

function minicartShow(){
    var cover = document.getElementsByClassName('cover');
    cover[0].style.display = 'block'
}

function removeItem(recycle){

    var itemToRemove = recycle.parentElement.parentElement;
    itemToRemove.remove();

    
}