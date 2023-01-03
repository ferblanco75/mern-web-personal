const Post = require("../models/post");
const image = require("../utils/image");

//functions que definen las acciones de la api
function createPost(req,res){
    const post = new Post(req.body);
    post.created_at = new Date();
    const imagePath = image.getFileName(req.files.miniature);
    post.miniature = imagePath;

    post.save((error, postStored) => {
        if(error) {
            res.status(400).send({msg: "error no se creo el post"});
        } else {
            res.status(201).send(postStored);
        }
    }) 
}


function getPosts(req,res){
    const { page=1, limit=10 } = req.query;
    const options = {
        page: parseInt(page),
        limit: parseInt(limit),
        sort: {
            created_at: "desc"
        },
    } 
    Post.paginate({}, options, (error, postsStored) => {
        if(error){
            res.status(400).send({ msg: "error al listar los posts"});
        } else {
            res.status(200).send(postsStored);
        }
    })
}

function updatePost(req,res){
    const { id } = req.params;
    const postData = req.body;
    //voy a actualizar la imagen si el usr quiere
    if(req.files.miniature){
        const imagePath = image.getFileName(req.files.miniature);
        postData.miniature = imagePath;
    }
    Post.findByIdAndUpdate({ _id:id }, postData, (error) => {
        if(error){
            res.status(400).send({msg: "error al actualizar el post"});
        } else {
            res.status(200).send({ msg: "post actualizado"});
        }
    })
}

function deletePost(req,res){
    const {id } = req.params;
    Post.findByIdAndDelete(id, (error) => {
        if(error){
            res.status(400).send({msg: "Error no se pudo borrar el post indicado"});
        } else {
            res.status(200).send({ msg: "post eliminado"});
        }
    })
}

function getPost(req,res){
    const { path } = req.params;

    Post.findOne({path} , (error, postStored)=> {
        if(error) {
            res.status(500).send({msg: "error del servidor"});
        } else if (!postStored) {
            res.status(400).send({ msg: "no se encontro el post indicado"});
        } else {
            res.status(200).send(postStored);
        }
    });
}


module.exports = { createPost, getPosts, updatePost, deletePost, getPost, };



