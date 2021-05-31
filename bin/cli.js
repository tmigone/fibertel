#!/usr/bin/env node

const { getStats } = require('../build/src')

const url = process.argv[2]

async function run () {
  console.log('--- Fibertel Stats ---')
  try {
    const stats = await getStats(url)
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

// eslint-disable-next-line
run()
