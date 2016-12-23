var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

//mongoose // mongoDB ODM
mongoose.connect(
    'mongodb://ds143588.mlab.com:43588/nodecamp03',
    {user:'seok', pass:'tmzpsekfk1'}
);
//1. 스키마생성
var studentSchema = new Schema({
    // name : {type : String, unique:true }
    name: String,
    email : {type:String, unique:true}
    //email : String
});
//2. 모델생성
var Student = mongoose.model("Student", studentSchema);

var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.get('/',function(req,res,next){
    return res.send('hello world');
});
app.get('/students', function(req,res,next){
    Student.find({}, function(error, students){
        if(error) return res.json(error);
        return res.json(students);
    });
});
app.post('/students', function(req,res,next){
    var name = req.body.name;
    var email = req.body.email;
    var student = new Student({
        name:name,
        email:email
    });
    student.save(function(error){
        if (error) return res.json(error);
        return res.send('Successfully Created');
    });
});

app.listen(3000, function () {
  console.log('Example app listening on port 3000');
});
