const formatText = (text: string, length: number = 35): string => {
  const splitted = text.split(' ')
  if (splitted.length <= length) return text
  return `${splitted.slice(0, length).join(' ')} ...`
}

export default formatText
