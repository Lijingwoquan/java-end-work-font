import axios from "~/axios.js";

export function getGoods() {
    return axios.get('/getGoods')
}



