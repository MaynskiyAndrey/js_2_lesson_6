import CartItemCmp from './CartItemCmp.js'

const postResponse = async (url, data) => {
	return await fetch(url, {
		method: 'POST',
		body: JSON.stringify(data),
		headers: {
			'Content-Type': 'application/json'
		},
	})
};

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