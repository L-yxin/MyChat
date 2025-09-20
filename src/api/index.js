import axios from "axios";

axios.defaults.baseURL = import.meta.env.BASE_URL+'api'
axios.defaults.withCredentials = true;
const login = (email,phone,phoneCode,passwordHash)=>{
    const params = new URLSearchParams();
    params.append('email', email);
    params.append('phone', phone);
    params.append('phoneCode', phoneCode);
    params.append('passwordHash', passwordHash);
    return axios.post(`login?${params.toString()}`).then(res=>{
        if(res.data.status !== 200){
            return Promise.reject(res.data)
        }
        return Promise.resolve(res.data)
    })
}
const register = (email,phone,phoneCode,passwordHash,username)=>{
    const params = new URLSearchParams();
    params.append('email', email);
    params.append('phone', phone);
    params.append('phoneCode', phoneCode);
    params.append('passwordHash', passwordHash);
    params.append('username', username);
    return axios.post(`register?${params.toString()}`).then(res=>{
        if(res.data.status !== 200){
            return Promise.reject(res.data)
        }
        return Promise.resolve(res.data)
    })
}
export {
    login,
    register
}