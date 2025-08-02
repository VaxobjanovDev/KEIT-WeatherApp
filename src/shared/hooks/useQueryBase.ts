import { QueryOptions, useQuery } from '@tanstack/react-query'
import { pathOr, propOr } from 'ramda'
import { Options } from '../api'
import { useNotification } from '../../app/providers/notification/useNotification.tsx'

interface UseQueryBaseProps<TData = unknown, TVariables = Options> {
  api: (options?: TVariables) => Promise<TData>
  queryKey: string | string[]
  options?: TVariables
  queryOptions?: Omit<QueryOptions<TData>, 'queryKey' | 'queryFn'>
  enabled?: boolean
  showError?: boolean
}

export const useQueryBase = <TData = unknown, TVariables = Options>({
  api,
  queryKey,
  options,
  queryOptions,
  enabled = true,
  showError = true
}: UseQueryBaseProps<TData, TVariables>) => {
  const { notify } = useNotification()

  const normalizedQueryKey = Array.isArray(queryKey) ? queryKey : [queryKey]

  const { data, isLoading, error, refetch, isSuccess, isFetching } = useQuery<TData>({
    queryKey: normalizedQueryKey,
    queryFn: async () => {
      try {
        return await api(options)
      } catch (err) {
        handleError(err)
        throw err
      }
    },
    enabled,
    ...queryOptions
  })

  const handleError = (error: any) => {
    if (!showError) return

    const dataError = pathOr('Oops, Something went wrong', ['data', 'error'], error)
    const userMsg: string =
      typeof dataError === 'object' ? propOr('Oops, Something went wrong', 'user_msg', dataError) : dataError

    notify({ type: error, title: 'Error!', message: userMsg })
  }

  return {
    data: data as TData,
    loading: isLoading,
    refetch,
    error,
    isSuccess,
    isFetching
  }
}
