const mongoose = require("mongoose");

const biljardiSchema = new mongoose.Schema({

    tulos:{
        type: Number,
        required: true
    }
});

module.exports = mongoose.model("Biljardi", biljardiSchema);