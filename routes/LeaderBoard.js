const express = require('express');
const request = require('sync-request');

const router = express.Router();

router.post('/Leader_HR', function (req, res, next) {
    console.log('Leader_HR Called');

    var Results = request('GET', "http://lookup-service-prod.mlb.com/json/named.leader_hitting_repeater.bam?sport_code='mlb'&results=5&game_type='R'&season='2019'&sort_column='hr'");
    var Body_Json = JSON.parse(Results.body);
    var Leader_HR = Body_Json.leader_hitting_repeater.leader_hitting_mux.queryResults.row;

    res.json(Leader_HR);
});

router.post('/Leader_AVG', function (req, res, next) {
    console.log('Leader_AVG Called');

    var Results = request('GET', "http://lookup-service-prod.mlb.com/json/named.leader_hitting_repeater.bam?sport_code='mlb'&results=5&game_type='R'&season='2019'&sort_column='avg'");
    var Body_Json = JSON.parse(Results.body);
    var Leader_AVG = Body_Json.leader_hitting_repeater.leader_hitting_mux.queryResults.row;

    res.json(Leader_AVG);
});

router.post('/Leader_ERA', function (req, res, next) {
    console.log('Leader_ERA Called');

    var Results = request('GET', "http://lookup-service-prod.mlb.com/json/named.leader_pitching_repeater.bam?sport_code='mlb'&results=5&game_type='R'&season='2019'&sort_column='era'");
    var Body_Json = JSON.parse(Results.body);
    var Leader_ERA = Body_Json.leader_pitching_repeater.leader_pitching_mux.queryResults.row;

    res.json(Leader_ERA);
});

router.post('/Leader_SO', function (req, res, next) {
    console.log('Leader_SO Called');

    var Results = request('GET', "http://lookup-service-prod.mlb.com/json/named.leader_pitching_repeater.bam?sport_code='mlb'&results=5&game_type='R'&season='2019'&sort_column='so'");
    var Body_Json = JSON.parse(Results.body);
    var Leader_SO = Body_Json.leader_pitching_repeater.leader_pitching_mux.queryResults.row;

    res.json(Leader_SO);
});

router.post('/Leader_Batter', function (req, res, next) {
    console.log('Leader_Batter Called');

    var Results = request('GET', "http://lookup-service-prod.mlb.com/json/named.leader_hitting_repeater.bam?sport_code='mlb'&results=10&game_type='R'&season='2019'&sort_column='hr'");
    var Body_Json = JSON.parse(Results.body);
    var Leader_Batter = Body_Json.leader_hitting_repeater.leader_hitting_mux.queryResults.row;

    res.json(Leader_Batter);
});

router.post('/Leader_Pitcher', function (req, res, next) {
    console.log('Leader_Pitcher Called');

    var Results = request('GET', "http://lookup-service-prod.mlb.com/json/named.leader_pitching_repeater.bam?sport_code='mlb'&results=10&game_type='R'&season='2019'&sort_column='era'");
    var Body_Json = JSON.parse(Results.body);
    var Leader_Pitcher = Body_Json.leader_pitching_repeater.leader_pitching_mux.queryResults.row;

    res.json(Leader_Pitcher);
});

router.post('/Leader_Customize_Bat', function (req, res, next) {
    console.log('Leader_Customize_Bat Called');

    var year = req.body.year;
    var sort_column = req.body.sort_column;

    var Results = request('GET', "http://lookup-service-prod.mlb.com/json/named.leader_hitting_repeater.bam?sport_code='mlb'&results=10&game_type='R'&season='" + year + "'&sort_column='" + sort_column + "'");
    var Body_Json = JSON.parse(Results.body);
    var Leader_Customize_Bat = Body_Json.leader_hitting_repeater.leader_hitting_mux.queryResults.row;

    res.json(Leader_Customize_Bat);
});

router.post('/Leader_Customize_Pit', function (req, res, next) {
    console.log('/Leader_Customize_Pit Called');

    var year = req.body.year;
    var sort_column = req.body.sort_column;

    var Results = request('GET', "http://lookup-service-prod.mlb.com/json/named.leader_pitching_repeater.bam?sport_code='mlb'&results=10&game_type='R'&season='" + year + "'&sort_column='" + sort_column + "'");
    var Body_Json = JSON.parse(Results.body);
    var Leader_Customize_Pit = Body_Json.leader_pitching_repeater.leader_pitching_mux.queryResults.row;

    res.json(Leader_Customize_Pit);
});

// 모듈화 -> 하지 않으면 'Router.use() requires a middleware function but got a Object' 에러 발생
module.exports = router;
