const Course = require("../models/course");
const image = require("../utils/image");

//functions
function createCourse(req,res){
    const course = new Course(req.body);

    const imagePath = image.getFileName(req.files.miniature);
    //image.getFileName(req.files.miniature);
    course.miniature = imagePath;
    course.save(((error, courseStored)=> {
        if(error){
            res.status(400).send({msg: "error , no se pudo crear el curso"});
        } else {
            res.status(201).send(courseStored);
        }
    }))
}

function getCourses(req,res){
    Course.find((error, courses) => {
        if(error){
            res.status(400).send({msg:"error al obtener los cursos"});
        } else {
            res.status(200).send(courses);
        }
    })
}



module.exports = { 
    createCourse, getCourses 
};