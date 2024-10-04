import axios from 'axios';
//实例，可以省略书写基础路径（baseURL的事件，修改也更加方便）
let service=axios.create({
    baseURL:"http://localhost:3000",
    timeout:3000            //ms
})
//为了导出实例，要使用export
export default service
