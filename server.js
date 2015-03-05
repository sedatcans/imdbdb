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

var app=express();

app.get('/movies/byImdb/:imdb',function(req,res)
{
    Movie.find({imdb:req.params.imdb},function(err,result)
    {
        res.set('Content-Type','application/json');
        res.status(200).send(result);
    });
});

var port =8001;
app.listen(port);