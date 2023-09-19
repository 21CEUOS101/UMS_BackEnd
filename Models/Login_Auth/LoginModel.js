const db = require('mongoose');
const bcrypt = require('bcrypt');

const LoginSchema = db.Schema({
    user_id: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
}); 

LoginSchema.pre('save', async function (next) {
    console.log('Pre save hook called');
    try {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(this.password, salt);
        this.password = hashedPassword;
        next();
    } catch (error) {
        next(error);
    }
});

module.exports = db.model('LoginSchema', LoginSchema);
