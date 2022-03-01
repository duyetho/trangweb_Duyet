const API_URL_ORDER = "https://61bc131bd8542f0017824588.mockapi.io/a/new-cart";
const APTconfirm = 'https://61bc131bd8542f0017824588.mockapi.io/a/arrayproducts'
const api = "https://61bc131bd8542f0017824588.mockapi.io/a/login"


function quan_cos() {
    axios.get(`${api}`).then((res) => {
        var dem = res.data.length
        document.getElementById('qty1').innerHTML = dem
    })

    axios.get(`${ APTconfirm}`).then((res) => {
        var dem = res.data.length
        document.getElementById('qty2').innerHTML = dem
    })

    axios.get(`${API_URL_ORDER}`).then((res) => {
        var dem = res.data.length
        document.getElementById('qty3').innerHTML = dem
    })
}
quan_cos()