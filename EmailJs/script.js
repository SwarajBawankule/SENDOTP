const fname = document.getElementById('fname');
const phone = document.getElementById('phone');
const uname = document.getElementById('uname');
const email = document.getElementById('email');
const password = document.getElementById('password');
const confirmpassword = document.getElementById('cpassword');
const su1 = document.getElementById('su1');
const form = document.getElementById('btn');
const otp = document.getElementById('otp');
const checking = document.getElementById('checking');
const otpcheking = document.getElementById('otpcheking');
const emailverified = document.getElementsByClassName('emailverified')[0];
const invalid = document.getElementById('invalid');
const provideemail = document.getElementById("provideemail");
const btn1 = document.getElementById("btn1");

form.addEventListener('click', e => {
    e.preventDefault();
    const send = otp.classList.toggle(true);
    if (email.value !== "") {
        if (send) {
            provideemail.style.display = 'none';
            sendMail();
            otp.style.display = "block";
        } else {
            otp.style.display = "none";
        }
    } else {
        provideemail.style.display = 'block';
    }
});

function genotp() {
    let otp = Math.trunc(Math.random() * 10000);
    if (otp > 999 && otp < 10000) {
        console.log(otp);
        localStorage.setItem("otp", otp);
        return otp;
    } else {
        return genotp();
    }
}

// send otp email
function sendMail() {
    var param = {
        email: email.value,
        message: genotp(),
    };
    const serviceid = 'service_qok59oj'; // replace with your EmailJS service ID
    const templeteid = 'template_gwzytrl'; // replace with your EmailJS template ID

    emailjs.send(serviceid, templeteid, param)
        .then(res => {
            alert("Your message sent successfully.");
            console.log(res);
        }).catch(error => console.log(error));
}

su1.addEventListener('click', e => {
    e.preventDefault();
    const check = localStorage.getItem("otp");
    console.log(check);
    if (checking.value === check) {
        emailverified.style.display = 'block';
        buttonSubmit();
        btn1.style.backgroundColor = "blue";
        otp.style.display = "none";
    } else {
        invalid.style.display = 'block';
    }
});

btn1.addEventListener("click", e => {
    e.preventDefault();
    buttonSubmit();
});

function buttonSubmit() {
    if (fname.value !== "" && phone.value !== "" && uname.value !== "" && email.value !== "" && password.value !== "" && confirmpassword.value !== "") {
        if (emailverified.style.display === "block") {
            console.log("hii");
            if (password.value === confirmpassword.value && password.value !== "" && confirmpassword.value !== "") {
                btn1.style.cursor = "pointer";
                btn1.style.backgroundColor = "blue";
            } else {
                btn1.style.cursor = "no-drop";
                btn1.style.backgroundColor = "#979A9A";
            }
        } else {
            alert("please verify your email");
        }
    } else {
        alert("fill all blocks");
        btn1.style.cursor = "no-drop";
        btn1.style.backgroundColor = "#979A9A";
    }
}
