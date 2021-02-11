function search(target) { // 검색 함수
    var word = { // 타이핑될때마다 저장
        'word': target.value
    };

    $.ajax({

        type: 'POST',
        url: '/PlayerData/search_name',
        data: word,
        error: function (err) {
            console.log("실행중 오류가 발생하였습니다.");
        },
        success: function (data) {

            $("#PlayerList").empty();
            var checkWord = $("#sear").val();

            if (checkWord.length > 0 && data[0].length > 0) {
                $("#PlayerList").css("display", "block");
                for (var i = 0; i < data[0].length; i++) {
                    // id 값으로  리스트 클릭스 검색창 이름 변경
                    $("#PlayerList").append("<li style='display:block;'onclick='aa(this.id);'  id='" + data[0][i] + "'><a href='#'>" + data[0][i] + "</a></li>");
                }
            } else {
                $("#PlayerList").css("display", "none");
            }
        }
    }); //end Ajax


}

function aa(target) { // 선수목록 리스트 클릭시 검색창 이름 변경
    window.location.href="PlayerInfo?Name=" + target.replace(" ","_");
}

function search_click() { // 검색클릭 시 함수
    var Name = $("#sear").val();

    window.location.href="PlayerInfo?Name=" + Name.replace(" ","_");
}
