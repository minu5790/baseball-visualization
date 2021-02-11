// 최초에 불려지는 데이터
// 타자 or 투수 버튼을 눌렀을때 함수를 실행해주면됨.
$("#b_button").click(function () { // 타자 버튼을 클릭할 때
    $("#b_button").addClass("selected");
    $("#p_button").removeClass("selected");
    $.ajax({
        type: 'POST',
        url: '/LeaderBoard/Leader_Batter',
        success: function (data) {
            // 데이터를 받은 뒤 코드를 어떻게 할건지 여기다가 적으면됨.
            // data는 Array 형태
            var str = '';
            var str2 = '';
            for (var i = 0; i < 10; i++) {
                str += '<tr><td>' + data[i].team_abbrev + '</td><td>' + data[i].name_display_first_last + '</td><td>' + data[i].g + '</td><td>' + data[i].ab + '</td><td>' + data[i].r + '</td><td>' + data[i].h + '</td><td>' + data[i].hr + '</td><td>' + data[i].rbi + '</td><td>' + data[i].bb + '</td><td>' + data[i].so + '</td><td>' + data[i].sb + '</td><td>' + data[i].hbp + '</td><td>' + data[i].avg + '</td><td>' + data[i].obp + '</td><td>' + data[i].slg + '</td><td>' + data[i].ops + '</td>' + '</tr>';
            }
            str2 += '<thead class="thead-light"><tr><th>소속</th><th>이름</th><th>경기</th><th>타수</th><th>득점</th><th>안타</th><th>홈런</th><th>타점</th><th>볼넷</th><th>삼진</th><th>도루</th><th>사구</th><th>타율</th><th>출루율</th><th>장타율</th><th>OPS</th></tr></thead><tbody>' + str + '</tbody></table>';
            $("#contents").empty();
            $("#contents").append(str2);
        },
        error: function (e) {
            alert(e.responseText);
        }
    });
});

$("#p_button").click(function () { // 투수 버튼을 클릭할 때
    $("#p_button").addClass("selected");
    $("#b_button").removeClass("selected");
    $.ajax({
        type: 'POST',
        url: '/LeaderBoard/Leader_Pitcher',
        success: function (data) {
            // 데이터를 받은 뒤 코드를 어떻게 할건지 여기다가 적으면됨.
            // data는 Array 형태
            var str = '';
            var str2 = '';
            for (var i = 0; i < 10; i++) {
                str += '<tr><td>' + data[i].team_abbrev + '</td><td>' + data[i].name_display_first_last + '</td><td>' + data[i].g + '</td><td>' + data[i].gs + '</td><td>' + data[i].w + '</td><td>' + data[i].l + '</td><td>' + data[i].hld + '</td><td>' + data[i].sv + '</td><td>' + data[i].era + '</td><td>' + data[i].ip + '</td><td>' + data[i].h + '</td><td>' + data[i].hr + '</td><td>' + data[i].r + '</td><td>' + data[i].so + '</td><td>' + data[i].bb + '</td><td>' + data[i].whip + '</td>' + '</tr>';
            }
            str2 += '<thead class="thead-light"><tr><th>소속</th><th>이름</th><th>경기</th><th>선발</th><th>승</th><th>패</th><th>홀드</th><th>세이브</th><th>ERA</th><th>이닝</th><th>피안타</th><th>피홈런</th><th>실점</th><th>삼진</th><th>볼넷</th><th>WHIP</th></tr></thead><tbody>' + str + '</tbody></table>';
            $("#contents").empty();
            $("#contents").append(str2);
        },
        error: function (e) {
            alert(e.responseText);
        }
    });
});

$("#p_button").click();

