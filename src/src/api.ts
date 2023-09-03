import axios from 'axios'
import { API } from './const'
import { toCamel } from 'convert-keys'

export interface FileMeta {
  name: string
  path: string
  modTime: string
  isDir: boolean
  readme?: string
  children?: FileMeta[]
}

export interface Tag {
  name: string
  count: number
}

export interface WebsiteConfig {
  name: string
  copyrightName: string
  websiteRecord: string
  websiteRecordLink: string
  websitePoliceRecord: string
  websitePoliceLink: string
}

export const getTagList = (): Promise<Tag[]> => {
  return axios.get(API.tags).then((val) => toCamel(val.data))
}

export const getFileMeta = (path: string): Promise<FileMeta> => {
  return axios.get(`${API.meta}/${path}`).then((val) => toCamel(val.data))
}

export const getFileRawText = (path: string): Promise<string> => {
  return axios.get(`${API.raw}/${path}`).then((val) => val.data)
}

export const getFileRawLink = async (path: string): Promise<string> => {
  return `${API.raw}/${path}`
}

export const searchFileMeta = (path: string, name: string, tag: string): Promise<FileMeta[]> => {
  return axios.get(API.search, { params: { path, name, tag, offset: 0, limit: -1 } }).then((val) => toCamel(val.data))
}
