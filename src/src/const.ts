export const API = {
  search: '/api/explore/search',
  tags: '/api/explore/tags',
  exts: '/api/explore/exts',
  meta: '/api/explore/meta',
  raw: '/api/explore/raw'
}

export const WebSocketEvent = '/api/websocket/client'

export const MarkdownRawExt = [
  'jpg',
  'jpeg',
  'gif',
  'png',
  'svg',
  'webp',
  'bmp',
  'ico',
  ''
]

export const TextViewExt = [
  'txt', 'cpp', 'c', 'js', 'yaml'
]

export const ExtCodeMirrorMode: Record<string, string> = {
  cpp: 'clike',
  c: 'clike',
  h: 'clike',
  hpp: 'clike',
  go: 'go',
  js: 'javascript',
  txt: 'shell'
}

export const VideoExt = [
  '3gpp', '3gp', 'ts', 'mp4', 'mpeg',
  'mpg', 'mov', 'webm', 'flv', 'm4v',
  'mng', 'asx', 'asf', 'wmv', 'avi'
]
