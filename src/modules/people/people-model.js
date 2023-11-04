import mongoose from "mongoose";

const peopleSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        unique: true
    }
})

export default mongoose.model('People', peopleSchema)