export interface Company {
  id: number
  name: string
  city: string
  district: string
  street: string
  nx: number
  ny: number
}

export interface WeatherData {
  humidity: string
  temperature: string
  windDirection: string
  windSpeed: string
}

export interface WeatherResponse {
  data: WeatherData
}

export interface WeatherDataItem {
  baseDate: string
  baseTime: string
  category: string
  nx: number
  ny: number
  obsrValue: string
}
