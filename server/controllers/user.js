async function getMe(req,res){
    res.status(200).send({msg: "ok"});
}

module.exports = {
    getMe,
}