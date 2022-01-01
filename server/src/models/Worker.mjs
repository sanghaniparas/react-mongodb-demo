import mongoose from 'mongoose'


const WorkerSchema = new mongoose.Schema ({
    ownerId: { type: mongoose.Types.ObjectId, required: true, ref: 'user' }, 
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    gender: { type: String, enum: ['man', 'woman'], required: true },
    contacts: { type: String, required: true },
    salary: {type: Number, required: true},
    position: { type: String, required: true },
}, {
    timestamps: true,
})

export default mongoose.model('worker', WorkerSchema);