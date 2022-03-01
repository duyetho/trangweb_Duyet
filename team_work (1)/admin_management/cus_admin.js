const API_URL_ORDER = "https://61bc131bd8542f0017824588.mockapi.io/a/new-cart";

function show_cus_infor() {
    axios.get(`${API_URL_ORDER}`).then((res) => {
        var data = res.data;
        var stt =0
        document.getElementById('cus_infor').innerHTML = ""
        for (var x in data) {
            stt++
            document.getElementById('cus_infor').innerHTML += `
            <tr>
            <td>${stt}</td>
            <td>${data[x].username}</td>
            <td>${data[x].phone}</td>
            <td>${data[x].email}</td>
            <td>${data[x].place}</td>
            </tr>
            `
        }
    })
}
show_cus_infor()