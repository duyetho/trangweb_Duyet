const API_URL = "https://61bc131bd8542f0017824588.mockapi.io/a/arrayproducts";
const API_cart = "https://61bc131bd8542f0017824588.mockapi.io/a/new-cart";
const API_comment = " https://61bfe882b25c3a00173f4f47.mockapi.io/comment";

function show() {
    axios.get(`${API_URL}`).then((res) => {
        res.data.map(function(ele) {
            document.getElementById("product").innerHTML += `
              <div id ="flex"class=" mb-3 card text-center"  id="item-${ele.id} >
            <p class="ppp">
            <img class="card-img-top" src="${ele.avatar}" " alt"Card image cap" style="width:250px;height:250px;margin-left:35px">
            </p>
            <div class ="card-body">
            <h5 class = "card-title">${ele.name} </h5>
            <p class = "card-text"  class= "price" style="color: red;">${ele.price}.000$</p>
            <button" type="submit" class="btn-shopping" onclick="viewww(${ele.id})">Xem chi tiết</button>
            </div>
            </div>`;
        });
    });
}
show();
// lengtharrcart(); // load phaanf gio hang

var id = 0;

function showdetail(type, material) {
    document.getElementById("product").innerHTML = "";
    axios.get(`${API_URL}`).then((res) => {
        for (let index = 0; index < res.data.length; index++) {
            if (
                res.data[index].type == type &&
                res.data[index].material == material
            ) {
                document.getElementById("product").innerHTML += `
            <div class=" mb-3 card text-center"  id="item-${res.data[index].id} >
            <p class="ppp">
            <img class="card-img-top" src = "${res.data[index].avatar}" " alt"Card image cap" ;>
            </p>
            <div class ="card-body">
            <h5 class = "card-title">${res.data[index].name} </h5>
            <p class = "card-text"  class= "price" style="color: red;">${res.data[index].price}</p>
            <button" type="submit" class=" btn bg-success" onclick="viewww(${res.data[index].id})" )">Đặt hàng</button>
            </div>
            </div>`;
            }
        }
    });
}
// -------------------------------------------------------------------------------------------------------------------------------
const checkAccount = () => {
    var name = localStorage.getItem("username");
    if (name == null || name == undefined) {
        alert("Bạn cần phải đăng nhập trước!");
        showLogin();
        return false;
    }
    return true;
};
// ---------------------------------------------------------------------------------------

function viewww(n) {
    if (!checkAccount()) {
        return;
    }

    axios.get(`${API_URL}/${n}`).then((res) => {
        var img = `<img class="card-img-top" src = "${res.data.avatar}" " alt"Card image cap" ;>`;
        var infor = `
               <button  class= "infor" onclick="enter(${n}) ">THÊM VÀO GIỎ</button>`;
        var buy = `
               <button class= "inf") "> MUA TRẢ GÓP </button>`;
        var buyshope = `
               <button class= "in") ">XEM GIÁ TẠI SHOPPE</button>`;
        var name = `<h1 class="title_pay">${res.data.name}</h1>`;
        var price = `<h1 class="price_pay">${res.data.price}.000$</h1>`;

        document.getElementById("anha").innerHTML = img;
        document.getElementById("catNam").innerHTML = name;
        document.getElementById("catPrice").innerHTML = price;
        document.getElementById("button").innerHTML = infor;
        document.getElementById("buy").innerHTML = buy;
        document.getElementById("buyShoppe").innerHTML = buyshope;
        document.getElementById("chung").style.display = "block";
        document.getElementById("griddd").style.display = "none";
    });
    similerProduct(n);
}

function similerProduct(n) {
    document.getElementById("banchay").innerHTML = "";

    axios.get(`${API_URL}/${n}`).then((res) => {
        var typeProduct = res.data.type;

        axios.get(`${API_URL}`).then((res) => {
            for (let index = 0; index < res.data.length; index++) {
                if (typeProduct === res.data[index].type) {
                    document.getElementById("banchay").innerHTML += `
                    <div class=" mb-3  card text-center"  id="item-${res.data[index].id} >
                    <p class="ppp">
                    <img class="card-img-top" src = "${res.data[index].avatar}" " alt"Card image cap" ;>
                    </p>
                    <div class ="card-body">
                    <h5 class = "card-title">${res.data[index].name} </h5>
                    <p class = "card-text"  class= "price" style="color: red;">${res.data[index].price} </p>
                    <button" type="submit" class="btn-shopping" onclick="viewww(${res.data[index].id})">Xem chi tiết</button>
                    </div>
                </div>`;
                }
            }
        });
    });
}

// ______________________________________________________Quản lý giỏ hàng

// \\________________________________________________them gio hàng
var arrcart = [];
var ar = 0;
var i = 0;
var row = `<tr>
                    <th>STT</th>
                    <th>Tên sản phẩm</th>
                    <th>hình ảnh</th>
                    <th>Giá</th>
                    <th>Số Lượng</th>
                    <th>Tổng</th>
                    <th>Hành Động</th>
                </tr>`;

