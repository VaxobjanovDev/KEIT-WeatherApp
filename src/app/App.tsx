import {QueryProvider} from './providers/QueryProvider.tsx'
import {ThemeProvider} from './providers/theme/ThemeContext.tsx'
import WeatherPage from '../pages/weather-page/WeatherPage.tsx'
import {NotificationProvider} from './providers/notification/NotificationProvider.tsx'
import '../shared/lib/i18n'
import {Suspense} from 'react'
import {LoadingSpinner} from "../shared/ui/loading";

function App() {
  return (
    <Suspense fallback={<LoadingSpinner size={50} />}>
      <ThemeProvider>
        <NotificationProvider>
          <QueryProvider>
            <WeatherPage/>
          </QueryProvider>
        </NotificationProvider>
      </ThemeProvider>
    </Suspense>
  )
}

export default App
