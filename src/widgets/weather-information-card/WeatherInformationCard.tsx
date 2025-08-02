import React from 'react'
import { Card } from '../../shared/ui/card/Card'
import { Button } from '../../shared/ui/button/Button'
import { Company, WeatherData } from '../../shared/lib/types/company'
import { Input } from '../../shared/ui/input/Input.tsx'
import { useTranslation } from 'react-i18next'
import {
  CloudSunIcon,
  DropletsIcon,
  NavigationIcon,
  NavigationRightIcon,
  ThermometerIcon,
  WindIcon
} from '../../shared/icons'
import { LoadingSpinner } from '../../shared/ui/loading'

interface WeatherInformationCardProps {
  onGetWeather: () => void
  weatherData: WeatherData | null
  loading: boolean
  companyData: Company | null
}

export const WeatherInformationCard: React.FC<WeatherInformationCardProps> = ({
  onGetWeather,
  weatherData,
  loading,
  companyData
}) => {
  const { t } = useTranslation('home')
  return (
    <Card title={t('Weather Information')}>
      <div className="space-y-6">
        <div className="flex flex-col justify-center gap-4">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <Input
              label={t('NX')}
              value={companyData?.nx || ''}
              readOnly
              icon={<NavigationIcon className="h-5 w-5 text-amber-400" />}
            />
            <Input
              label={t('NY')}
              value={companyData?.ny}
              readOnly
              icon={<NavigationIcon className="h-5 w-5 text-amber-400" />}
            />
          </div>
          <Button
            onClick={onGetWeather}
            loading={loading}
            icon={<CloudSunIcon className="h-5 w-5" />}
            size="md"
            className="px-8"
          >
            {t('Get Weather Information')}
          </Button>
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <Input
            label={t('Temperature (°C)')}
            loading={loading && <LoadingSpinner colorClass="text-gray-200 dark:text-white" />}
            value={weatherData?.temperature || ''}
            readOnly
            icon={<ThermometerIcon className="h-5 w-5 text-orange-500" />}
          />
          <Input
            label={t('Humidity (%)')}
            loading={loading && <LoadingSpinner colorClass="text-gray-200 dark:text-white" />}
            value={weatherData?.humidity || ''}
            readOnly
            icon={<DropletsIcon className="h-5 w-5 text-blue-500" />}
          />
          <Input
            label={t('Wind Speed (m/s)')}
            loading={loading && <LoadingSpinner colorClass="text-gray-200 dark:text-white" />}
            value={weatherData?.windSpeed || ''}
            readOnly
            icon={<WindIcon className="h-5 w-5 text-gray-500" />}
          />
          <Input
            label={t('Wind Direction')}
            loading={loading && <LoadingSpinner colorClass="text-gray-200 dark:text-white" />}
            value={weatherData?.windDirection || ''}
            readOnly
            icon={<NavigationRightIcon className="h-5 w-5 text-green-500" />}
          />
        </div>
      </div>
    </Card>
  )
}
