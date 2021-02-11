// 모듈 로딩
// 반드시 const로 정의할 것
const express = require('express');
const session = require('express-session');
const path = require('path');
const bodyParser = require('body-parser');

// 생성자 및 상수정의
// 반드시 const로 정의할 것
const app = express();
const port = 3000;

// 포트 설정
app.set('port', port);

// 세션 설정
app.use(session({
  secret:'*******',
  resave:false,
  saveUninitialized:true
}));

// static 설정 ( 파일 접근 제한 해제 )
app.use(express.static(path.join( __dirname, './Baseball/front' )));

// POST 통신을 위한 bodyParser 사용
app.use(bodyParser.json()); // 요청 본문 파싱
app.use(bodyParser.urlencoded({ extended: true }));

// 이하 라우터 정의
const index = require('./routes/router.js');
const readExcels = require('./routes/readExcels.js');
const PlayerData = require('./routes/PlayerData.js');
const LeaderBoard = require('./routes/LeaderBoard.js');
const Projection = require('./routes/Projection.js');

// 이하 라우터 사용 ( 라우팅 )
app.use('/',index);
app.use('/readExcels',readExcels);
app.use('/PlayerData',PlayerData);
app.use('/LeaderBoard',LeaderBoard);
app.use('/Projection',Projection);

// 서버 리스닝
var server = app.listen(port, function() {
  console.log('Port No ( ' + port + ' ) Listening ...');
});
