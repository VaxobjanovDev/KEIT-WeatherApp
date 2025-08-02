// Asosiy ma'lumotlar obyekti
export interface WeatherDataItem {
  baseDate: string
  baseTime: string
  category: string
  nx: number
  ny: number
  obsrValue: string
}

// "items" obyekti
export interface WeatherItems {
  item: WeatherDataItem[]
}

// "body" obyekti
export interface WeatherBody {
  dataType: string
  items: WeatherItems
  pageNo: number
  numOfRows: number
  totalCount: number
}

// "header" obyekti
export interface WeatherHeader {
  resultCode: string
  resultMsg: string
}

// To'liq javob (response) obyekti
export interface WeatherResponse {
  response: {
    header: WeatherHeader
    body: WeatherBody
  }
}
