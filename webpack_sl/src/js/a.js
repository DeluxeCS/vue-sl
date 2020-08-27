function a() {
    const btn = document.createElement("button");
    btn.innerHTML = '添加行';
    document.body.appendChild(btn);
    var div = document.createElement("div");
    let sss = 20;
    btn.onclick = function () {
        sss += 1;
        div.innerHTML = sss;
        document.body.appendChild(div);
    }
}

module.exports = a;