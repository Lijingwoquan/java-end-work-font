import axios from "~/axios.js";
import { toast } from "~/composables/util.js"
axios.defaults.headers.post['Content-Type'] = 'application/json';

export function addGoods(name, price, imgUrl) {
    return axios.post('/manager/addGoods', {
        name,
        price,
        imgUrl
    }).then(res => {
        toast("添加商品成功", "success")
        resolve(res)
    }).catch(err => {
        toast("添加商品失败", "error")
        reject(err)
    })
}

