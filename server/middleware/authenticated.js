const jwt = require("../utils/jwt");

function asureAuth(req,res,next){
    if(!req.headers.authorization) {
        res.status(403).send({msg: "la peticion no tiene cabecera de autenticacion"})
    }
    try {
        const payload = jwt.decoded;

        const { exp } = payload;
        const  currentData = new Date().getTime();
        console.log(currentData);
        console.log(exp);

        if (exp <= currentData ){
            return res.status(400).send({msg: "El token ha expirado"});
        }
        req.user(payload);
        next(); 
    } catch (error) {
        return res.status(400).send({msg: "token invalido"})
    }
}

module.exports = {
    asureAuth,
};