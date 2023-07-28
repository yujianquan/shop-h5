import axios, {AxiosRequestConfig} from "axios"
import Vue from 'vue'
const vm:any = new Vue()
// 对于axios的封装是直接使用的我们的线上的代码，把一些业务逻辑拆除了，所以看起来没那么合理
export const servProxy = axios.create({})
// 这里的拦截暂时不详细做，因为数据是mock的，和正式的有差距，
servProxy.interceptors.request.use(function (config) {
    vm.$showLoading()
    return config
}, function (error) {
    vm.$hideLoading()
    // return Promise.reject(error)
})

servProxy.interceptors.response.use(
    (res:any) => {
        vm.$hideLoading()
        return res
    },
    (error) => {
        // do something
        try {
            const { status, data:{ message } } = error.response
            switch (status) {
                case 500:
                    alert(message || '系统出错了！')
                    break
                case 404:
                    alert(message || '接口出错了！')
                    break
                default:
                    alert(message || '系统出错了！')
                    break
            }
            vm.$hideLoading()
            return false
        } catch (error) {
            alert('网络出故障了')
            vm.$hideLoading()
        }
    }
)

const httpService = async function (axiosIns:AxiosRequestConfig) {
    const res = await servProxy(axiosIns)
    try {
        const { code } = res.data
        if (code == "200") {
            return res.data
        } 
    } catch (error) {
        // alert('系统出错了！')
    }

}

export default httpService