// add vo card
var notification = 0;

function enter(n) {
    notification++;
    document.getElementById("notification").innerHTML = notification;
    alert("Đã thêm vào giỏ hàng");
    axios.get(`${API_URL}/${n}`).then((res) => {
        var datas = {
            id: res.data.id,
            avatar: res.data.avatar,
            name: res.data.name,
            price: res.data.price,
            qty: 0,
            totalproduct: 0,
        };

        arrcart.push(datas);
        showtablecart();
        console.log(arrcart);
    });
    // document.getElementById("showCart").style.display = "block";
    // document.getElementById("chung").style.display = "none";
}

// hiển thị bảng
function showtablecart() {
    document.getElementById("cartping").innerHTML = row;
    for (let i = 0; i < arrcart.length; i++) {
        var html = `
        <tr>
        <td>${i + 1}</td>
        <td>${arrcart[i].name}</td>
        <td><img id ='thunho' style="width:200px;height:auto;" src="${
			arrcart[i].avatar
		}" alt=""> </td>
        <td>${arrcart[i].price}</td>
        <td><input type="number" value='0' min="0"  id="product${i}" oninput="updatecar(${i})"> </td>
        <td id = "total${i}">${totalEl}</td>
        <td>  <button class="btn btn-danger" onclick="deleteproduct(${i})">Delete</button></td>
      </tr>
        `;
        document.getElementById("cartping").innerHTML += html;
    }
    // document.getElementById("notification").innerHTML = arrcart.length;
}
// ---------------xóa sp trong giỏ--------------------
function deleteproduct(i) {
    arrcart.splice(i, 1);
    showtablecart();
}

// ----------------------------------------------------------Thay đổi gái trị ssos luong
function updatecar(i) {
    var qty = document.getElementById("product" + i).value;

    arrcart[i].qty = parseInt(qty); /////// thay đổi giá trị trong iput đẩy lên mock và tính tổng
    totalEl = arrcart[i].qty * arrcart[i].price;
    (arrcart[i].totalproduct = totalEl), // đẩy gái trị tổng vô mảng funtion enter
    (document.getElementById("total" + i).innerHTML = totalEl + ".000VND");

    document.getElementById("product" + i).setAttribute("value", qty);
    updatetotal();
}


// function showCartping(){
//     alert("ra đi")
// }
// ------------------------------------------------ cập nhật tổng
var totalEl = 0;
var alltotal = 0;

function updatetotal() {
    var alltotal = 0;
    for (var i of arrcart) {
        alltotal += i.price * i.qty;
    }
    document.getElementById("alltotal").value = alltotal + ".000VND";
}

// function backHome() {
// 	document.getElementById("showCart").style.display = "block";
// 	document.getElementById("chung").style.display = "none";
// }
// function showCart(){
//     alert("hj")
// }



// ------------------------------------> Bình luận---lưu dl vào mock API sau đó show ra 



// ====================================>

function add() {
    var username = localStorage.getItem("username");
    var title = document.getElementById("comment").value;

    var data = {
        username: username,
        title: title,

    };
    axios.post(`${API_comment}`, data).then();
}

function showComment() {
    axios.get(`${API_comment}`).then((res) => {
        for (let i = 0; i < res.data.length; i++) {

            document.getElementById("list_comment").innerHTML += `
                <h6 id="margin"> <i class=" iconUser fas fa-user-circle"></i> ${res.data[i].username}</p>
                <h6 id="margin">${res.data[i].title}</h6> 
                <p class="edit_delete"><button onclick="getdata_comment(${res.data[i].id})"><i class="edit1 fas fa-pen-square"></i></button>  <button onclick="delete_comment(${res.data[i].id})"><i class="delete1 fas fa-trash-alt"></i></button></p>
                <hr>
              
            `;

        }
    });
    reset();
}

function reset() {
    localStorage.getItem("username") = "";
    document.getElementById("title").value = "";

}

// update và delete comment

function getdata_comment(id) {
    axios.get(`${API_comment}/${id}`)
        .then(function(res) {
            // localStorage.getItem("username") = res.data.username;
            document.getElementById("title").value = res.data.title;
            document.getElementById('update').value = res.data.id

        })
}

function update(id) {

    // var username = localStorage.getItem("username")
    var title = document.getElementById("title").value
    var data = {

        username: username,
        title: title
    }
    axios.put(`${API_comment}/${id}`, data).then(() => { location.reload() });
    reset()
        // document.getElementById('add').style.display = 'block';
        // document.getElementById('update').style.display = 'none';
}

function delete_comment(id) {
    axios.get(`${API_comment}/${id}`)
    axios.delete(`${API_comment}/${id}`).then(
        () => { location.reload() }
    )
}

showComment();

// ==================================================--------------------------->

