import axios from 'axios'
import cheerio from 'cheerio'
import { sanitizeKey, sanitizeValue } from './utils'

const provisioningUrl = process.env.PROVISIONING_URL ?? 'http://provisioning.fibertel.com.ar/asp/nivelesPrima.asp'

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
  const response = await axios(url)

  if (response.status !== 200) {
    throw new Error(`Could not reach ${url}.`)
  }

  return parseStats(response.data)
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
