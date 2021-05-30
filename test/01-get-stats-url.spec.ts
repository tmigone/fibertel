import test from 'ava'
import nock from 'nock'
import { getStats, provisioning } from '../src/fibertel'

test('Call getStats with an unreachable url', async t => {
  nock(provisioning.host)
    .get(provisioning.path)
    .reply(404, {})

  await t.throwsAsync(async () => {
    await getStats()
  })
})

test('Call getStats with a reachable url', async t => {
  nock(provisioning.host)
    .get(provisioning.path)
    .reply(200, {})

  await t.notThrowsAsync(async () => {
    await getStats()
  })
})
