export const removeAmpersandCodeFromArray = (str) => {
	const ampersandCode = /&#038;/g;

	if (typeof str === 'string') {
		return str.replace(ampersandCode, '&');
	}
	return str;
};
export const getDirection = (lat, long) => {
	// Replace the latitude and longitude with your desired coordinates
	const latitude = lat;
	const longitude = long;

	// Construct the Google Maps URL
	const mapsUrl = `https://www.google.com/maps?q=${latitude},${longitude}`;

	// Open the URL in a new tab or window
	window.open(mapsUrl, '_blank');
};
