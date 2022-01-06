//必要なパッケージの読み込み
google.charts.load('current', {packages: ['corechart']});

//データの宣言
const proanswer = ['お祈りされた','説明会を受けた、予約した','筆記試験を終えた','一次面接を終えた','二次面接を終えた','最終面接を終えた','内定をもらった','この企業に決めた']
const setclass = ['全クラス','クラス別','2年制','3年制','4年制']
const setprogress = ['内定数','内定者数','未内定者数','内定者率']
const settime = ['全期間','直近3か月','直近1か月','2021年12月','2022年01月','2022年02月','2022年03月','2022年04月','2022年05月','2022年06月','2022年07月','2022年08月','2022年09月','2022年10月','2022年11月','2022年12月']
let graphdata = []

//ページが読み込まれた時の最初に実行する
$(function (){
    let divid = document.getElementById('conditions')
    let str = ''
    //データによるhtml作成
    function createhtml(list,name){
        str += '<select id="' + name + '"><option selected value=' + list[0] + '>' + list[0] + '</option>'
        for (let i = 1; list.length > i; i++) str += '<option value=' + list[i] + '>' + list[i] + '</option>'
        str += '</select>'
    }
    createhtml(setclass,'class')
    createhtml(settime,'time')
    createhtml(setprogress,'progress')
    divid.insertAdjacentHTML("beforeend", str + '<input type="button" value="グラフ変更" onclick="ChangeGraph()">')
});

//ページ読み込み後に行う処理。これは、外部データ(googlechart)などすべてを読み込んだ後に行う処理
$(window).on('load', function() {
    ChangeGraph()
});

//Date化して比較するやつ
function ChangeData(time) {
    let date
    switch (time.length) {
        case 19:
            date = time.substr(0,10)
            return date
        case 14:
            date = time.substr(0,4)
            for (let i = 4; 8 > i; i += 2) date += '-' + time.substr(i,2)
            return date
    }
}

