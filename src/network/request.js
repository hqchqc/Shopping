import axios from 'axios'

export function request(config){
    const instance = axios.create({
        // 接口请与老师联系 
        baseURL: 'http://123.207.32.32:8000/api/m3'
    });

    return instance(config);
}
