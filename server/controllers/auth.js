//vamos a crear una funcion register
//que lo que hace es devolverle al cliente un 200 y un mensaje TODO ok
//para exponerla en una ruta va a routers y lo que hace es 
//poner nuestra primera ruta
//en nuestro caso es un post api.post("/auth/register", AuthController.register);
//el tercer paso es pasarselo a express para que lo exponga entonces en app.js lo importa 
// y agrega una linea app.use(`/api/${API_VERSION}`,authRoutes); donde le muestra que rutas usar
const bcrypt = require("bcryptjs");
const User = require("../models/user");


function register(req,res){
    const {firstname, lastname, email, password} = req.body;
    if (!email) res.status(400).send({ msg: "email obligatorio"});
    if (!password) res.status(400).send({ msg: "password obligatorio"});

    const user = new User({
        firstname,
        lastname,
        email : email.toLowerCase(),
        active: false,
        role: "user",
        password,
    });
    const salt = bcrypt.genSaltSync(10);
    const hashPassword = bcrypt.hashSync(password, salt);

    user.password = hashPassword;
    //al hacer el user.save guarda el usuario en la base de datos
    //la funcion devuelve un callback
    user.save((error, userStorage)=> {
        if(error){
            res.status(400).send({ msg: "Error al crear usuario" });
        } else {
            res.status(200).send(userStorage);
        }
    }
    )
}


module.exports = {
    register,
};