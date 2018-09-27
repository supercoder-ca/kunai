<template>
	<v-card class="white--text user-card px-0" >
		<v-container fluid grid-list-lg>
			<v-layout row>
				<v-flex xs7>
					<div>
						<div class="headline" > Username: {{ user.username }}</div>
						<div> E-mail: {{ user.email }}</div>
						<div> Role: {{ user.role }}</div>

					</div>
				</v-flex>
				<v-flex xs5>
					<v-card-media
						src="https://randomuser.me/api/portraits/men/85.jpg"
						height="125px"
						contain
					></v-card-media>
				</v-flex>
			</v-layout>
			<v-card-actions class="user-card__actions">
				<v-btn nuxt
					:to="`/address/${user.id}`"
				>
					My address
				</v-btn>
			</v-card-actions>
			<v-divider/>
			<v-card-actions>
				<v-btn nuxt
					to="user/passwordSettings"
				>
					Edit Password
				</v-btn>
				<v-btn nuxt
					to="user/mailSettings"
				>
					Edit E-mail
				</v-btn>
			</v-card-actions>
		</v-container>
	</v-card>
</template>

<script>
export default {
	name: "UserCard",
	props: ['user']
}
</script>

<style scoped>
	.user-card {
		max-width: 600px;
		margin: 0 auto;
	}
	.user-card__actions {
		justify-content: flex-start;
	}
</style>