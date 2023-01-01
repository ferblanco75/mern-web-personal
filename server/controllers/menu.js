const Menu = require("../models/menu");

async function createMenu(req,res){
    const menu = new Menu(req.body)
    
    menu.save((error, menuStored)=> {
        if(error){
            res.status(400).send({ msg: "error al crear el menu"});
        } else {
            res.status(200).send(menuStored);
        } 
    });
}

//obtengo todos los menus
async function getMenus(req,res){
    const { active } = req.query;
    let response = null;
    if (active === undefined){
        response = await Menu.find().sort({ order: "asc"});
    } else {
        response = await Menu.find( {active});
    }
    if(!response) {
        res.status(400).send({ msg: "no se encontró ningun menu" });
    } else {
        res.status(200).send(response);
    }
}

async function updateMenu(req,res){
    const { id } = req.params;
    const menuData = req.body;
    Menu.findByIdAndUpdate({ _id: id }, menuData, (error) =>  {
        if(error){
            res.status(400).send({ msg: "error, no se pudo actualizar el menu"});
        } else {
            res.status(200).send({ msg: "actualizacion correcta"});
        }
    });
}

async function deleteMenu(req,res){
    const { id } = req.params;
    Menu.findByIdAndDelete(id, (error)=> {
        if(error){
            res.status(400).send({ msg: "error, no se pudo borrar el menu" })
        } else {
            res.status(200).send({msg: "menu eliminado"});
        }
    });
}


module.exports = { 
    createMenu, 
    getMenus,
    updateMenu,
    deleteMenu,
};