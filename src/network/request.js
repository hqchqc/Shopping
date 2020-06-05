import axios from 'axios'

export function request(config){
    const instance = axios.create({
        // 接口请与老师联系 
        baseURL: 'http://127.0.0.1'
    });

    return instance(config);
}
