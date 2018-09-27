<template>
	<div>
		<v-card class="card">
			<v-form ref="logInForm" v-model="valid" lazy-validation @submit.prevent="logIn">
				<v-text-field
					v-model="form.login"
					label="Login"
					type="text"
					:rules="rules.v_common"
					prepend-icon="person"
					required
				></v-text-field>
				<v-text-field
					v-model="form.password"
					label="Password"
					type="password"
					:rules="rules.v_common"
					prepend-icon="lock"
					required
				></v-text-field>
				<v-btn
					color="info"
					:disabled="!valid"
					type="submit"
				>
					submit
				</v-btn>
			</v-form>
		</v-card>
		<v-snackbar
			color="error"
			:multi-line="true"
			v-model="snackbar.visibility"
		>
			{{ snackbar.text }}
			<v-btn dark flat @click.native="snackbar.visibility = false">Close</v-btn>
		</v-snackbar>
	</div>
</template>

<script>
import validators from '@/tools/validators/LoginForm';

export default {
	name: 'LogInForm',
	data () {
		return {
			valid: true,
			rules: validators,
			form: {
				login: '',
				password: ''
			},
			snackbar: {
				visibility: false,
				text: ''
			}
		};
	},
	methods: {
		async logIn () {
			if (! this.$refs.logInForm.validate()) return false;
			await this.$store.dispatch('form_auth/login', {
				username: this.form.login,
				password: this.form.password,
			}).catch((e) => {
				this.form.error = e.message || e.stack || e;
				this.snackbar.text = this.form.error//'Invalid credentials passed!';
				this.snackbar.visibility = true;
			});
			this.$refs.logInForm.reset();
			this.$router.push('/user');
		},
	},
};
</script>
<style scoped>
.card {
    padding: 20px;
}
</style>