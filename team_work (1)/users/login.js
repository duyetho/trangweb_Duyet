const api = "https://61bc131bd8542f0017824588.mockapi.io/a/login";



// Cách 1
// function getInfo() {
// 	var username = document.getElementById('user').value;
// 	var password = document.getElementById('password').value;
//     // alert(username);
//     axios(`${api}`).then(res =>{
//         res.data.map(function(ele){
//             if(username == ele.username && password == ele.password) {
// 			alert(username + "bạn đã đăng nhập thành công!")
// 			window.location="http://127.0.0.1:5501/ShopTrangSuc/banner.html"
// 			return
// 		}

//         });
// 	    alert("tài khoản hoạch mật khẩu không tồn tại")
//         ressetlogin()

//     });

// } 



// cách 2----------------------------------------------------------------------------------------------
// const getInfo = async () => {
//     var valid = false;
// 	var username = document.getElementById('user').value;
// 	var password = document.getElementById('password').value;
//     const response = await fetch('https://61bc131bd8542f0017824588.mockapi.io/a/login');
//     const myJson =  await response.json();
//     console.log(myJson);
//     for (var i=0; i < myJson.length; i++) {
//         if ((username == myJson[i].username) && (password == myJson[i].password)) {
//              valid=true;
//              break;
//         } 
//     } 
//     if(valid==true){
//         window.location="http://127.0.0.1:5501/ShopTrangSuc/banner.html"
//         valid=false;
//     }else{
//         alert("Vui lòng kiểm tra tài khoảng của bạn")
//         ressetlogin()
//     }
// }

// cách 3-----------------------------------------------

function getInfo() {
    var a = "";
    var valid = false;
    var username = document.getElementById('user').value;
    var password = document.getElementById('password').value;
    axios.get(`${api}`).then(res => {
        var myJson = res.data;
        for (var i = 0; i < myJson.length; i++) {
            if ((username == myJson[i].username) && (password == myJson[i].password)) {
                valid = true;
                a = myJson[i].email

                break;
            }
        }
        if (valid == true) {
            alert(username + "Logged in successfully!")
            localStorage.setItem("username", username)
            localStorage.setItem("email", a)
            window.location = "file:///D:/Lam/team_work/user_manager/trang_chu/header.html"
                // alert(username +" bạn đăng nhập thành công!")


            // window.location="http://127.0.0.1:5501/user_manager/trang_chu/users/user.html"
            valid = false;
        } else {
            alert("Check your account, Please!")
            ressetlogin()
        }
    })
}




// -- dăng kfy--- erro erro erro erroe eroe erroe erro
// function regiter() {
//     const check = (arr) => {
//         for (var i=0; i < arr.length; i++) {
//             if (email == arr[i].email) {
//                 return true
//             } 
//         }
//         return false
//     } 
//     var name1 = document.getElementById('userres').value
//     var email = document.getElementById('email').value
//     var passwordres = document.getElementById('passwordres').value
//     axios.get(`${api}`).then(res =>{ 
//         return check(res.data)
//     }).then(status => {
//         if (status) {
//             alert('Trung')
//             return
//         }
//         // post data
//         var data = {
//             username: name1,
//             email: email,
//             password: passwordres
//         }
//         axios.post(api, data)
//             .then(() => { 
//                 alert("đã đăng ký thành công")
//                 location.reload() }
//             )
//     })



// }

function regiter() {

    var name1 = document.getElementById('userres').value
    var email = document.getElementById('email').value
    var passwordres = document.getElementById('passwordres').value
    if (!checkinput()) {
        alert("Enter full information, Please!")
    } else {
        axios.get(`${api}`).then(res => {
            for (var i = 0; i < res.data.length; i++) {
                if (email == res.data[i].email) {
                    alert('Erorr! Account already exists')
                    return
                }
            }
            // post data
            var data = {
                username: name1,
                email: email,
                password: passwordres,

            }

            axios.post(api, data)
                .then(() => {
                    alert("Logged up successfully!");
                    emailnotify(name1, email);
                    location.reload()
                })
        })

    }


}
//Khánh Linh cần chỉnh lại check input

function checkinput() {
    var name1 = document.getElementById('userres').value
    var email = document.getElementById('email').value
    var passwordres = document.getElementById('passwordres').value
    if (name1 == "" || email == "" || passwordres == "") {
        return false
    }
    return true
}

function emailnotify(username, email) {
    var passwordres = document.getElementById('passwordres').value

    var a = {
        name: username,
        email: email,
        pass: passwordres
    };
    emailjs.send('service_login', 'template_zkqk07k', a)
   
        .then(function(res) {
            console.log("Respone", res.status);
        });
}



// check taikhoan
function checkacount() {


}
// --------------------------------------------------------------------------
function ressetlogin() {
    document.getElementById('user').value = '';
    document.getElementById('password').value = '';
}

function ressetlogin() {
    document.getElementById('userres').value = '';
    document.getElementById('email').value = '';
    document.getElementById('passwordres').value = '';

}

// khánh linh
var x = document.getElementById('login');
var y = document.getElementById('register');
var z = document.getElementById('btn');

// function register() {
//     x.style.left = "-415px";
//     y.style.left = "65px";
//     z.style.left = "110px";

// }

// function login() {
//     x.style.left = "65px";
//     y.style.left = "415px";
//     z.style.left = "0";

// }
// Công-------------------------------------------------------
isBool = true;

function showHidden() {
    if (isBool) {
        // var eyes = `<i class="fas fa-eye-slash"></i>`;
        document.getElementById("eyesHide").innerHTML = `<span id="eyesHide"> <i class="fas fa-eye-slash" id="eyes" onclick="showHidden()" title="hide password"></i></span>`;
        document.getElementById("password").setAttribute("type", "text");

        isBool = false;
    } else {
        document.getElementById("eyesHide").innerHTML = `<span id="eyesHide"> <i class="fas fa-eye" id="eyes" onclick="showHidden()"></i></span>`;
        document.getElementById("password").setAttribute("type", "password");
        isBool = true
    }
}
//Khánh Linh
function eyesRes() {
    if (isBool) {
        document.getElementById("eyesHided").innerHTML = `<span id="eyesHided"><i class="fas fa-eye-slash" id="eyesRes" onclick="eyesRes()" title="hide password"></i></span>`; //Khánh Linh
        document.getElementById("passwordres").setAttribute("type", "text");

        isBool = false;
    } else {
        document.getElementById("eyesHided").innerHTML = `<span id="eyesHided"><i class="fas fa-eye" id="eyesRes" onclick="eyesRes()"></i></span>`; //Khánh Linh
        document.getElementById("passwordres").setAttribute("type", "password");
        isBool = true;

    }

}


