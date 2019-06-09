

$(function() {

    $.ajaxSetup({
        async: false
    });
    getList(1,'n','q')

});
function getList(pn,status,home){
    var param = {};
    param.page = pn;
    param.status = status;
    $("#"+home+"home1").empty();
    $("#"+home+"home3").empty();
    $.post("/web/organActivity", param,function(data){
        alert(data);
        if (pn != 0)
            dataJson = $.parseJSON( data );
            getItem(dataJson, pn,home);
    });
}

function getItem(pageinfo,pn,home){
    var blist = pageinfo['list'];

    $.each(blist,function(index,item){
        var name = item["name"];
        var time = item["activityTime"];
        var avatar = item['avatar']
        if (index>0 && index % 2 == 0) {
            $( //将块加入到#home
                    "<div class='clearfix' style='margin-bottom: 30px;'></div>")
                .appendTo('#'+home+'home1');
        }

        var tdiv1 = $("<div></div>")
            .addClass("col-md-6 column");
        var tdiv2 = $("<div></div>")
            .addClass("col-md-3 column");
        var tdiv3 = $("<div></div>")
            .addClass("col-md-9 column");
        var tdiv4 = $("<div></div>").addClass(
            "col-md-offset-6 row");

        var tbtn1 = $("<button>read more</button>")
            .addClass("btn btn-info btn-sm")
            .attr("data-toggle", "modal")
            .attr("onclick","readmore("+item['id']+")",)
    

        var th3 = $("<h4></h4>").addClass("text-left").text(
            name);
            
        var tsmall = $("<small></small>").text(
            "活动时间 ： " + time);
            
        var timg = $(
                "<img width='80' height='80' alt='50x50' src='"+avatar+"'></img>")
            .addClass("img-circle");
            
        tdiv1.append(tdiv2.append(timg)).append(
                ((tdiv3.append(th3)).append(tsmall))
                .append(tdiv4.append(tbtn1)))
            .appendTo("#"+home+"home1");

    });

    var obj = document.getElementById("p");
    obj.innerText = "第 " + pn + " 页， 共 " + pageinfo.pages + " 页， 共 " +
        pageinfo.total + " 条数据";

    var tnav = $("<nav aria-label='Page navigation'></nav>");
    var tui = $("<ul class='pagination' id='"+home+"home_nav'></ul>");
    tnav.append(tui).appendTo("#"+home+"home3");

    var tpn = pageinfo.pages - pageinfo.pageNum;

    var tin;
    if (pn == 1)
        tin = 0;
    else if (pn == 2)
        tin = -1;
    else
        tin = -2;

    var tli = $("<li></li>");
    var tlif = $("<li></li>").append($("<a id='first'></a>").text("First"))
        .appendTo("#"+home+"home_nav");
    var tlip = $("<li></li>").append($("<a id='pre'><span>&laquo;</span></a>"))
        .appendTo("#"+home+"home_nav");

    if (pn == 1) {
        tlif.addClass("disabled");
        tlip.addClass("disabled");
    } else {
        $("#pre").attr("onclick", "getList(" + (pn - 1) + ")");
        $("#first").attr("onclick", "getList(1)");
    }

    for (var index = tin; index <= (tpn < 2 ? tpn : 2); index++) {

        var tli2 = $("<li></li>");
        if (index == 0) {
            tli2.addClass("active");
        }
        tli2.append(
            $("<a onclick='getList(" + (pn + index) + ")'></a>").text(
                pn + index)).appendTo("#"+home+"home_nav");

    }

    var tlin = $("<li></li>")
        .append($("<a id='next'><span>&raquo;</span></a>")).appendTo(
            "#"+home+"home_nav");
    var tlil = $("<li></li>").append($("<a id='last'></a>").text("Last"))
        .appendTo("#"+home+"home_nav");

    if (!pageinfo.hasNextPage) {
        tlin.addClass("disabled");
        tlil.addClass("disabled");
    } else {
        $("#next").attr("onclick", "getList(" + (pn + 1) + ")");
        $("#last").attr("onclick", "getList(" + (pageinfo.pages) + ")");
    } 
}


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