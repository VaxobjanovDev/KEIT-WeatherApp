import { MutationOptions, useMutation, useQueryClient } from '@tanstack/react-query'
import { pathOr, propOr } from 'ramda'

import { Options } from '../api'
import { useNotification } from '../../app/providers/notification/useNotification.tsx'

interface UseMutationBaseProps<TData = unknown, TVariables = Options> {
  api: (options?: TVariables) => Promise<TData>
  options?: TVariables
  invalidateKey?: string | string[] | null
  onSuccess?: (data: TData) => void
  onError?: (error: any) => void
  onSettled?: () => void
  showError?: boolean
  mutationOptions?: Omit<MutationOptions<TData, any, TVariables>, 'mutationFn'>
}

export const useMutationBase = <TData = unknown, TVariables = Options>({
  api,
  options,
  invalidateKey,
  onSuccess,
  onError,
  onSettled,
  showError = true,
  mutationOptions
}: UseMutationBaseProps<TData, TVariables>) => {
  const queryClient = useQueryClient()
  const { notify } = useNotification()
  console.log(options)
  const mutation = useMutation<TData, any, TVariables>({
    mutationFn: (vars) => {
      console.log({ options, vars })
      return api({ ...options, ...vars })
    },
    onSuccess: (data) => {
      if (invalidateKey) {
        queryClient.invalidateQueries({ queryKey: Array.isArray(invalidateKey) ? invalidateKey : [invalidateKey] })
      }
      onSuccess?.(data)
    },
    onError: (error) => {
      const dataError = pathOr('Oops, Something went wrong', ['data', 'error'], error)
      const userMsg: string =
        typeof dataError === 'object' ? propOr('Oops, Something went wrong', 'user_msg', dataError) : dataError

      if (showError) {
        notify({
          type: 'error',
          title: 'Error!',
          message: userMsg
        })
      }

      onError?.(error)
    },
    onSettled: () => {
      onSettled?.()
    },
    ...mutationOptions
  })

  return {
    data: mutation.data,
    mutateAsync: mutation.mutateAsync,
    loading: mutation.isPending,
    error: mutation.error,
    isSuccess: mutation.isSuccess
  }
}
