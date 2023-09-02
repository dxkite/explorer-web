import { b64urlEncode, b64urlDecode } from '@waiting/base64'
import path from 'path'
import { API } from './const'
import router from '@/router'

export const encodeUrlSafeBase64 = (val: string) => {
  return b64urlEncode(val)
}

export const decodeUrlSafeBase64 = (val: string) => {
  return b64urlDecode(val)
}

export const getPreviousPath = (name: string) => {
  return path.dirname(name)
}

export const getDirName = (name: string) => {
  return path.dirname(name)
}

export const hasPreviousPath = (path: string) => {
  return path !== '/'
}

export const replaceMarkdownLink = (content: string) => {
  return content.replaceAll(/(!?)\[([^\]]*?)\]\(([^)]+?)\)/g, (substr: string, img: string, name: string, link: string) => {
    // 链接直接调过不处理
    if (/^\w+:/.test(link.trim())) {
      return substr
    }

    let newUrl = `${API.raw}/${link}`
    if (/\.md/i.test(link)) {
      const encodeLink = encodeUrlSafeBase64(link)
      const currentRoute = router.resolve({ name: 'Path', params: { path: encodeLink } })
      newUrl = currentRoute.href
    }

    const newLinkMark = `${img}[${name}](${newUrl})`
    console.log(`replace ${substr} -> ${newLinkMark}`)
    // 文件
    return newLinkMark
  })
}
