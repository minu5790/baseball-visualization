$.ajax({
    type: 'POST',
    url: '/LeaderBoard/Leader_HR',
    success: function (data) {
        var str = '';
        var str2 = '';
        $.each(data, function (i) {

            str += '<tr height="54px">' + '<td >' + data[i].league + '</td><td>' + data[i].name_display_first_last + '</td><td>' + data[i].hr + '</td>' + '</tr>';

        });
        for (var i = 0; i < 5; i++) {  // 여기 추가할 것
            str2 += '<div class="info1" id="P_info3"><div class="logo" id="box4_logo"> <img src="../Images/Logos/'+data[i].team_abbrev +'.gif" alt=""></div><div class="info2"><table border="1" class="t4"><th scope="col">리그</th><th scope="col">이름</th><th scope="col">홈런</th><tbody id="tb1"></tbody>' + str + '</table></div><div class="name" id="box4_name"><h3>' + data[i].name_display_first_last + '</h3></div></div>';
        }

        $("#bxslider1").append(str2);
        $("#bxslider1").ready(function () {
            $('#bxslider1').bxSlider({
                auto: true,
                speed: 350,
                mode: 'fade',
                autoControls: true,
                pager: false,


            });
        })
    },
    error: function (e) {
        alert(e.responseText);
    }
});

$.ajax({
    type: 'POST',
    url: '/LeaderBoard/Leader_AVG',
    success: function (data) {
        var str = '';
        var str2 = '';
        $.each(data, function (i) {

            str += '<tr height="54px">' + '<td >' + data[i].league + '</td><td>' + data[i].name_display_first_last + '</td><td>' + data[i].avg + '</td>' + '</tr>';

        });
        for (var i = 0; i < 5; i++) {  // 여기 추가할 것
            str2 += '<div class="info1" id="P_info3"><div class="logo" id="box4_logo"> <img src="../Images/Logos/'+data[i].team_abbrev +'.gif" alt=""></div><div class="info2"><table border="1" class="t4"><th scope="col">리그</th><th scope="col">이름</th><th scope="col">타율</th><tbody id="tb1"></tbody>' + str + '</table></div><div class="name" id="box4_name"><h3>' + data[i].name_display_first_last + '</h3></div></div>';
        
        }

        $("#bxslider3").append(str2);
        $("#bxslider3").ready(function () {
            $('#bxslider3').bxSlider({
                auto: true,
                speed: 200,
                mode: 'fade',
                autoControls: false,
                pager: false,


            });
        })
    },
    error: function (e) {
        alert(e.responseText);
    }
});

$.ajax({
    type: 'POST',
    url: '/LeaderBoard/Leader_ERA',
    success: function (data) {
        var str = '';
        var str2 = '';
        $.each(data, function (i) {

            str += '<tr height="54px">' + '<td >' + data[i].league + '</td><td>' + data[i].name_display_first_last + '</td><td>' + data[i].era + '</td>' + '</tr>';

        });
        for (var i = 0; i < 5; i++) {  
            str2 += '<div class="info1" id="P_info3"><div class="logo" id="box4_logo"> <img src="../Images/Logos/'+data[i].team_abbrev +'.gif" alt=""></div><div class="info2"><table border="1" class="t4"><th scope="col">리그</th><th scope="col">이름</th><th scope="col">ERA</th><tbody id="tb1"></tbody>' + str + '</table></div><div class="name" id="box4_name"><h3>' + data[i].name_display_first_last + '</h3></div></div>';
        }

        $("#bxslider2").append(str2);
        $("#bxslider2").ready(function () {
            $('#bxslider2').bxSlider({
                auto: true,
                speed: 200,
                mode: 'fade',
                autoControls: false,
                pager: false,


            });
        })
    },
    error: function (e) {
        alert(e.responseText);
    }
});

$.ajax({
    type: 'POST',
    url: '/LeaderBoard/Leader_SO',
    success: function (data) {
        var str = '';
        var str2 = '';
        $.each(data, function (i) {

            str += '<tr height="54px">' + '<td >' + data[i].league + '</td><td>' + data[i].name_display_first_last + '</td><td>' + data[i].so + '</td>' + '</tr>';

        });
        for (var i = 0; i < 5; i++) { 
            str2 += '<div class="info1" id="P_info3"><div class="logo" id="box4_logo"> <img src="../Images/Logos/'+data[i].team_abbrev +'.gif" alt=""></div><div class="info2"><table border="1" class="t4"><th scope="col">리그</th><th scope="col">이름</th><th scope="col">삼진</th><tbody id="tb1"></tbody>' + str + '</table></div><div class="name" id="box4_name"><h3>' + data[i].name_display_first_last + '</h3></div></div>';
        }

        $("#bxslider4").append(str2);
        $("#bxslider4").ready(function () {
            $('#bxslider4').bxSlider({
                auto: true,
                speed: 200,
                mode: 'fade',
                autoControls: false,
                pager: false,


            });
        })
    },
    error: function (e) {
        alert(e.responseText);
    }
});
