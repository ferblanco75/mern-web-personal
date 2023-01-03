const mongoose = require("mongoose");
const mongoosePaginate = require("mongoose-paginate"); 

//aca creamos como debe ser un Course para mongoose, osea como los guarda
//y los accede en la base de datos de mongo atlas
const CourseSchema = mongoose.Schema({
    title: String,
    miniature: String,
    description: String,
    url: String,
    price: Number,
    score: Number,
});

CourseSchema.plugin(mongoosePaginate);

module.exports = mongoose.model("Course", CourseSchema);