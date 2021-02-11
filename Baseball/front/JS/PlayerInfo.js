// 서버에서 선수 이름으로 Data를 제공받음 * 현재는 Shin-Soo Choo 고정
var URL = document.URL;
var Player = URL.split('=')[1];

var Img_Team = document.getElementById('Img_Team');

var PlayerInfo = '';
var Player_Name = '';
var Team_Logos = ['ARI', 'ATL', 'BAL', 'BOS', 'CHC', 'CIN', 'CLE', 'COL', 'CWS', 'DET', 'HOU', 'KC', 'LAA', 'LAD', 'MIA', 'MIL', 'MIN', 'NYM', 'NYY', 'OAK', 'PHI', 'PIT', 'SD', 'SEA', 'SF', 'STL', 'TB', 'TEX', 'TOR', 'WSH'];

var isBatter = false;

Data = {
    'Name': Player
}

PlayerInfo22(Data)

function PlayerInfo22(Name) {

    $.ajax({
        type: 'POST',
        url: '/PlayerData/Basic_ByName',
        data: Name,
        success: function (data) {
            $('#thead-dark2 *').remove();
            $('#t *').remove();

            $("#Basic_Info *").remove();
            if (data[0].position == "P") {
                Pitcher(data);
                Pitcher_Predict(Name);
            } else {
                Batter(data);
                Batter_Predict(Name);
                isBatter = true;
            }
        },
        error: function (e) {
            alert(e.responseText);
        }
    });
}

function Pitcher(data) {

    // Thead 동적으로 생성하는 코드 여기에 적을것

    var Pit_Thead = '<th scope="col">' + "년도" + '</th>' + '<th scope="col">' + "소속" + '</th>' + '<th scope="col">' + "경기" + '</th>' + '<th scope="col">' + "선발" + '</th>' + '<th scope="col">' + "승" + '</th>' + '<th scope="col">' + "패" + '</th>' + '<th scope="col">' + "홀드" + '</th>' + '<th scope="col">' + "세이브" + '</th>' + '<th scope="col">' + "ERA" + '</th>' + '<th scope="col">' + "이닝" + '</th>' + '<th scope="col">' + "피안타" + '</th>' + '<th scope="col">' + "피홈런" + '</th>' + '<th scope="col">' + "실점" + '</th>' + '<th scope="col">' + "삼진" + '</th>' + '<th scope="col">' + "볼넷" + '</th>' + '<th scope="col">' + "WHIP" + '</th>';
    $("#thead-dark2").append(Pit_Thead);

    // <----------------END---------------->

    // 투수의 기본 데이터를 서버로부터 제공받음.
    var str = '<TR>'; // 선수 성적 테이블
    var basic_info = '<div>';
    PlayerInfo = data;
    if (PlayerInfo[0].bats == "L") {
        PlayerInfo[0].bats = "왼손";
    }
    if (PlayerInfo[0].bats == "R") {
        PlayerInfo[0].bats = "오른손";
    }
    if (PlayerInfo[0].bats == "S") {
        PlayerInfo[0].bats = "스위치 히터";
    }
    if (PlayerInfo[0].throws == "L") {
        PlayerInfo[0].throws = "왼손";
    }
    if (PlayerInfo[0].throws == "R") {
        PlayerInfo[0].throws = "오른손";
    }

    basic_info += '<h1>' + PlayerInfo[0].name_display_first_last + '</h1>' + '<div>' + "소속팀 : " + PlayerInfo[0].team_full + '</div>' + '<div>' + "투 : " + PlayerInfo[0].throws + " / 타 : " + PlayerInfo[0].bats + '</div>' + '<div>' + "신장 : " + PlayerInfo[0].height_feet + "피트" + PlayerInfo[0].height_inches + "인치" + '</div>' + "포지션 : " + PlayerInfo[0].position + '</div>';
    var Team = PlayerInfo[0].team_abbrev;
    Img_Team.src = '../Images/Logos/' + Team + '.gif';

    $("#Basic_Info").append(basic_info);

    $.each(PlayerInfo, function (i) {
        if (PlayerInfo[i] != null) {
            if (PlayerInfo[i].season != null) {
                str += '<TD>' + PlayerInfo[i].season + '</TD><TD>' + PlayerInfo[i].team_abbrev + '</TD><TD>' + PlayerInfo[i].g + '</TD><TD>' + PlayerInfo[i].gs + '</TD><TD>' + PlayerInfo[i].w + '</TD><TD>' + PlayerInfo[i].l + '</TD><TD>' + PlayerInfo[i].hld + '</TD><TD>' + PlayerInfo[i].sv + '</TD><TD>' + PlayerInfo[i].era + '</TD><TD>' + PlayerInfo[i].ip + '</TD><TD>' + PlayerInfo[i].h + '</TD><TD>' + PlayerInfo[i].hr + '</TD><TD>' + PlayerInfo[i].r + '</TD><TD>' + PlayerInfo[i].so + '</TD><TD>' + PlayerInfo[i].bb + '</TD><TD>' + PlayerInfo[i].whip + '</TD>';
                str += '</TR>';
            }
            if (PlayerInfo[i].length > 1) {
                for (var j = 0; j < PlayerInfo[i].length; j++) {
                    str += '<TD>' + PlayerInfo[i][j].season + '</TD><TD>' + PlayerInfo[i][j].team_abbrev + '</TD><TD>' + PlayerInfo[i][j].g + '</TD><TD>' + PlayerInfo[i][j].gs + '</TD><TD>' + PlayerInfo[i][j].w + '</TD><TD>' + PlayerInfo[i][j].l + '</TD><TD>' + PlayerInfo[i][j].hld + '</TD><TD>' + PlayerInfo[i][j].sv + '</TD><TD>' + PlayerInfo[i][j].era + '</TD><TD>' + PlayerInfo[i][j].ip + '</TD><TD>' + PlayerInfo[i][j].h + '</TD><TD>' + PlayerInfo[i][j].hr + '</TD><TD>' + PlayerInfo[i][j].r + '</TD><TD>' + PlayerInfo[i][j].so + '</TD><TD>' + PlayerInfo[i][j].bb + '</TD><TD>' + PlayerInfo[i][j].whip + '</TD>';
                    str += '</TR>';
                }
            }
        }

    });

    $("#t").append(str);

    // 다음 URL을 위한 네이밍작업
    Player_Name = PlayerInfo[0].name_display_first_last;
}

