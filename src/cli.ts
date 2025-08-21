#!/usr/bin/env node

import process from 'node:process'
import { exec } from 'tinyexec'
import { buildEnv, debug, get1PasswordOtp, getCustomOtp } from './index.ts'

main()

async function main() {
  const cmd = process.argv.slice(2).join(' ')
  if (!cmd.trim()) {
    console.error('No command specified')
    process.exitCode = 1
    return
  }

  const itemKey = process.env.UNOTP_1PASSWORD_KEY
  const customCmd = process.env.UNOTP_CUSTOM_CMD

  let otp: string
  if (itemKey) {
    otp = await get1PasswordOtp(itemKey)
  } else if (customCmd) {
    otp = await getCustomOtp(customCmd)
  } else {
    console.error(
      'No 1Password item key or custom command specified. Please set either `UNOTP_1PASSWORD_KEY` or `UNOTP_CUSTOM_CMD` environment variable.',
    )
    process.exitCode = 2
    return
  }

  const env = buildEnv(otp)

  debug('Executing command: %s', cmd)
  await exec(cmd, undefined, {
    nodeOptions: {
      env,
      stdio: 'inherit',
      shell: true,
    },
  })
}
