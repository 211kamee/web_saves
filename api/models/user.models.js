import bcryptjs from 'bcryptjs';
import { Schema, model } from 'mongoose';
import jsonwebtoken from 'jsonwebtoken';

const userSchema = new Schema({
	fullname: {
		type: String,
		default: '',
		trim: true,
	},
	username: {
		type: String,
		lowercase: true,
		maxlength: [20, 'Username must be at least 4 to 20 characters long.'],
		minlength: [4, 'Username must be at least 4 to 20 characters long.'],
		required: true,
		trim: true,
		unique: true,
	},
	email: {
		type: String,
		lowercase: true,
		maxlength: [50, 'Email must be at most 50 characters long.'],
		minlength: [5, 'Email must be at least 5 characters long.'],
		required: true,
		trim: true,
		unique: true,
		validate: {
			validator: function (v) {
				return /\S+@\S+\.\S+/.test(v);
			},
			message: 'Invalid email format.',
		},
	},
	password: {
		type: String,
		required: true,
	},
	profilePicture: {
		type: String,
		default: '',
	},
});

userSchema.pre('save', async function (next) {
	if (this.isModified('password')) {
		const generatedSalt = await bcryptjs.genSalt();
		this.password = await bcryptjs.hash(this.password, generatedSalt);
		return next();
	}
	return next();
});

userSchema.methods.passwordMatch = async function (password) {
	return await bcryptjs.compare(password, this?.password || '');
};

userSchema.methods.tokenGenerator = function () {
	// Generate JWT Token and store it in variable
	const token = jsonwebtoken.sign({ _id: this._id }, process.env.JWT_SECRET, {
		expiresIn: process.env.JWT_EXPIRY,
	});
	return token;
};

const User = model('User', userSchema);

export default User;
