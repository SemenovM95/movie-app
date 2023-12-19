import { parseISO } from 'date-fns'

const formatDate = (date: string) => {
  const parsedDate = parseISO(date)
  return parsedDate.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

export default { formatDate }
