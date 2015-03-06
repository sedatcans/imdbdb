function ImdbViewModel(){
    var self = this;
    self.fromYear = ko.observable(1970);
    self.toYear = ko.observable(1979);
    self.genre = ko.observable("Comedy");
    self.genres = ko.observableArray([]);
    self.movies = ko.observableArray([]);
    self.search = function() {
        $.ajax({
            method: 'GET',
            url: "http://localhost:8001/movies/search/"
                + self.fromYear() + "/"
                + self.toYear() + "/"
                + self.genre(),
            success: function(movies) {
                self.movies(movies);
            }
        });
    };
    self.init = function(){
        $.ajax({
            method: 'GET',
            url: "http://localhost:8001/genres",
            success: function (genres) { //genres=>ajax tan gelen cevap/response. istenen degisken ismi olabilir.
                self.genres(genres);
            }
        });
    };
};

var viewModel = new ImdbViewModel();
$('document').ready(function(){
    ko.applyBindings(viewModel);
    viewModel.init();
});