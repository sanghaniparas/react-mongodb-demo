import mongoose from 'mongoose'


const UserSchema = new mongoose.Schema ({
    _id: { type: mongoose.Types.ObjectId, required: true }, 
    login: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: false },
})

export default mongoose.model('user', UserSchema);