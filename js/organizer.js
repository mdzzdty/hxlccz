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
        $('#sname').addClass("glyphicon glyphicon-remove form-control-feedback");

    }
}

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
        $('#stelnum').addClass("glyphicon glyphicon-remove form-control-feedback");

    }
}