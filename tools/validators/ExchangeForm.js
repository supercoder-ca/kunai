const validators = {};

validators.v_common = [
	v => !! v || 'This field is required'
];

validators.v_currency = [
    // @todo change validation
	v => /[1-9][0-9]*(?:\/[1-9][0-9])*/.test(v) || 'Only number'
];

validators.v_wallet = [
	v => /^[13][a-km-zA-HJ-NP-Z0-9]{26,33}$/igm.test(v) || 'Wallet is invalid'
];

export default validators;