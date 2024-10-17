import axios from 'axios'
import { useUserStoreHook } from '@/store/user'
import { resolve } from 'path'

const useStore = useUserStoreHook()

/**
 * 导出二进制文件
 * @param {*请求地址} url
 * @param {*请求数据} data
 * @param {*} method
 * @returns {Promise<unknown>}
 */

export function exportFile(url, data = {}, method) {
  return new Promise((resole, reject) => {
    axios({
      method,
      url: import.meta.env.VITE_APP_BASE_API, // 请求地址
      data, //参数
      responseType: 'blob', // 表明返回服务器返回的数据类型
      headers: {
        Authorization: userStore.token,
      },
    }).then(
      (response) => {
        console.log('response', response) // {data: Blob {size: xx , type: 'application/octet-stream'}, status: 200, }  // application/json 不可以
        resolve(response.data)
        console.log(response.headers['content-disposition'])
        let fileName = response.headers['content-disposition']
          .split(';')[1]
          .split('=')[1]
        let blob = new Blob([response.data])
        const link = document.createElement('a')
        fileName = decodeURI(fileName)
        link.download = fileName
        link.style.display = 'none'
        link.href = URL.createObjectURL(blob)
        document.body.appendChild(link)
        link.click()
        URL.revokeObjectURL(link.href) // 释放 URL 对象
        document.body.removeChild(link)
      },
      (err) => {
        reject(err)
      }
    )
  })
}

// const export =(id) {
//   exportFile("url" , {} , "post").then(() => {console.log('success')})
// }
