//-------------------------------------------- 데이터 로드 파트 --------------------------------------------//
// Excel data 초기화
var URL = document.URL;
var Player = URL.split('=')[1];

var excelData = '';
var Events = Array();
var Launch_Speed = Array();
var Launch_Angle = Array();
var Avg_Launch_Speed = 0;
var Avg_Launch_Angle = 0;

var json = {
    "Name": Player
};

$.ajax({
    type: 'POST',
    url: '/readExcels/readBatter',
    data: json,
    success: function (data) {
        Player = Player.replace('_', ' ');
        excelData = Json2Array(data);
        DataInitialize(excelData);
        AddText();
        init();
    },
    error: function (e) {
        alert(e.responseText);
    }
});

function Json2Array(json) {
    var array = Array();
    // 2차원 배열을 split하여 push
    for (var i = 0; i < json.length; i++) {
        var splitted = json[i].split(',');
        array[i] = Array();
        for (var j = 0; j < splitted.length; j++) {
            array[i][j] = splitted[j].replace(/"/g, "");
        }
    }
    return array;
}

function DataInitialize(data) {
    // 각 데이터의 1번은 "데이터명"
    for (var i = 1; i < data.length; i++) {
        Events.push(data[i][8]);
        Launch_Speed.push(data[i][53]);
        Launch_Angle.push(data[i][54]);
    }

    var indexes = Array();
    for(var i = 0 ; i < Events.length ; i++){
        var Event = Events[i];
        if(Event == 'single' || Event == 'double' || Event == 'triple' || Event == 'home_run'){
            indexes.push(i);
        }
    }

    for(var i = 0 ; i < indexes.length ; i++){
        var index = indexes[i];
        if(Launch_Angle[index] != 'null' && Launch_Speed[index] != 'null'){
            Avg_Launch_Angle += parseFloat(Launch_Angle[index]);
            Avg_Launch_Speed += parseFloat(Launch_Speed[index]);
        }
    }

    Avg_Launch_Angle = Avg_Launch_Angle/indexes.length;
    Avg_Launch_Speed = Avg_Launch_Speed/indexes.length;

    Avg_Launch_Angle = Avg_Launch_Angle.toFixed(1);
    Avg_Launch_Speed = Avg_Launch_Speed.toFixed(1);
}

function AddText() {
    var Right_Container = document.getElementById('Right_Container');

    Right_Container.innerHTML += Player + " 선수의 2019년도 평균 발사각입니다.<br><br>"
    Right_Container.innerHTML += "평균 발사 각도 : <span class='RedText'>" + Avg_Launch_Angle + " 도</span><br>"
    Right_Container.innerHTML += "평균 타구 속도 : <span class='RedText'>" + Avg_Launch_Speed + " mph</span><br><br>"
    Right_Container.innerHTML += "<span class='BlueText'>파란색 선</span>은 "+ Player + " 선수의 평균 발사 각과 타구 속도를 의미하며,<br>"
    Right_Container.innerHTML += "반원의 색은 타구 속도를 의미합니다.<br><br>"
    Right_Container.innerHTML += "하양 반원 : 0mph ~ 30mph<br>";
    Right_Container.innerHTML += "노랑 반원 : 30mph ~ 60mph<br>";
    Right_Container.innerHTML += "주황 반원 : 60mpb ~ 90mph<br>";
    Right_Container.innerHTML += "진한 주황 반원 : 90mph ~ 120mph<br>";
    Right_Container.innerHTML += "( 원의 검정 라인은 10도 간격을 의미합니다. )<br><br>";
    Right_Container.innerHTML += "붉은 색 부채꼴은 배럴타구 발사각도를 뜻합니다.<br>";
    Right_Container.innerHTML += "배럴타구 발사각의 범위는 8도 ~ 50도 사이이며,<br>";
    Right_Container.innerHTML += "타구 속도에 따라 각도가 변화합니다.<br>";
}

//-------------------------------------------- 데이터 로드 파트 END ----------------------------------------//
//-------------------------------------------- Three.js 파트 Start ----------------------------------------//
// ES6에서는 모듈 Load를 import로 한다.
import * as THREE from '../lib/Three.js/three.module.js';
import { OrbitControls, MapControls } from '../lib/Three.js/OrbitControls.js';

// Three.js 는 5가지 조건이 충족되어야 실행된다.
// 1. Scene 
// 2. Camera
// 3. Light
// 4. Geometry or Material
// 5. Renderer

function init() {
    // 5가지 조건을 미리 선언
    // 1. Scene
    var scene = new THREE.Scene();
    console.log('now start Moduling')

    // 2. Camera
    var camera = new THREE.PerspectiveCamera(11, window.innerWidth / window.innerHeight, 1, 2000);
    camera.position.x = 0;
    camera.position.y = 90;
    camera.position.z = 0
    camera.lookAt(scene.position);

    // 3. Light (생략)

    // 4. Materials - 
    var LaunchAngleZone = new THREE.CircleGeometry(8, 128, 0, Math.PI);
    var LaunchAngleMaterial = new THREE.MeshBasicMaterial({ color: 0xFFB914, opacity: 1.0, transparent: true, side: THREE.DoubleSide });
    var LaunchAngle = new THREE.Mesh(LaunchAngleZone, LaunchAngleMaterial);
    LaunchAngle.translateY(-0.3);
    LaunchAngle.rotation.z = -Math.PI / 2;
    LaunchAngle.rotation.x = Math.PI / 2;
    scene.add(LaunchAngle);

    var LaunchAngleZone_L = new THREE.CircleGeometry(6, 128, 0, Math.PI);
    var LaunchAngleMaterial_L = new THREE.MeshBasicMaterial({ color: 0xFFD228, opacity: 1.0, transparent: true, side: THREE.DoubleSide });
    var LaunchAngle_L = new THREE.Mesh(LaunchAngleZone_L, LaunchAngleMaterial_L);
    LaunchAngle_L.translateY(-0.2);
    LaunchAngle_L.rotation.z = -Math.PI / 2;
    LaunchAngle_L.rotation.x = Math.PI / 2;
    scene.add(LaunchAngle_L);

    var LaunchAngleZone_M = new THREE.CircleGeometry(4, 128, 0, Math.PI);
    var LaunchAngleMaterial_M = new THREE.MeshBasicMaterial({ color: 0xFFF064, opacity: 1.0, transparent: true, side: THREE.DoubleSide });
    var LaunchAngle_M = new THREE.Mesh(LaunchAngleZone_M, LaunchAngleMaterial_M);
    LaunchAngle_M.translateY(-0.1);
    LaunchAngle_M.rotation.z = -Math.PI / 2;
    LaunchAngle_M.rotation.x = Math.PI / 2;
    scene.add(LaunchAngle_M);

    var LaunchAngleZone_S = new THREE.CircleGeometry(2, 128, 0, Math.PI);
    var LaunchAngleMaterial_S = new THREE.MeshBasicMaterial({ color: 0xFFFFFF, opacity: 1.0, transparent: true, side: THREE.DoubleSide });
    var LaunchAngle_S = new THREE.Mesh(LaunchAngleZone_S, LaunchAngleMaterial_S);
    LaunchAngle_S.rotation.z = -Math.PI / 2;
    LaunchAngle_S.rotation.x = Math.PI / 2;
    scene.add(LaunchAngle_S);

    var BarrelZone = new THREE.CircleGeometry(9, 64, -Math.PI * 0.04, -Math.PI * 0.21);
    var BarrelZoneMaterial = new THREE.MeshBasicMaterial({ color: 0xFF0000, opacity: 0.3, transparent: true, side: THREE.DoubleSide });
    var Barrel = new THREE.Mesh(BarrelZone, BarrelZoneMaterial);
    Barrel.rotation.x = Math.PI / 2;
    scene.add(Barrel);

    // 10도마다 테두리로 표현
    var Frame1 = new THREE.CircleGeometry(8, 64, -Math.PI * 0.45, -Math.PI * 0.05);
    var FrameMaterial1 = new THREE.MeshBasicMaterial({ color: 0x000000, opacity: 0.0, transparent: true, side: THREE.DoubleSide });
    var FrameMesh1 = new THREE.Mesh(Frame1, FrameMaterial1);
    FrameMesh1.rotation.x = Math.PI / 2;
    var geo1 = new THREE.EdgesGeometry(FrameMesh1.geometry);
    var mat1 = new THREE.LineBasicMaterial({ color: 0x000000, linewidth: 4, opacity: 0.05, transparent: true });
    var wireframe1 = new THREE.LineSegments(geo1, mat1);
    wireframe1.translateZ(-0.1);
    wireframe1.renderOrder = 1;
    FrameMesh1.add(wireframe1);
    scene.add(FrameMesh1);

    var Frame2 = new THREE.CircleGeometry(8, 64, -Math.PI * 0.40, -Math.PI * 0.05);
    var FrameMaterial2 = new THREE.MeshBasicMaterial({ color: 0x000000, opacity: 0.0, transparent: true, side: THREE.DoubleSide });
    var FrameMesh2 = new THREE.Mesh(Frame2, FrameMaterial2);
    FrameMesh2.rotation.x = Math.PI / 2;
    var geo2 = new THREE.EdgesGeometry(FrameMesh2.geometry);
    var mat2 = new THREE.LineBasicMaterial({ color: 0x000000, linewidth: 4, opacity: 0.05, transparent: true });
    var wireframe2 = new THREE.LineSegments(geo2, mat2);
    wireframe2.translateZ(-0.1);
    wireframe2.renderOrder = 1;
    FrameMesh2.add(wireframe2);
    scene.add(FrameMesh2);

    var Frame3 = new THREE.CircleGeometry(8, 64, -Math.PI * 0.35, -Math.PI * 0.05);
    var FrameMaterial3 = new THREE.MeshBasicMaterial({ color: 0x000000, opacity: 0.0, transparent: true, side: THREE.DoubleSide });
    var FrameMesh3 = new THREE.Mesh(Frame3, FrameMaterial3);
    FrameMesh3.rotation.x = Math.PI / 2;
    var geo3 = new THREE.EdgesGeometry(FrameMesh3.geometry);
    var mat3 = new THREE.LineBasicMaterial({ color: 0x000000, linewidth: 4, opacity: 0.05, transparent: true });
    var wireframe3 = new THREE.LineSegments(geo3, mat3);
    wireframe3.translateZ(-0.1);
    wireframe3.renderOrder = 1;
    FrameMesh3.add(wireframe3);
    scene.add(FrameMesh3);

    var Frame4 = new THREE.CircleGeometry(8, 64, -Math.PI * 0.30, -Math.PI * 0.05);
    var FrameMaterial4 = new THREE.MeshBasicMaterial({ color: 0x000000, opacity: 0.0, transparent: true, side: THREE.DoubleSide });
    var FrameMesh4 = new THREE.Mesh(Frame4, FrameMaterial4);
    FrameMesh4.rotation.x = Math.PI / 2;
    var geo4 = new THREE.EdgesGeometry(FrameMesh4.geometry);
    var mat4 = new THREE.LineBasicMaterial({ color: 0x000000, linewidth: 4, opacity: 0.05, transparent: true });
    var wireframe4 = new THREE.LineSegments(geo4, mat4);
    wireframe4.translateZ(-0.1);
    wireframe4.renderOrder = 1;
    FrameMesh4.add(wireframe4);
    scene.add(FrameMesh4);

    var Frame5 = new THREE.CircleGeometry(8, 64, -Math.PI * 0.25, -Math.PI * 0.05);
    var FrameMaterial5 = new THREE.MeshBasicMaterial({ color: 0x000000, opacity: 0.0, transparent: true, side: THREE.DoubleSide });
    var FrameMesh5 = new THREE.Mesh(Frame5, FrameMaterial5);
    FrameMesh5.rotation.x = Math.PI / 2;
    var geo5 = new THREE.EdgesGeometry(FrameMesh5.geometry);
    var mat5 = new THREE.LineBasicMaterial({ color: 0x000000, linewidth: 4, opacity: 0.05, transparent: true });
    var wireframe5 = new THREE.LineSegments(geo5, mat5);
    wireframe5.translateZ(-0.1);
    wireframe5.renderOrder = 1;
    FrameMesh5.add(wireframe5);
    scene.add(FrameMesh5);

    var Frame6 = new THREE.CircleGeometry(8, 64, -Math.PI * 0.20, -Math.PI * 0.05);
    var FrameMaterial6 = new THREE.MeshBasicMaterial({ color: 0x000000, opacity: 0.0, transparent: true, side: THREE.DoubleSide });
    var FrameMesh6 = new THREE.Mesh(Frame6, FrameMaterial6);
    FrameMesh6.rotation.x = Math.PI / 2;
    var geo6 = new THREE.EdgesGeometry(FrameMesh6.geometry);
    var mat6 = new THREE.LineBasicMaterial({ color: 0x000000, linewidth: 4, opacity: 0.05, transparent: true });
    var wireframe6 = new THREE.LineSegments(geo6, mat6);
    wireframe6.translateZ(-0.1);
    wireframe6.renderOrder = 1;
    FrameMesh6.add(wireframe6);
    scene.add(FrameMesh6);

    var Frame7 = new THREE.CircleGeometry(8, 64, -Math.PI * 0.15, -Math.PI * 0.05);
    var FrameMaterial7 = new THREE.MeshBasicMaterial({ color: 0x000000, opacity: 0.0, transparent: true, side: THREE.DoubleSide });
    var FrameMesh7 = new THREE.Mesh(Frame7, FrameMaterial7);
    FrameMesh7.rotation.x = Math.PI / 2;
    var geo7 = new THREE.EdgesGeometry(FrameMesh7.geometry);
    var mat7 = new THREE.LineBasicMaterial({ color: 0x000000, linewidth: 4, opacity: 0.05, transparent: true });
    var wireframe7 = new THREE.LineSegments(geo7, mat7);
    wireframe7.translateZ(-0.1);
    wireframe7.renderOrder = 1;
    FrameMesh7.add(wireframe7);
    scene.add(FrameMesh7);

    var Frame8 = new THREE.CircleGeometry(8, 64, -Math.PI * 0.10, -Math.PI * 0.05);
    var FrameMaterial8 = new THREE.MeshBasicMaterial({ color: 0x000000, opacity: 0.0, transparent: true, side: THREE.DoubleSide });
    var FrameMesh8 = new THREE.Mesh(Frame8, FrameMaterial8);
    FrameMesh8.rotation.x = Math.PI / 2;
    var geo8 = new THREE.EdgesGeometry(FrameMesh8.geometry);
    var mat8 = new THREE.LineBasicMaterial({ color: 0x000000, linewidth: 4, opacity: 0.05, transparent: true });
    var wireframe8 = new THREE.LineSegments(geo8, mat8);
    wireframe8.translateZ(-0.1);
    wireframe8.renderOrder = 1;
    FrameMesh8.add(wireframe8);
    scene.add(FrameMesh8);

    var Frame9 = new THREE.CircleGeometry(8, 64, -Math.PI * 0.05, -Math.PI * 0.05);
    var FrameMaterial9 = new THREE.MeshBasicMaterial({ color: 0x000000, opacity: 0.0, transparent: true, side: THREE.DoubleSide });
    var FrameMesh9 = new THREE.Mesh(Frame9, FrameMaterial9);
    FrameMesh9.rotation.x = Math.PI / 2;
    var geo9 = new THREE.EdgesGeometry(FrameMesh9.geometry);
    var mat9 = new THREE.LineBasicMaterial({ color: 0x000000, linewidth: 4, opacity: 0.05, transparent: true });
    var wireframe9 = new THREE.LineSegments(geo9, mat9);
    wireframe9.translateZ(-0.1);
    wireframe9.renderOrder = 1;
    FrameMesh9.add(wireframe9);
    scene.add(FrameMesh9);

    var Frame10 = new THREE.CircleGeometry(8, 64, 0, -Math.PI * 0.05);
    var FrameMaterial10 = new THREE.MeshBasicMaterial({ color: 0x000000, opacity: 0.0, transparent: true, side: THREE.DoubleSide });
    var FrameMesh10 = new THREE.Mesh(Frame10, FrameMaterial10);
    FrameMesh10.rotation.x = Math.PI / 2;
    var geo10 = new THREE.EdgesGeometry(FrameMesh10.geometry);
    var mat10 = new THREE.LineBasicMaterial({ color: 0x000000, linewidth: 4, opacity: 0.05, transparent: true });
    var wireframe10 = new THREE.LineSegments(geo10, mat10);
    wireframe10.translateZ(-0.1);
    wireframe10.renderOrder = 1;
    FrameMesh10.add(wireframe10);
    scene.add(FrameMesh10);

    var Frame11 = new THREE.CircleGeometry(8, 64, 0, Math.PI * 0.05);
    var FrameMaterial11 = new THREE.MeshBasicMaterial({ color: 0x000000, opacity: 0.0, transparent: true, side: THREE.DoubleSide });
    var FrameMesh11 = new THREE.Mesh(Frame11, FrameMaterial11);
    FrameMesh11.rotation.x = Math.PI / 2;
    var geo11 = new THREE.EdgesGeometry(FrameMesh11.geometry);
    var mat11 = new THREE.LineBasicMaterial({ color: 0x000000, linewidth: 4, opacity: 0.05, transparent: true });
    var wireframe11 = new THREE.LineSegments(geo11, mat11);
    wireframe11.translateZ(-0.1);
    wireframe11.renderOrder = 1;
    FrameMesh11.add(wireframe11);
    scene.add(FrameMesh11);

    var Frame12 = new THREE.CircleGeometry(8, 64, Math.PI * 0.05, Math.PI * 0.05);
    var FrameMaterial12 = new THREE.MeshBasicMaterial({ color: 0x000000, opacity: 0.0, transparent: true, side: THREE.DoubleSide });
    var FrameMesh12 = new THREE.Mesh(Frame12, FrameMaterial12);
    FrameMesh12.rotation.x = Math.PI / 2;
    var geo12 = new THREE.EdgesGeometry(FrameMesh12.geometry);
    var mat12 = new THREE.LineBasicMaterial({ color: 0x000000, linewidth: 4, opacity: 0.05, transparent: true });
    var wireframe12 = new THREE.LineSegments(geo12, mat12);
    wireframe12.translateZ(-0.1);
    wireframe12.renderOrder = 1;
    FrameMesh12.add(wireframe12);
    scene.add(FrameMesh12);

    var Frame13 = new THREE.CircleGeometry(8, 64, Math.PI * 0.10, Math.PI * 0.05);
    var FrameMaterial13 = new THREE.MeshBasicMaterial({ color: 0x000000, opacity: 0.0, transparent: true, side: THREE.DoubleSide });
    var FrameMesh13 = new THREE.Mesh(Frame13, FrameMaterial13);
    FrameMesh13.rotation.x = Math.PI / 2;
    var geo13 = new THREE.EdgesGeometry(FrameMesh13.geometry);
    var mat13 = new THREE.LineBasicMaterial({ color: 0x000000, linewidth: 4, opacity: 0.05, transparent: true });
    var wireframe13 = new THREE.LineSegments(geo13, mat13);
    wireframe13.translateZ(-0.1);
    wireframe13.renderOrder = 1;
    FrameMesh13.add(wireframe13);
    scene.add(FrameMesh13);

    var Frame14 = new THREE.CircleGeometry(8, 64, Math.PI * 0.15, Math.PI * 0.05);
    var FrameMaterial14 = new THREE.MeshBasicMaterial({ color: 0x000000, opacity: 0.0, transparent: true, side: THREE.DoubleSide });
    var FrameMesh14 = new THREE.Mesh(Frame14, FrameMaterial14);
    FrameMesh14.rotation.x = Math.PI / 2;
    var geo14 = new THREE.EdgesGeometry(FrameMesh14.geometry);
    var mat14 = new THREE.LineBasicMaterial({ color: 0x000000, linewidth: 4, opacity: 0.05, transparent: true });
    var wireframe14 = new THREE.LineSegments(geo14, mat14);
    wireframe14.translateZ(-0.1);
    wireframe14.renderOrder = 1;
    FrameMesh14.add(wireframe14);
    scene.add(FrameMesh14);

    var Frame15 = new THREE.CircleGeometry(8, 64, Math.PI * 0.20, Math.PI * 0.05);
    var FrameMaterial15 = new THREE.MeshBasicMaterial({ color: 0x000000, opacity: 0.0, transparent: true, side: THREE.DoubleSide });
    var FrameMesh15 = new THREE.Mesh(Frame15, FrameMaterial15);
    FrameMesh15.rotation.x = Math.PI / 2;
    var geo15 = new THREE.EdgesGeometry(FrameMesh15.geometry);
    var mat15 = new THREE.LineBasicMaterial({ color: 0x000000, linewidth: 4, opacity: 0.05, transparent: true });
    var wireframe15 = new THREE.LineSegments(geo15, mat15);
    wireframe15.translateZ(-0.1);
    wireframe15.renderOrder = 1;
    FrameMesh15.add(wireframe15);
    scene.add(FrameMesh15);

    var Frame16 = new THREE.CircleGeometry(8, 64, Math.PI * 0.25, Math.PI * 0.05);
    var FrameMaterial16 = new THREE.MeshBasicMaterial({ color: 0x000000, opacity: 0.0, transparent: true, side: THREE.DoubleSide });
    var FrameMesh16 = new THREE.Mesh(Frame16, FrameMaterial16);
    FrameMesh16.rotation.x = Math.PI / 2;
    var geo16 = new THREE.EdgesGeometry(FrameMesh16.geometry);
    var mat16 = new THREE.LineBasicMaterial({ color: 0x000000, linewidth: 4, opacity: 0.05, transparent: true });
    var wireframe16 = new THREE.LineSegments(geo16, mat16);
    wireframe16.translateZ(-0.1);
    wireframe16.renderOrder = 1;
    FrameMesh16.add(wireframe16);
    scene.add(FrameMesh16);

    var Frame17 = new THREE.CircleGeometry(8, 64, Math.PI * 0.30, Math.PI * 0.05);
    var FrameMaterial17 = new THREE.MeshBasicMaterial({ color: 0x000000, opacity: 0.0, transparent: true, side: THREE.DoubleSide });
    var FrameMesh17 = new THREE.Mesh(Frame17, FrameMaterial17);
    FrameMesh17.rotation.x = Math.PI / 2;
    var geo17 = new THREE.EdgesGeometry(FrameMesh17.geometry);
    var mat17 = new THREE.LineBasicMaterial({ color: 0x000000, linewidth: 4, opacity: 0.05, transparent: true });
    var wireframe17 = new THREE.LineSegments(geo17, mat17);
    wireframe17.translateZ(-0.1);
    wireframe17.renderOrder = 1;
    FrameMesh17.add(wireframe17);
    scene.add(FrameMesh17);

    var Frame18 = new THREE.CircleGeometry(8, 64, Math.PI * 0.35, Math.PI * 0.05);
    var FrameMaterial18 = new THREE.MeshBasicMaterial({ color: 0x000000, opacity: 0.0, transparent: true, side: THREE.DoubleSide });
    var FrameMesh18 = new THREE.Mesh(Frame18, FrameMaterial18);
    FrameMesh18.rotation.x = Math.PI / 2;
    var geo18 = new THREE.EdgesGeometry(FrameMesh18.geometry);
    var mat18 = new THREE.LineBasicMaterial({ color: 0x000000, linewidth: 4, opacity: 0.05, transparent: true });
    var wireframe18 = new THREE.LineSegments(geo18, mat18);
    wireframe18.translateZ(-0.1);
    wireframe18.renderOrder = 1;
    FrameMesh18.add(wireframe18);
    scene.add(FrameMesh18);

    var Frame19 = new THREE.CircleGeometry(8, 64, Math.PI * 0.40, Math.PI * 0.05);
    var FrameMaterial19 = new THREE.MeshBasicMaterial({ color: 0x000000, opacity: 0.0, transparent: true, side: THREE.DoubleSide });
    var FrameMesh19 = new THREE.Mesh(Frame19, FrameMaterial19);
    FrameMesh19.rotation.x = Math.PI / 2;
    var geo19 = new THREE.EdgesGeometry(FrameMesh19.geometry);
    var mat19 = new THREE.LineBasicMaterial({ color: 0x000000, linewidth: 4, opacity: 0.05, transparent: true });
    var wireframe19 = new THREE.LineSegments(geo19, mat19);
    wireframe19.translateZ(-0.1);
    wireframe19.renderOrder = 1;
    FrameMesh19.add(wireframe19);
    scene.add(FrameMesh19);

    var Frame20 = new THREE.CircleGeometry(8, 64, Math.PI * 0.45, Math.PI * 0.05);
    var FrameMaterial20 = new THREE.MeshBasicMaterial({ color: 0x000000, opacity: 0.0, transparent: true, side: THREE.DoubleSide });
    var FrameMesh20 = new THREE.Mesh(Frame20, FrameMaterial20);
    FrameMesh20.rotation.x = Math.PI / 2;
    var geo20 = new THREE.EdgesGeometry(FrameMesh20.geometry);
    var mat20 = new THREE.LineBasicMaterial({ color: 0x000000, linewidth: 4, opacity: 0.05, transparent: true });
    var wireframe20 = new THREE.LineSegments(geo20, mat20);
    wireframe20.translateZ(-0.1);
    wireframe20.renderOrder = 1;
    FrameMesh20.add(wireframe20);
    scene.add(FrameMesh20);

    // 이미지 로드
    var texture = new THREE.TextureLoader().load('../Images/LaunchAngle.png');
    var ImageGeometry = new THREE.PlaneGeometry(9,9);
    var ImageMaterial = new THREE.MeshBasicMaterial({ map: texture });
    var ImageMesh = new THREE.Mesh(ImageGeometry,ImageMaterial);
    ImageMesh.translateX(-5);
    ImageMesh.translateZ(3);
    ImageMesh.rotation.x = -Math.PI / 2;
    scene.add(ImageMesh);

    // 발사각도 Arrow
    // Circle로 Vertices를 구해서, Vertices의 첫값과 끝값을 Arrow로 이용
    var Angle = new THREE.CircleGeometry(10, 64, -Math.PI * (Avg_Launch_Angle / 200) , -Math.PI * 0.0001);
    var AngleMaterial = new THREE.MeshBasicMaterial({});
    var AngleMesh = new THREE.Mesh(Angle, AngleMaterial);
    AngleMesh.rotation.x = Math.PI / 2;
    var ArrowGeo = new THREE.EdgesGeometry(AngleMesh.geometry);
    var ArrowMat = new THREE.LineBasicMaterial({color: 0x00FF00, linewidth: 4, opacity: 0.5, transparent: true });
    var Arrow = new THREE.LineSegments(ArrowGeo, ArrowMat);
    AngleMesh.add(Arrow);
    // 여기부터 Vertices사용
    var origin = new THREE.Vector3(0,0,0);
    var temp_Vector3 = AngleMesh.geometry.vertices[AngleMesh.geometry.vertices.length - 1];
    var dir = new THREE.Vector3(temp_Vector3.x * 0.1 , temp_Vector3.y * 0.1 , 0);
    var length = 0;
    if(Avg_Launch_Speed > 120){
        length = 8.5
    }
    else if(Avg_Launch_Speed > 90){
        length = 7
    }
    else if(Avg_Launch_Speed > 60){
        length = 5
    }
    else if(Avg_Launch_Speed > 30){
        length = 3
    }
    else{
        length = 1
    }
    var hex = 0x0000FF; // Blue

    var ArrowHelper = new THREE.ArrowHelper(dir, origin, length, hex, 1);
    ArrowHelper.rotation.x = Math.PI / 2;
    ArrowHelper.translateZ(-0.1);
    scene.add(ArrowHelper);
    

    // 5. Renderer
    var renderer = new THREE.WebGLRenderer({ antialise: true }); // 안티엘리어싱-true : 선명하게
    renderer.setClearColor(0xEEEEEE);
    renderer.setSize(window.innerWidth * 0.7, window.innerHeight * 0.85); // Canvas의 Size를 브라우저 크기로 조절
    document.body.appendChild(renderer.domElement);

    // InterFace :: Orbit Controls 추가
    // 카메라와 마우스 상호작용을 위해 OrbitControls를 설정합니다.
    var controls = new MapControls(camera, renderer.domElement);
    // controls.target.set(0,2,0);
    controls.update();

    function animate() {

        requestAnimationFrame(animate);

        // required if controls.enableDamping or controls.autoRotate are set to true
        controls.update();

        renderer.render(scene, camera);
    }

    // Div(Scene)에 Renderer를 등록
    function render() {
        renderer.render(scene, camera);
    }

    document.getElementById("threejs_scene").appendChild(renderer.domElement);
    render();
    animate();
}