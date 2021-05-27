import { getStats, FibertelStats } from './fibertel'

async function run (): Promise<void> {
  console.log(await getStats())
}

// eslint-disable-next-line
run()

export {
  getStats,
  FibertelStats
}
