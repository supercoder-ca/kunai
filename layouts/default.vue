<template>
	<v-app dark>
		<Menu><slot name='Menu'></slot></Menu>
		<v-content>
			<v-container fluid fill-height>
				<v-layout justify-start align-start>
					<v-flex>
						<nuxt/>
					</v-flex>
				</v-layout>
			</v-container>
			<v-footer app fixed inset>
				<Footer><slot name='Footer'></slot></Footer>
			</v-footer>
		</v-content>
	</v-app>
</template>

<script>
import Menu from '../components/global/Menu';
import Footer from '../components/global/Footer';
export default {
	components: {
		Menu,
		Footer,
	},
}
</script>