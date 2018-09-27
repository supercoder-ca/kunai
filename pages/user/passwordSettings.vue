<template>
	<div>
		<h2> Password Settings </h2>
		<EditPassword/>
	</div>
</template>

<script>
import EditPassword from '../../components/UserComponents/EditPassword';
export default {
	components: {
		EditPassword
	},
	middleware: 'authenticated'
}
</script>

<style scoped>

</style>