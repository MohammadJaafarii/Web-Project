axios.defaults.baseURL = 'http://127.0.0.1:8000/shop/';
var flag = false 

//sign up process 
function RegisterRequest(){
    const username = document.getElementById('name').value;
    const email = document.getElementById('register-email').value;
    const password = document.getElementById('register-password').value;
    
    axios.post('signup/', {
        username,
        email,
        password
    })
    .then(Response => {
        console.log('ثبت نام با موفقیت انجام شد',Response)
        alert('با موفقیت ثبت نام شدید!')
    })
    .catch(error => {
        console.log('ثبت نام انجام نشد', error)
        alert(' ثبت نام انجام نشد! ')
    });
}

regBtn.onclick = RegisterRequest

//login process
function loginRequest(){
    const email = document.getElementById('email').value
    const password = document.getElementById('password').value

    axios.post('login/', {
        email,
        password
    })
    .then(Response => {
        console.log('ورود با موفقیت انجام شد', Response.data)
        flag = true
        alert('ورود با موفقیت انجام شد')
        login.classList.add('hidden')
        login.classList.remove('show')
    })
    .catch(error => {
        console.log('ورود انجام نشد', error)
        alert(' ورود انجام نشد')

    });

}

logingBtn.onclick = loginRequest


//fetch all category
function fetch_category(){
    axios.get('api/category/')
    .then(
        Response => {
            console.log(Response.data)
            data = Response.data
            add_category(data)
        }
    )
    .catch(error => {
        console.log('خطا در گرفتن دسته بندی ها ')
    })
}

function add_category(data){
   for(let i = 0; i < data.length; i++ ){
    const newCard = document.createElement('div');
    newCard.classList.add('ctegory-card');
    newCard.style.display = 'none'


    const newCnt = document.createElement('div');
    newCnt.classList.add('circle-container');
    
    // Optional: Customize card content
    const newCardImage = document.createElement('img');
    newCardImage.src = data[i].image_url; // Replace with your image path

    newCardImage.style.height = '120px';
    newCardImage.style.width = '100px';
    
    const newCardTitle = document.createElement('h5');
    newCardTitle.textContent = data[i].name; // Replace with your title
    
    newCnt.appendChild(newCardImage);
    newCard.appendChild(newCnt);
    newCard.appendChild(newCardTitle);
    
    const categoryList = document.querySelector('.category-list');
    categoryList.appendChild(newCard);
   }

}

fetch_category()


//fetch all product
function get_all_product(){
    axios.get('api/all-product/')
    .then(
        Response => {
            console.log(Response.data)
            image = Response.data[0]['product']['images']
            //console.log(image)
            data = Response.data
            add_top_selling_product(data)

        }
    )
    .catch(
        error => {
            console.log(error)
        }
    )

}

function add_top_selling_product(data){
    console.log(data)
    for(let i=0; i<data.length; i++){
        const container = document.getElementById('pc1');
        const container2 = document.getElementById('pc2');
        //const container2 = document.querySelector('#pc2');
        //console.log(container)
        //console.log(container2)
        // Create a new div element for the pro-card
        const newCard = document.createElement('div');
        newCard.classList.add('pro-card');

        // Set the inner HTML of the new pro-card
        newCard.innerHTML = `
            <div class="pro-img-container" style="    display: flex;align-items: center;justify-content: center;">
                <img src="${data[i]['product']['images'][i]['image_url']}" style="width:160px;height:190px;" alt="">
            </div>
            <div class="pro-details">
                <h4>${data[i]['product']['name']}</h4>
                <span>
                    <img src="/icons/Frame 1000001161.png" />
                </span>
                <p>${data[i]["product"]['price']}</p>
            </div>
        `;
        container.appendChild(newCard);

        // Append the new pro-card to the products-container
        //container2.appendChild(newCard);

    

       // container2.appendChild(newCard);
        
    }
}

get_all_product()

//get banners
function get_banners(){
    axios.get('api/all-banner/')
    .then(
        Response => {
            console.log(Response.data)
            data1 = Response.data[0]
            data2 = Response.data[1]

            update_banner1(data1)
            update_banner2(data2)

        }
    )
    .catch(
        error => {
            //console.log('بنرها دریافت نشد!')
            console.log(error)
        }
    )
}

function update_banner1(data1){
    main_text = document.querySelector('.main-text')
    main_title = document.querySelector('.main-title')
    pic = document.querySelector('.ellipse')
    pic.style.display = 'none'
    main_pic = document.querySelector('.main-pic')
    main_title.textContent = data1['description']
    main_pic.src = data1['image_url']
    main_pic.style.width = '570px'
    main_pic.style.height = '650px'
    

}
function update_banner2(data){
    banner = document.querySelector('.banner')
    console.log(banner)
    banner.style.backgroundImage  = `url("${data['image_url']}")`
    banner.innerHTML = ` 
        <h1 style="font-size: 24pt;color:black;">${data['name']}</h1>
        <p style="color:black;">${data['description']}</p>
        <button class="btn">Shop Now
        <svg width="20" height="15" viewBox="0 0 24 20" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M14 8L18 12M18 12L14 16M18 12L6 12" stroke="white" stroke-width="1.5" stroke-linecap="round"stroke-linejoin="round" />
        </svg>
    </button>`

}
get_banners()


