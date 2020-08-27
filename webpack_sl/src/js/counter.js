function number() {
    const div = document.createElement('div');
    div.setAttribute("id", "app");
    div.innerHTML = 200;
    document.body.appendChild(div);
}
module.exports = number;