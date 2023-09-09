import path from 'path'
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

export const replaceMarkdownLink = (filepath: string, content: string) => {
  const dirname = path.dirname(filepath)
  return content.replaceAll(/(!?)\[([^\]]*?)\]\(([^)]+?)\)/g, (substr: string, img: string, name: string, link: string) => {
    // 链接直接调过不处理
    if (/^\w+:/.test(link.trim())) {
      return substr
    }

    const linkFull = path.join(dirname, link)
    let newUrl = `${API.raw}/${linkFull}`
    if (/\.md/i.test(link)) {
      const currentRoute = router.resolve({ name: 'Path', params: { path: linkFull } })
      newUrl = currentRoute.href
    }

    const newLinkMark = `${img}[${name}](${newUrl})`
    console.log(`replace ${substr} -> ${newLinkMark}`)
    // 文件
    return newLinkMark
  })
}
