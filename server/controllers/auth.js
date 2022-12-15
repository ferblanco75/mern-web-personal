//vamos a crear una funcion register
//que lo que hace es devolverle al cliente un 200 y un mensaje TODO ok
//para exponerla en una ruta va a routers y lo que hace es 
//poner nuestra primera ruta
//en nuestro caso es un post api.post("/auth/register", AuthController.register);
//el tercer paso es pasarselo a express para que lo exponga entonces en app.js lo importa 
// y agrega una linea app.use(`/api/${API_VERSION}`,authRoutes); donde le muestra que rutas usar
const bcrypt = require("bcryptjs");
const user = require("../models/user");
const User = require("../models/user");
const jwt = require("../utils/jwt");


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

function login(req,res){
    const { email, password } = req.body;
    if (!email) res.status(400).send({ msg: "el email es obligatorio"});
    if (!password) res.status(400).send({ msg: "contraseña es obligatoria"});
    
    const emailLowerCase = email.toLowerCase();

    User.findOne({ email: emailLowerCase }, (error, userStore) => {
        if(error){
            res.status(500).send({ msg: "error del servidor" })
        } else {
            bcrypt.compare(password, userStore.password, (bcryptError, check) => {
                if(bcryptError) {
                    res.status(500).send({ msg: "error del servidor o pass incorrecto"});
                } else if (!check) {
                    res.status(400).send({ msg: " pass o user incorrecto"});
                } else if (!userStore.active) {
                    res.status(401).send({ msg: "usuario no autorizado o inactivo"});
                } else {
                    res.status(200).send({ 
                        access: jwt.createAccessToken(userStore),
                        refresh: jwt.createRefreshToken(userStore)
                    });
                }
            });
        }
    }); 
}

function refreshAccessToken (req, res){
    const { token } = req.body;
    const { user_id } = jwt.decoded(token);
    
    User.findOne ({_id: user_id}, (error, userStorage)=> {
        if(error) {
            res.status(500).send({ msg: "error del servidor"})
        } else {
            res.status(200).send({
                accessToken : jwt.createAccessToken(userStorage),
            })
        }
    });
}




module.exports = {
    register, login,
};