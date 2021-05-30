import camelcase from 'camelcase'

export function sanitizeKey (key: string): string {
  return camelcase(removeSpanishAccents(key))
}

export function sanitizeValue (value: string): string | number {
  const units = [
    ' dBmV',
    ' MHz',
    ' dB'
  ]

  for (const unit of units) {
    value = value.replace(unit, '')
  }

  value = value.replace(',', '.')

  return !isNaN(parseFloat(value)) ? parseFloat(value) : value
}

function removeSpanishAccents (str: string): string {
  const accents = [
    ['á', 'a'],
    ['é', 'e'],
    ['í', 'i'],
    ['ó', 'o'],
    ['ú', 'u']
  ]

  for (const accent of accents) {
    str = str.replace(accent[0], accent[1])
  }
  return str
}
