import axios from 'axios'

// export function request(config){
//     return new Promise((resolve,reject)=>{
//         const instance = axios.create({
//             baseURL:'http://123.207.32.32:8000',
//             timeout:2000
//         })
//         // 发送真正的网络请求
//         instance(config)
//             .then(res=>{
//                 resolve(res)
//             })
//             .catch(err=>{
//                 reject(err)
//             })
//     })
// }

export function request(config) {
    const instance = axios.create({
      // 123.207.32.32:8000
      // 106.54.54.237:8000
        baseURL:'http://106.54.54.237:8000/api/wh',
        timeout: 5000
    })

    // axios的拦截器
    instance.interceptors.request.use(config=>{
        // console.log(config)
        //这里相当于已经把config给拦截下来了 还要返回出去
        return config
    },err=>{
        // console.log(err)
    })

    //响应拦截
    instance.interceptors.response.use(res=>{
        //这里拦截res
        // console.log(res);
        return res.data
    },err => {
        console.log(err + "错误");
    })
    return instance(config)
}
