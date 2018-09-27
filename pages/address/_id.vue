<template>
	<section class="address">
		<v-container class="pa-0" grid-list-xl fluid>
			<h1>Bitcoin Address</h1>
			<v-layout wrap>
				<v-flex xs12 sm6>
					<v-card class="pa-2">
						<h3 class="pa-2"> Summary </h3>
						<v-divider/>
						<div class="pa-2">
							<span> Address: </span>
							<span>
								<i> {{ id }} </i>
							</span>
						</div>
					</v-card>
				</v-flex>
				<v-flex xs12 sm6>
					<v-card class="pa-2">
						<h3 class="pa-2"> Transactions </h3>
						<v-divider/>
						<v-card-text>
							<v-layout wrap>
								<v-flex xs6>
									No. Transactions
								</v-flex>
								<v-flex xs6>
									123
								</v-flex>
								<v-flex xs6>
									Total Received
								</v-flex>
								<v-flex xs6>
									123
								</v-flex>
								<v-flex xs6>
									Final Balance
								</v-flex>
								<v-flex xs6>
									{{ addressTotal }}
								</v-flex>
							</v-layout>
						</v-card-text>
						<v-divider/>
						<v-card-actions>
							<v-btn>
								Request payment
							</v-btn>
						</v-card-actions>
					</v-card>
				</v-flex>
				<v-flex xs12>
					<v-card class="pa-2">
						<v-card-title>
							<v-layout row wrap align-center>
								<v-flex xs12 sm6>
									<h2> Transactions </h2>
								</v-flex>
								<v-flex xs12 sm6>
									<v-select :items="selectItems"
										label="Filter"
										v-model="filter"
										single-line
									>
									</v-select>
								</v-flex>
							</v-layout>
						</v-card-title>
					</v-card>
				</v-flex>
			</v-layout>
		</v-container>
		<v-card v-for="(item, index) in (filter !== null ? filteredItems : items)"
			:key="index"
			class="mb-2"
		>
			<v-card-title class="justify-space-between">
				<nuxt-link :to="`/tx/${item.tx_id}`" class="text--trim" > {{ item.tx_id }} </nuxt-link>
				<span> {{ item.time }}</span>
			</v-card-title>
			<v-card-text>
				<v-layout row wrap>
					<v-flex xs12 sm6>
						<v-list>
							<v-subheader> Input payments </v-subheader>
							<v-list-tile v-for="(inputItem, index) in item.input"
								:key="index"
								class="align-start height--auto flex-direction-column"
							>
								<p>
									<v-divider/>
									<template v-if="inputItem.address !== id">
										<nuxt-link class="text--small text--trim"
											:to="`/address/${inputItem.address}`"
										>
											{{ inputItem.address }}
										</nuxt-link>
									</template>
									<template v-else>
										<span class="text--small text--trim">
											{{ inputItem.address }}
										</span>
									</template>
									<br/>
									<span class="text--small"> {{ inputItem.total }} </span>
									<v-divider/>
								</p>
							</v-list-tile>
						</v-list>
					</v-flex>
					<v-flex xs12 sm6>
						<v-list>
							<v-subheader> Output payments </v-subheader>
							<v-list-tile v-for="(outputItem, index) in item.output"
								:key="index"
								class="height--auto"
							>
								<p>
									<v-divider/>
									<template v-if="outputItem.address !== id">
										<nuxt-link class="text--small text--trim"
											:to="`/address/${outputItem.address}`"
										>
											{{ outputItem.address }}
										</nuxt-link>
									</template>
									<template v-else>
										<span class="text--small text--trim">
											{{ outputItem.address }}
										</span>
									</template>
									<br/>
									<span class="text--small"> {{ outputItem.total }} </span>
									<v-divider/>
								</p>
							</v-list-tile>
						</v-list>
					</v-flex>
				</v-layout>
			</v-card-text>
			<v-card-actions>
				<v-layout row wrap>
					<v-flex xs12 sm6>
						<v-btn class="disabled--custom pl-0"
							flat
							:color=" item.confirmations > 0 ? 'success' : 'warning' "
						>
							{{ item.confirmations }}  {{ item.confirmations > 1 ? 'Confirmations' : 'Confirmation' }}
						</v-btn>
					</v-flex>
					<v-flex xs12 sm6>
						<v-btn class="disabled--custom"
							:color=" item.total > 0 ? 'success' : 'error' "
						>
							{{ item.total }} BTC
						</v-btn>
					</v-flex>
				</v-layout>
			</v-card-actions>
		</v-card>
	</section>
</template>

