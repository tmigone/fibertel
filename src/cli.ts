import { Command, flags } from '@oclif/command'
import { getStats } from './fibertel'

export class Fibertel extends Command {
  static description = 'fibertel: utilidad para chequear valores de Tx, Rx y MER del cablemodem de Fibertel.'

  static flags = {
    url: flags.string({
      char: 'u',
      description: 'URL de provisioning del cablemodem.',
      default: 'http://provisioning.fibertel.com.ar/asp/nivelesPrima.asp'
    }),

    continuous: flags.boolean({
      char: 't',
      description: 'Obtener niveles de manera continua sin detener el programa.',
      default: false
    }),

    interval: flags.integer({
      char: 'i',
      description: 'Intervalo de repetición en segundos entre cada obtención de niveles. ',
      default: 30
      // dependsOn: ['continuous']
    }),

    json: flags.boolean({
      char: 'j',
      description: 'Salida en formato JSON.',
      default: false
    })
  }

  async run (): Promise<void> {
    const { flags } = this.parse(Fibertel)

    if (flags.json) {
        await jsonStats(flags.url)
    } else {
        await prettyStats(flags.url)
    }

    if (flags.continuous) {
      while (true) {
        await wait(flags.interval * 1000)
        await prettyStats(flags.url)
      }
    }
  }
}

async function wait (ms: number): Promise<void> {
  return await new Promise(resolve => setTimeout(resolve, ms))
}

async function prettyStats (url: string): Promise<void> {
  console.log('--- Fibertel Niveles ---')
  try {
    const stats = await getStats(url)
    console.log(`Fecha: ${new Date().toISOString()}`)
    console.log(`Tx: ${stats.tx} dBmV`)
    console.log(`Freq Tx: ${stats.freqTx} MHz`)
    console.log(`Rx: ${stats.rx} dBmV`)
    console.log(`Freq Rx: ${stats.freqRx} MHz`)
    console.log(`MER: ${stats.mer} dB`)
    console.log(`Equipo: ${stats.equipo}`)
    console.log(`Descripción: ${stats.descripcion}`)
    console.log(`Versión OS: ${stats.versionOs}`)
  } catch (error) {
    console.log(error)
  }
}

async function jsonStats (url: string): Promise<void> {
  try {
    const stats = await getStats(url)
    const out = JSON.stringify(stats)
    console.log(out)
  } catch (error) {
    console.log(error)
  }
}
