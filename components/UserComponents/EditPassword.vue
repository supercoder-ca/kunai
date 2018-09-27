<template>
	<div>
		<v-card class="card">
			<v-form ref="editPassword" v-model="valid" lazy-validation>
				<v-text-field
					v-model="passwordOld"
					label="Old Password"
					type="password"
					:rules="oldPassRules"
					prepend-icon="lock"
					required
				></v-text-field>
				<v-text-field
					v-model="passwordNew1"
					label="New Password"
					type="password"
					:rules="newPass1Rules"
					prepend-icon="lock_open"
					required
				></v-text-field>
				<v-text-field
					v-model="passwordNew2"
					label="Repeat New Password"
					type="password"
					:rules="newPass2Rules"
					prepend-icon="lock_open"
					required
				></v-text-field>
				<v-btn
					color="info"
					:disabled="!valid"
					@click="submit"
				>
					submit
				</v-btn>
				<!--<v-btn @click="clear">-->
				<!--clear-->
				<!--</v-btn>-->
			</v-form>
		</v-card>
	</div>
</template>

<script>
import axios from 'axios';

export default {
	name: "LogInForm",
	data() {
		return {
			valid: true,
			passwordOld: '',
			passwordNew1: '',
			passwordNew2: '',
			oldPassRules: [
				v => !!v || 'This field is required',
				v => !!v || 'Wrong old password'
			],
			newPass1Rules: [
				v => !!v || 'This field is required',
				v => v.length >= 6 || 'Minimum 6 symbols',
				v => !!v || "Can't be equal with old password"
			],
			newPass2Rules: [
				v => !!v || 'This field is required',
				v => this.passwordNew2 === this.passwordNew1 || 'New password must be equal both'
			]
		}
	},
	methods: {
		submit() {
			if (this.$refs.editPassword.validate()) {
                    // @todo change to normal url
                    // axios.post('/api/login', {
                    //     login: this.login,
                    //     password: md5(this.password)
                    // })
				console.log(this.login, this.passwordNew1);

				this.$router.push('/user');
			}
		}
            // ,
            // clear() {
            //     this.$refs.editPassword.reset();
            // }
	}
}
</script>
<style scoped>
    .card {
        padding: 20px;
    }
</style>