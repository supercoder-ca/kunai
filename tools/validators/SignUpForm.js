const validators = {};

validators.v_common = [
	v => !! v || 'This field is required'
];
validators.v_password = [ ...validators.v_common,
    // after form reset password field stay 'null'
	v => (v || '').length >= 8 || 'Must be at least 8 symbols long'
];
validators.v_email = [ ...validators.v_common,
    // @todo add regexp
	v => !! v || 'e-mail must be valid' //  THERE WAS INCORRECT REGEXP
];

export default validators;