//グラフ変更が押された時の処理
function ChangeGraph() {
    const strclass = document.getElementById('class').value
    const strprogress = document.getElementById('progress').value
    const strtime = document.getElementById('time').value
    let max = 25
    let period = []
    let fewdays
    switch (strtime) {
        case settime[0]:period = question
            break
        case settime[1]:
            for (let i = 0; new Date(ChangeData(question[i])).getTime() < new Date(ChangeData(nowtime.toString())).getTime() && question.length > i; i++) fewdays = i
            for (let i = 0; fewdays - i >= 0 && i < 12; i++) period.unshift(question[fewdays - i])
            break
        case settime[2]:
            for (let i = 0; new Date(ChangeData(question[i])).getTime() < new Date(ChangeData(nowtime.toString())).getTime() && question.length > i; i++) fewdays = i
            for (let i = 0; fewdays - i >= 0 && i < 4; i++) period.unshift(question[fewdays - i])
            break
        default:
            for (let i = 0; question.length > i; i++) {
                if (question[i].replace('-','年').split('-')[0] === strtime.split('月')[0]) period.push(question[i])
            }
            break
    }
    switch (strclass) {
        case setclass[0]:
            max = 50
            graphdata = [['日にち', strclass]]
            for (let i = 0; period.length > i; i++) {
                graphdata[i + 1] = [period[i].substr(0, 10),
                    CountStudent(strclass,i)]
            }
            break
        case setclass[1]:
            graphdata = [['日にち', setclass[2], setclass[3], setclass[4]]]
            for (let i = 0; period.length > i; i++) graphdata[i + 1] = [period[i].substr(0, 10)].concat(AllClass(i,2))
            function AllClass(numi,numclass){
                let list = []
                for (let i = numclass; setclass.length > i; i++){
                    list.push(CountStudent(setclass[i],numi))
                }
                return list
            }
            break
        default:
            graphdata = [['日にち', strclass]];
            for (let i = 0; period.length > i; i++) {
                graphdata[i + 1] = [period[i].substr(0, 10),
                    CountStudent(strclass,i)]
            }
            break
    }
    google.charts.setOnLoadCallback(drawLineChart(strclass + 'の' + strtime + 'の' + strprogress,max))

    //カウントする
    function CountStudent(classname,i) {
        if (strprogress === setprogress[3]) {
            if (classname === setclass[0]) return NaiteiSu().filter(function (a) { return a === period[i] }).length / stuclass.length * 100
            return NaiteiSu().filter(function (a) { return a === period[i] }).length / stuclass.filter(function (a) { return a === classname}).length * 100
        }
        return NaiteiSu().filter(function (a) { return a === period[i] }).length
        //データの取得
        function NaiteiSu(){
            let stu = [], id = []
            switch (strprogress) {
                case setprogress[0]:
                case setprogress[1]:
                case setprogress[3]:
                    for (let i = 0; anid.length > i; i++) {
                        if (anpro[i] === proanswer[6] || anpro[i] === proanswer[7]) CoverStu(i)
                    }
                    break
                case setprogress[2]:
                    for (let i = 0; anid.length > i; i++) {
                        let boolean = true
                        let usr = anusr[i]
                        while (anusr[i] === usr) {
                            if (anpro[i] === proanswer[6] || anpro[i] === proanswer[7]) boolean = false
                            i++
                        }
                        i--
                        if (boolean)CoverStu(i)
                    }
                    break
            }
            if (classname === setclass[0])return id
            let classdate = []
            for (let i = 0; stuclass.length > i; i++) {
                if (stuclass[i] === classname) {
                    for (let j = 0; stu.length > j; j++) {
                        if (stu[j] === stuname[i])classdate.push(id[j])
                    }
                }
            }
            return classdate
            //リストの追加とかぶりを消す
            function CoverStu(i) {
                id.push(anid[i])
                stu.push(anusr[i])
                if (strprogress === setprogress[0]) return
                if (stu[stu.length - 1] === stu[stu.length - 2] && id[id.length - 1] === id[id.length - 2]) {
                    id.splice(id.length-1,1)
                    stu.splice(stu.length-1,1)
                }
            }
        }
    }
}

//折れ線グラフ
function drawLineChart(title,max) {
    //オプション設定
    var options = {
        'title': title,
        'width': window.innerWidth,
        'height': window.innerHeight,

        legend: { position: 'bottom' }, //凡例を表示する位置。表示しない場合はnone
        // curveType: 'function', //折れ線グラフの折れる部分を曲線にする
        pointSize: 5, //ポイントサイズ。折れ線の点の大きさ
        vAxis:{minValue:5,maxValue:max}
    };
    //データ
    var data = google.visualization.arrayToDataTable(graphdata);
    var stage = document.getElementById('stage');
    //グラフの種類を設定
    var chart = new google.visualization.LineChart(stage);
    //データとオプションを設定
    chart.draw(data, options);
}

// //円グラフ
// function drawPieChart() {
//     //オプション設定
//     var options = {
//         'title': 'サンプルチャート',
//         'width': window.innerWidth,
//         'height': window.innerHeight,
//         colors: color
//         // slices: {  1: {offset: 0.2}} //飛び出てくるやつを指定。
//     };
//
//     //データ
//     var data = google.visualization.arrayToDataTable(sudata);
//
//     var stage = document.getElementById('stage');
//
//     //グラフの種類を設定
//     var chart = new google.visualization.PieChart(stage);
//
//     //データとオプションを設定
//     chart.draw(data, options);
// }
//
// //棒グラフ
// function drawColumnChart() {
//     //オプション設定
//     var options = {
//         'title': 'サンプルチャート',
//         'width': window.innerWidth,
//         'height': window.innerHeight,
//     };
//
//     //データ
//     var data = google.visualization.arrayToDataTable(dataColum);
//
//     var stage = document.getElementById('stage');
//
//     //グラフの種類を設定
//     var chart = new google.visualization.ColumnChart(stage);
//
//     //データとオプションを設定
//     chart.draw(data, options);
// }