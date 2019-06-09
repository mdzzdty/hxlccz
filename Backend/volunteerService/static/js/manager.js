$(function() {

    $.ajaxSetup({
        async: false
    });
    getList(1,'n')

});
function getList(pn,status){
    var param = {};
    param.page = pn;
    param.status = status;
    $("#shome1").empty();
    $("#shome3").empty();
    $.post("/web/getActivityList", param,function(data){
        if (pn != 0)
            dataJson = $.parseJSON( data );
            getItem(dataJson, pn);
    });
}

function getItem(pageinfo,pn){
    var blist = pageinfo['list'];

    $.each(blist,function(index,item){
        var name = item["name"];
        var time = item["activityTime"];
        var avatar = item['avatar']
        if (index>0 && index % 2 == 0) {
            $( //将块加入到#home
                    "<div class='clearfix' style='margin-bottom: 30px;'></div>")
                .appendTo('#shome1');
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
            .appendTo("#shome1");

    });

    var obj = document.getElementById("p");
    obj.innerText = "第 " + pn + " 页， 共 " + pageinfo.pages + " 页， 共 " +
        pageinfo.total + " 条数据";

    var tnav = $("<nav aria-label='Page navigation'></nav>");
    var tui = $("<ul class='pagination' id='home_nav'></ul>");
    tnav.append(tui).appendTo("#shome3");

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
        .appendTo("#home_nav");
    var tlip = $("<li></li>").append($("<a id='pre'><span>&laquo;</span></a>"))
        .appendTo("#home_nav");

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
                pn + index)).appendTo("#home_nav");

    }

    var tlin = $("<li></li>")
        .append($("<a id='next'><span>&raquo;</span></a>")).appendTo(
            "#home_nav");
    var tlil = $("<li></li>").append($("<a id='last'></a>").text("Last"))
        .appendTo("#home_nav");

    if (!pageinfo.hasNextPage) {
        tlin.addClass("disabled");
        tlil.addClass("disabled");
    } else {
        $("#next").attr("onclick", "getList(" + (pn + 1) + ")");
        $("#last").attr("onclick", "getList(" + (pageinfo.pages) + ")");
    } 
}

function getoList(pn,status){
    var param = {};
    param.page = pn;
    param.status = status;
    $("#dhome1").empty();
    $("#dhome3").empty();
    $.post("/web/getActivityList", param,function(data){
        if (pn != 0)
            dataJson = $.parseJSON( data );
            getdItem(dataJson, pn);
    });
}

function getdItem(pageinfo,pn){
    var blist = pageinfo['list'];

    $.each(blist,function(index,item){
        var name = item["name"];
        var time = item["activityTime"];
        var avatar = item['avatar']
        if (index>0 && index % 2 == 0) {
            $( //将块加入到#home
                    "<div class='clearfix' style='margin-bottom: 30px;'></div>")
                .appendTo('#dhome1');
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
            .appendTo("#dhome1");

    });

    var obj = document.getElementById("q");
    obj.innerText = "第 " + pn + " 页， 共 " + pageinfo.pages + " 页， 共 " +
        pageinfo.total + " 条数据";

    var tnav = $("<nav aria-label='Page navigation'></nav>");
    var tui = $("<ul class='pagination' id='home_navd'></ul>");
    tnav.append(tui).appendTo("#dhome3");

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
        .appendTo("#home_navd");
    var tlip = $("<li></li>").append($("<a id='pre'><span>&laquo;</span></a>"))
        .appendTo("#home_navd");

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
                pn + index)).appendTo("#home_navd");

    }

    var tlin = $("<li></li>")
        .append($("<a id='next'><span>&raquo;</span></a>")).appendTo(
            "#home_navd");
    var tlil = $("<li></li>").append($("<a id='last'></a>").text("Last"))
        .appendTo("#home_navd");

    if (!pageinfo.hasNextPage) {
        tlin.addClass("disabled");
        tlil.addClass("disabled");
    } else {
        $("#next").attr("onclick", "getList(" + (pn + 1) + ")");
        $("#last").attr("onclick", "getList(" + (pageinfo.pages) + ")");
    } 
}



function geteList(pn,status){
    var param = {};
    param.page = pn;
    param.status = status;
    $("#ehome1").empty();
    $("#ehome3").empty();
    $.post("/web/getActivityList", param,function(data){
        if (pn != 0)
            dataJson = $.parseJSON( data );
            geteItem(dataJson, pn);
    });
}

function geteItem(pageinfo,pn){
    var blist = pageinfo['list'];

    $.each(blist,function(index,item){
        var name = item["name"];
        var time = item["activityTime"];
        var avatar = item['avatar']
        if (index>0 && index % 2 == 0) {
            $( //将块加入到#home
                    "<div class='clearfix' style='margin-bottom: 30px;'></div>")
                .appendTo('#ehome1');
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
            .appendTo("#ehome1");

    });

    var obj = document.getElementById("r");
    obj.innerText = "第 " + pn + " 页， 共 " + pageinfo.pages + " 页， 共 " +
        pageinfo.total + " 条数据";

    var tnav = $("<nav aria-label='Page navigation'></nav>");
    var tui = $("<ul class='pagination' id='home_nave'></ul>");
    tnav.append(tui).appendTo("#ehome3");

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
        .appendTo("#home_nave");
    var tlip = $("<li></li>").append($("<a id='pre'><span>&laquo;</span></a>"))
        .appendTo("#home_nave");

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
                pn + index)).appendTo("#home_nave");

    }

    var tlin = $("<li></li>")
        .append($("<a id='next'><span>&raquo;</span></a>")).appendTo(
            "#home_nave");
    var tlil = $("<li></li>").append($("<a id='last'></a>").text("Last"))
        .appendTo("#home_nave");

    if (!pageinfo.hasNextPage) {
        tlin.addClass("disabled");
        tlil.addClass("disabled");
    } else {
        $("#next").attr("onclick", "getList(" + (pn + 1) + ")");
        $("#last").attr("onclick", "getList(" + (pageinfo.pages) + ")");
    } 
}


function readmore(id){
    var param={};
    param.id = id
    $.post("/web/activityRead", param,function(data){
        if(data.indexOf("success")!=-1)//data就是后台返回的数据
        {
            window.location.href="/web/getMoreHtml";
        }
    });
}

