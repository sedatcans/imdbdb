var express =require('express');
var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/imdb');


var directorSchema=new mongoose.Schema({
    "_id":Number,
    "name":String,
    "imdb":String
});

var genreSchema=new mongoose.Schema({
    "_id":mongoose.Schema.Types.ObjectId,
    "name":String
});

var movieSchema=new mongoose.Schema({
    "_id":Number,
    "title":String,
    "year":Number,
    "imdb":String,
    "directors":[directorSchema],
    "genres":[genreSchema]
});

var Movie =mongoose.model('movies2',movieSchema);
var Movie1 =mongoose.model('movies1',movieSchema);

var app=express();

app.set('views',_dirName+ '/server/views');
app.set('view-engine','jade');
app.use(express.static(_dirName +'/public'));

app.get('/movies/byImdb/:imdb',function(req,res)
{
    Movie.find({imdb:req.params.imdb},function(err,result)
    {
        res.set('Content-Type','application/json');
        res.status(200).send(result);
    });
});

app.get('/genres',function(req,res)
{
    Movie1.distinct('genres.name',function(err,result)
    {
        res.set('Content-Type','application/json');
        res.status(200).send(result);
    });
});

app.get('/movies/search/:from/:to/:genre',function(req,res)
{
    Movie1.find({
        $and :[
            {"year" : {$gte : req.params.from}},
            {"year" : {$lte : req.params.to}},
            {"genres.name" :{$in :[req.params.genre] }}
        ]}).sort({"year":-1}).exec(function(err,movies){
        console.log(req.params.to);
        res.set('Content-Type','application/json');
        res.status(200).send(movies);
    });



});
app.get("/",function(req,res)
{
    res.render('index');
});
var port =8001;
app.listen(port);