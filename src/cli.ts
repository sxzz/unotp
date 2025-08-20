#!/usr/bin/env node

import process from 'node:process'
import { exec } from 'tinyexec'
import { buildEnv, get1PasswordOtp } from './index.ts'

main()

async function main() {
  const cmd = process.argv.slice(2).join(' ')
  if (!cmd.trim()) {
    console.error('No command specified')
    process.exitCode = 1
    return
  }

  const itemKey = process.env.NPM_1PASSWORD_KEY
  if (!itemKey) {
    console.error(
      'No 1Password item key specified, please set the `NPM_1PASSWORD_KEY` environment variable',
    )
    process.exitCode = 2
    return
  }

  const otp = await get1PasswordOtp(itemKey)
  const env = buildEnv(otp)

  await exec(cmd, undefined, {
    nodeOptions: {
      env,
      stdio: 'inherit',
      shell: true,
    },
  })
}
