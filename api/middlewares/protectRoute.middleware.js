import jsonwebtoken from 'jsonwebtoken';
import User from '../models/user.models.js';

const protectRoute = async (req, res, next) => {
	try {
		const token = req.cookies.token;

		if (!token) {
			return res.status(500).json(`Login! Currently not authenticated.`);
		}

		const decodedToken = jsonwebtoken.verify(
			token,
			process.env.JWT_SECRET,
			(err, token) => (err ? null : token)
		);

		if (!decodedToken) {
			return res.status(500).json(`Login again! Session expired.`);
		}

		const user = await User.findOne({ _id: decodedToken._id }).select(
			'-password'
		);

		if (!user) {
			return res
				.status(500)
				.json(`Login again! Unable to find the User!`);
		}

		req.user = user;

		next();
	} catch (error) {
		res.status(500).json(error.message);
	}
};
export default protectRoute;