function Batter(data) {

    // Thead 동적으로 생성하는 코드 여기에 적을것
    var Bat_Thead = '<th scope="col">' + "년도" + '</th>' + '<th scope="col">' + "소속" + '</th>' + '<th scope="col">' + "경기" + '</th>' + '<th scope="col">' + "타석" + '</th>' + '<th scope="col">' + "타수" + '</th>' + '<th scope="col">' + "득점" + '</th>' + '<th scope="col">' + "안타" + '</th>' + '<th scope="col">' + "홈런" + '</th>' + '<th scope="col">' + "타점" + '</th>' + '<th scope="col">' + "볼넷" + '</th>' + '<th scope="col">' + "삼진" + '</th>' + '<th scope="col">' + "도루" + '</th>' + '<th scope="col">' + "사구" + '</th>' + '<th scope="col">' + "타율" + '</th>' + '<th scope="col">' + "출루율" + '</th>' + '<th scope="col">' + "장타율" + '</th>' + '<th scope="col">' + "OPS" + '</th>';
    $("#thead-dark2").append(Bat_Thead);


    // <----------------END---------------->

    // 타자의 기본 데이터를 서버로부터 제공받음.
    var str = '<TR>'; // 선수 성적 테이블
    var basic_info = '<div>';
    PlayerInfo = data;

    if (PlayerInfo[0].bats == "L") {
        PlayerInfo[0].bats = "왼손";
    }
    if (PlayerInfo[0].bats == "R") {
        PlayerInfo[0].bats = "오른손";
    }
    if (PlayerInfo[0].bats == "S") {
        PlayerInfo[0].bats = "스위치 히터";
    }
    if (PlayerInfo[0].throws == "L") {
        PlayerInfo[0].throws = "왼손";
    }
    if (PlayerInfo[0].throws == "R") {
        PlayerInfo[0].throws = "오른손";
    }
    basic_info += '<h1>' + PlayerInfo[0].name_display_first_last + '</h1>' + '<div>' + "소속팀 : " + PlayerInfo[0].team_full + '</div>' + '<div>' + "투 : " + PlayerInfo[0].throws + " / 타 : " + PlayerInfo[0].bats + '</div>' + '<div>' + "신장 : " + PlayerInfo[0].height_feet + "피트" + PlayerInfo[0].height_inches + "인치" + '</div>' + "포지션 : " + PlayerInfo[0].position + '</div>';
    var Team = PlayerInfo[0].team_abbrev;
    Img_Team.src = '../Images/Logos/' + Team + '.gif';

    $("#Basic_Info").append(basic_info);

    $.each(PlayerInfo, function (i) {
        if (PlayerInfo[i].season != null) {
            str += '<TD>' + PlayerInfo[i].season + '</TD><TD>' + PlayerInfo[i].team_abbrev + '</TD><TD>' + PlayerInfo[i].g + '</TD><TD>' + PlayerInfo[i].tpa + '</TD><TD>' + PlayerInfo[i].ab + '</TD><TD>' + PlayerInfo[i].r + '</TD><TD>' + PlayerInfo[i].h + '</TD><TD>' + PlayerInfo[i].hr + '</TD><TD>' + PlayerInfo[i].rbi + '</TD><TD>' + PlayerInfo[i].bb + '</TD><TD>' + PlayerInfo[i].so + '</TD><TD>' + PlayerInfo[i].sb + '</TD><TD>' + PlayerInfo[i].hbp + '</TD><TD>' + PlayerInfo[i].avg + '</TD><TD>' + PlayerInfo[i].obp + '</TD><TD>' + PlayerInfo[i].slg + '</TD><TD>' + PlayerInfo[i].ops + '</TD>';
            str += '</TR>';
        }
        if (PlayerInfo[i].length > 1) {
            for (var j = 0; j < PlayerInfo[i].length; j++) {
                str += '<TD>' + PlayerInfo[i][j].season + '</TD><TD>' + PlayerInfo[i][j].team_abbrev + '</TD><TD>' + PlayerInfo[i][j].g + '</TD><TD>' + PlayerInfo[i][j].tpa + '</TD><TD>' + PlayerInfo[i][j].ab + '</TD><TD>' + PlayerInfo[i][j].r + '</TD><TD>' + PlayerInfo[i][j].h + '</TD><TD>' + PlayerInfo[i][j].hr + '</TD><TD>' + PlayerInfo[i][j].rbi + '</TD><TD>' + PlayerInfo[i][j].bb + '</TD><TD>' + PlayerInfo[i][j].so + '</TD><TD>' + PlayerInfo[i][j].sb + '</TD><TD>' + PlayerInfo[i][j].hbp + '</TD><TD>' + PlayerInfo[i][j].avg + '</TD><TD>' + PlayerInfo[i][j].obp + '</TD><TD>' + PlayerInfo[i][j].slg + '</TD><TD>' + PlayerInfo[i][j].ops + '</TD>';
                str += '</TR>';
            }
        }

    });

    $("#t").append(str);

    // 다음 URL을 위한 네이밍작업
    Player_Name = PlayerInfo[0].name_display_first_last;
}

