var express = require('express');
var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/imdb');

var directorSchema = new mongoose.Schema({
    "_id": mongoose.Schema.Types.ObjectId,
    "name": String,
    "imdb": String
});

var genreSchema = new mongoose.Schema({
    "_id": mongoose.Schema.Types.ObjectId,
    "name": String
});

var movieSchema = new mongoose.Schema({
    "_id": mongoose.Schema.Types.ObjectId,
    "title": String,
    "year": Number,
    "imdb": String,
    "directors": [directorSchema],
    "genres": [genreSchema]
});

var Movie = mongoose.model('movies1', movieSchema);

var app = express();

app.set('view engine', 'jade');
app.set('views', __dirname + '/server/views');
app.use(express.static(__dirname + '/public'));

app.get('/movies/byImdb/:imdb', function(req, res){
    Movie.find({imdb: req.params.imdb}, function (err, result){
        res.set('Content-Type', 'application/json');
        res.status(200).send(result);
    });
});

app.get('/movies/byGenre/:genre', function(req, res){
    Movie.find({'genres.name': req.params.genre}, function (err, result){
        res.set('Content-Type', 'application/json');
        res.status(200).send(result);
    });
});

app.get('/genres', function(req, res){
    Movie.distinct('genres.name', function (err, result){
        res.set('Content-Type', 'application/json');
        res.status(200).send(result);
    });
});

app.get('/movies/search/:from/:to/:genre', function(req, res){
    Movie.find({
        $and: [
            {"year"         : {$gte: req.params.from}},
            {"year"         : {$lte: req.params.to}},
            {"genres.name"  : {$in: [req.params.genre]}}
        ]
    }).sort({"year": -1}).exec(function (err, movies){
        res.set('Content-Type', 'application/json');
        res.status(200).send(movies);
    });
});

app.get('/', function(req, res){
    res.render('index');
});

var port = 8001;
app.listen(port);
console.log('Server is running...');