import axios from 'axios'
import cheerio from 'cheerio'
import { sanitizeKey, sanitizeValue } from './utils'

export const provisioning = {
  host: 'http://provisioning.fibertel.com.ar',
  path: '/asp/nivelesPrima.asp'
}

export const provisioningUrl = process.env.PROVISIONING_URL ?? `${provisioning.host}${provisioning.path}`

export interface FibertelStats {
  tx: number
  freqTx: number
  rx: number
  freqRx: number
  mer: number
  equipo: string
  descripcion: string
  versionOs: string
}

export async function getStats (url: string = provisioningUrl): Promise<FibertelStats> {
  try {
    const response = await axios(url)

    if (response.status !== 200) {
      throw new Error('Invalid provisioning path.')
    }

    return parseStats(response.data)
  } catch (error) {
    throw new Error('Could not reach provisioning url.')
  }
}

export function parseStats (html: string): FibertelStats {
  const $ = cheerio.load(html)

  // Bail if we are not in a fibertel network
  const error = $('.error').text()
  if (error.length > 0) {
    throw new Error('Could not connect to CableModem. Are you sure you are on a fibertel network?')
  }

  // Voodoo
  const arrayStats = $('.tablaInformacion td.etiqueta, td.valor, td.valorDestacado')
    .toArray()
    .map(v => $(v).text())
    .map((v, i) => i % 2 === 0 ? sanitizeKey(v) : sanitizeValue(v))

  const keyValueArrayStats = new Array(arrayStats.length / 2)
    .fill('')
    .map((_, i) => arrayStats.slice(i * 2, (i + 1) * 2))

  const stats: FibertelStats = Object.fromEntries(keyValueArrayStats)
  return stats
}
