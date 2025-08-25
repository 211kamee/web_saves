export const isAlphaNumeric = (str) => {
	var code, i, len;

	for (i = 0, len = str.length; i < len; i++) {
		code = str.charCodeAt(i);
		if (
			!(code > 47 && code < 58) && // numeric (0-9)
			!(code > 64 && code < 91) && // upper alpha (A-Z)
			!(code > 96 && code < 123) // lower alpha (a-z)
		)
			return false;
	}
	return true;
};

export const cookiesOptions = {
	httpOnly: true, // Prevents client-side JavaScript from accessing the cookie, reducing the risk of XSS attacks
	secure: true, // When true, the cookie is only sent over HTTPS; if false, it can be sent over HTTP as well.
	sameSite: 'None', // Prevent cross-site request forgery attacks or CRSF attacks
	partitioned: true,
	maxAge: 30 * 24 * 60 * 60 * 1000,
};

export const ORIGIN = ['https://chatterz.pages.dev', 'http://localhost:5173'];
