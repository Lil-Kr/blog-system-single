import dayjs from 'dayjs'

export const formatDate = (date: string, format?: string | null) => {
  if (format) {
    return dayjs(date).format(format)
  } else {
    return dayjs(date).format('YYYY-MM-DD')
  }
}
