const mongoose = require("mongoose");

const biljardiSchema = new mongoose.Schema({   
    game:{
        type: String,
        required: true
    },
    winner:{
        type: String,
        required: true
    },
    loser:{
        type: String,
        required: true
    },
    lumierat:{
        type: Boolean,
        required: true
    },
    MatchDate:{
        type: Date,
        required: false
    }
});

module.exports = mongoose.model("Biljardi", biljardiSchema);