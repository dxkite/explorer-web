import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

NProgress.configure({
  easing: 'ease', // 动画方式
  speed: 1000, // 递增进度条的速度
  showSpinner: false, // 是否显示加载ico
  trickleSpeed: 200, // 自动递增间隔
  minimum: 0.3, // 更改启动时使用的最小百分比
  parent: 'body', //指定进度条的父容器
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
