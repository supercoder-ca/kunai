<template>
	<div>
		<v-card class="card">
			<v-form ref="editEmail"
				v-model="validFormEmail"
				lazy-validation
				v-show="!isSend"
				@onsubmit="sendCode"
			>
				<v-text-field
					v-model="email"
					:rules="emailRules"
					prepend-icon="email"
					label="New E-mail"
					required
				></v-text-field>
				<v-btn @click="sendCode">
					send code
				</v-btn>
			</v-form>
			<v-form ref="editEmailCode"
				v-model="validFormCode"
				lazy-validation
				v-show="isSend"
			>
				<v-text-field
					prepend-icon="send"
					v-model="validCode"
					label="Verification code"
					:rules="codeRules"
					required
				></v-text-field>
				<v-btn  :disabled="!validFormCode"
					@click="submit"
				>
					save
				</v-btn>
			</v-form>
		</v-card>
		<v-snackbar
			:timeout="snackbar.timeout"
			:color="snackbar.color"
			:multi-line="true"
			v-model="snackbar.visibility"
		>
			{{ snackbar.text }}
			<v-btn dark flat @click.native="snackbar.visibility = false">Close</v-btn>
		</v-snackbar>
	</div>
</template>

<script>
import axios from 'axios';

export default {
	name: "EditEmail",
	data(){
		return{
			isSend: false,
			validFormEmail: true,
			validFormCode: true,
			validCode: '',
			email: '',
			emailRules: [
				v => !!v || 'E-mail is required',
				v => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) || 'E-mail must be valid'
			],
			codeRules: [
				v => !!v || 'Code is required',
			],
			snackbar: {
				visibility: false,
				color: '',
				mode: '',
				timeout: 2000,
				text: ''
			}

		}
	},
	methods: {
		submit() {
			if (this.$refs.editEmailCode.validate()) {
                    // @todo send request to server and catch invalid code
				this.snackbar.color = 'secondary';
				this.snackbar.text = 'You change your e-mail';
				this.snackbar.visibility = true;

				setTimeout( () => this.$router.push('/user'), this.snackbar.timeout);
			}
		},
		sendCode() {
			if (this.$refs.editEmail.validate()) {
				this.isSend = true;
                    // @todo send request to server
			}
		}
	}
}
</script>

<style scoped>

</style>