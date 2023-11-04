import mongoose from "mongoose";

const planetSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        unique: true
    }
})

export default mongoose.model('Planet', planetSchema)