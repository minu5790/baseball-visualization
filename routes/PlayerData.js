const express = require('express');
const request = require('sync-request');
const fs = require('fs');

const router = express.Router();
// master.csv - 이름과 Player_id를 매칭시키는 csv
// 자바스크립트는 2차원 배열 정의 시 각각의 배열마다 Array를 선언해야함.
var master = Array();
master[0] = Array();
master[1] = Array();

fs.readFile('./DataBase/master.csv', 'utf8', function (err, data) {
    var metadata = data.split(/\r?\n/);
    // meta 데이터를 Array로 변환 ( meta 데이터는 한줄의 String )
    // meta 데이터의 0번은 설명에 관한것이므로 1번(실제 데이터)부터 반복 시작
    for (var i = 1; i < metadata.length; i++) {
        var splitted = metadata[i].split(',');

        // 0번 ( Player_id ) 과 1번 ( Player_Name )만 필요하므로 0과 1번 배열만 저장
        master[0][i - 1] = splitted[0]; // Id
        master[1][i - 1] = splitted[1]; // Name
    }
});

router.post('/Basic_byName', function (req, res, next) {
    console.log('PlayerData/Basic_byName Called');

    // Name : 선수 이름 , Id_index : 선수의 Id가 있는 index(master 배열 내부의)
    var Name = req.body.Name;
    Name = Name.replace('_'," ");
    var Id_index = master[1].indexOf(Name);
    var Player = Array();

    var Player_Info = request('GET', "http://lookup-service-prod.mlb.com/json/named.search_player_all.bam?sport_code='mlb'&active_sw='Y'&name_part='" + Name + "'");
    // body는 JSON을 1개의 String으로 변환한 상태이다.
    // 해당 JSON의 구조에서 사용할 부분은 ????.search_player_all.queryResult.row 이하 값들이다. ( 값들은 html의 console에서 확인할것 )
    var Body_Json = JSON.parse(Player_Info.body);

    // 0번 인덱스 = 선수 기본 정보 등록
    Player.push(Body_Json.search_player_all.queryResults.row);

    // 선수의 Position이 '투수'(P) 일경우
    if (Body_Json.search_player_all.queryResults.row.position == "P") {
        // 선수가 데뷔한 시점으로부터 2019년까지 (2020년은 데이터 없음) Season Stat을 추가한다. *류현진은 2012 ~ 2019
        // 1번 인덱스 ~ 마지막 -1번 인덱스까지 데이터 등록
        var debutYear = Body_Json.search_player_all.queryResults.row.pro_debut_date.substr(0, 4);
        for (var i = debutYear; i < 2020; i++) {
            var SeasonStat = request('GET', "http://lookup-service-prod.mlb.com/json/named.sport_pitching_tm.bam?league_list_id='mlb'&game_type='R'&season='" + i + "'&player_id='" + master[0][Id_index] + "'");
            Player.push(JSON.parse(SeasonStat.body).sport_pitching_tm.queryResults.row);
        }

        // 마지막인덱스 모든 성적을 합한 Career Stat을 추가한다
        // 마지막 인덱스 == Player.length
        var CareerStat = request('GET', "http://lookup-service-prod.mlb.com/json/named.sport_career_pitching.bam?league_list_id='mlb'&game_type='R'&player_id='" + master[0][Id_index] + "'");

        Player.push(JSON.parse(CareerStat.body).sport_career_pitching.queryResults.row);
    }
    // 선수의 Position이 '타자' 일경우
    else {
        // 선수가 데뷔한 시점으로부터 2019년까지 (2020년은 데이터 없음) Season Stat을 추가한다. *추신수는 2005 ~ 2019
        // 1번 인덱스 ~ 마지막 -1번 인덱스까지 데이터 등록
        var debutYear = Body_Json.search_player_all.queryResults.row.pro_debut_date.substr(0, 4);
        for (var i = debutYear; i < 2020; i++) {
            var SeasonStat = request('GET', "http://lookup-service-prod.mlb.com/json/named.sport_hitting_tm.bam?league_list_id='mlb'&game_type='R'&season='" + i + "'&player_id='" + master[0][Id_index] + "'");
            Player.push(JSON.parse(SeasonStat.body).sport_hitting_tm.queryResults.row);
        }

        // 마지막인덱스 모든 성적을 합한 Career Stat을 추가한다
        // 마지막 인덱스 == Player.length
        var CareerStat = request('GET', "http://lookup-service-prod.mlb.com/json/named.sport_career_hitting.bam?league_list_id='mlb'&game_type='R'&player_id='" + master[0][Id_index] + "'");

        Player.push(JSON.parse(CareerStat.body).sport_career_hitting.queryResults.row);
    }

    // 모두 종료후 전송
    // 데이터 받는 속도가 조금 느림 (데이터 량이 많음)
    res.send(Player);
});


router.post('/search_name', function (req, res, next) {
    console.log('PlayerData/search_name Called');

    // Name : 선수 이름 , Id_index : 선수의 Id가 있는 index(master 배열 내부의)
    var Word = req.body.word.toUpperCase();
    var search_index = Array();
    var count = 0;

    if (Word.length > 1) {
        for (var i = 0; i < master[1].length - 1; i++) {

            if ((master[1][i].toString().toUpperCase().match(Word) != null)) {
                search_index[count] = master[1][i];
                count++;
            };


        }
    }

    var p = Array();
    p.push(search_index);
    var player = JSON.parse(JSON.stringify(p));

    res.send(player);

});
// 모듈화 -> 하지 않으면 'Router.use() requires a middleware function but got a Object' 에러 발생
module.exports = router;