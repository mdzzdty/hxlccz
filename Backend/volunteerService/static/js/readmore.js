$(function(){
    $.ajaxSetup({
        async: false
    });
    $.get("/web/readmore",function(data){
        settb($.parseJSON(data));
    });
});

function settb(data){
    $('#activityname').html(data['name']);
    $('#organ').html(data['organName']);
    $('#maxNumber').html(data['maxNumber']);
    $('#number').html(data['number']);
    $('#last').html(data['lastTime']);
    $('#start').html(data['signStartTime']);
    $('#end').html(data['signEndTime']);
    $('#acttime').html(data['activityTime']);
    $('#text').html(data['text']);
    $('#actID').html(data['id']);
    $('#avatar').attr("src",data['avatar']);
}