import axios from 'axios'

export function request(config){
    const instance = axios.create({
        // 接口请与老师联系 
        baseURL: 'http://152.136.185.210:8000/api/z8',
        timeout: 5000
    });

    return instance(config);
}
