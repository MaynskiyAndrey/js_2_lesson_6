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
