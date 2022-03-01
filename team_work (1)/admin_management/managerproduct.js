const APTconfirm = 'https://61bc131bd8542f0017824588.mockapi.io/a/arrayproducts'

function changeCategory() {
    var dem = 0;
    axios.get(`${APTconfirm}`).then(res => {
        var row = "";
        for (let i = 0; i < res.data.length; i++) {
            var e = document.getElementById("selectCategoryProduct1");
            var a = document.getElementById("selectCategoryProductss2");
            var type = e.options[e.selectedIndex].value;
            var material = a.options[a.selectedIndex].value;

            if (res.data[i].type == type && res.data[i].material == material) {
                dem++;
                row += `
        <tr>
        <td>${dem}</td>
        <td>${res.data[i].name}</td>
        <td>${res.data[i].price}</td>
        <td><img id ='thunho' src="${res.data[i].avatar}" alt=""> </td>
        <td>${res.data[i].note}</td>
        <td>${res.data[i].quan}</td>
        <td class="edit_delete">  <button onclick="getdatafromtable(${res.data[i].id})"><i class="edit fas fa-pen-square"></i></button><button onclick="deleteproduct(${res.data[i].id})"><i class="delete fas fa-trash-alt"></i></button></td>
      </tr>
        `

            }

        }
        document.getElementById("tbl").innerHTML = row
    })
}

function reset() {
    document.getElementById('product-name').value = '';
    document.getElementById('price').value = '';
    document.getElementById('image').value = '';
    document.getElementById('note').value = '';
    document.getElementById('qty').value = '';
}


function add() {
    var e = document.getElementById("selectCategoryProduct");
    var category = e.options[e.selectedIndex].value;
    var b= document.getElementById("selectCategorygender");
    var gender = b.options[b.selectedIndex].value;
    var a = document.getElementById("selectCategoryProductss");
    var material = a.options[a.selectedIndex].value;
    var name1 = document.getElementById('product-name').value
    var price = document.getElementById('price').value
    var img = document.getElementById('image').value
    var note = document.getElementById('note').value
    var quan = document.getElementById('qty').value
    var data = {
        name: name1,
        price: price,
        avatar: img,
        note: note,
        quan: quan,
        gender:gender,
        type: category,
        material: material
    }
    axios.post(APTconfirm, data)
        .then(
            () => { location.reload() }
        )
    reset()
}

function getdatafromtable(id) {
    axios.get(`${APTconfirm}/${id}`)
        .then(function(res) {
        document.getElementById('selectCategoryProduct').value = res.data.type;
            document.getElementById('selectCategorygender').value = res.data.gender;
            document.getElementById('selectCategoryProductss').value = res.data.material;
            document.getElementById('product-name').value = res.data.name;
            document.getElementById('price').value = res.data.price;
            document.getElementById('image').value = res.data.avatar;
            document.getElementById('note').value = res.data.note;
            document.getElementById('qty').value = res.data.quan;
            document.getElementById('add').style.display = 'none';
            document.getElementById('update').style.display = 'block';
            document.getElementById('update').value = res.data.id

        })

}

function update(id) {
    var e = document.getElementById("selectCategoryProduct");
    var category = e.options[e.selectedIndex].value;
    var b= document.getElementById("selectCategorygender");
    var gender = b.options[b.selectedIndex].value;
    var a = document.getElementById("selectCategoryProductss");
    var material = a.options[a.selectedIndex].value;
    var name1 = document.getElementById('product-name').value
    var price = document.getElementById('price').value
    var img = document.getElementById('image').value
    var note = document.getElementById('note').value
    var quan = document.getElementById('qty').value
    var data = {
        name: name1,
        price: price,
        avatar: img,
        note: note,
        quan: quan,
        gender:gender,
        type: category,
        material: material
    }
    axios.put(`${APTconfirm}/${id}`, data).then(() => { location.reload() });
    reset()
    document.getElementById('add').style.display = 'block';
    document.getElementById('update').style.display = 'none';
}

function deleteproduct(id) {
    axios.get(`${APTconfirm}/${id}`)
    axios.delete(`${APTconfirm}/${id}`).then(
        () => { location.reload() }
    )
}
changeCategory()