<script>
export default {
	name: "addressId",
	validate( {params} ) {
		return params; // also can test on regular expression
	},
	data() {
		return {
			filter: null,
			filteredItems: this.items,
			selectItems: [
				{
					text: 'All',
					value: '*'
				},
				{
					text: 'Sent',
					value: 'sent'
				},
				{
					text: 'Received',
					value: 'received'
				},
				{
					text: 'Confirmed only',
					value: 'confirmed'
				},
				{
					text: 'Unconfirmed only',
					value: 'unconfirmed'
				}],
		}
	},
        // async asyncData( context ) {
        //     const data = await context.$axios.get(`/api/address/${context.params.id}`).then( res => res.data);
        //     return{
        //         id:    context.params.id,
        //         items: data.items,
        //     }
        // },
	computed: {
		addressTotal(){
                // todo change me after working API
			return 0.21585
		}
	},
	methods: {
		itemsFilter(items, filterValue){
			console.log('Filter was called: ', this.filter);
			switch (filterValue){
			case '*': this.filteredItems = items;
				break;
			case 'sent': this.filteredItems =
                        items.filter( item => item.input.some( inputItem => inputItem.address === this.id));
				break;
			case 'received': this.filteredItems =
                        items.filter( item => item.output.some( outputItem => outputItem.address === this.id));
				break;
			case 'confirmed': this.filteredItems = items.filter( item => item.confirmations > 0 );
				break;
			case 'unconfirmed': this.filteredItems = items.filter( item => item.confirmations < 1 );
				break;
			default: this.filteredItems = items;
				break;
			}
		}
	},
	watch: {
		filter: function (filterValue) {
			this.itemsFilter(this.items, filterValue)
		}
	},
	asyncData( context ) {
		return{
			id: context.params.id,
			items: [
				{
					tx_id: 'cad1ac89da7eb9cd2840f8c53cbf0df6cfe031542acbbfdb0f0cf489e3567927',
					time: '2018-06-25 09:46:23', // better will be use timestamp in ISO encoding with moment.js
					input: [
						{
							address: '3FWLryQRkZjbmGXWdmzy1sC8ybGBR1UT8i',
							total: 0.00461
						}
					],
					output: [
						{
							address: '1CdpRRvMDx8xRyXXG1sZ8p7tmu9dMxcAMp',
							total: 0.00461
						},
						{
							address: '3FWLryQRkZjbmGXWdmzy1sqwefrrtR1UT8i',
							total: 0.01461
						},
						{
							address: '3FLryQRkZjVGFJNmiomzy1sC8ybGBR1UT8i',
							total: 0.5046
						}
					],
					confirmations: 6,
					total: -0.00225
				},
				{
					tx_id: 'cad1ac89da7eb9cd2840f8sdc53cbf0df6cfe031542acbbfdb0f0cf489e3567927',
					time: '2018-06-25 09:46:23', // better will be use timestamp in ISO encoding with moment.js
					input: [
						{
							address: '1CdpRRvMDx8xRyXXG1sZ8p7tmu9dMxcAMp',
							total: 0.00461
						}
					],
					output: [
						{
							address: '3FWLryQRkZjbmGXWdmzy1sC8ybGBR1UT8i',
							total: 0.00461
						}
					],
					confirmations: 1,
					total: 0.00245
				},
				{
					tx_id: 'cad1ac89da7eb9cd2840f8c53cbf0d32f6cfe031542acbbfdb0f0cf489e3567927',
					time: '2018-06-25 09:46:23', // better will be use timestamp in ISO encoding with moment.js
					input: [
						{
							address: '1CdpRRvMDx8xRyXXG1sZ8p7tmu9dMxcAMp',
							total: 0.00461
						}
					],
					output: [
						{
							address: '3FWLryQRkZjbmGXWdmzy1sC8ybGBR1UT8i',
							total: 0.00461
						}
					],
					confirmations: 5,
					total: 0.45689
				},
				{
					tx_id: 'cad1ac89da7eb9cd2840f8c53cbf0df6cfe031542acbbfdb0f0cf489e35698767927',
					time: '2018-06-25 09:46:23', // better will be use timestamp in ISO encoding with moment.js
					input: [
						{
							address: '1CdpRRvMDx8xRyXXG1sZ8p7tmu9dMxcAMp',
							total: 0.00461
						}
					],
					output: [
						{
							address: '3FWLryQRkZjbmGXWdmzy1sC8ybGBR1UT8i',
							total: 0.00461
						}
					],
					confirmations: 0,
					total: -0.85201
				}
			]
		}
	}
}
</script>

<style scoped>

</style>