const $ = document

// login selectors
const loginWrapper = $.querySelector('.wrapper')
const registerWrapper = $.querySelector('.register-wrapper')
const close = $.querySelector('.close')
const closeRegister = $.querySelector('.close-register')
const login = $.querySelector('#login')
const registerBtn = $.querySelector('.register')
const register = $.querySelector('#register')
const backLoginBtn = $.querySelector('.back-to-login')
const regBtn = $.querySelector('.register-btn')
const logingBtn = $.querySelector('.loginbtn')


// otp selectors
const otpSuccessWrapper = $.querySelector('.otp-success-wrapper')
const otpSuccess = $.querySelector('#otpSuccess')
const otpWrapper = $.querySelector('.otp-wrapper')
const sendOtpBtn = $.querySelector('.otp')
const otp = $.querySelector('#otp')
const otpInputs = $.querySelector('.otp-input')

// cart icon and section
const cartIcon1 = document.querySelector('.cart-icon')
const cartSection1 = document.querySelector('.cart-sidebar')
const cartWrapper1 = document.querySelector('.cart-sidebar .wrapper')

// Selecting the buttons
const categLeft = document.getElementById('left');
const categRight = document.getElementById('right');

// Function to toggle display for elements with the given class name
function toggleDisplay(className) {
    const elements = document.getElementsByClassName(className);
    for (let i = 0; i < elements.length; i++) {
        if (elements[i].style.display === 'none') {
            elements[i].style.display = 'flex';
        } else {
            elements[i].style.display = 'none';
        }
    }
}

// Adding event listeners to buttons
categLeft.addEventListener('click', () => {
    toggleDisplay('ctegory-card');
});

categRight.addEventListener('click', () => {
    toggleDisplay('ctegory-card');
});
// show cart sidebar
cartIcon1.addEventListener('click', () => {
   if (flag==true){ cartSection1.classList.remove('hidden')
    cartWrapper1.classList.remove('hidden')}
    else{alert('لطفا وارد شوید'   )}
})
cartWrapper1.addEventListener('click', (e) => {
    e.target.classList.add('hidden')
    cartSection1.classList.add('hidden')
})



// otp 

otpInputs.addEventListener('input', (e) => {
    const target = e.target
    const val = target.value;

    if (isNaN(val)) {
        target.value = "";
        return;
    }

    if (val != "") {
        const next = target.nextElementSibling;
        if (next) {
            next.focus();
        }
    }
})
otpInputs.addEventListener("keyup", function (e) {
    const target = e.target;
    const key = e.key.toLowerCase();

    if (key == "backspace" || key == "delete") {
        target.value = "";
        const prev = target.previousElementSibling;
        if (prev) {
            prev.focus();
        }
        return;
    }
});
// open login

function openLogin() {
    if (login.classList.contains('hidden')) {
        login.classList.add('show')
        login.classList.remove('hidden')
    }
}

// close login

loginWrapper.addEventListener('click', () => {
    login.classList.add('hidden')
    login.classList.remove('show')
})
registerWrapper.addEventListener('click', () => {
    register.classList.add('hidden')
    register.classList.remove('show')
})
close.addEventListener('click', () => {
    login.classList.add('hidden')
    login.classList.remove('show')
})
closeRegister.addEventListener('click', () => {
    register.classList.add('hidden')
    register.classList.remove('show')
})
registerBtn.addEventListener('click', () => {
    register.classList.remove('hidden')
    register.classList.add('show')
    login.classList.add('hidden')
    login.classList.remove('show')

})
regBtn.addEventListener('click', (e) => {
    e.preventDefault()
    //otp.classList.add('show')
    register.classList.add('hidden')
    register.classList.remove('show')
})
otpWrapper.addEventListener('click', () => {
    otp.classList.remove('show')
    otp.classList.add('hidden')

})

otpSuccessWrapper.addEventListener('click', () => {
    otpSuccess.classList.add('hidden')
    otpSuccess.classList.remove('show')
})
backLoginBtn.addEventListener('click', () => {
    login.classList.add('show')
    otpSuccess.classList.add('hidden')
    otpSuccess.classList.remove('show')

})
sendOtpBtn.addEventListener('click', () => {
    otp.classList.add('hidden')
    otp.classList.remove('show')
    otpSuccess.classList.remove('hidden')
    otpSuccess.classList.add('show')
})