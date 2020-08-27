import "../img/tomorrow.jpg";
import "../css/index.css";
import axios from 'axios';
import number from './counter';
import a from './a';

number();
a();


// 热加载判断
if (module.hot) {
    module.hot.accept('./counter', function () {
        let asd = document.getElementById("app")
        document.body.removeChild(asd);
        number();
    })
}



axios.get("/api/info").then(res => {
    console.log(res);
});