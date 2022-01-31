//データ
const kekka = ['説明会を受けた、予約した','筆記試験を終えた','一次面接を終えた','二次面接を終えた', '最終面接を終えた','内定をもらった','この企業に決めた','お祈りされた']
let kekkacom = [],kekkapro = [],selectcom = [], answered = false, id

for (let i = 0; questiondata.length > i && changedata(questiondata[i]) < nowtime/1000000; i++) {
    answered = nowtime / 1000000 - changedata(questiondata[i]) < 7;
    id = questiondata[i + 1]
}

//最新のアンケートの回答を取得する
for (let i = 0; anid.length > i && changedata(anid[i]) <= changedata(id); i++) {
// for (let i = 0; anid.length > i && changedata(anid[i]) < 20220603; i++) {
    if (anid[i] !== anid[i - 1]) {
        kekkacom = [ancom[i]]
        kekkapro = [anpro[i]]
    } else {
        kekkacom.push(ancom[i])
        kekkapro.push(anpro[i])
    }
    // answered = nowtime / 1000000 - changedata(anid[i]) < 7;
    // id = anid[i + 1];
}

function changedata(time) {
    let date = time.substr(0,4)
    for (let i = 5; 10 > i; i += 3) date += time.substr(i,2)
    return Number(date)
}

//イベント処理。
$(function() {
    if (answered) document.querySelector('h1').innerText = '回答済みです'
    if (anid.length === 0) {
        rear.innerHTML = '';
        question.innerHTML = '<div id="question0"></div>';
        SelectCom(0);
    } else { //radiobuttonが押されたというイベント処理
        const rdo = document.getElementById('yesno');
        rdo.addEventListener('change', function () {rdo.radioq.value === 'いいえ' ? RadioNo():RadioYes()});
    }
});

//「いいえ」が押されたとき
function RadioNo() {
    let str = ''
    for (let i = 0; kekkacom.length > i; i++) {
        let kpro = kekkapro[0] ? '<p>進捗状況 : ' + kekkapro[i] + '</p>' : ''
        str += '<p>' + (i + 1) +  '社目</p><p>企業名 : ' + kekkacom[i] + '</p>' + kpro + '<br>'
    }
    question.innerHTML = str + '<input type="submit" value="回答">'
}

//「はい」が押されたとき
function RadioYes() {
    question.innerHTML = '<div id="question0"></div>'
    selectcom.length = 0
    for (let i = 0; kekkacom.length > i; i++) {
        SelectCom(i,kekkacom[i])
        if (kekkacom[i] !== 'なし')SelectPro(i,kekkapro[i])
    }
}

//アンケートの企業回答欄を表示する(企業追加)
function SelectCom(num, selected) {
    let str1 = '',
        str2 = '<div id="question' + (num + 1) + '"><input type="button" value="check" onclick="SelectPro(' + num + ')">',
        i = num > 0 ? 1 : 0,
        element = document.getElementById('question' + num)
    selected = selected ? selected : null
    str1 += '<p>' + (num + 1) + '社目</p><label>企業を選んでください<select id="selectcompany' + num + '">'
    for (i; company.length > i; i++) {
        let boolean = true
        for (let j = 0; selectcom.length > j; j++) {
            if (selectcom[j] === company[i]) {
                boolean = false
                break
            }
        }
        if (!boolean) continue
        if (company[i] === selected) {
            str1 += '<option selected value=' + company[i] + '>' + company[i] + '</option>';
        } else {
            str1 += '<option value=' + company[i] + '>' + company[i] + '</option>';
        }
    }
    str1 += '</select>'
    element.innerHTML = str1
    str2 += num >= kekkacom.length && num !== 0 ?'<input type="button" value="企業削除" onclick="RemoveCom(' + num + ')">':''
    element.insertAdjacentHTML("afterend", str2 + '</div>' )
}

//アンケートの進捗状況回答欄を表示する(checkボタン)
function SelectPro(num, checked) {
    const com = document.getElementById('selectcompany' + num)
    let str1 = '<p>' + (num + 1) + '社目</p><p>選んだ企業：　' + com.value + '</p>',
        str2 = '',
        count = 0
    checked = checked ? checked : kekka[0]
    while (checked !== kekka[count]) count++
    selectcom[num] = com.value
    if (com.value !== 'なし') {
        str1 += '<p>進み具合を記入してください</p>'
        for (let i = 0; kekka.length > i; i++) {
            if (count > i) continue
            if (count === i) {
                str1 += '<label><input type="radio" name="kekka' + num + '" value="' + kekka[i] + '" checked>' + kekka[i] + '<br></label>'
            } else {
                str1 += '<label><input type="radio" name="kekka' + num + '" value="' + kekka[i] + '">' + kekka[i] + '<br></label>'
            }
        }
        str2 += selectcom.length !== company.length - 1 ? '<input type="button" value="企業追加" onclick="SelectCom(' + (num + 1) + ')">' : 'これ以上企業を追加できません'
        str2 += num >= kekkacom.length && num !== 0 ?'<input type="button" value="企業削除" onclick="RemoveCom(' + num + ')">':''
    }
    str2 += '<input type="submit" value="送信">'
    str2 += num >= kekkacom.length ? '<input type="button" value="企業選びなおし" onclick="ReselectCom(' + num + ')">': ''
    document.getElementById('question' + (num + 1)).innerHTML = str2
    document.getElementById('question' + num).innerHTML = str1
}

//企業削除を押したとき
function RemoveCom(num) {
    let str = ''
    str += '<input type="button" value="企業追加" onclick="SelectCom(' + num + ')">'
    str += num > kekkacom.length ?'<input type="button" value="企業選びなおし" onclick="ReselectCom(' + (num - 1) + ')">' :''
    str += num > kekkacom.length && num < 1 ?'<input type="button" value="企業削除" onclick="RemoveCom(' + (num - 1) + ')">' :''
    str += '<input type="submit" value="送信">'
    document.getElementById('question' + (num + 1)).remove()
    document.getElementById('question' + num).innerHTML = str
    selectcom.pop()
}

//企業選びなおしを押したとき
function ReselectCom(num) {
    document.getElementById('question' + (num + 1)).remove()
    selectcom[num] = ''
    SelectCom(num)
}

//送信する前のチェック
function SendCheck(){
    const rdo = document.getElementById('yesno')
    let count = 0,
        check = document.getElementById('sendcheck'),
        sendcom = [], sendpro = []
    if (selectcom[0] === 'なし') sendcom.push('なし')
    else if (rdo.radioq.value === 'はい'){
        for (let i = 0; selectcom.length > i; i++) count += check.elements['kekka' + i].value === kekka[kekka.length-2] ? 1 : 0
        if (count > 1) {
            alert(kekka[kekka.length-2] + ' は1つしか選べません。')
            return false
        }
        for (let i in selectcom) sendcom.push(selectcom[i])
        for (let i in selectcom) sendpro.push(check.elements['kekka' + i].value)
    } else {
        sendcom = kekkacom
        sendpro = kekkapro
    }
    document.getElementById('question').insertAdjacentHTML('afterend','<textarea name="sendcom" style="display: none">' + sendcom + '</textarea>')
    document.getElementById('question').insertAdjacentHTML('afterend','<textarea name="sendpro" style="display: none">' + sendpro + '</textarea>')
    document.getElementById('question').insertAdjacentHTML('afterend','<textarea name="id" style="display: none">' + id + '</textarea>')
}