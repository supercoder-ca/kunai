const validators = {};

validators.v_common = [
	v => !! v || 'This field is required'
];

export default validators;