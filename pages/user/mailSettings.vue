<template>
	<div>
		<h2>E-mail settings </h2>
		<EditEmail/>
	</div>
</template>

<script>
import EditEmail from '../../components/UserComponents/EditEmail';
export default {
	components: {
		EditEmail
	},
	middleware: 'authenticated'
}
</script>

<style scoped>

</style>