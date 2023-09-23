import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

NProgress.configure({
  easing: 'ease',
  speed: 100,
  showSpinner: false,
  trickleSpeed: 10,
  minimum: 0.1,
  parent: '#app',
})

const axiosLoadingUrls: string[] = []

// 打开进度条
export const requestUrlStart = (url: string) => {
  if (axiosLoadingUrls.length === 0) {
    NProgress.start()
    console.log('NProgress.start()');
  }
  axiosLoadingUrls.push(url)
}

// 关闭进度条
export const requestUrlFinish = (url: string) => {
  axiosLoadingUrls.pop()
  if (axiosLoadingUrls.length === 0) {
    NProgress.done()
    console.log('NProgress.done()');
  }
}

export const requestUrlError = requestUrlFinish
