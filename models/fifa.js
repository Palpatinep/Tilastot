const mongoose = require("mongoose");

const fifaSchema = new mongoose.Schema({

    tulos:{
        type: Number,
        required: true
    }
});

module.exports = mongoose.model("Fifa", fifaSchema);