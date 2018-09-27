<template>
	<div>
		<h1>
			Transaction
		</h1>
		<span> <i>{{ id }}</i> </span>
		<v-card>
			<v-card-text>
				<v-layout row wrap>
					<v-flex xs12 sm6>
						<v-list>
							<v-subheader> Input payments </v-subheader>
							<v-list-tile v-for="(inputItem, index) in tx.address.input"
								:key="index"
								class="align-start height--auto flex-direction-column"
							>
								<p>
									<v-divider/>
									<nuxt-link class="text--small text--trim"
										:to="`/address/${ inputItem.address }`"
									>
										{{ inputItem.address }}
									</nuxt-link>
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
							<v-list-tile v-for="(outputItem, index) in tx.address.output"
								:key="index"
								class="height--auto"
							>
								<p>
									<v-divider/>
									<nuxt-link class="text--small text--trim"
										:to="`/address/${outputItem.address}`"
									>
										{{ outputItem.address }}
									</nuxt-link>
									<br/>
									<span class="text--small"> {{ outputItem.total }} </span>
									<v-divider/>
								</p>
							</v-list-tile>
						</v-list>
					</v-flex>
				</v-layout>
			</v-card-text>
		</v-card>
		<v-container grid-list-xl class="px-0">
			<v-layout row wrap>
				<v-flex xs12 sm6>
					<v-card>
						<v-subheader>
							Summary
						</v-subheader>
						<v-card-text>
							<table class="table">
								<tr>
									<td>
										Size
									</td>
									<td>
										{{ tx.summary.size }}
									</td>
								</tr>
								<tr>
									<td>
										Weight
									</td>
									<td>
										{{ tx.summary.weight }}
									</td>
								</tr>
								<tr>
									<td>
										Received Time
									</td>
									<td>
										{{ tx.summary.time }}
									</td>
								</tr>
								<tr>
									<td>
										Included in Blocks
									</td>
									<td>
										{{ tx.summary.incBlocks }}
									</td>
								</tr>
								<tr>
									<td>
										Confirmation
									</td>
									<td>
										{{ tx.summary.confirmations }}
									</td>
								</tr>
							</table>
						</v-card-text>
						<v-card-actions>
							<v-btn color="info"
								nuxt
								:to="`/tree/${id}`"
							>
								View Tree Chart
							</v-btn>
						</v-card-actions>
					</v-card>
				</v-flex>
				<v-flex xs12 sm6>
					<v-card>
						<v-subheader>
							Inputs and Outputs
						</v-subheader>
						<v-card-text>
							<table class="table">
								<tr>
									<td>
										Total Input
									</td>
									<td>
										{{ tx.info.totalInput }} BTC
									</td>
								</tr>
								<tr>
									<td>
										Total Output
									</td>
									<td>
										{{ tx.info.totalOutput }} BTC
									</td>
								</tr>
								<tr>
									<td>
										Fees
									</td>
									<td>
										{{ tx.info.fees }} BTC
									</td>
								</tr>
								<tr>
									<td>
										Fee per byte
									</td>
									<td>
										{{ tx.info.feePerByte }} sat/B
									</td>
								</tr>
								<tr>
									<td>
										Fee per weight unit
									</td>
									<td>
										{{ tx.info.feePerWeight }} sat/WU
									</td>
								</tr>
								<tr>
									<td>
										Estimated BTC Transacted
									</td>
									<td>
										{{ tx.info.estimate }} BTC
									</td>
								</tr>

							</table>
						</v-card-text>
					</v-card>
				</v-flex>
			</v-layout>
		</v-container>
	</div>
</template>

<script>
export default {
	name: "txId",
	asyncData(context){
            // @todo change after working API
            // const tx_response = await context.$axios.get('`api/tx/${context.params.id}`');
		return{
			id: context.params.id,
			tx: {
				summary: {
					size: 224,
					weight: 896,
					time: '2018-06-25 09:18:20',
					incBlocks: 529155,
					confirmations: 292
				},
				info: {
					totalInput: 0.034168,
					totalOutput: 0.033048,
					fees: 0.00112,
					feePerByte: 500,
					feePerWeight: 125,
					estimate: 0.0207732

				},
				address: {
					input: [
						{
							address: '1CdpRRvMDx8xRyXXG1sZ8p7tmu9dMxcAMp',
							total: 0.0207732
						}
					],
					output: [
						{
							address: '34r1S1RZmw56UZQkv9BhQxpfNGBh48FcRB',
							total: 0.0122748
						}
					]
				}
			}
		}
	}
}
</script>

<style scoped>
    .table tr {
        border-bottom: 1px solid white;
    }
    .table td {
        padding: 8px;
    }
</style>