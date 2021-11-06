
Vue.component('cart-item-cmp', {
	props: ['item'],
	template: `
	<div class="cart-item">
		<p>{{ item.product_name }}</p>
					<p> : </p>
					<p>{{ item.price }}</p>
					<button  v-on:click="$emit('remove-item', item)">Удалить</button>
	</div>`,
});