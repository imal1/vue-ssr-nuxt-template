export function GetObjectByTypeofValue(propType: string) {
  return (obj: Record<string, any>) => {
    const keys = Object.keys(obj)
    const result = {} as Record<string, any>
    for (let i = 0; i <= keys.length; i++) {
      // eslint-disable-next-line valid-typeof
      if (typeof obj[keys[i]] === propType) {
        result[keys[i]] = obj[keys[i]]
      }
    }
    return result
  }
}

export function DifferFromObject(
  target: Record<string, any>,
  source: Record<string, any>
) {
  const keys = Object.keys(source)
  const result = {} as Record<string, any>
  for (let i = 0; i <= keys.length; i++) {
    if (!target[keys[i]] || target[keys[i]] !== source[keys[i]]) {
      result[keys[i]] = source[keys[i]]
    }
  }
  return result
}

export function PickByArray(arr: any[]) {
  return (obj: Record<string, any>) => {
    const keys = Object.keys(obj)
    const result = {} as Record<string, any>
    for (let i = 0; i <= keys.length; i++) {
      if (arr.includes(keys[i])) {
        result[keys[i]] = obj[keys[i]]
      }
    }
    return result
  }
}

export function OmitByArray(arr: any[]) {
  return (obj: Record<string, any>) => {
    return PickByArray(arr)(obj)
  }
}

export default {
  GetObjectByTypeofValue,
  DifferFromObject,
  PickByArray,
  OmitByArray
}
