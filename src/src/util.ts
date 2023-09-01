import { b64urlEncode, b64urlDecode } from '@waiting/base64'
import path from 'path'

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
