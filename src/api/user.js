import axios from "~/axios.js";

export function buyGoods(goodsList) {
    return axios.post('/user/buyGoods', {
        goodsList
    })
}

export function getGoods() {
    return axios.get('/user/getGoods')
}