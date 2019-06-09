function attendM(){
    var ID=document.getElementById("actID").innerText;
    var param = {};
    param.id = ID;
    $.post("/web/attend", param,function(data){
        alert(data)
    });
}