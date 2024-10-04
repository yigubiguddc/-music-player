import { Swipe, SwipeItem,Button, Popup } from 'vant';
// 把这些引入的组件都放入数组中
let vant_plugins=[
    Swipe,SwipeItem,Button,Popup
]
//这里的export default导出函数，使得在main.js中也可以使用
export default function getVant(app){
    vant_plugins.forEach((item) => {
        return app.use(item);
    });
}