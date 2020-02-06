const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        validate: value => {
            if (!validator.isEmail(value)) {
                throw new Error({error: 'Invalid Email address'})
            }
        }
    },
    password: {
        type: String,
        required: true,
        minLength: 7
    },
    tokens: [{
        token: {
            type: String,
            required: true
        }
    }]
});

userSchema.pre('save', async function (next) {
    // Hash the password before saving the user model
    const user = this;
    if (user.isModified('password')) {
        user.password = await bcrypt.hash(user.password, 8)
    }
    next()
});

userSchema.methods.generateAuthToken = async function() {
    console.log("generateAuthToken");
    // Generate an auth token for the user
    const user = this;
    const token = jwt.sign({_id: user._id}, "HELLO");
    user.tokens = user.tokens.concat({token});
    await user.save();
    return token
};

userSchema.statics.findByCredentials = async (email, password) => {
    console.log("findByCredentials");
    // Search for a user by email and password.
    const user = await User.findOne({ email} );
    console.log(`findByCredential : email = ${email} : ${password}`);
    if (!user) {
        console.log("error : !user");
        throw new Error({ error: 'Invalid login credentials' })
    }
    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch) {
        console.log("error : !isPasswordMatch");
        throw new Error({ error: 'Invalid login credentials' })
    }
    return user
};

const User = mongoose.model('User', userSchema);

module.exports = User;