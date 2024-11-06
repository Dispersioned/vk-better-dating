export interface Notification {
  title: string
  description?: string
}

export const notificationService = {
  success: (notification: Notification) => {console.log('успешно!', notification.title)},
  warning: (notification: Notification) => {console.log('внимание!',notification.title)},
  error: (notification: Notification) => {console.log('ошибка!',notification.title)},
}