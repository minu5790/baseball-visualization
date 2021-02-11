//-------------------------------------------- 데이터 로드 파트 --------------------------------------------//
// Excel data 초기화
var URL = document.URL;
var Player = URL.split('=')[1];

var excelData = '';
var pitch_type = Array();
var plate_x = Array();
var plate_z = Array();

var json = {
    "Name": Player
};

Player = Player.replace('_', ' ');

// Ajax로 서버와 통신 (readExcels/Hyun-Jin_Ryu) ==> 차후 수정 예정 (선수명을 data로 전송)
$.ajax({
    type: 'POST',
    url: '/readExcels/readPitcher',
    data: json,
    success: function (data) {
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
        pitch_type.push(data[i][0])
        plate_x.push(data[i][29]);
        plate_z.push(data[i][30]);
    }
}

function AddText() {
    var Right_Container = document.getElementById('Right_Container');
    Right_Container.innerHTML = '';

    Right_Container.innerHTML += Player + " 선수의 2019년도 투구 기록입니다.<br>"
    Right_Container.innerHTML += "왼쪽의 컨트롤러를 통해 원하는 구질을 볼 수 있습니다. <br><br>"
    Right_Container.innerHTML += "2019년 총 투구 수 : " + pitch_type.length + " 구<br>"
    Right_Container.innerHTML += "<span style='color:#FF0000'>FF (포심 패스트볼) </span><br>"
    Right_Container.innerHTML += "<span style='color:#DC7633'>FT (투심 패스트볼) </span><br>"
    Right_Container.innerHTML += "<span style='color:#A569BD'>FC (컷 패스트볼) </span><br>"
    Right_Container.innerHTML += "<span style='color:#00CC00'>CH (체인지업) </span><br>"
    Right_Container.innerHTML += "<span style='color:#0000FF'>CU (커브볼) </span><br>"
    Right_Container.innerHTML += "<span style='color:#00CCCC'>SL (슬라이더) </span><br>"
    Right_Container.innerHTML += "<span style='color:#F4D03F'>SK (싱커) </span><br>"
    Right_Container.innerHTML += "<span style='color:#5D6D7E'>SP (스플리터) </span><br>"
    Right_Container.innerHTML += "<span style='color:#48C9B0'>KN (너클볼) </span><br>"
}

//-------------------------------------------- 데이터 로드 파트 END ----------------------------------------//
//-------------------------------------------- Three.js 파트 Start ----------------------------------------//
// ES6에서는 모듈 Load를 import로 한다.
import * as THREE from '../lib/Three.js/three.module.js';
import { MapControls } from '../lib/Three.js/OrbitControls.js';
import * as dat from '../lib/Three.js/dat.gui.module.js';

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

    // 2. Camera
    var camera = new THREE.PerspectiveCamera(6, window.innerWidth / window.innerHeight, 1, 2000);
    camera.position.x = 0;
    camera.position.y = 90;
    camera.position.z = 0;
    camera.lookAt(scene.position);

    // 3. Light (생략)

    // 4. Materials - 스트라이크존
    var StrikeZoneGeometry = new THREE.PlaneGeometry(9, 9, 1, 1);
    var StrikeZoneMaterial = new THREE.MeshBasicMaterial({ color: 0xCCCCCC });
    var StrikeZone = new THREE.Mesh(StrikeZoneGeometry, StrikeZoneMaterial);
    StrikeZone.rotation.x = Math.PI / 2;
    scene.add(StrikeZone);

    // 스트라이크존에 Grid(격자) 추가 (8X9)
    var FrameMaterials = new THREE.LineBasicMaterial({ color: 0x000000, linewidth: 2 });
    var FramePoints = [];
    for (var i = -4.5; i < 4.5; i++) {
        // 가로선 그리기
        var a = 9 / 8;
        var temp = -4.5;
        FramePoints.push(new THREE.Vector3(temp, i, 0))
        FramePoints.push(new THREE.Vector3(temp, i + 1, 0))
        temp = temp + a;
        FramePoints.push(new THREE.Vector3(temp, i, 0))
        FramePoints.push(new THREE.Vector3(temp, i + 1, 0))
        temp = temp + a;
        FramePoints.push(new THREE.Vector3(temp, i, 0))
        FramePoints.push(new THREE.Vector3(temp, i + 1, 0))
        temp = temp + a;
        //
        FramePoints.push(new THREE.Vector3(temp, i, 0))
        FramePoints.push(new THREE.Vector3(temp, i + 1, 0))
        temp = temp + a;
        FramePoints.push(new THREE.Vector3(temp, i, 0))
        FramePoints.push(new THREE.Vector3(temp, i + 1, 0))
        temp = temp + a;
        FramePoints.push(new THREE.Vector3(temp, i, 0))
        FramePoints.push(new THREE.Vector3(temp, i + 1, 0))
        temp = temp + a;
        FramePoints.push(new THREE.Vector3(temp, i, 0))
        FramePoints.push(new THREE.Vector3(temp, i + 1, 0))
        temp = temp + a;
        FramePoints.push(new THREE.Vector3(temp, i, 0))
        FramePoints.push(new THREE.Vector3(temp, i + 1, 0))
        //
        temp = temp + a;
        FramePoints.push(new THREE.Vector3(temp, i, 0))
        FramePoints.push(new THREE.Vector3(temp, i + 1, 0))
    }
    for (var i = -4.5; i < 4.5; i++) {
        //세로선 그리기
        FramePoints.push(new THREE.Vector3(i, -4.5, 0))
        FramePoints.push(new THREE.Vector3(i + 1, -4.5, 0))
        FramePoints.push(new THREE.Vector3(i, -3.5, 0))
        FramePoints.push(new THREE.Vector3(i + 1, -3.5, 0))
        FramePoints.push(new THREE.Vector3(i, -2.5, 0))
        FramePoints.push(new THREE.Vector3(i + 1, -2.5, 0))
        FramePoints.push(new THREE.Vector3(i, -1.5, 0))
        FramePoints.push(new THREE.Vector3(i + 1, -1.5, 0))
        FramePoints.push(new THREE.Vector3(i, -0.5, 0))
        FramePoints.push(new THREE.Vector3(i + 1, -0.5, 0))
        FramePoints.push(new THREE.Vector3(i, 0.5, 0))
        FramePoints.push(new THREE.Vector3(i + 1, 0.5, 0))
        FramePoints.push(new THREE.Vector3(i, 1.5, 0))
        FramePoints.push(new THREE.Vector3(i + 1, 1.5, 0))
        FramePoints.push(new THREE.Vector3(i, 2.5, 0))
        FramePoints.push(new THREE.Vector3(i + 1, 2.5, 0))
        FramePoints.push(new THREE.Vector3(i, 3.5, 0))
        FramePoints.push(new THREE.Vector3(i + 1, 3.5, 0))
        FramePoints.push(new THREE.Vector3(i, 4.5, 0))
        FramePoints.push(new THREE.Vector3(i + 1, 4.5, 0))
    }
    var FrameGeometry = new THREE.BufferGeometry().setFromPoints(FramePoints);
    var Frame = new THREE.LineSegments(FrameGeometry, FrameMaterials);
    Frame.rotation.x = -Math.PI / 2;
    scene.add(Frame);

    // 붉은색 스트라이크존 Grid
    var RedFrameMaterials = new THREE.LineBasicMaterial({ color: 0xFF00FF, linewidth: 2 });
    var RedFramePoints = [];
    for (var i = -1.5; i < 2.5; i++) {
        // 가로선 그리기
        a = 9 / 8;
        RedFramePoints.push(new THREE.Vector3(-4.5 + (2 * a), i, 0))
        RedFramePoints.push(new THREE.Vector3(-4.5 + (2 * a), i + 1, 0))
        RedFramePoints.push(new THREE.Vector3(-4.5 + (3 * a), i, 0))
        RedFramePoints.push(new THREE.Vector3(-4.5 + (3 * a), i + 1, 0))
        RedFramePoints.push(new THREE.Vector3(-4.5 + (4 * a), i, 0))
        RedFramePoints.push(new THREE.Vector3(-4.5 + (4 * a), i + 1, 0))
        RedFramePoints.push(new THREE.Vector3(-4.5 + (5 * a), i, 0))
        RedFramePoints.push(new THREE.Vector3(-4.5 + (5 * a), i + 1, 0))
        RedFramePoints.push(new THREE.Vector3(-4.5 + (6 * a), i, 0))
        RedFramePoints.push(new THREE.Vector3(-4.5 + (6 * a), i + 1, 0))
    }
    for (var i = -1.5; i < 3.5; i++) {
        //세로선 그리기
        a = 9 / 8;
        RedFramePoints.push(new THREE.Vector3(-4.5 + (2 * a), i, 0))
        RedFramePoints.push(new THREE.Vector3(-4.5 + (3 * a), i, 0))
        RedFramePoints.push(new THREE.Vector3(-4.5 + (3 * a), i, 0))
        RedFramePoints.push(new THREE.Vector3(-4.5 + (4 * a), i, 0))
        RedFramePoints.push(new THREE.Vector3(-4.5 + (4 * a), i, 0))
        RedFramePoints.push(new THREE.Vector3(-4.5 + (5 * a), i, 0))
        RedFramePoints.push(new THREE.Vector3(-4.5 + (5 * a), i, 0))
        RedFramePoints.push(new THREE.Vector3(-4.5 + (6 * a), i, 0))
    }
    var RedFrameGeometry = new THREE.BufferGeometry().setFromPoints(RedFramePoints);
    var RedFrame = new THREE.LineSegments(RedFrameGeometry, RedFrameMaterials);
    RedFrame.rotation.x = -Math.PI / 2;
    scene.add(RedFrame);

    // 4. Materials - 공 생성
    var FFGeometry = new THREE.Geometry(); // Fastball Fourseam #FF0000
    var FFmaterial = new THREE.PointsMaterial({ size: 3, sizeAttenuation: false, color: 0xFF0000  })
    var FF_Flag = 0;

    var FTGeometry = new THREE.Geometry(); // Fastball Twoseam #DC7633
    var FTmaterial = new THREE.PointsMaterial({ size: 3, sizeAttenuation: false, color: 0xDC7633 })
    var FT_Flag = 0;

    var FCGeometry = new THREE.Geometry(); // Fastball Cutter #A569BD
    var FCmaterial = new THREE.PointsMaterial({ size: 3, sizeAttenuation: false, color: 0xA569BD  })
    var FC_Flag = 0;

    var CHGeometry = new THREE.Geometry(); // Change Up #00FF00
    var CHmaterial = new THREE.PointsMaterial({ size: 3, sizeAttenuation: false, color: 0x00CC00  })
    var CH_Flag = 0;

    var CUGeometry = new THREE.Geometry(); // Curve Ball #0000FF  
    var CUmaterial = new THREE.PointsMaterial({ size: 3, sizeAttenuation: false, color: 0x0000FF   })
    var CU_Flag = 0;

    var SLGeometry = new THREE.Geometry(); // SLider #00FFFF
    var SLmaterial = new THREE.PointsMaterial({ size: 3, sizeAttenuation: false, color: 0x00CCCC })
    var SL_Flag = 0;

    var SKGeometry = new THREE.Geometry(); // SinKer 0xF4D03F
    var SKmaterial = new THREE.PointsMaterial({ size: 3, sizeAttenuation: false, color: 0xF4D03F  })
    var SK_Flag = 0;

    var SPGeometry = new THREE.Geometry(); // SPlitter #5D6D7E 
    var SPmaterial = new THREE.PointsMaterial({ size: 3, sizeAttenuation: false, color: 0x5D6D7E  })
    var SP_Flag = 0;

    var KNGeometry = new THREE.Geometry(); // KNukle #48C9B0  
    var KNmaterial = new THREE.PointsMaterial({ size: 3, sizeAttenuation: false, color: 0x48C9B0   })
    var KN_Flag = 0;

    for (var i = 0; i < pitch_type.length; i++) {
        var vertex = new THREE.Vector3(parseFloat(plate_x[i]), parseFloat(plate_z[i]), 0.1); // Vertex 좌표 생성
        var temp_pitch_type = pitch_type[i];
        switch (temp_pitch_type) {
            case 'FF':
                FFGeometry.vertices.push(vertex);
                FF_Flag += 1;
                break;
            case 'FT':
                FTGeometry.vertices.push(vertex);
                FT_Flag += 1;
                break;
            case 'FC':
                FCGeometry.vertices.push(vertex);
                FC_Flag += 1;
                break;
            case 'CH':
                CHGeometry.vertices.push(vertex);
                CH_Flag += 1;
                break;
            case 'CU':
                CUGeometry.vertices.push(vertex);
                CU_Flag += 1;
                break;
            case 'SL':
                SLGeometry.vertices.push(vertex);
                SL_Flag += 1;
                break;
            case 'SK':
                SKGeometry.vertices.push(vertex);
                SK_Flag += 1;
                break;
            case 'SP':
                SPGeometry.vertices.push(vertex);
                SP_Flag += 1;
                break;
            case 'KN':
                KNGeometry.vertices.push(vertex);
                KN_Flag += 1;
                break;
        }
    }

    // 점 생성
    var FF = new THREE.Points(FFGeometry, FFmaterial);
    var FT = new THREE.Points(FTGeometry, FTmaterial);
    var FC = new THREE.Points(FCGeometry, FCmaterial);
    var CH = new THREE.Points(CHGeometry, CHmaterial);
    var CU = new THREE.Points(CUGeometry, CUmaterial);
    var SL = new THREE.Points(SLGeometry, SLmaterial);
    var SK = new THREE.Points(SKGeometry, SKmaterial);
    var SP = new THREE.Points(SPGeometry, SPmaterial);
    var KN = new THREE.Points(KNGeometry, KNmaterial);

    FF.translateY(0.1);
    FF.translateZ(2);
    FF.rotation.x = -Math.PI / 2;
    FT.translateY(0.11);
    FT.translateZ(2);
    FT.rotation.x = -Math.PI / 2;
    FC.translateY(0.12);
    FC.translateZ(2);
    FC.rotation.x = -Math.PI / 2;
    CH.translateY(0.13);
    CH.translateZ(2);
    CH.rotation.x = -Math.PI / 2;
    CU.translateY(0.14);
    CU.translateZ(2);
    CU.rotation.x = -Math.PI / 2;
    SL.translateY(0.16);
    SL.translateZ(2);
    SL.rotation.x = -Math.PI / 2;
    SK.translateY(0.16);
    SK.translateZ(2);
    SK.rotation.x = -Math.PI / 2;
    SP.translateY(0.18);
    SP.translateZ(2);
    SP.rotation.x = -Math.PI / 2;
    KN.translateY(0.20);
    KN.translateZ(2);
    KN.rotation.x = -Math.PI / 2;

    // scene에 점 추가
    if (FF_Flag != 0) {
        scene.add(FF);
    }
    if (FT_Flag != 0) {
        scene.add(FT);
    }
    if (FC_Flag != 0) {
        scene.add(FC);
    }
    if (CH_Flag != 0) {
        scene.add(CH);
    }
    if (CU_Flag != 0) {
        scene.add(CU);
    }
    if (SL_Flag != 0) {
        scene.add(SL);
    }
    if (SK_Flag != 0) {
        scene.add(SK);
    }
    if (SP_Flag != 0) {
        scene.add(SP);
    }
    if (KN_Flag != 0) {
        scene.add(KN);
    }

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

    //InterFace :: GUI
    //구질에 대한 체크박스를 만들어 표시
    var GuiControls = new function () {
        this.FF = true;
        this.FT = true;
        this.FC = true;
        this.CH = true;
        this.CU = true;
        this.SL = true;
        this.SK = true;
        this.SP = true;
        this.KN = true;
    }

    var Gui = new dat.GUI({ autoPlace: false });
    // domElement 세팅
    Gui.domElement.id = 'Gui';
    var Gui_Container = document.getElementById('Gui_Container');
    Gui_Container.appendChild(Gui.domElement);

    // gui에 탭 추가 및 아이템에 이벤트 추가 (onChange)
    if (FF_Flag != 0) {
        var Flag_FF = 0;
        Gui.add(GuiControls, 'FF').onChange(
            function (params) {
                if ((Flag_FF % 2) == 0) {
                    scene.remove(FF);
                }
                if ((Flag_FF % 2) == 1) {
                    scene.add(FF);
                }
                Flag_FF++;
            }
        );
    }

    if (FT_Flag != 0) {
        var Flag_FT = 0;
        Gui.add(GuiControls, 'FT').onChange(
            function (params) {
                if ((Flag_FT % 2) == 0) {
                    scene.remove(FT);
                }
                if ((Flag_FT % 2) == 1) {
                    scene.add(FT);
                }
                Flag_FT++;
            }
        );
    }

    if (FC_Flag != 0) {
        var Flag_FC = 0;
        Gui.add(GuiControls, 'FC').onChange(
            function (params) {
                if ((Flag_FC % 2) == 0) {
                    scene.remove(FC);
                }
                if ((Flag_FC % 2) == 1) {
                    scene.add(FC);
                }
                Flag_FC++;
            }
        );
    }

    if (CH_Flag != 0) {
        var Flag_CH = 0;
        Gui.add(GuiControls, 'CH').onChange(
            function (params) {
                if ((Flag_CH % 2) == 0) {
                    scene.remove(CH);
                }
                if ((Flag_CH % 2) == 1) {
                    scene.add(CH);
                }
                Flag_CH++;
            }
        );
    }

    if (CU_Flag != 0) {
        var Flag_CU = 0;
        Gui.add(GuiControls, 'CU').onChange(
            function (params) {
                if ((Flag_CU % 2) == 0) {
                    scene.remove(CU);
                }
                if ((Flag_CU % 2) == 1) {
                    scene.add(CU);
                }
                Flag_CU++;
            }
        );
    }

    if (SL_Flag != 0) {
        var Flag_SL = 0;
        Gui.add(GuiControls, 'SL').onChange(
            function (params) {
                if ((Flag_SL % 2) == 0) {
                    scene.remove(SL);
                }
                if ((Flag_SL % 2) == 1) {
                    scene.add(SL);
                }
                Flag_SL++;
            }
        );
    }

    if (SK_Flag != 0) {
        var Flag_SK = 0;
        Gui.add(GuiControls, 'SK').onChange(
            function (params) {
                if ((Flag_SK % 2) == 0) {
                    scene.remove(SK);
                }
                if ((Flag_SK % 2) == 1) {
                    scene.add(SK);
                }
                Flag_SK++;
            }
        );
    }

    if (SP_Flag != 0) {
        var Flag_SP = 0;
        Gui.add(GuiControls, 'SP').onChange(
            function (params) {
                if ((Flag_SP % 2) == 0) {
                    scene.remove(SP);
                }
                if ((Flag_SP % 2) == 1) {
                    scene.add(SP);
                }
                Flag_SP++;
            }
        );
    }

    if (KN_Flag != 0) {
        var Flag_KN = 0;
        Gui.add(GuiControls, 'KN').onChange(
            function (params) {
                if ((Flag_KN % 2) == 0) {
                    scene.remove(KN);
                }
                if ((Flag_KN % 2) == 1) {
                    scene.add(KN);
                }
                Flag_KN++;
            }
        );
    }

    // Div(Scene)에 Renderer를 등록
    function render() {
        renderer.render(scene, camera);
    }

    document.getElementById("threejs_scene").appendChild(renderer.domElement);
    render();
    animate();
}