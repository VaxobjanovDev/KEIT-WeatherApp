import qs from 'qs'
import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios'
import { pathParams } from '../lib/utils/pathParams'

export interface Options extends AxiosRequestConfig {
  readonly query?: object
  readonly params?: object
}

const queryToString = (query: object = {}): string => {
  return qs.stringify(query, { arrayFormat: 'repeat' })
}

const createRequestOptions = (options: AxiosRequestConfig, isPrivate = true): AxiosRequestConfig => {
  const { headers = {} } = options
  const token = localStorage.getItem('app-token')
  const language = localStorage.getItem('app-language') || 'ru'

  if (isPrivate && token) {
    headers.Authorization = `Bearer ${token}`
  }

  if (language) {
    headers['Accept-Language'] = language
  }

  return {
    baseURL: import.meta.env.VITE_BASE_URL,
    ...options,
    headers
  }
}

const createRequestUrl = (url: string, query: object = {}, params: object = {}): string => {
  const formattedUrl = pathParams(url, params)

  return [formattedUrl, queryToString(query)].filter(Boolean).join('?')
}

export const request = <T>(url: string, options: Options = {}, isPrivate = true) => {
  return new Promise<T>((resolve, reject) => {
    const { query, params, ...kyOptions } = options

    const formattedOptions = createRequestOptions(kyOptions, isPrivate)
    const formattedUrl = createRequestUrl(url, query, params)

    return axios
      .request({ url: formattedUrl, ...formattedOptions })
      .then((response: AxiosResponse) => {
        if (response.status === 200) {
          return response.data || {}
        }

        return {
          response
        }
      })
      .then((data) => {
        if (data.status === 204) {
          return resolve({} as T)
        }

        return resolve(data)
      })
      .catch((error: AxiosError) => {
        reject(error.response)
        if (error?.response?.status === 401) {
          const appToken = localStorage.getItem('app-token')
          if (appToken) {
            localStorage.setItem('app-token', '')
            location.reload()
          }
        }
        if (error.response?.status === 403) {
          window.location.href = '/forbidden'
        }
      })
  })
}

export const getRequest = <T>(url: string, options: Options = {}, isPrivate?: boolean) => {
  return request<T>(url, { ...options, method: 'get' }, isPrivate)
}

export const postRequest = <T>(url: string, options: Options = {}, isPrivate?: boolean) => {
  return request<T>(url, { ...options, method: 'post' }, isPrivate)
}

export const putRequest = <T>(url: string, options: Options = {}, isPrivate?: boolean) => {
  return request<T>(url, { ...options, method: 'put' }, isPrivate)
}

export const deleteRequest = <T>(url: string, options: Options = {}, isPrivate?: boolean) => {
  return request<T>(url, { ...options, method: 'delete' }, isPrivate)
}

export const patchRequest = <T>(url: string, options: Options = {}, isPrivate?: boolean) => {
  return request<T>(url, { ...options, method: 'patch' }, isPrivate)
}
