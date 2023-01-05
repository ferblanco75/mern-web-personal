const Newsletter = require("../models/newsletter");


//functions que definen que hacer en el modelo
function suscribeEmail(req,res){
    const { email } = req.body;

    if(!email) res.status(400).send({msg: "email obligatorio"});

    const newsletter = new Newsletter({
        email: email.toLowerCase(),
    });
    //
    newsletter.save((error)=> {
        if(error){
            res.status(400).send({msg: "el email ya esta registrado"});
        } else {
            res.status(200).send({msg: "email suscripto correctamente"});
        }
    })
}

function getEmails(req,res){
   const { page=1, limit=10 } = req.query;

   const options = {
    page: parseInt(page),
    limit: parseInt(limit),
   };
   Newsletter.paginate({ }, options, (error, emailsStored) => {
        if(error){
            res.status(400).send({msg:  "error al obtener los emails "});
        } else {
            res.status(200).send(emailsStored);
        }
   });
}

function deleteEmail(req,res){
    const { id } = req.params;
    Newsletter.findByIdAndDelete(id, (error)=> {
        if(error){
            res.status(400).send({ msg: "no se pudo borrar el email indicado"});
        } else {
            res.status(200).send({msg: "email eliminado"});
        }
    })
}


module.exports = {suscribeEmail, getEmails, deleteEmail,};
