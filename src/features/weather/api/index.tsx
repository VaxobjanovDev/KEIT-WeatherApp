import { getRequest, Options, GET_WEATHER_INFO } from '../../../shared/api'
import { WeatherResponse } from '../models/types.ts'

export const getWeatherInfo = (options?: Options) => {
  return getRequest<WeatherResponse>(GET_WEATHER_INFO, options)
}
