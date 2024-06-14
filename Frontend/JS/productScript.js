axios.defaults.baseURL = 'http://127.0.0.1:8000/shop/';

const reviewForm = document.getElementById('review-form');
const ratingStars = document.querySelectorAll('.star');

const longDescription = document.querySelector('.long-desc')
const review = document.querySelector('.reviews')
const proFeatures = document.querySelector('.product-features')
const tabs = document.querySelectorAll('.tab')
const colorSpans = document.querySelectorAll('.color-container .color');
const productPriceElement = document.querySelector('.product-price');


const cartIcon = document.querySelector('.cart-icon')
const cartSection = document.querySelector('.cart-sidebar')
const cartWrapper = document.querySelector('.cart-sidebar .wrapper')
const itemCount = document.querySelector('.item-count span')

const trash = document.querySelectorAll('.trash')
const cartProduct = document.querySelector('.cart-product')
const cartProductItem = document.querySelector('.cart-product-item')
const cartProductItems = document.querySelectorAll('.cart-product-item')


const addToCartBtn = document.querySelector('#addToCart')
const countCircle = document.querySelector('.count-circle')


// increase count of products in cart btn
addToCartBtn.addEventListener('click', () => {
    if (flag == true){
        const count = Number(countCircle.innerText)
        itemCount.innerText = Number(itemCount.innerText) + 1
        countCircle.innerText = count + 1
        cartProduct.innerHTML += `
        <div class="cart-product-item">
        ${cartProductItem.innerHTML} 
        </div> `
        const cartProducts = [...cartProduct.children]
        cartProducts.forEach(item => {
            const trash = item.lastElementChild
            trash.addEventListener('click', () => {
                const count = Number(countCircle.innerText)
                itemCount.innerText = itemCount.innerText - 1
                countCircle.innerText = count - 1
                const parentElem = trash.parentElement
                parentElem.remove()
            })
        })
}})


// trash products
trash.forEach(tr => {
    tr.addEventListener('click', (e) => {
        const count = Number(countCircle.innerText)
        countCircle.innerText = count - 1
        itemCount.innerText = itemCount.innerText - 1
        const parentElem = tr.parentElement
        parentElem.remove()
    })
})



// show cart sidebar
cartIcon.addEventListener('click', () => {
    cartSection.classList.remove('hidden')
    cartWrapper.classList.remove('hidden')
})
cartWrapper.addEventListener('click', (e) => {
    e.target.classList.add('hidden')
    cartSection.classList.add('hidden')
})



// change price
colorSpans.forEach(span => {
    span.addEventListener('click', () => {

        const selectedColor = span.classList[1];
        switch (selectedColor) {
            case 'gray':
                productPriceElement.textContent = '$1999.00';

                break;
            case 'blue':
                productPriceElement.textContent = '$1390.99';

                break;
            case 'black':
                productPriceElement.textContent = '$1490.99';

                break;
            case 'purple':
                productPriceElement.textContent = '$1590.99';

                break;
            default:
                break;
        }


        colorSpans.forEach(otherSpan => {
            if (otherSpan.classList.contains('color-selected')) {
                otherSpan.classList.remove('color-selected');
            }
        });

        span.classList.add('color-selected');
    });
});







// change tabs in product details

const tabsArray = [...tabs];

tabsArray.forEach((tab) => {
    tab.addEventListener('click', (e) => {
        const clickedText = e.target.innerText;

        tab.classList.add('selected');


        [longDescription, proFeatures].forEach(el => el.classList.add('hidden'));

        switch (clickedText) {
            case 'Descriptions':
                longDescription.classList.remove('hidden');
                break;
            case 'Additional Information':
                proFeatures.classList.remove('hidden');
                break;
            case 'Reviews':
                review.classList.remove('hidden');
                break;
        }

        if (!e.target.classList.contains('hidden')) {
            e.target.classList.remove('selected');
        }
    });
});




// rating product

let selectedRating = 0;

