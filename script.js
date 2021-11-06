import CartCmp from './components/CartCmp.js'
import Find from './components/Find'
import GoodsList from './components/GoodsList'

const app = new Vue({
	el: '#app',
	data: {
		goods: [],
		filteredGoods: [],
		searchLine: '',
		cart: []
	},
	methods: {
		makeGETRequest(url) {
			return new Promise((resolve, reject) => {
				var xhr;

				if (window.XMLHttpRequest) {
					xhr = new XMLHttpRequest();
				} else if (window.ActiveXObject) {
					xhr = new ActiveXObject("Microsoft.XMLHTTP");
				}

				xhr.onreadystatechange = function () {
					if (xhr.readyState === 4) {
						if (xhr.status === 200) {
							resolve(xhr.responseText);
						}
						else {
							reject('Error');
						}
					}
				}

				xhr.open('GET', url, true);
				xhr.send();
			})
		},
		filterGoods() {
			const regexp = new RegExp(this.searchLine, 'i');
			this.filteredGoods = this.goods.filter(good => regexp.test(good.product_name));
		},
		makePOSTRequest(url, data, callback) {
			let xhr;

			if (window.XMLHttpRequest) {
				xhr = new XMLHttpRequest();
			} else if (window.ActiveXObject) {
				xhr = new ActiveXObject("Microsoft.XMLHTTP");
			}

			xhr.onreadystatechange = function () {
				if (xhr.readyState === 4) {
					callback(xhr.responseText);
				}
			}

			xhr.open('POST', url, true);
			xhr.setRequestHeader('Content-Type', 'application/json; charset=UTF-8');

			xhr.send(data);
		},
		async onAddCartItem(good) {
			fetch('/addToCart', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify(good)
			})
				.then(resp => resp.json())
				.then(data => {
					this.cart = data;
				});
		}
	},
	mounted: async function getData() {
		await fetch('/catalog')
			.then(resp => resp.json())
			.then(data => {
				this.goods = data;
				this.filteredGoods = data;
			});
		await fetch('/cart')
			.then(resp => resp.json())
			.then(data => {
				this.cart = data;
			});
	}
});