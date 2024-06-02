import axios from "~/axios.js";

export function addGoods(item) {
    return axios.post('/manager/addGoods', item)
}

export function updateGoods(form) {
    return axios.post('/manager/updateGoods', form)
}

export function delateGoods(id) {
    return axios.delete('/manager/deleteGoods', {
        data: {
            id: id
        }
    })
}