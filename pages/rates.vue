<template>
	<div>
		rates page
	</div>
</template>

<script>
export default {
	name: 'rates',
	pageTitle: 'Recent currency rates list',
	middleware: 'auth',
	mounted: async function () {
		console.log(this.$store.getters['form_auth/authenticated']);
	},
}
</script>

<style scoped>

</style>