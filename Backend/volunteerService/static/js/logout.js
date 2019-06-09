function LogOut(){
    $.get("/web/logout",function(data){
        alert(data);
        window.location.href = "/web/index";
    });
}