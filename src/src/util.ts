import path from 'path-browserify'
import { API } from './const'
import router from '@/router'

export const getPreviousPath = (name: string) => {
  return path.dirname(name)
}

export const getDirName = (name: string) => {
  return path.dirname(name)
}

export const hasPreviousPath = (path: string) => {
  return path !== '/'
}

export const replaceMarkdownLink = (filepath: string, content: string, rawExt: string[]) => {
  const dirname = path.dirname(filepath)

  return content.replace(/(!?)\[([^\]]*?)\]\(([^)]+?)\)/g, (substr: string, img: string, name: string, link: string) => {
    // 链接直接调过不处理
    if (/^\w+:/.test(link.trim())) {
      return substr
    }

    const linkFull = encodeURIComponent(path.join(dirname, link))

    const currentRoute = router.resolve({ name: 'Path', params: { path: linkFull } })
    let newUrl = currentRoute.href

    const ext = path.extname(link).toLowerCase().replace(/^\./, '')
    if (rawExt.includes(ext)) {
      newUrl = `${API.raw}/${linkFull}`
    }

    const newLinkMark = `${img}[${name}](${newUrl})`
    console.log(`replace ${substr} -> ${newLinkMark}`)
    // 文件
    return newLinkMark
  })
}

export const createWebsocketLink = (path: string) => {
  const host = window.location.host;
  const wss = window.location.protocol === 'https';
  const protocol = wss ? 'wss' : 'ws';
  return `${protocol}://${host + path}`
}