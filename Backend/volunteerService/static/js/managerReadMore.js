
function accept(){
    var ID=document.getElementById("actID").innerText;
    var param = {};
    alert(ID)
    param.id = ID;
    $.post("/web/acceptActivity", param,function(data){
        if(data.indexOf("success")!=-1)//data就是后台返回的数据
        {
            window.location.href="/web/volunteer_main";
        }
    });
}