import { useGetDetail } from '../../../shared/hooks'
import { getWeatherInfo } from '../api'

export const useGetWeatherInfo = () => {
  const {
    data: weatherInfo,
    loading,
    error,
    isSuccess,
    mutateAsync
  } = useGetDetail({
    api: getWeatherInfo
  })

  return {
    mutateAsync,
    weatherInfo,
    loading,
    error,
    isSuccess
  }
}
