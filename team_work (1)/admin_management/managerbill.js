const API_URL_ORDER = "https://61bc131bd8542f0017824588.mockapi.io/a/new-cart";



function show_order() {
    axios.get(`${API_URL_ORDER}`).then((res) => {
        var data = res.data;
        var stt =0
        document.getElementById('orders').innerHTML = ""
        for (var x in data) {
            stt++
            document.getElementById('orders').innerHTML += `
            <tr>
            <td>${stt}</td>
            <td>${data[x].username}</td>
            <td>${data[x].phone}</td>
            <td>${data[x].date}</td>
            <td><button onclick = "show_detailbill(${data[x].id})" type="button" class="btn btn-success" data-toggle="modal" data-target="#exampleModal">Xem chi tiết</button></td>
            <td>${data[x].total}.000</td>
            <td><button onclick="delete_orderbill(${data[x].id})" class="btn btn-danger"><i class="bi bi-trash"></i></i></button></td>
            </tr>
            `
        }
    })
}
show_order();


function show_detailbill(id) {
    axios.get(`${API_URL_ORDER}`).then((res) => {
        var STT = 0;
        var data = res.data;
        var rows = "";
        for (var x in data) {
            if ((data[x].id) == id) {
                for (var i in data[x].array) {
                    STT++;
                    rows += `
                    <tr>
                    <td>${STT}</td>
                    <td>${data[x].array[i].name}</td>
                    <td><img class="card-img-top" src = "${data[x].array[i].avatar}" style ="width:100px;height:100px" ;></td>
                    <td>${data[x].array[i].price}</td>
                    </tr>
                    `;

                }
                break;

            }
        }
        document.getElementById('detailorder').innerHTML = rows;

    })
}

function delete_orderbill(id) {
    axios.delete(`${API_URL_ORDER}/${id}`).then(() => {
        alert("Xóa Thành công");
        location.reload()
    });

}