let num = 0
const nextbutton = '<button onclick="indicate(4)">次へ</button>',
    backbutton = '<button onclick="indicate(-4)">前へ</button>'

$(function (){
    indicate(0)
});

function indicate(n) {

    console.log(new1)

    num += n
    let str = '<form th:action="@{/student/ReserveSample}" method="get"><ul>'
    for (let i = 0; i < 4; i++) {
        if (new1.length > i + num) {
            str += '<li>企業名：' + new1[i + num] + '<br>' +
                '説明会日：' + new2[i + num] + '<br>' +
                '予約締切日：' + new3[i + num] + '<br><input type="submit" name="company" value="' + new1[i + num] + '"></li>'
        } else {
            str += '<li>これ以上新着情報はありません</li>'
        }
    }
    str += num !== 0 ? backbutton:''
    str += new1.length > num + 4 ? nextbutton:''
    document.getElementById('newInfo').innerHTML = str
}