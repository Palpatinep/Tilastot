const mongoose = require("mongoose");

const fifaSchema = new mongoose.Schema({

    result:{
        type: String,
        required: true
    }
});

module.exports = mongoose.model("Fifa", fifaSchema);