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
		let index = this.items.indexOf(s => s.goodItem == goodsItem);
		if (index > 1) {
			this.items.slice(index, 1);
		}
	}

	getSummCost() {
		const result = 0;
		this.items.forEach((item, index, array) => {
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


Vue.component('goods-list', {
	props: ['goods'],
	template: `
    <div class="goods-list">
      <goods-item v-for="good in goods" :good="good"></goods-item>
    </div>
  `
});

Vue.component('goods-item', {
	props: ['good'],
	template: `
    <div class="goods-item">
      <h3>{{ good.product_name }}</h3>
      <p>{{ good.price }}</p>
    </div>
  `
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
		<p>{{ item.googsItem.product_name }}</p>
					<p> : </p>
					<p>{{ item.quantity }}</p>
	</div>`
})

Vue.component('cart-cmp', {
	props: ['obj'],
	template: `
	<div>
		<button class="cart-button" type="button" v-on:click="changeVisibleBasket">Корзина</button>
		<div class="cart" v-show="obj.isVisibleCart">
			<div v-for="good in obj.items">
				<cart-item-cmp :item="good"></cart-item-cmp>
			</div>
			<p v-show="obj.items.length==0">Корзина пустая</p>
		</div>
	</div>
	`,
	methods: {
		changeVisibleBasket() {
			this.obj.isVisibleCart = !this.obj.isVisibleCart;
		}
	}
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
		}
	},
	mounted() {
		this.makeGETRequest(`${API_URL}/catalogData.json`)
			.then((goods) => {
				this.goods = JSON.parse(goods);
				this.filteredGoods = JSON.parse(goods);
			});
		this.makeGETRequest(`${API_URL}/getBasket.json`)
			.then((goods) => {
				JSON.parse(goods).contents.forEach((item) => {
					let goodsItem = new GoodsItem(item.product_name, item.price);
					this.cart.addItem(goodsItem, item.quantity);
				})
			})
	}
});