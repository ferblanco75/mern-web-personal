const mongoose = require("mongoose");
const mongoosePaginate = require("mongoose-paginate");

const NewsletterSchema = mongoose.Schema({
    email: {
        type: String,
        unique: true,

    },
});

//con este plugin tenemos acceso a la paginación en nuestro modelo  
NewsletterSchema.plugin(mongoosePaginate);

module.exports = mongoose.model("Newsletter", NewsletterSchema);