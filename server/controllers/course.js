const { findByIdAndDelete } = require("../models/course");
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
    const { page=1, limit=10} = req.query;
    const options = {
        page: parseInt(page),
        limit: parseInt(limit),
    }; 
    Course.paginate({}, options, (error, courses)=> {
        if(error){
            res.status(400).send({ msg: "error al obtener los cursos"})
        } else {
            res.status(200).send(courses);
        }
    }); 
}

//actualizo el curso que le paso en por query
function updateCourse(req,res){
    const { id } = req.params;
    const courseData = req.body;

    if(req.files.miniature){
        const imagePath = image.getFileName(req.files.miniature);
        courseData.miniature = imagePath;
    }
    Course.findByIdAndUpdate({ _id: id }, courseData, (error)=> {
        if(error){
            res.status(400).send({ msg: "error al actualizar el curso"});
        } else {
            res.status(200).send({ msg: "actualizacion correcta"});
        }
    });
}

function deleteCourse(req,res){
    const { id } = req.params;

    Course.findByIdAndDelete(id, (error) => {  
        if(error){
            res.status(400).send({msg: "no se pudo borrar el curso indicado"});
        } else {
            res.status(200).send({ msg: "curso eliminado"});
        }
  });   
}


module.exports = { 
    createCourse, getCourses, updateCourse, deleteCourse
};