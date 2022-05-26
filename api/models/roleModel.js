"use strict";
const mongoose = require("mongoose");
const roleSchema = new mongoose.model(
    "Role",
    new mongoose.Schema({
        name: String
    })
);
module.exports = mongoose.model('BBY_36_role', roleSchema)