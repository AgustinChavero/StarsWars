import mongoose from "mongoose";

const starshipSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        unique: true
    }
})

export default mongoose.model('Starship', starshipSchema)