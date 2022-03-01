const URL_API_PROS = "https://61bc10c1d8542f0017824535.mockapi.io/pros/";
const URL2_API = "https://61bc10c1d8542f0017824535.mockapi.io/pro2";

var swiper = new Swiper(".mySwiper", {
	slidesPerView: 4,
	spaceBetween: 30,
	slidesPerGroup: 1,
	loop: true,
	pagination: {
		el: ".swiper-pagination",
		clickable: true,
	},
	navigation: {
		nextEl: ".swiper-button-next",
		prevEl: ".swiper-button-prev",
	},
});

function getData(url, callBack = null) {
	return axios
		.get(url)
		.then(function (res) {
			if (callBack == null) return res;
			callBack(res.data);
		})
		.catch(function (err) {
			console.log(err);
		});
}

function show(proArr) {
	for (var pro of proArr) {
		document.getElementById("product-slides").innerHTML += `
        <div class="swiper-slide">
        <a href="shop.html"><img src='${pro.img}'></a>
        <h5>${pro.title}</h5>
        </div>
    `;
	}
}

getData(URL_API_PROS, show);

function show2(proArr) {
	for (var pro of proArr) {
		document.getElementById("product2-slides").innerHTML += `
        <div class="swiper-slide text-center">
        <a href="shop.html"><img src='${pro.img}'></a>
        <h3 ">${pro.title}</h3>
        <h5>${pro.price}</h5>
        </div>
    `;
	}
}
getData(URL2_API, show2);

URL3_API = "https://61bc10c1d8542f0017824535.mockapi.io/pros3";

function show3(proArr) {
	for (var pro of proArr) {
		document.getElementById("product3-slides").innerHTML += `
        <div class="swiper-slide text-center">
        <a href="shop.html"><img src='${pro.img}'></a>
        <h3 ">${pro.title}</h3>
        <h5>${pro.price}</h5>
        </div>
    `;
	}
}
getData(URL3_API, show3);
