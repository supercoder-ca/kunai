<template>
	<v-tabs v-model="loginTabs">
		<v-tab>
			Log In
		</v-tab>
		<v-tab>
			Sign Up
		</v-tab>
		<v-tab-item>
			<LogInForm/>
		</v-tab-item>
		<v-tab-item>
			<SignUpForm/>
		</v-tab-item>
	</v-tabs>
</template>

<script>
import LogInForm from '../components/LogInForm/LogInForm';
import SignUpForm from '../components/SignUpForm/SignUpForm';
export default {
	name: 'login',
	components: {
		LogInForm,
		SignUpForm
	},
	pageTitle: 'Please sign in/up first',
	data () {
	    return {
			loginTabs: 1
		};
	},
};
</script>