// 学号
function frestuid() {
    var stuid = $('#stuid').val();
    var rstuid = /^[0-9]{9}$/;
    var testuid = rstuid.test(stuid);
    if (stuid == "") {
        if ($('#dstuid').hasClass("has-error")) {
            $('#dstuid').removeClass("has-error");
        }
        if ($('#dstuid').hasClass("has-success")) {
            $('#dstuide').removeClass("has-success");
        }
        $('#sstuid').removeClass();
        return;
    }
    if (testuid) {

        if ($('#dstuid').hasClass("has-error")) {
            $('#dstuid').removeClass("has-error");
        }
        if (!$('#dstuid').hasClass("has-success")) {
            $('#dstuid').addClass("has-success");
        }
        $('#sstuid').removeClass();
        $('#sstuid').addClass("glyphicon glyphicon-ok form-control-feedback");

    } else {

        if ($('#dstuid').hasClass("has-success")) {
            $('#dstuid').removeClass("has-success");
        }
        if (!$('#dstuid').hasClass("has-error")) {
            $('#dstuid').addClass("has-error");
        }
        $('#sstuid').removeClass();
        $('#sstuid').addClass("glyphicon glyphicon-remove form-control-feedback");

    }
}
// 姓名
function frename() {
    var name = $('#name').val();
    var rename = /^.{1,15}$/;
    var tename = rename.test(name);
    if (name == "") {
        if ($('#dname').hasClass("has-error")) {
            $('#dname').removeClass("has-error");
        }
        if ($('#dname').hasClass("has-success")) {
            $('#dname').removeClass("has-success");
        }
        $('#sname').removeClass();
        return;
    }
    if (tename) {

        if ($('#dname').hasClass("has-error")) {
            $('#dname').removeClass("has-error");
        }
        if (!$('#dname').hasClass("has-success")) {
            $('#dname').addClass("has-success");
        }
        $('#sname').removeClass();
        $('#sname').addClass("glyphicon glyphicon-ok form-control-feedback");

    } else {

        if ($('#dname').hasClass("has-success")) {
            $('#dname').removeClass("has-success");
        }
        if (!$('#dname').hasClass("has-error")) {
            $('#dname').addClass("has-error");
        }
        $('#sname').removeClass();
        $('#sname')
            .addClass("glyphicon glyphicon-remove form-control-feedback");

    }
}
// 密码
function frepassword1() {
    var password1 = $('#password1').val();
    var repwd = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[a-zA-Z0-9]{8,16}$/;
    var tepwd = repwd.test(password1);
    if (password1 == "") {
        if ($('#dpassword1').hasClass("has-error")) {
            $('#dpassword1').removeClass("has-error");
        }
        if ($('#dpassword1').hasClass("has-success")) {
            $('#dpassword1').removeClass("has-success");
        }
        $('#spassword1').removeClass();
        return;
    }
    if (tepwd) {

        if ($('#dpassword1').hasClass("has-error")) {
            $('#dpassword1').removeClass("has-error");
        }
        if (!$('#dpassword1').hasClass("has-success")) {
            $('#dpassword1').addClass("has-success");
        }
        $('#spassword1').removeClass();
        $('#spassword1').addClass(
            "glyphicon glyphicon-ok form-control-feedback");

    } else {

        if ($('#dpassword1').hasClass("has-success")) {
            $('#dpassword1').removeClass("has-success");
        }
        if (!$('#dpassword1').hasClass("has-error")) {
            $('#dpassword1').addClass("has-error");
        }
        $('#spassword1').removeClass();
        $('#spassword1').addClass(
            "glyphicon glyphicon-remove form-control-feedback");

    }

    frepassword2();

}
// 确认密码
function frepassword2() {
    var password1 = $('#password1').val();
    var repwd = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[a-zA-Z0-9]{8,16}$/;
    var tepwd = repwd.test(password1);
    var password2 = $('#password2').val();
    var tepwdequ = password1 == password2;
    if (password2 == "" && password1 == "") {
        if ($('#dpassword2').hasClass("has-error")) {
            $('#dpassword2').removeClass("has-error");
        }
        if ($('#dpassword2').hasClass("has-success")) {
            $('#dpassword2').removeClass("has-success");
        }
        $('#spassword2').removeClass();
        return;
    }
    if (tepwdequ && tepwd) {

        if ($('#dpassword2').hasClass("has-error")) {
            $('#dpassword2').removeClass("has-error");
        }
        if (!$('#dpassword2').hasClass("has-success")) {
            $('#dpassword2').addClass("has-success");
        }
        $('#spassword2').removeClass();
        $('#spassword2').addClass(
            "glyphicon glyphicon-ok form-control-feedback");

    } else {

        if ($('#dpassword2').hasClass("has-success")) {
            $('#dpassword2').removeClass("has-success");
        }
        if (!$('#dpassword2').hasClass("has-error")) {
            $('#dpassword2').addClass("has-error");
        }
        $('#spassword2').removeClass();
        $('#spassword2').addClass(
            "glyphicon glyphicon-remove form-control-feedback");

    }
}
//手机号
function fretel() {
    var telnum = $('#telnum').val();
    var retel = /^1[34578]\d{9}$/;
    var tetel = retel.test(telnum);
    if (telnum == "") {
        if ($('#dtelnum').hasClass("has-error")) {
            $('#dtelnum').removeClass("has-error");
        }
        if ($('#dtelnum').hasClass("has-success")) {
            $('#dtelnum').removeClass("has-success");
        }
        $('#stelnum').removeClass();
        return;
    }
    if (tetel) {

        if ($('#dtelnum').hasClass("has-error")) {
            $('#dtelnum').removeClass("has-error");
        }
        if (!$('#dtelnum').hasClass("has-success")) {
            $('#dtelnum').addClass("has-success");
        }
        $('#stelnum').removeClass();
        $('#stelnum').addClass("glyphicon glyphicon-ok form-control-feedback");

    } else {

        if ($('#dtelnum').hasClass("has-success")) {
            $('#dtelnum').removeClass("has-success");
        }
        if (!$('#dtelnum').hasClass("has-error")) {
            $('#dtelnum').addClass("has-error");
        }
        $('#stelnum').removeClass();
        $('#stelnum').addClass(
            "glyphicon glyphicon-remove form-control-feedback");

    }
}

