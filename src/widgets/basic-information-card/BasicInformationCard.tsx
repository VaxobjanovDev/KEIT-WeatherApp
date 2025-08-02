import React from 'react'
import { Card } from '../../shared/ui/card/Card'
import { Autocomplete } from '../../shared/ui/autocomplete/Autocomplete'
import { Input } from '../../shared/ui/input/Input'
import { DateTimePicker } from '../../shared/ui/datetime-picker/DateTimePicker'
import { Company } from '../../shared/lib/types/company'
import { useTranslation } from 'react-i18next'
import { BuildingIcon, LocationIcon, NavigationIcon } from '../../shared/icons'

interface BasicInformationCardProps {
  selectedCompany: Company | null
  onCompanyChange: (company: Company | null) => void
  companies: Company[]
  date: string
  time: string
  onDateChange: (date: string) => void
  onTimeChange: (time: string) => void
  errors: {
    company?: string
    date?: string
    time?: string
  }
  onDateRestrictionWarning?: () => void
}

export const BasicInformationCard: React.FC<BasicInformationCardProps> = ({
  selectedCompany,
  onCompanyChange,
  companies,
  date,
  time,
  onDateChange,
  onTimeChange,
  errors,
  onDateRestrictionWarning
}) => {
  const { t } = useTranslation('home')
  return (
    <Card title={t('Basic Information')}>
      <div className="space-y-6">
        <Autocomplete
          label={t('Company Name')}
          options={companies.map((company) => ({ id: company.id, name: company.name }))}
          value={selectedCompany ? { id: selectedCompany.id, name: selectedCompany.name } : null}
          onChange={(option) => {
            const company = option ? companies.find((c) => c.id === option.id) || null : null
            onCompanyChange(company)
          }}
          placeholder={t('Search for a company...')}
          error={errors.company}
        />

        {selectedCompany && (
          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            <Input
              label={t('City')}
              value={selectedCompany.city}
              readOnly
              icon={<BuildingIcon className="h-5 w-5 text-blue-500" />}
            />
            <Input
              label={t('District')}
              value={selectedCompany.district}
              readOnly
              icon={<LocationIcon className="h-5 w-5 text-green-500" />}
            />
            <Input
              label={t('Street')}
              value={selectedCompany.street}
              readOnly
              icon={<NavigationIcon className="h-5 w-5 text-purple-500" />}
            />
          </div>
        )}
        <DateTimePicker
          date={date}
          time={time}
          onDateChange={onDateChange}
          onTimeChange={onTimeChange}
          dateError={errors.date}
          timeError={errors.time}
          onDateRestrictionWarning={onDateRestrictionWarning}
        />
      </div>
    </Card>
  )
}
