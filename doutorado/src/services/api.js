import axios from 'axios';

const api = axios.create({
    //baseURL: 'http://192.168.100.9:3333'
    baseURL: 'http://reviver.cubecode.com.br'
})

export default api;