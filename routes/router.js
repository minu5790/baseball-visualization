const express = require('express');

const router = express.Router();

router.get('/', function (req, res, next) {
    console.log('router.js_Main.html Called');

    res.sendfile('./Baseball/front/HTML/Main.html');
});

router.get('/Report_Pitcher', function (req, res, next) {
    console.log('router.js_index.html Called');

    res.sendfile('./Baseball/front/HTML/Report_Pitcher.html');
});

router.get('/PlayerInfo', function (req, res, next) {
    console.log('router.js_PlyaerInfo.html Called');

    res.sendfile('./Baseball/front/HTML/PlayerInfo.html');
});

router.get('/LeaderBoard', function (req, res, next) {
    console.log('router.js_LeaderBoard.html Called');

    res.sendfile('./Baseball/front/HTML/LeaderBoard.html');
});

router.get('/Report_Batter', function (req, res, next) {
    console.log('router.js_Report_Batter.html Called');

    res.sendfile('./Baseball/front/HTML/Report_Batter.html');
});

// 모듈화 -> 하지 않으면 'Router.use() requires a middleware function but got a Object' 에러 발생
module.exports = router;
