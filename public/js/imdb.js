/**
 * Created by TTSSONAT on 05/03/2015.
 */
function ImdbViewModel()
{
    self.fromYear=ko.observable(1970);
    self.toYear=ko.observable(1979);
    self.genre=ko.observable("Drama");
    self.genres=ko.observableArray([]);
    self.movies=ko.observableArray([]);
    self.search=function()
    {
        console.log('Clicked');

    };
    self.init=function(){

    };
}