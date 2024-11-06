import { notification as antd_notification } from "antd"
import type { ArgsProps } from "antd/es/notification"

export interface Notification {
  message?: string
  description?: string
}

const baseNotificationConfig: Partial<ArgsProps> = {
  // in seconds
  duration: 2
}

function sendNotification(config: ArgsProps) {
  antd_notification.open({...baseNotificationConfig, ...config})
}

export const notificationService = {
  success: (notification: Notification) => {
    sendNotification({
      message: 'Успешно',
      ...notification,
      type: 'success'
    })
  },    
  warning: (notification: Notification) => {
    sendNotification({
      message: 'Внимание',
      ...notification,
      type: 'warning'
    })
  },    
  error: (notification: Notification) => {
    sendNotification({
      message: 'Ошибка',
      ...notification,
      type: 'error'
    })
  },
}