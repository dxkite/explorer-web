import { API } from './const'
import { toCamel } from 'convert-keys'
import axios, { AxiosResponse, InternalAxiosRequestConfig } from 'axios'
import { requestUrlStart, requestUrlFinish, requestUrlError } from './process'
export const instance = axios.create({ timeout: 3000 })

const requestError = (error: any) => {
  const url = (error.config as InternalAxiosRequestConfig).url || '';
  requestUrlError(url);
  return error
}

instance.interceptors.request.use((config: InternalAxiosRequestConfig) => {
  const url = config.url || '';
  requestUrlStart(url);
  return config
}, requestError)

instance.interceptors.response.use((resp: AxiosResponse) => {
  const url = resp.config.url || '';
  requestUrlFinish(url);
  return resp
}, requestError)

export interface FileMeta {
  name: string
  path: string
  modTime: string
  ext?: string
  isDir: boolean
  readme?: string
  rawUrl?: string
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
  return instance.get(API.tags).then((val) => toCamel(val.data))
}

export const getFileMeta = (path: string): Promise<FileMeta> => {
  return instance.get(`${API.meta}/${path}`).then((val) => toCamel(val.data))
}

export const getFileRawText = (path: string): Promise<string> => {
  return instance.get(`${API.raw}/${path}`).then((val) => val.data)
}

export const searchFileMeta = (path: string, name: string, tag: string): Promise<FileMeta[]> => {
  return instance.get(API.search, { params: { path, name, tag, offset: 0, limit: -1 } }).then((val) => toCamel(val.data))
}

export const getRecentList = (limit: number): Promise<FileMeta[]> => {
  return instance.get(API.search, { params: { recent: true, offset: 0, limit } }).then((val) => toCamel(val.data))
}