ratingStars.forEach(star => {
    star.addEventListener('click', () => {
        const rating = parseInt(star.dataset.rating);
        selectedRating = rating;
        console.log(selectedRating);
        updateStarRatingDisplay();
    });
});


// submit review
reviewForm.addEventListener('submit', (event) => {
    event.preventDefault();

    const reviewTitle = document.getElementById('review-title').value;
    const reviewContent = document.getElementById('review-content').value;

    const reviewData = {
        title: reviewTitle,
        rating: selectedRating,
        content: reviewContent
    };

    console.log('Review submitted:', reviewData);
});

function updateStarRatingDisplay() {
    ratingStars.forEach(star => {
        const rating = parseInt(star.dataset.rating);
        if (rating <= selectedRating) {
            star.classList.add('selectedStar');
        } else {
            star.classList.remove('selectedStar');
        }
    });
}


// Get product detail
function get_product_detail(){
    axios.get('api/product/')
    .then(
        Response => {
            console.log(Response.data)
            data = Response.data[3]
            set_product_value(data)            
        }
    )
    .catch(
        error => {
            console.log(error)
        }
    )
}

function set_product_value(data){
    const pro_image = document.querySelector('.pro-img')
    const pro_description_sec = document.querySelector('.pro-description-section')
    const long_desc = document.querySelector('.long-desc')
    const product_features = document.querySelector('.product-features')
    console.log(pro_image)
    console.log(pro_description_sec)
    pro_description_sec.innerHTML = `
    <div class="pro-name">
    <h1>${data['name']}</h1>
    <span class="stock-tag">In stock</span>
</div>
<div class="stars">
    <span class="star" data-rating="1">
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
                d="M8.36064 2.72601C9.03121 1.31334 10.9687 1.31333 11.6393 2.72601L12.7982 5.16749C13.0645 5.72846 13.5792 6.11728 14.1746 6.20724L16.7661 6.59875C18.2655 6.82528 18.8642 8.74112 17.7792 9.84074L15.9041 11.7412C15.4732 12.1778 15.2766 12.807 15.3783 13.4235L15.821 16.107C16.0771 17.6596 14.5096 18.8437 13.1685 18.1106L10.8506 16.8437C10.3181 16.5526 9.68184 16.5526 9.14927 16.8437L6.83143 18.1106C5.49029 18.8437 3.92281 17.6596 4.17895 16.107L4.62162 13.4235C4.72333 12.807 4.52672 12.1778 4.09586 11.7412L2.22069 9.84074C1.13568 8.74113 1.7344 6.82528 3.23384 6.59875L5.82527 6.20724C6.4207 6.11728 6.93543 5.72846 7.20172 5.16749L8.36064 2.72601Z"
                stroke="#101316" stroke-opacity="0.8" stroke-linejoin="round" />
        </svg>
    </span>
    <span class="star" data-rating="2">
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
                d="M8.36064 2.72601C9.03121 1.31334 10.9687 1.31333 11.6393 2.72601L12.7982 5.16749C13.0645 5.72846 13.5792 6.11728 14.1746 6.20724L16.7661 6.59875C18.2655 6.82528 18.8642 8.74112 17.7792 9.84074L15.9041 11.7412C15.4732 12.1778 15.2766 12.807 15.3783 13.4235L15.821 16.107C16.0771 17.6596 14.5096 18.8437 13.1685 18.1106L10.8506 16.8437C10.3181 16.5526 9.68184 16.5526 9.14927 16.8437L6.83143 18.1106C5.49029 18.8437 3.92281 17.6596 4.17895 16.107L4.62162 13.4235C4.72333 12.807 4.52672 12.1778 4.09586 11.7412L2.22069 9.84074C1.13568 8.74113 1.7344 6.82528 3.23384 6.59875L5.82527 6.20724C6.4207 6.11728 6.93543 5.72846 7.20172 5.16749L8.36064 2.72601Z"
                stroke="#101316" stroke-opacity="0.8" stroke-linejoin="round" />
        </svg>
    </span>
    <span class="star" data-rating="3">
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
                d="M8.36064 2.72601C9.03121 1.31334 10.9687 1.31333 11.6393 2.72601L12.7982 5.16749C13.0645 5.72846 13.5792 6.11728 14.1746 6.20724L16.7661 6.59875C18.2655 6.82528 18.8642 8.74112 17.7792 9.84074L15.9041 11.7412C15.4732 12.1778 15.2766 12.807 15.3783 13.4235L15.821 16.107C16.0771 17.6596 14.5096 18.8437 13.1685 18.1106L10.8506 16.8437C10.3181 16.5526 9.68184 16.5526 9.14927 16.8437L6.83143 18.1106C5.49029 18.8437 3.92281 17.6596 4.17895 16.107L4.62162 13.4235C4.72333 12.807 4.52672 12.1778 4.09586 11.7412L2.22069 9.84074C1.13568 8.74113 1.7344 6.82528 3.23384 6.59875L5.82527 6.20724C6.4207 6.11728 6.93543 5.72846 7.20172 5.16749L8.36064 2.72601Z"
                stroke="#101316" stroke-opacity="0.8" stroke-linejoin="round" />
        </svg>
    </span>
    <span class="star" data-rating="4">
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
                d="M8.36064 2.72601C9.03121 1.31334 10.9687 1.31333 11.6393 2.72601L12.7982 5.16749C13.0645 5.72846 13.5792 6.11728 14.1746 6.20724L16.7661 6.59875C18.2655 6.82528 18.8642 8.74112 17.7792 9.84074L15.9041 11.7412C15.4732 12.1778 15.2766 12.807 15.3783 13.4235L15.821 16.107C16.0771 17.6596 14.5096 18.8437 13.1685 18.1106L10.8506 16.8437C10.3181 16.5526 9.68184 16.5526 9.14927 16.8437L6.83143 18.1106C5.49029 18.8437 3.92281 17.6596 4.17895 16.107L4.62162 13.4235C4.72333 12.807 4.52672 12.1778 4.09586 11.7412L2.22069 9.84074C1.13568 8.74113 1.7344 6.82528 3.23384 6.59875L5.82527 6.20724C6.4207 6.11728 6.93543 5.72846 7.20172 5.16749L8.36064 2.72601Z"
                stroke="#101316" stroke-opacity="0.8" stroke-linejoin="round" />
        </svg>
    </span>
    <span class="star" data-rating="5">
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
                d="M8.36064 2.72601C9.03121 1.31334 10.9687 1.31333 11.6393 2.72601L12.7982 5.16749C13.0645 5.72846 13.5792 6.11728 14.1746 6.20724L16.7661 6.59875C18.2655 6.82528 18.8642 8.74112 17.7792 9.84074L15.9041 11.7412C15.4732 12.1778 15.2766 12.807 15.3783 13.4235L15.821 16.107C16.0771 17.6596 14.5096 18.8437 13.1685 18.1106L10.8506 16.8437C10.3181 16.5526 9.68184 16.5526 9.14927 16.8437L6.83143 18.1106C5.49029 18.8437 3.92281 17.6596 4.17895 16.107L4.62162 13.4235C4.72333 12.807 4.52672 12.1778 4.09586 11.7412L2.22069 9.84074C1.13568 8.74113 1.7344 6.82528 3.23384 6.59875L5.82527 6.20724C6.4207 6.11728 6.93543 5.72846 7.20172 5.16749L8.36064 2.72601Z"
                stroke="#101316" stroke-opacity="0.8" stroke-linejoin="round" />
        </svg>
    </span>
    <span>5.0 (121 Reviews)</span>
</div>
<p class="product-price">${data['price']}</p>
<p class="pro-description">
    ${data['description']}
</p>
<h4>Color</h4>
<div class="color-container">
    <span class="color gray"></span>
    <span class="color blue"></span>
    <span class="color black"></span>
    <span class="color purple"></span>
</div>
<div class="cart-btn-container">
    <div class="count-btn">
        <span>-</span>
        <span>1</span>
        <span>+</span>
    </div>
    <button id="addToCart" class="btn cart-btn">Add to Cart</button>
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
            d="M12.765 4.70229L12 5.52422L11.235 4.70229C9.12233 2.43257 5.69709 2.43257 3.58447 4.70229C1.47184 6.972 1.47184 10.6519 3.58447 12.9217L10.4699 20.3191C11.315 21.227 12.685 21.227 13.5301 20.3191L20.4155 12.9217C22.5282 10.6519 22.5282 6.972 20.4155 4.70229C18.3029 2.43257 14.8777 2.43257 12.765 4.70229Z"
            stroke="#101316" stroke-width="1.5" stroke-linejoin="round" />
    </svg>
</div>
<h3 style="font-weight: bold;">Share</h3>
<div class="share-section">
    <span>
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
                d="M18 3H15C12.2386 3 10 5.23858 10 8V10H6V14H10V21H14V14H18V10H14V8C14 7.44772 14.4477 7 15 7H18V3Z"
                fill="#101316" />
        </svg>

    </span>
    <span>
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
                d="M15.2859 4C13.1821 4 11.4766 5.79086 11.4766 8C11.4766 8.33382 11.5155 8.65809 11.5889 8.96808C9.56599 8.96808 6.51902 8.55908 3.97432 6.00961C3.63593 5.67059 3.01196 5.89726 3.03543 6.37567C3.41256 14.0627 6.70465 16.3049 8.39998 16.4444C7.30523 17.5257 5.71498 18.3791 4.11477 18.7622C3.69244 18.8633 3.58811 19.3256 4.00108 19.4599C5.14611 19.8323 6.78504 19.9758 7.66723 20C13.9081 20 18.9805 14.7471 19.0934 8.22229C19.9127 7.68945 20.4376 6.5325 20.7325 5.71291C20.8043 5.5133 20.4772 5.28073 20.2813 5.36226C19.6693 5.61708 18.8922 5.67749 18.2303 5.46181C17.5316 4.56927 16.4721 4 15.2859 4Z"
                fill="#101316" />
        </svg>

    </span>
    <span>
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path fill-rule="evenodd" clip-rule="evenodd"
                d="M7 2C4.23858 2 2 4.23858 2 7V17C2 19.7614 4.23858 22 7 22H17C19.7614 22 22 19.7614 22 17V7C22 4.23858 19.7614 2 17 2H7ZM18 7C18.5523 7 19 6.55228 19 6C19 5.44772 18.5523 5 18 5C17.4477 5 17 5.44772 17 6C17 6.55228 17.4477 7 18 7ZM17 12C17 14.7614 14.7614 17 12 17C9.23858 17 7 14.7614 7 12C7 9.23858 9.23858 7 12 7C14.7614 7 17 9.23858 17 12ZM12 15C13.6569 15 15 13.6569 15 12C15 10.3431 13.6569 9 12 9C10.3431 9 9 10.3431 9 12C9 13.6569 10.3431 15 12 15Z"
                fill="#101316" />
        </svg>

    </span>
</div>
</div>
    `
    pro_image.innerHTML =  `
            <div class="main-picture-container">
                <img style="width:346px;height:420px" src="${data['images'][0]['image_url']}" alt="">
            </div>
            <div class="thumb-pic">
            <span>
                <img style="width:71px;height:86px" src="${data['images'][0]['image_url']}" alt="">
            </span>
            <span>
                <img style="width:71px;height:86px" src="${data['images'][0]['image_url']}" alt="">
            </span>
            <span>
                <img style="width:71px;height:86px" src="${data['images'][0]['image_url']}" alt="">
            </span>
            <span>
                 <img style="width:71px;height:86px" src="${data['images'][0]['image_url']}" alt="">
            </span>
    `
    long_desc.innerHTML = `
    ${data['description']}
    `
    product_features.innerHTML = `
    ${data['more_description']}
    `
}
get_product_detail()

