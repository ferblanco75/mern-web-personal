const mongoose = require("mongoose");

//aca creamos como debe ser un Course para mongoose, osea como los guarda
//y los accede en la base de datos de mongo atlas
const courseSchema = mongoose.Schema({
    title: String,
    miniature: String,
    description: String,
    url: String,
    price: Number,
    score: Number,
});

module.exports = mongoose.model("Course", courseSchema);