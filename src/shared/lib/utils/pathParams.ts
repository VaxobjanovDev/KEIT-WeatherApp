export function pathParams(path: string, params: Record<string, any>): string {
  return path.replace(/:([a-zA-Z0-9_\.]+)/g, (_, key) => {
    const value = getValueByPath(params, key)
    if (value === undefined) {
      throw new Error(`Missing path param: "${key}"`)
    }
    return encodeURIComponent(String(value))
  })
}

function getValueByPath(obj: Record<string, any>, path: string): any {
  return path.split('.').reduce((acc, part) => acc?.[part], obj)
}
