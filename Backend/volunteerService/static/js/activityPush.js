function aPush() {
    var name = $('#actname').val();
    var maxNumber = $('#peonum').val();
    var x1 = $('#stactime').val();
    var lastTime = $('#timelen').val();
    var x2 = $('#stbatime').val();
    var x3 = $('#enbotime').val();
    var addr = $('#actaddr').val();
    var exampleInputFile = $("#exampleInputFile").get(0).files[0];
    var actintro = $('#actintro').val();

    actime = getDate(x1);
    statime = getDate(x2);
    endtime = getDate(x3);

    

    formdata = new FormData();
    formdata.append('name',name);
    formdata.append('maxNumber',maxNumber);
    formdata.append('actime',actime);
    formdata.append('statime',statime);
    formdata.append('endtime',endtime);
    formdata.append('lastTime',lastTime);
    formdata.append('addr',addr);
    formdata.append('avatar',exampleInputFile);
    formdata.append('actintro',actintro);

    $.ajax({
        type: 'POST',
        data: formdata,
        url: '/web/pushActivity',
        processData: false,
        contentType: false,
        success: function(data) {
            alert(data);
        },
        error: function(e) {
            alert("服务器出错");
        }
    })

}

function getDate(x){
    var now = new Date();
    now.setFullYear(parseInt(x.substring(0, 4)));
    now.setMonth(parseInt(x.substring(5, 7)) - 1);
    now.setDate(parseInt(x.substring(8, 10)));
    now.setHours(parseInt(x.substring(11, 13)));
    now.setMinutes(parseInt(x.substring(14, 16)));

    youWant=now.getFullYear() + '-' + (now.getMonth() + 1) + '-' + now.getDate() + ' ' + now.getHours() + ':' + now.getMinutes() + ':' + now.getSeconds();  

    return youWant
}

