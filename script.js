const API_URL = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses';

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
      <goods-item v-for="good in goods" :good="good" v-on:add="addChild"></goods-item>
    </div>
  `,
	methods: {
		addChild(newItem) {
			this.$emit('add-item', newItem);
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
			this.$emit('add', prod);
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
	props: ['items'],
	template: `
	<div>
		<button class="cart-button" type="button" v-on:click="changeVisibleBasket">Корзина</button>
		<div class="cart" v-show="isVisibleCart">
			<div v-for="good in items">
				<cart-item-cmp :item="good" v-on:remove-item="removeFromCart"></cart-item-cmp>
			</div>
			<p v-show="items.length==0">Корзина пустая</p>
		</div>
	</div>
	`,
	data() {
		return {
			isVisibleCart: false
		}
	},
	methods: {
		changeVisibleBasket() {
			this.isVisibleCart = !this.isVisibleCart;
		},
		removeFromCart(cartItem) {
			postResponse('/removeFromCart', cartItem)
				.then(resp => resp.json())
				.then(data => {
					this.items = data;
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