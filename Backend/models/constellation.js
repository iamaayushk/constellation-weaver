const mongoose = require("mongoose");

const constellationSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    points: [
        {
            x: {
                type: Number,
                required: true,
            },
            y: {
                type: Number,
                required: true
            },
        }
    ],
    name:
    {
        type: String,
        required: true
    },
    meaning:
    {
        type: String,
        required: true
    },
    story:
    {
        type: String,
        
    },
    createdAt:
    {
        type: Date,
        default: Date.now
    },
});

module.exports = mongoose.model("Constellation", constellationSchema);