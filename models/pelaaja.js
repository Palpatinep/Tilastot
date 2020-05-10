const mongoose = require("mongoose");

const pelaajaSchema = new mongoose.Schema({

    playerName:{
        type: String,
        required: true
    },
    fifaWins:{
        type: Number,
        required: false
    },
    fifaLosses:{
        type: Number,
        required: false
    },
    fifaDraws:{
        type: Number,
        required: false
    },
    biljardiWins:{
        type: Number,
        required: false
    }
});

module.exports = mongoose.model("Pelaaja", pelaajaSchema);