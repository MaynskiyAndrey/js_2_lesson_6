
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