function Batter_Predict(json) {

    $.ajax({
        type: 'POST',
        url: '/Projection/Batter',
        data: json,
        success: function (data) {
            var Predict_Table_Thead = document.getElementById('Predict_Table_Thead');
            var TR = document.createElement('tr');
            var th = document.createElement('th');
            th.innerText = '구분';
            TR.appendChild(th);
            var th = document.createElement('th');
            th.innerText = '소속';
            TR.appendChild(th);
            var th = document.createElement('th');
            th.innerText = '안타';
            TR.appendChild(th);
            var th = document.createElement('th');
            th.innerText = '홈런';
            TR.appendChild(th);
            var th = document.createElement('th');
            th.innerText = '타점';
            TR.appendChild(th);
            var th = document.createElement('th');
            th.innerText = '타율';
            TR.appendChild(th);
            var th = document.createElement('th');
            th.innerText = '장타율';
            TR.appendChild(th);
            Predict_Table_Thead.appendChild(TR);

            var Predict_Table_Tbody = document.getElementById('Predict_Table_Tbody');
            for (var i = 0; i < data.length; i += 2) {
                var TR = document.createElement('tr');
                var td = document.createElement('td');
                td.innerText = data[i];
                TR.appendChild(td);
                var td = document.createElement('td');
                td.innerText = data[i + 1][1];
                TR.appendChild(td);
                var td = document.createElement('td');
                td.innerText = data[i + 1][2];
                TR.appendChild(td);
                var td = document.createElement('td');
                td.innerText = data[i + 1][3];
                TR.appendChild(td);
                var td = document.createElement('td');
                td.innerText = data[i + 1][4];
                TR.appendChild(td);
                var td = document.createElement('td');
                td.innerText = data[i + 1][5];
                TR.appendChild(td);
                var td = document.createElement('td');
                td.innerText = data[i + 1][6];
                TR.appendChild(td);
                Predict_Table_Tbody.appendChild(TR);
            }
        },
        error: function (e) {
            alert(e.responseText);
        }
    });

}

