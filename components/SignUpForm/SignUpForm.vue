<template>
	<v-card class="card">
		<v-form ref="signUpForm" v-model="valid" @submit.prevent="signup" @reset.prevent="">
			<v-text-field
				v-model="form.login"
				:rules="rules.v_common"
				prepend-icon="person"
				label="Login"
				required
			></v-text-field>
			<v-text-field
				v-model="form.email"
				:rules="rules.v_email"
				prepend-icon="email"
				label="E-mail"
				required
			></v-text-field>
			<v-text-field
				v-model="form.password1"
				:rules="rules.v_password"
				prepend-icon="lock"
				label="Password"
				required
			></v-text-field>
			<v-text-field
				v-model="form.password2"
				:rules="rules.v_password2"
				prepend-icon="lock"
				label="Repeat password"
				required
			></v-text-field>
			<v-checkbox
				v-model="form.checkbox"
				:rules="rules.v_common"
				label="Consent to the processing of personal data?"
				required
			></v-checkbox>
			<v-btn
				:disabled="!valid"
				type="submit"
			>
				submit
			</v-btn>
		</v-form>
		<v-snackbar
			:color="snackbar.color"
			:multi-line="true"
			v-model="snackbar.visibility"
		>
			{{ snackbar.text }}
			<v-btn dark flat @click.native="snackbar.visibility = false">Close</v-btn>
		</v-snackbar>
	</v-card>
</template>

<script>
import validators from '@/tools/validators/SignUpForm';

export default {
	name: "SignUpForm",
	data () {
		return {
			form: {
				login: '',
				password1: '',
				password2: '',
				email: '',
				checkbox: false,
			},
			valid: false,
			rules: {
				...validators,
				v_password2: [ ...(validators.v_common), ...(validators.v_password),
					v => this.form.password1 === v || 'Passwords must be equal'
				],
			},
			snackbar: {
				visibility: false,
				text: '',
				color: ''
			},
		};
	},
	methods: {
		async signup () {
			if (! this.$refs.signUpForm.validate()) return false;
			await this.$store.dispatch('form_auth/signup', {
				username: this.form.login,
				email: this.form.email,
				password: this.form.password2,
			}).catch((e) => {
				this.form.error = e.message || e.stack || e;
				this.$refs.signUpForm.reset();
                // @todo catch more error [ 'already exist', 'login using', 'something else']
				this.snackbar.text = 'Registration failed due to error!';
				this.snackbar.color = 'error';
				this.snackbar.visibility = true;
			});
			this.$refs.signUpForm.reset();
			this.snackbar.text = 'Please check your email and follow confirmation link';
			this.snackbar.color = 'info';
			this.snackbar.visibility = true;
		},
	},
};
</script>
<style scoped>
.card {
    padding: 20px;
}
</style>