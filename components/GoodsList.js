import GoodsItem from './GoodsItem'


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