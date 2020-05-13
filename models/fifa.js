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
    winner:{
        type: String,
        required: false
    },
    loser:{
        type: String,
        required: false
    },
    drawnplayerhome:{
        type: String,
        required: false
    },
    drawnplayeraway:{
        type: String,
        required: false
    },
    lumierat:{
        type: Boolean,
        required: false
    },
    MatchDate:{
        type: Date,
        required: false
    }
});

module.exports = mongoose.model("Fifa", fifaSchema);