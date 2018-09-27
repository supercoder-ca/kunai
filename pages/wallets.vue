<template>
	<div>
		history page
		<nuxt-link :to="{
		path: 'address/' + id}"
		>
			My Address
		</nuxt-link>
	</div>
</template>

<script>
export default {
	name: 'wallets',
	data() {
		return {
			id: '1CdpRRvMDx8xRyXXG1sZ8p7tmu9dMxcAMp'
		}
	}

}
</script>

<style scoped>

</style>