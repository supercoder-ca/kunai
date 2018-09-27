<template>
	<v-layout class="ma-0" row>
		<v-flex align-start justify-start>
			<UserCard :user="user"
			></UserCard>
		</v-flex>
	</v-layout>
</template>

<script>
import UserCard from '../../components/UserComponents/UserCard';

export default {
	components: {
		UserCard
	},
	middleware: 'auth',
	async asyncData( context ) {
        // @todo delete comment after write API
        //const response = await context.$axios.get(`api/users/${context.store.getters['auth/getUsername']}`);

		const response = {
			data: {
				name: 'John Dou',
				username: 'johny',
				role: 'regular',
				email: 'johny@email.com',
				id: '1CdpRRvMDx8xRyXXG1sZ8p7tmu9dMxcAMp'
			}
		};
		return { user: response.data }
	},
	mounted: function () {
		console.log(this.user);
	},
};
</script>

<style scoped>

</style>