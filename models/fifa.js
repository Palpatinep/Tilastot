const mongoose = require("mongoose");

const fifaSchema = new mongoose.Schema({

    resultHome:{
        type: Number,
        required: true
    },
    resultAway:{
        type: Number,
        required: true
    },
    pelaajaHome:{
        type: String,
        required: true
    },
    pelaajaAway:{
        type: String,
        required: true
    },
});

module.exports = mongoose.model("Fifa", fifaSchema);