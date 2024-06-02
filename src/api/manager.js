import axios from "~/axios.js";

export function addGoods(item) {
    return axios.post('/manager/addGoods', item)
}

export function updateGoods(form) {
    return axios.post('/manager/updateGoods', form)
}

export function changeGoodsStatus(id, status) {
    return axios.put('/manager/changeStatusGoods', {
        id,
        status
    })
}

export function getGoods() {
    return axios.get('/manager/getGoods')
}