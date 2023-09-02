import axios from 'axios'
import { API } from './const'
import { toCamel } from 'convert-keys'

export interface FileMeta {
  name: string
  path: string
  isDir: boolean
  readme?: string
  children?: FileMeta[]
}

export const getFileMeta = (path: string): Promise<FileMeta> => {
  return axios.get(API.meta + path).then((val) => toCamel(val.data))
}

export const getFileRawText = (path: string): Promise<string> => {
  return axios.get(API.raw + path).then((val) => val.data)
}

export const searchFileMeta = (name: string): Promise<FileMeta[]> => {
  return axios.get(API.search, { params: { name, offset: 0, limit: 100 } }).then((val) => toCamel(val.data))
}