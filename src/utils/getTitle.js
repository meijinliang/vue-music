const defaultTitle = '网易云音乐'

export function getPageTitle(title) {
  if (title) {
    return `${title} - ${defaultTitle}`
  }
  return defaultTitle
}
