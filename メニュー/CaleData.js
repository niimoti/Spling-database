//constは再代入禁止。
const week = ["日", "月", "火", "水", "木", "金", "土"];
const today = new Date(); //本日の日付

let data = cdata
let name = cname

// 月末だとずれる可能性があるため、1日固定で取得
var showDate = new Date(today.getFullYear(), today.getMonth(), 1);

// 初期表示
window.onload = function () { //window はHTMLが読み込まれたときに行う処理。つまり最初に行う
    showProcess(today, calendar);
    reserveContents(String(today.getFullYear()) + String(today.getMonth() + 1) + String(today.getDate()));
};

// 前の月表示
function prev(){
    showDate.setMonth(showDate.getMonth() - 1);
    showProcess(showDate);
}

// 次の月表示
function next(){
    showDate.setMonth(showDate.getMonth() + 1);
    showProcess(showDate);
}

// カレンダー表示
function showProcess(date) {
    var year = date.getFullYear();
    var month = date.getMonth(); //getMonth() は0始まりのため、次の行で+1している
    document.querySelector('#header').innerHTML = year + "年 " + (month + 1) + "月"; //document.querySelector(#header)でヘッダーに処理を行っている。

    var calendar = createProcess(year, month); //作成したカレンダーを代入して次の行で表示している。
    document.querySelector('#calendar').innerHTML = calendar;
    reserve()
}

// カレンダー作成
function createProcess(year, month,) {
    // 曜日
    var calendar = "<table><tr class='dayOfWeek'>";
    for (var i = 0; i < week.length; i++) { //日～土まで入れている。
        calendar += "<th>" + week[i] + "</th>";
    }
    calendar += "</tr>";
    //次のfor文で使う変数の宣言
    var count = 0; //カウント(日にち)
    var startDayOfWeek = new Date(year, month, 1).getDay(); //表示する月の1日の曜日
    var endDate = new Date(year, month + 1, 0).getDate(); //表示する月の末日
    var lastMonthEndDate = new Date(year, month, 0).getDate(); //表示する先月の末日
    var row = Math.ceil((startDayOfWeek + endDate) / week.length); //カレンダーの行数

    // 1行ずつ設定
    for (var i = 0; i < row; i++) {
        calendar += "<tr>";
        // 1colum(列)単位で設定
        for (var j = 0; j < week.length; j++) {
            if (i === 0 && j < startDayOfWeek) {
                // 1行目で1日まで先月の日付を設定　id disabledをつけることで半透明の文字にする
                let day = String(year) + count0(month) + String(lastMonthEndDate - startDayOfWeek + j + 1)
                calendar += "<td class='disabled' id='" + day +"' onclick='reserveContents(" + day + ")'>" + (lastMonthEndDate - startDayOfWeek + j + 1) + "</td>";
            } else if (count >= endDate) {
                // 最終行で最終日以降、翌月の日付を設定
                count++;
                let day = String(year) + count0(month + 2) + count0(count - endDate)
                calendar += "<td class='disabled' id='" + day + "' onclick='reserveContents(" + day + ")'>" + (count - endDate) + "</td>";
            } else {
                // 当月の日付を曜日に照らし合わせて設定
                count++;
                let day = String(year) + count0(month + 1) + count0(count)
                if(year === today.getFullYear() && month === (today.getMonth()) && count === today.getDate()){
                    calendar += "<td class='today' id='" + day + "' onclick='reserveContents(" + day + ")'>" + count + "</td>"; //当日の場所にはclassをつける
                } else {
                    calendar += "<td id='" + day + "' onclick='reserveContents(" + day + ")'>" + count + "</td>";
                }
            }
        }
        calendar += "</tr>";
    }
    return calendar; //カレンダーが書かれたHTML
}

//一桁の時に、左に0を追加する（例 3 →　03）
function count0(num) {
    if (num < 10) {
        String(num)
        num = "0" + num
    }
    return num
}

function reserve() {
//予定の追加と削除、更新
    for (let i = 0; i < cdata.length; i++) {
        let cleardata = cdata[i].split("-")
        let id = document.getElementById(cleardata[0] + cleardata[1] + cleardata[2].substr( 0, 2 ))
        if (id != null) {
            id.classList.remove("reserve") //id.classList.add() クラスの追加
        }
    }
    for (let i = 0; i < data.length; i++) {
        let cleardata = data[i].split("-")
        let id = document.getElementById(cleardata[0] + cleardata[1] + cleardata[2].substr( 0, 2 ))
        if (id != null) {
            id.classList.add("reserve") //id.classList.add() クラスの追加
        }
    }
}

//予定詳細の表示
function reserveContents(a) {
    let j = false;
    let id = String(a)
    let thisday = String(today.getFullYear()) + String(today.getMonth() + 1) + String(today.getDate())
    let element = document.getElementById('reservecontents')
    let day = [id.substr(0,4),id.substr(4,2),id.substr(6,2)]
    if (id === thisday) {
        element.innerHTML = "本日の予定は :<br>"
    }else{
        element.innerHTML = day[0] + "年" + day[1] + "月" + day[2] + "日の予定は :<br>"
    }
    for (i = 0; i < data.length; i++) {
        let cleardata = data[i].split("-");
        if (id === cleardata[0] + cleardata[1] + cleardata[2].substr( 0, 2 )) {
            j = true
            element.insertAdjacentHTML("beforeend", name[i] + "<br>")
        }
    }
    if (j === false) {
        element.insertAdjacentHTML("beforeend", '予定なし')
    }
}

//企業または名前が選ばれた時の変更
function CalenderChange(){
    const str = document.getElementById("stuname").value
    if (str === 'com') {
        name = cname
        data = cdata
    }else {
        console.log(rstu)
        let changedata = [],changename = []
        for (let i = 0; i < rstu.length; i++) {
            if (rstu[i] === str) {
                changename.push(rcom[i])
            }
        }
        for (let i = 0; i < changename.length; i++) {
            for (let j = 0; j < cname.length; j++) {
                if (changename[i] === cname[j]) {
                    changedata.push(cdata[j])
                    break
                }
            }
        }
        name = changename
        data = changedata
    }
    reserve()
}