import test from 'ava'
import { loadFixture, Dictionary, Fixture } from './lib/fixtures'
import { FibertelStats, parseStats } from '../src/fibertel'

const fixtures: Dictionary<Fixture> = {}
const fxToLoad = [
  'fibertel-network',
  'non-fibertel-network'
]

test.before(async _t => {
  for (const fx of fxToLoad) {
    fixtures[fx] = await loadFixture(fx)
  }
})

test('Call parseStats on a fibertel network', t => {
  const stats: FibertelStats = parseStats(fixtures['fibertel-network'].provisioning)
  t.deepEqual(stats, fixtures['fibertel-network']['fibertel-stats'])
})

test('Call parseStats on a non fibertel network', t => {
  t.throws(() => {
    parseStats(fixtures['non-fibertel-network'].provisioning)
  })
})