function Pitcher_Predict(json) {

    $.ajax({
        type: 'POST',
        url: '/Projection/Pitcher',
        data: json,
        success: function (data) {
            var Predict_Table_Thead = document.getElementById('Predict_Table_Thead');
            var TR = document.createElement('tr');
            var th = document.createElement('th');
            th.innerText = '구분';
            TR.appendChild(th);
            var th = document.createElement('th');
            th.innerText = '소속';
            TR.appendChild(th);
            var th = document.createElement('th');
            th.innerText = '승';
            TR.appendChild(th);
            var th = document.createElement('th');
            th.innerText = 'ERA';
            TR.appendChild(th);
            var th = document.createElement('th');
            th.innerText = '삼진';
            TR.appendChild(th);
            var th = document.createElement('th');
            th.innerText = '볼넷';
            TR.appendChild(th);
            var th = document.createElement('th');
            th.innerText = 'WHIP';
            TR.appendChild(th);
            Predict_Table_Thead.appendChild(TR);

            var Predict_Table_Tbody = document.getElementById('Predict_Table_Tbody');
            for (var i = 0; i < data.length; i += 2) {
                var TR = document.createElement('tr');
                var td = document.createElement('td');
                td.innerText = data[i];
                TR.appendChild(td);
                var td = document.createElement('td');
                td.innerText = data[i + 1][1];
                TR.appendChild(td);
                var td = document.createElement('td');
                td.innerText = data[i + 1][2];
                TR.appendChild(td);
                var td = document.createElement('td');
                td.innerText = data[i + 1][3];
                TR.appendChild(td);
                var td = document.createElement('td');
                td.innerText = data[i + 1][4];
                TR.appendChild(td);
                var td = document.createElement('td');
                td.innerText = data[i + 1][5];
                TR.appendChild(td);
                var td = document.createElement('td');
                td.innerText = data[i + 1][6];
                TR.appendChild(td);
                Predict_Table_Tbody.appendChild(TR);
            }
        },
        error: function (e) {
            alert(e.responseText);
        }
    });


}

var Button_Report = document.getElementById('Button_Report');
Button_Report.addEventListener('click', function (event) {
    if (isBatter == true) {
        window.location.href = 'Report_Batter?Name=' + Player;
    }
    else {
        window.location.href = 'Report_Pitcher?Name=' + Player;
    }
})