// Customize
var year ='';
var index = '';
$('#year_val > a').on('click', function () { // 연도 선택
    year = $(this).attr('value');
    $('#year_tag').text(year);
});
$('#index_val >a').on('click', function () { // 지표 선택
    index = $(this).attr('value');
    $('#index_tag').text($(this).text());
});
$("#s_button").unbind("click");
$('#s_button').on('click', function () { // 검색 버튼 클릭하면 결과 나옴
    var check = index.split('-')[0];
    var value = index.split('-')[1];
    var ex = {
        "year" : year,
        "sort_column" : value
    }
    if(check == 'p'){
        CustomizePitcher(ex);
    }
    else{
        CustomizeBatter(ex);
    }
});

// Customize를 위한 Ajax
// 매개변수인 data는 json형태로 제공해야함
// json의 규격은 아래와 같음 (데이터는 예시임)

// 데이터는 json안에 들어갈 데이터는 드롭다운을 통해 받아올것


function CustomizeBatter(json) {
    $.ajax({
        type: 'POST',
        url: '/LeaderBoard/Leader_Customize_Bat',
        data: json,
        success: function (data) {

            // 데이터를 받은 뒤 코드를 어떻게 할건지 여기다가 적으면됨.
            // data는 Array형태
            var str = '';
            var str2 = '';
            for (var i = 0; i < 10; i++) {
                str += '<tr><td>' + data[i].team_abbrev + '</td><td>' + data[i].name_display_first_last + '</td><td>' + data[i].g + '</td><td>' + data[i].ab + '</td><td>' + data[i].r + '</td><td>' + data[i].h + '</td><td>' + data[i].hr + '</td><td>' + data[i].rbi + '</td><td>' + data[i].bb + '</td><td>' + data[i].so + '</td><td>' + data[i].sb + '</td><td>' + data[i].hbp + '</td><td>' + data[i].avg + '</td><td>' + data[i].obp + '</td><td>' + data[i].slg + '</td><td>' + data[i].ops + '</td>' + '</tr>';
            }
            str2 += '<thead class="thead-light"><tr><th>소속</th><th>이름</th><th>경기</th><th>타수</th><th>득점</th><th>안타</th><th>홈런</th><th>타점</th><th>볼넷</th><th>삼진</th><th>도루</th><th>사구</th><th>타율</th><th>출루율</th><th>장타율</th><th>OPS</th></tr></thead><tbody>' + str + '</tbody></table>';
            $("#contents").empty();
            $("#contents").append(str2);
        },
        error: function (e) {
            alert(e.responseText);
        }
    });
}

function CustomizePitcher(json) {
    $.ajax({
        type: 'POST',
        url: '/LeaderBoard/Leader_Customize_Pit',
        data: json,
        success: function (data) {
            // 데이터를 받은 뒤 코드를 어떻게 할건지 여기다가 적으면됨.
            // data는 Array형태
            var str = '';
            var str2 = '';
            for (var i = 0; i < 10; i++) {
                str += '<tr><td>' + data[i].team_abbrev + '</td><td>' + data[i].name_display_first_last + '</td><td>' + data[i].g + '</td><td>' + data[i].gs + '</td><td>' + data[i].w + '</td><td>' + data[i].l + '</td><td>' + data[i].hld + '</td><td>' + data[i].sv + '</td><td>' + data[i].era + '</td><td>' + data[i].ip + '</td><td>' + data[i].h + '</td><td>' + data[i].hr + '</td><td>' + data[i].r + '</td><td>' + data[i].so + '</td><td>' + data[i].bb + '</td><td>' + data[i].whip + '</td>' + '</tr>';
            }
            str2 += '<thead class="thead-light"><tr><th>소속</th><th>이름</th><th>경기</th><th>선발</th><th>승</th><th>패</th><th>홀드</th><th>세이브</th><th>ERA</th><th>이닝</th><th>피안타</th><th>피홈런</th><th>실점</th><th>삼진</th><th>볼넷</th><th>WHIP</th></tr></thead><tbody>' + str + '</tbody></table>';
            $("#contents").empty();
            $("#contents").append(str2);
        },
        error: function (e) {
            alert(e.responseText);
        }
    });
}