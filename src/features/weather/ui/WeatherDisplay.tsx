import React, { useMemo } from 'react'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { BasicInformationCard } from '../../../widgets/basic-information-card/BasicInformationCard'
import { WeatherInformationCard } from '../../../widgets/weather-information-card/WeatherInformationCard'
import { mockCompanies } from '../../../shared/lib/data/companies'
import { Company } from '../../../shared/lib/types/company'
import { formatDateForApi, formatTimeForApi, isTodayStrict } from '../../../shared/lib/utils/date'
import { ThemeToggle } from '../../../widgets/theme-switcher/ThemeToggle'
import { useGetWeatherInfo } from '../models/useGetWeatherInfo.ts'
import { pathOr } from 'ramda'
import { parseWeatherData } from '../../../shared/lib/utils/weather.ts'
import { useNotification } from '../../../app/providers/notification/useNotification.tsx'
import { LanguageSwitcher } from '../../../widgets/language-switcher'
import { useTranslation } from 'react-i18next'

const validationSchema = Yup.object({
  company: Yup.object().nullable().required('Please select a company'),
  date: Yup.string()
    .required('Please select a date')
    .test('is-today', "Only today's weather data is available", (value) => {
      if (!value) return false
      return isTodayStrict(value)
    }),
  time: Yup.string().required('Please select a time')
})

export const WeatherDisplay: React.FC = () => {
  const { t } = useTranslation('home')
  const { notify } = useNotification()
  const { mutateAsync, weatherInfo, loading } = useGetWeatherInfo()
  const weatherData = pathOr([], ['response', 'body', 'items', 'item'], weatherInfo)
  const serializerWeatherData = useMemo(() => parseWeatherData(weatherData), [weatherData])

  const formik = useFormik({
    initialValues: {
      company: null as Company | null,
      date: new Date().toISOString().split('T')[0],
      time: new Date().toTimeString().slice(0, 5)
    },
    validationSchema,
    onSubmit: async (values) => {
      if (values.company) {
        const apiDate = formatDateForApi(new Date(values.date))
        const apiTime = formatTimeForApi(new Date(`${values.date}T${values.time}`))
        await mutateAsync({
          query: {
            serviceKey: import.meta.env.VITE_API_KEY,
            pageNo: 1,
            numOfRows: 1000,
            dataType: 'JSON',
            base_date: apiDate,
            base_time: apiTime,
            nx: values.company.nx,
            ny: values.company.ny
          }
        })
      }
    }
  })

  const handleGetWeather = () => {
    if (!isTodayStrict(formik.values.date)) {
      notify({
        type: 'warning',
        title: t('Date Selection Restricted'),
        message: t("Only today's weather data is available.")
      })
      return
    }

    if (!formik.values.company) {
      notify({ type: 'error', title: t('Validation Error'), message: t('Please select a company') })
      return
    }

    if (!formik.values.time) {
      notify({ type: 'error', title: t('Validation Error'), message: t('Please select a time') })
      return
    }

    formik.handleSubmit()
  }

  const handleDateRestrictionWarning = () => {
    notify({
      type: 'warning',
      title: t('Date Selection Restricted'),
      message: t("You can't select other date from now. Only today's weather data is available.")
    })
  }
  console.log(weatherData)
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 transition-colors duration-200 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <LanguageSwitcher />
      <ThemeToggle />
      <div className="container mx-auto px-4 py-8">
        <div className="mx-auto max-w-6xl">
          <div className="mb-8 text-center">
            <h1 className="mb-2 bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-4xl font-bold text-transparent dark:from-blue-400 dark:to-indigo-400">
              {t('Weather Information System')}
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-300">
              {t('Get real-time weather data for your selected company location')}
            </p>
          </div>

          <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
            <BasicInformationCard
              selectedCompany={formik.values.company}
              onCompanyChange={(company) => formik.setFieldValue('company', company)}
              companies={mockCompanies}
              date={formik.values.date}
              time={formik.values.time}
              onDateChange={(date) => formik.setFieldValue('date', date)}
              onTimeChange={(time) => formik.setFieldValue('time', time)}
              errors={{
                company: formik.touched.company && formik.errors.company ? formik.errors.company : undefined,
                date: formik.touched.date && formik.errors.date ? formik.errors.date : undefined,
                time: formik.touched.time && formik.errors.time ? formik.errors.time : undefined
              }}
              onDateRestrictionWarning={handleDateRestrictionWarning}
            />

            <WeatherInformationCard
              onGetWeather={handleGetWeather}
              weatherData={serializerWeatherData}
              loading={loading}
              companyData={formik.values.company}
            />
          </div>
        </div>
      </div>
    </div>
  )
}
