const mongoose = require("mongoose");
const {DB_USER, DB_HOST, DB_PASSWORD,IP_SERVER, API_VERSION } = require("./constants");
const app = require("./app");

//defino el pueerto en que se levanta nuestor server http
const port = process.env.POST || 3997;


mongoose.connect(`mongodb+srv://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/`, (error)=> {
    if (error) throw error;
    app.listen(port,()  => {
        console.log("#####################");
        console.log("########API REST ##");
        console.log("#####################");
        console.log(`http://${IP_SERVER}:${port}/api/${API_VERSION}/`)
    })        
});