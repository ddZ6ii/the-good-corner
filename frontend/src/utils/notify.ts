import { Bounce, toast, ToastOptions } from 'react-toastify'

type ToastSettings = {
  info: Partial<ToastOptions>
  success: Partial<ToastOptions>
  error: Partial<ToastOptions>
}

const BASE_OPTIONS: Partial<ToastOptions> = {
  position: 'bottom-right',
  autoClose: 2000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  theme: 'dark',
  transition: Bounce,
}

const TOAST_SETTINGS: ToastSettings = {
  info: {
    ...BASE_OPTIONS,
    type: 'info',
  },
  success: {
    ...BASE_OPTIONS,
    type: 'success',
  },
  error: {
    ...BASE_OPTIONS,
    type: 'error',
  },
}

export const notifyInfo = (message: string): void => {
  toast.info(message, TOAST_SETTINGS.info)
}

export const notifySuccess = (message: string): void => {
  toast.success(message, TOAST_SETTINGS.success)
}

export const notifyError = (message: string): void => {
  toast.error(message, TOAST_SETTINGS.error)
}