function moveiforcustomer() {
    document.getElementById("showCart").style.display = "none";
    document.getElementById("chung").style.display = "none";
    document.getElementById("paya").style.display = "block";

    document.getElementById("name").value = localStorage.getItem("username");
    document.getElementById("email").value = localStorage.getItem("email");
    var or_date = new Date();
    var date =
        or_date.getDate() +
        "-" +
        (or_date.getMonth() + 1) +
        "-" +
        or_date.getFullYear();
    document.getElementById("date").value = date;
}

function checkinput() {
    var phone = document.getElementById("phone").value;
    var province = document.getElementById("province").value;
    var distric = document.getElementById("distric").value;
    var commune = document.getElementById("commune").value;
    var apartmentNumber = document.getElementById("apartmentNumber");
    if (
        province == "" ||
        distric == "" ||
        commune == "" ||
        apartmentNumber == "" ||
        phone == ""
    ) {
        return true;
    }
}


// trang thanh toán 
function payment() {
    var or_date = new Date();
    var date =
        or_date.getDate() +
        "-" +
        (or_date.getMonth() + 1) +
        "-" +
        or_date.getFullYear();
    document.getElementById("date").value = date;
    var username = localStorage.getItem("username");
    var email = localStorage.getItem("email");
    var phone = document.getElementById("phone").value;
    var province = document.getElementById("province").value;
    var distric = document.getElementById("distric").value;
    var commune = document.getElementById("commune").value;
    var apartmentNumber = document.getElementById("apartmentNumber").value;
    var place =
        apartmentNumber + "-" + commune + "-" + distric + "-" + province + ".";
    if (checkinput() == true) {
        alert("Nhập đầy đủ thông tin");
    } else {
        axios.get(API_cart).then(() => {
            var arrpost = [];
            for (let index = 0; index < arrcart.length; index++) {
                var object = {
                    price: arrcart[index].price,
                    avatar: arrcart[index].avatar,
                    name: arrcart[index].name,
                    qty: arrcart[index].qty,
                    totalproduct: arrcart[index].totalproduct,
                };

                arrpost.push(object);
            }
            var object2 = {
                username: username,
                email: email,
                array: arrpost,
                phone: phone,
                date: date,
                place: place,
                total: document.getElementById("alltotal").value,
            };
            axios.post(API_cart, object2);
        });
        alert("Đã mua hàng thành công");
        showbillcustomer(username, phone, date, place);
        // gọi hàm gửi mail
        sendOrder(username, phone, date, place, email);
    }
    reset();
}

// hiển thị bill

function showbillcustomer(username, phone, date, place) {
    var tong = document.getElementById("alltotal").value;
    document.getElementById("detaibill").innerHTML = `
    <div class="text-center">
    <h6>100B Lê Hữu Trác - Sơn Trà - Đà Nẵng</h6>
    <h1>Jewels Company</h1>
    <h3>Hóa đơn đặt hàng của bạn</h3></div>
    <p>Ngày đặt hàng :${date}</p>
    <p>Tên người đặt hàng :${username}</p>
    <p>Địa chỉ giao :${place}</p>
    <p>SĐT:${phone}</p>
    <p>Tổng tiền sản phẩm :${tong}</p>
    <p>Cảm ơn quý khách đã ủng hộ!</p><br><br>
    <div class="text-center">
    
    <h3>Chi tiết đơn hàng</h3></div>
    `;
    for (let index = 0; index < arrcart.length; index++) {
        document.getElementById("detaibill").innerHTML += `
            <div>
        <p>Tên Sản phẩm : ${arrcart[index].name}</p>
        <p>Hình ảnh :<img id ='thunho' src=" ${arrcart[index].avatar}" alt=""> </p>
        <p>Số lượng :${arrcart[index].qty}</p>
        <p>Giá tiền :${arrcart[index].price}</p>
        </div>
        `;
    }
    document.getElementById("detaibill").style.display = "block";
    document.getElementById("paya").style.display = "none";

    // Khánh Linh Gửi Mail Đặt Hàng
    for (let index = 0; index < arrcart.length; index++) {
        productName = arrcart[index].name;
        qty = arrcart[index].qty;
    }
    content = "PNJ want to send you email to see detail of your purchase";
    product_name = productName;
    quantity = qty;
    address = place;
    total = document.getElementById("alltotal").value;

    var tempParams = {
        from_name: "Công Ty PNJ",
        to_name: username,
        message: content,
        product_name: product_name,
        quantity: quantity,
        address: address,
        total: total,
    };
    emailjs.send("email", "template_d2oikta", tempParams).then(function(res) {
        console.log("success", res.status);
    });
}

function reset() {
    document.getElementById("phone").value = "";
    document.getElementById("province").value = "";
    document.getElementById("distric").value = "";
    document.getElementById("commune").value = "";
    document.getElementById("apartmentNumber").value = "";
}
// -----------------