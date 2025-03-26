import mongoose from 'mongoose';

const taskSchema = new mongoose.Schema({
    uid: {
        type: String,
        required: true,
        unique: true,
    },
    title: {
        type: String,
        required: true,
    },

    description: {
        type: String,
        required: false
    },
    completed: {
        type: Boolean,
        default: false
    }
}, {
    timestamps: true
});

export default mongoose.model('Task', taskSchema);