function fnLogin() {
    var stuid = $('#telNum').val();
    var password = $('#password').val();
    formdata = new FormData();
    formdata.append('username',stuid);
    formdata.append('password',password);
    $.ajax({
        type: 'POST',
        data: formdata,
        url: '/web/vLogin',
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

//注册
function fnSignup() {
    var stuid = $('#stuid').val();
    var name = $('#name').val();
    var password1 = $('#password1').val();
    var telnum = $('#telnum').val();
    var password2 = $('#password2').val();
    var sex = $('#sex').val();
    var exampleInputFile = $('#exampleInputFile').get(0).files[0];

    var rstuid = /^[0-9]{9}$/;
    var testuid = rstuid.test(stuid);
    var retel = /^1[34578]\d{9}$/;
    var tetel = retel.test(telnum);

    var repwd = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[a-zA-Z0-9]{8,16}$/;
    var tepwd = repwd.test(password1);
    var tepwdequ = password1 == password2;

    var rename = /^.{1,15}$/;
    var tename = rename.test(name);

    // var param = {};

    // param.username = stuid;
    // param.phone = telnum;
    // param.password = password1;
    // param.name = name;
    // param.gender = sex;
    // param.avatar = exampleInputFile;
    // param.dept = "计算机";

    var formdata = new FormData();
    formdata.append("avatar",exampleInputFile);
    formdata.append("username",stuid);
    formdata.append("phone",telnum);
    formdata.append("password",password1);
    formdata.append("name",name);
    formdata.append("dept","计算机");
    formdata.append("gender",sex);

    if (testuid && telnum && tename && tepwd && tepwdequ) {
        $.ajax({
            type: 'POST',
            data: formdata,
            url: '/web/regirst',
            processData: false,
            contentType: false,
            success: function(data) {
                alert("注册成功");
                $("#myModal").modal("show");
            },
            error: function(e) {
                alert("服务器出错");
            }
        })
    }
    alert('ahahah')
    // $('#myModal').modal('hide');
    // location.reload(true);

    return true;
}