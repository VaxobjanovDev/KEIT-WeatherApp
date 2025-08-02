import { WeatherDataItem } from '../types/company.ts'

export const parseWeatherData = (items: WeatherDataItem[]) => {
  const findValue = (category: string) => items.find((item) => item.category === category)?.obsrValue ?? ''

  const vecRaw = Number(findValue('VEC'))

  return {
    temperature: findValue('T1H'),
    humidity: findValue('REH'),
    windSpeed: findValue('WSD'),
    windDirection: mapVecToDirection(vecRaw)
  }
}

export function mapVecToDirection(vec: number): string {
  if (vec >= 0 && vec < 45) return 'N-NE'
  if (vec >= 45 && vec < 90) return 'NE-E'
  if (vec >= 90 && vec < 135) return 'E-SE'
  if (vec >= 135 && vec < 180) return 'SE-S'
  if (vec >= 180 && vec < 225) return 'S-SW'
  if (vec >= 225 && vec < 270) return 'SW-W'
  if (vec >= 270 && vec < 315) return 'W-NW'
  if (vec >= 315 && vec <= 360) return 'NW-N'
  return ''
}
