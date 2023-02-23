import mongoose from 'mongoose'
const Schema = mongoose.Schema;

const userSchema = Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String },
    created_at: { type: Date, default: new Date() },
    resetToken: String,
    expireToken: Date
})

const User = mongoose.models.User || mongoose.model('User', userSchema)
export default User