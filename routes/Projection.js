const express = require('express');
const fs = require('fs');

const router = express.Router();

var Batter_Zips = Array();
var Batter_Steamer = Array();
var Pitcher_Zips = Array();
var Pitcher_Steamer = Array();

fs.readFile('./DataBase/Projections/Batter_Projections_2020_Zips.csv', 'utf8', function (err, data) {
    var metadata = data.split(/\r?\n/);

    for (var i = 0; i < metadata.length-1; i++) {
        Batter_Zips[i] = Array();
        var splitted = metadata[i].split(',');

        Batter_Zips[i][0] = splitted[0].slice(1,-1); // Name
        Batter_Zips[i][1] = splitted[1].slice(1,-1); // Team
        Batter_Zips[i][2] = splitted[5].slice(1,-1); // H
        Batter_Zips[i][3] = splitted[8].slice(1,-1); // HR
        Batter_Zips[i][4] = splitted[10].slice(1,-1); // RBI
        Batter_Zips[i][5] = splitted[16].slice(1,-1); // AVG
        Batter_Zips[i][6] = splitted[18].slice(1,-1); // SLG
    }
})

fs.readFile('./DataBase/Projections/Batter_Projections_2020_Steamer.csv', 'utf8', function (err, data) {
    metadata = data.split(/\r?\n/);
    
    for (var i = 0; i < metadata.length-1; i++) {
        Batter_Steamer[i] = Array();
        var splitted = metadata[i].split(',');

        Batter_Steamer[i][0] = splitted[0].slice(1,-1); // Name
        Batter_Steamer[i][1] = splitted[1].slice(1,-1); // Team
        Batter_Steamer[i][2] = splitted[5].slice(1,-1); // H
        Batter_Steamer[i][3] = splitted[8].slice(1,-1); // HR
        Batter_Steamer[i][4] = splitted[10].slice(1,-1); // RBI
        Batter_Steamer[i][5] = splitted[17].slice(1,-1); // AVG
        Batter_Steamer[i][6] = splitted[19].slice(1,-1); // SLG
    }
})

fs.readFile('./DataBase/Projections/Pitcher_Projections_2020_Zips.csv', 'utf8', function (err, data) {
    metadata = data.split(/\r?\n/);
    
    for (var i = 0; i < metadata.length-1; i++) {
        Pitcher_Zips[i] = Array();
        var splitted = metadata[i].split(',');

        Pitcher_Zips[i][0] = splitted[0]; // Name
        Pitcher_Zips[i][1] = splitted[1]; // Team
        Pitcher_Zips[i][2] = splitted[2]; // W
        Pitcher_Zips[i][3] = splitted[4]; // ERA
        Pitcher_Zips[i][4] = splitted[11]; // SO
        Pitcher_Zips[i][5] = splitted[12]; // BB
        Pitcher_Zips[i][6] = splitted[13]; // WHIP
    }
})

fs.readFile('./DataBase/Projections/Pitcher_Projections_2020_Steamer.csv', 'utf8', function (err, data) {
    metadata = data.split(/\r?\n/);
    
    for (var i = 0; i < metadata.length-1; i++) {
        Pitcher_Steamer[i] = Array();
        var splitted = metadata[i].split(',');

        Pitcher_Steamer[i][0] = splitted[0].slice(1,-1); // Name
        Pitcher_Steamer[i][1] = splitted[1].slice(1,-1); // Team
        Pitcher_Steamer[i][2] = splitted[2].slice(1,-1); // W
        Pitcher_Steamer[i][3] = splitted[4].slice(1,-1); // ERA
        Pitcher_Steamer[i][4] = splitted[12].slice(1,-1); // SO
        Pitcher_Steamer[i][5] = splitted[13].slice(1,-1); // BB
        Pitcher_Steamer[i][6] = splitted[14].slice(1,-1); // WHIP
    }
})


router.post('/Batter', function (req, res, next) {
    console.log('Projection_Batter Called');

    var Result = Array();
    var Name = req.body.Name;
    Name = Name.replace('_',' ');

    for(var i = 0; i < Batter_Zips.length ; i++){
        if(Batter_Zips[i][0] == Name){
            Result.push('Zips')
            Result.push(Batter_Zips[i]);
            break;
        }
    }
    for(var i = 0; i < Batter_Steamer.length ; i++){
        if(Batter_Steamer[i][0] == Name){
            Result.push('Steamer')
            Result.push(Batter_Steamer[i]);
            break;
        }
    }

    res.send(Result);
});

router.post('/Pitcher', function (req, res, next) {
    console.log('Projection_Pitcher Called');

    var Result = Array();
    var Name = req.body.Name;
    Name = Name.replace('_',' ');

    for(var i = 0; i < Pitcher_Zips.length ; i++){
        if(Pitcher_Zips[i][0] == Name){
            Result.push('Zips')
            Result.push(Pitcher_Zips[i]);
            break;
        }
    }
    for(var i = 0; i < Pitcher_Steamer.length ; i++){
        if(Pitcher_Steamer[i][0] == Name){
            Result.push('Steamer')
            Result.push(Pitcher_Steamer[i]);
            break;
        }
    }

    res.send(Result);
});

// 모듈화 -> 하지 않으면 'Router.use() requires a middleware function but got a Object' 에러 발생
module.exports = router;
