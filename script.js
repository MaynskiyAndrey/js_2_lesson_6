const API_URL = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses';

class GoodsItem {
	constructor(product_name, price) {
		this.product_name = product_name;
		this.price = price;
	}
	render() {
		return `<div class="goods-item"><h3>${this.product_name}</h3><p>${this.price}</p></div>`;
	}
}

class Cart {
	constructor() {
		this.items = [];
		this.isVisibleCart = false;
	}
	addItem(goodsItem, count) {
		const newItem = new CartItem(goodsItem, count);
		this.items.push(newItem);
	}
	removeItem(goodsItem) {
		let index = this.items.indexOf(s => s.goodItem === goodsItem);
		if (index > 1) {
			this.items.slice(index, 1);
		}
	}

	getSummCost() {
		const result = 0;
		this.items.reduce((item, index, array) => {
			result += item.goodItem.price * item.count;
		})

		return result;
	}
}

class CartItem {
	constructor(goodsItem, quantity) {
		this.googsItem = goodsItem;
		this.quantity = quantity;
	}

	addItem() {
		this.quantity++;
	}
	removeItem() {
		this.quantity--;
	}
}


const postResponse = async (url, data) => {
	return await fetch(url, {
		method: 'POST',
		body: JSON.stringify(data),
		headers: {
			'Content-Type': 'application/json'
		},
	})
};



Vue.component('goods-list', {
	props: ['goods'],
	emits: { 'add-item': null, },
	template: `
    <div class="goods-list">
      <goods-item v-for="good in goods" :good="good" v-on:add="addChild()"></goods-item>
    </div>
  `,
	methods: {
		addChild() {
			this.$emit('add-item');
		}
	}
});

Vue.component('goods-item', {
	props: ['good'],
	emits: { add: null, },
	template: `
    <div class="goods-item">
      <h3>{{ good.product_name }}</h3>
      <p>{{ good.price }}</p>
	  <button @click.preventDefault="addToCart(good)">Купить</button>
    </div>
  `,
	methods: {
		addToCart(prod) {
			postResponse('/addToCart', prod).then(this.$emit('add'));
		}
	}

});

Vue.component('find', {
	props: ['value'],
	template: `
	<div>
		<input
			v-bind:value="value"
			v-on:input="$emit('input', $event.target.value)">
		<button v-on:click="$emit('filter-on')" class="search-button" type="button">Искать</button>
	</div>
	`
})


Vue.component('cart-item-cmp', {
	props: ['item'],
	template: `
	<div class="cart-item">
		<p>{{ item.product_name }}</p>
					<p> : </p>
					<p>{{ item.price }}</p>
					<button  v-on:click="$emit('remove-item', item)">Удалить</button>
	</div>`,
})


Vue.component('cart-cmp', {
	props: ['obj'],
	template: `
	<div>
		<button class="cart-button" type="button" v-on:click="changeVisibleBasket">Корзина</button>
		<div class="cart" v-show="obj.isVisibleCart">
			<div v-for="good in obj.items">
				<cart-item-cmp :item="good" v-on:remove-item="removeFromCart"></cart-item-cmp>
			</div>
			<p v-show="obj.items.length==0">Корзина пустая</p>
		</div>
	</div>
	`,
	methods: {
		changeVisibleBasket() {
			this.obj.isVisibleCart = !this.obj.isVisibleCart;
		},
		removeFromCart(cartItem) {
			postResponse('/removeFromCart', cartItem)
				.then(resp => resp.json())
				.then(data => {
					this.obj.items = data;
				});
		}
	},
})


const app = new Vue({
	el: '#app',
	data: {
		goods: [],
		filteredGoods: [],
		searchLine: '',
		cart: new Cart()
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
		onAddCartItem() {
			fetch('/cart')
				.then(resp => resp.json())
				.then(data => {
					this.cart.items = data;
				});
		}
	},
	// mounted:// async function fetchGoods() {
	// 	// return await fetch('/catalog')
	// 	// 	.then(resp => resp.json())
	// 	// 	.then(data => {
	// 	// 		this.goods = data;
	// 	// 		this.filteredGoods = data;
	// 	// 	}),
	// 	// async function fetchCart() {
	// 	// 	return await fetch('/cart')
	// 	// 		.then(resp => resp.json())
	// 	// 		.then(data => {
	// 	// 			this.cart.items = data;
	// 	// 		})

	// 	// }
	// //}
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
				this.cart.items = data;
			});

	}
	//}
});