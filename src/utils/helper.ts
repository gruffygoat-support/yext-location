export const removeAmpersandCodeFromArray = (str) => {
	const ampersandCode = /&#038;/g;

	if (typeof str === 'string') {
		return str.replace(ampersandCode, '&');
	}
	return str;
};
