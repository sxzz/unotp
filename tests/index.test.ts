import process from 'node:process'
import { expect, test } from 'vitest'
import { buildEnv, get1PasswordOtp } from '../src/index.ts'

test('get1PasswordOtp', async () => {
  const otp = await get1PasswordOtp(process.env.NPM_1PASSWORD_KEY!)
  expect(otp).match(/^\d{6}$/)
})

test('buildEnv', () => {
  const env = buildEnv('123456')
  expect(env).toEqual({
    npm_config_otp: '123456',
  })
})
