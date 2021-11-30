function kaisiClick() {

    question.innerHTML = ""

    const su = parseInt(document.getElementById("su").value)

    console.log("開始" + su)

    for (let i = 1; su >= i; i++) {
        question.insertAdjacentHTML('beforeend',
            '<p>' + i + '社目</p>' +
            '<p>企業名を記入してください</p>' +
            '<input type="text" name="kigyou">' +
            '<p>進み具合を記入してください</p>' +
            '<input type="radio" name="kekka" value="setu">  説明会を受けた、予約した<br>' +
            '<input type="radio" name="kekka" value="hikki"> 筆記試験を終えた<br>' +
            '<input type="radio" name="kekka" value="itizi"> 一次面接を終えた<br>' +
            '<input type="radio" name="kekka" value="nizi">  二次面接を終えた<br>' +
            '<input type="radio" name="kekka" value="saisyu">最終面接を終えた<br>' +
            '<input type="radio" name="kekka" value="naitei">内定をもらった<br>' +
            '<input type="radio" name="kekka" value="kimeta">この企業に決めた<br>' +
            '<input type="radio" name="kekka" value="oinori">お祈りされた<br>')
    //    nameは質問ID、valueは質問内容をデータベースからとってくる？
    }
    question.insertAdjacentHTML('beforeend','<input type="submit" value="回答">')
}
