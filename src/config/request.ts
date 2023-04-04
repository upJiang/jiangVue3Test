import axios, { AxiosRequestConfig, AxiosResponse, AxiosError } from 'axios'
import { getCookie } from '@/utils/cookie'
import { notification } from 'ant-design-vue'
import { store } from '@/store/index'

let reqNum = 0
const startLoading = () => {
  if (reqNum === 0) {
    store.commit('common/setLoading', true)
  }
  reqNum++
}
const endLoading = () => {
  if (reqNum <= 0) return
  reqNum--
  if (reqNum === 0) {
    store.commit('common/setLoading', false)
  }
}

interface ApiResult {
  code: number
  message: string
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  result?: any
}
const token = getCookie('access_token')

const instance = axios.create({
  // 超时时间 1 分钟
  baseURL: import.meta.env.VITE_BASE_URL,
  timeout: 60000,
  headers: {
    Authorization: `Bearer ${token}`,
    'x-client': 'web',
    'Content-Type': 'application/json;charset=UTF-8',
    token,
  },
})

instance.interceptors.request.use(
  (config: AxiosRequestConfig) => {
    config.headers = {
      ...config.headers,
    }
    config.proxy = config.proxy || undefined
    return config
  },
  (err: AxiosError) => {
    Promise.reject(err)
  }
)
instance.interceptors.response.use(
  (response: AxiosResponse) => {
    return response
  },
  (err: AxiosError) => {
    return Promise.reject(err)
  }
)

const request = (options: AxiosRequestConfig = {}, loading = false, delay = false) => {
  loading && startLoading()
  return new Promise<ApiResult>((resolve, reject) => {
    instance(options)
      .then((response: AxiosResponse) => {
        //结束loading，如果穿了delay为true，则延迟150ms用于合并下一个串行请求
        loading &&
          setTimeout(
            () => {
              endLoading()
            },
            delay ? 150 : 0
          )
        if (response?.status === 200) {
          // 想要测试函数组件，把这个展开
          // funComponentList.$TipsDialog({
          //   content: "在request.ts触发的函数式组件",
          //   handleOk: (str) => {
          //     console.log("点击成功，可以在此处做回调操作。" + str);
          //   },
          // });
          // 临时使用mock数据 使用mock数据 不验证code,这个是远程mock
          if (options.url?.includes('mock')) {
            const res: ApiResult = response.data
            return resolve(res)
          } else {
            if (response?.data?.code === 0 || response?.data?.code === 1) {
              return resolve(response.data)
            } else {
              return Promise.reject(response)
            }
          }
        } else {
          return Promise.reject(response)
        }
      })
      .catch(result => {
        if (result?.status === 200) {
          // code 非 0 情况
          notification.error({
            message: `接口错误:code值为：${result?.data?.code}`,
            description: JSON.stringify(result?.data?.message),
          })
        } else if (result?.status && result?.status !== 200) {
          // 状态码非200情况
          notification.error({
            message: `请求错误:http状态码${result?.status}`,
            description: JSON.stringify(result?.message),
          })
        } else {
          // 其他情况
          notification.error({
            message: '接口错误2',
            description: result?.message,
          })
        }
        //结束loading，如果穿了delay为true，则延迟150ms用于合并下一个串行请求
        endLoading()
        reject(result)
      })
  })
}
export default request
