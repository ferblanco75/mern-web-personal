const User = require("../models/user");
const bcrypt = require("bcryptjs");
const image = require("../utils/image");


//GET ME me trae datos del usuario qeu le paso el token por header,
//tiene que ser un usuario activo y logueado
async function getMe(req,res){
    const { user_id } = req.user;
    const response = await User.findById(user_id);

    if (!response) {
        res.status(400).send({ msg: "no se encuentra el usuario buscado" })
    } else {
        res.status(200).send({ msg: "todo ok" });
    }
}

//VOY A HACER UN ENDPOINT QUE ME TRAE TODOS LOS USUARIOS 
//se va a llamer getUsers  
//luego de creado lo armo en el router
async function getUsers(req,res){
        const { active } = req.query;
        let response = null;
        if (active === undefined){
            response = await User.find();
        } else {
            response = await User.find( {active});
        }
        //console.log(response);
        res.status(200).send(response);
}

async function createUser(req,res){
    const { password } = req.body;
    const user = new User({ ...req.body, active: false });
    //encripta el password con el salt que le da bcrypt
    const salt = bcrypt.genSaltSync(10);
    const hasPassword = bcrypt.hashSync(password,salt);
    user.password = hasPassword;

    if(req.files.avatar){
        //TODO : completar la funcion de procesar
        //console.log("procesar avatar");
        const imagePath = image.getFileName(req.files.avatar);
        user.avatar = imagePath;
    }
    user.save((error, userStore)=> {
        if(error){
            res.status(500).send({ msg: "error al crear, no se guardo el usuario"})
        } else {
            res.status(201).send( { msg: "usuario creado ok"})
        }
    } )
}


async function updateUser(req,res){
    const { id } = req.params;
    const userData = req.body;
    if(userData.password){
        const salt = bcrypt.genSaltSync(10);
        const hashPassword = bcrypt.hashSync(userData.password, salt);
        userData.password = hashPassword;
    } else {
        delete userData.password;
    }

    // Avatar
    if(req.files.avatar){
        const imagePath = image.getFileName(req.files.avatar);
        userData.avatar = imagePath;
    }
    
    User.findByIdAndUpdate({_id: id }, userData, (error)  => {
        if(error) {
            res.status(400).send({ msg: "Error al actualizar el usuario" });
        } else {
            res.status(200).send({ msg: "Actualizacion correcta" }); 
        }
    })
}

async function deleteUser(req, res){
    const { id } = req.params;
    User.findByIdAndDelete(id, (error) => {
        if(error){
            res.status(400).send({ msg: "Error al borrar el usuario" });
        } else{
            res.status(200).send({ msg: "usuario eliminado" }); 
        }
    }) 
}




module.exports = {
    getMe,getUsers,createUser,updateUser,deleteUser,
};  