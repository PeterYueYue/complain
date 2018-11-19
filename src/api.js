import axios from 'axios';

// 正式
let base ='http://192.168.1.184:8080';

// 获取行政区
export const  getAreaList = params => {
    
    return axios.post(`/openapi/v2/app/complaints/list`).then(res => res.data);
}


// 获取城市
export const  getCitysList = params => {
    let config = Object.assign(
        params,
        {"name":"business.company.getCompanyRange"},
        {"sign": "8D33A89D03349B451AEC5C4D30159417"}
    );
    return axios.post(`http://180.153.19.161:9000/business/api`, config).then(res => res.data);
}