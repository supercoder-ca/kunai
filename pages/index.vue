<template>
	<v-stepper v-model="stepper">
		<v-stepper-header>
			<v-stepper-step :complete="stepper > 1"
				step="1"
			>
				Select currency
			</v-stepper-step>
			<v-divider></v-divider>
			<v-stepper-step :complete="stepper > 2"
				step="2"
			>
				Enter your wallet
			</v-stepper-step>
			<v-divider></v-divider>
			<v-stepper-step step="3">
				Confirm operation
			</v-stepper-step>
		</v-stepper-header>
		<v-stepper-items>
			<v-stepper-content step="1">
				<v-card>
					<v-card-text>
						<h2> Exchange Rate </h2>
						<p>
							1 {{ payCurrency }} = {{ amountByRate }} {{ receivedCurrency }}
						</p>
						<v-divider class="mb-3" />
						<v-layout column>
							<v-flex xs12>
								<v-form ref="exchangeForm" @submit.prevent="exchangeFormSubmitHandler">
									<v-layout row class="justify-space-between mb-2">
										<v-flex xs5>
											<h3>Pay</h3>
										</v-flex>
										<v-flex xs5 class="hidden-xs-only">
											<h3>Receive</h3>
										</v-flex>
									</v-layout>
									<v-layout ref="reverseWrapper"
										row
										wrap
										class="justify-space-between">
										<v-flex sm5 xs12>
											<v-layout row class="justify-start">
												<v-flex xs9>
													<v-text-field v-model.number="payAmount"
														type="number"
														:rules="rules"
														label="Amount"
														class="input-group--focused"
													>
													</v-text-field>
												</v-flex>
												<v-flex xs3>
													<v-select
														:items="currenciesArray"
														v-model="payCurrency"
														label="Currency"
														class="input-group--focused input-spin--hidden"
														item-value="text"
													></v-select>
												</v-flex>
											</v-layout>
										</v-flex>
										<v-flex class="text-xs-center pt-3 pb-3-xs" sm1 xs12>
											<v-tooltip bottom>
												<button slot="activator"
													type="button"
													class="btn--flat"
													@click="reverseHandler"
												>
													<v-icon>
														autorenew
													</v-icon>
												</button>
												<span>
													Reverse position
												</span>
											</v-tooltip>
										</v-flex>
										<v-flex sm5 xs12>
											<h3 class="hidden-sm-and-up pb-2">Receive</h3>
											<v-layout row class="justify-start">
												<v-flex xs9>
													<v-text-field v-model.number="receivedAmount"
														type="number"
														:rules="rules"
														label="Amount"
														class="input-group--focused input-spin--hidden"
													>
													</v-text-field>
												</v-flex>
												<v-flex xs3>
													<v-select
														:items="currenciesArray"
														v-model="receivedCurrency"
														label="Currency"
														class="input-group--focused"
														item-value="text"
													></v-select>
												</v-flex>
											</v-layout>
										</v-flex>
									</v-layout>
									<v-card-actions class="pl-0">
										<v-btn type="submit"
											color="primary"
										>
											Next
										</v-btn>
									</v-card-actions>
								</v-form>
							</v-flex>
						</v-layout>
					</v-card-text>
				</v-card>
				<v-card class="mt-4">
					<v-card-title>
						<span>
							<strong> Be careful! </strong> We truncate amounts to fixed ones, according to following precision values:
						</span>&nbsp;&nbsp;&nbsp;
						<strong>
							{{ payCurrency }}: {{ this.$config.precision[payCurrency] }}&nbsp;&nbsp;
							{{ receivedCurrency }}: {{ this.$config.precision[receivedCurrency] }}
						</strong>
					</v-card-title>
				</v-card>
			</v-stepper-content>
			<v-stepper-content step="2">
				<v-card>
					<v-card-text>
						<v-form ref="walletForm" @submit.prevent="walletFormHandler">
							<v-text-field v-model.lazy="wallet"
								:rules="walletRules"
								label="Wallet address"
							>
							</v-text-field>
						</v-form>
					</v-card-text>
				</v-card>
				<v-card-actions class="pl-0">
					<v-btn @click="backHandler"
						type="button"
						color="default"
					>
						Back
					</v-btn>
					<v-btn @click="walletFormHandler"
						type="button"
						color="primary"
					>
						Next
					</v-btn>
				</v-card-actions>
			</v-stepper-content>
			<v-stepper-content step="3">
				step 3
			</v-stepper-content>
		</v-stepper-items>
	</v-stepper>
</template>

<script>
import validators from '@/tools/validators/ExchangeForm';

const x = ()=>0;
export default {
	name: 'index',
	pageTitle: 'What do you want to exchange?',
	data () {
		return {
			stepper: 1,
			isLocked: false,
			payCurrency: 'BTC',
			receivedCurrency: 'USD',
			payAmount: 1,
			receivedAmount: 1,
			rules: [ ...validators.v_common, ...validators.v_currency ],
			walletRules: [...validators.v_common, ...validators.v_wallet],
			wallet: '',
		};
	},
	async asyncData (ctx) {
		const currenciesArray = ['BTC','ETH','USD','EUR'];
		const { data } = await ctx.$axios.get(`https://min-api.cryptocompare.com/data/pricemulti?fsyms=${[...currenciesArray]}&tsyms=${[...currenciesArray]}`);
		//const data = {};
		return {
			currenciesArray,
			currencyData: data
		};
	},
	computed: {
		amountByRate () {
			return this.currencyData[this.payCurrency][this.receivedCurrency];
		}
	},
	watch: {
		payAmount () {
			this.payAmountHandler();
		},
		receivedAmount () {
			this.receivedAmountHandler();
		}
	},
	methods: {
		backHandler () {
			this.stepper--;
		},
		walletFormHandler () {
			if(!this.$refs.walletForm.validate()) return false;
			this.stepper = 3;
		},
		reverseHandler () {
			this.isLocked = true;

			const a = this.payCurrency;
			this.payCurrency = this.receivedCurrency;
			this.receivedCurrency = a;

			const b = this.payAmount;
			this.payAmount = this.receivedAmount;
			this.receivedAmount = b;

			this.isLocked = false;
			/*_.debounce(function () {
				this.isLocked = false;
			}, 500);*/
		},
		exchangeFormSubmitHandler () {
			if(!this.$refs.exchangeForm.validate()) return false;
			this.stepper = 2;
		},
		payAmountHandler () {
			if (this.isLocked) return;
			console.log('payAmountHandler', this.payAmount);
			this.isLocked = true;
			this.receivedAmount = _.toNumber((
				_.multiply(this.payAmount, this.amountByRate))
				.toFixed(this.$config.precision[this.receivedCurrency]));
			this.isLocked = false;
		},
		receivedAmountHandler () {
			if (this.isLocked) return;
			console.log('receivedAmountHandler', this.receivedAmount);
			this.isLocked = true;
			this.payAmount = _.toNumber((
				_.divide(this.receivedAmount, this.amountByRate))
				.toFixed(this.$config.precision[this.payCurrency]));
			this.isLocked = false;
		}
	},
	mounted () {
		this.receivedAmount = this.amountByRate;
		//this.stepper = this.$store.getters['exchange/stepperCurrent']
	}
}
</script>

<style>
    input::-webkit-outer-spin-button,
    input::-webkit-inner-spin-button {
        -webkit-appearance: none;
        margin: 0;
    }
</style>
