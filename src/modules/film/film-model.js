import mongoose from "mongoose";

const filmSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        unique: true
    }
})

export default mongoose.model('Film', filmSchema)