import Debug from 'debug'
import { exec } from 'tinyexec'

export const debug: Debug.Debugger = Debug('unotp')

export function buildEnv(otp: string | number): Record<string, string> {
  return {
    npm_config_otp: String(otp),
  }
}

export async function get1PasswordOtp(nameOrIdOrLink: string): Promise<string> {
  debug('Retrieving OTP from 1Password')

  if (debug.enabled) {
    const { stdout: version } = await exec('op', ['--version'])
    debug(`Using 1Password CLI v${version.trim()}`)
  }

  const { stdout } = await exec('op', ['items', 'get', nameOrIdOrLink, '--otp'])
  const otp = stdout.trim()
  debug(`Retrieved OTP from 1Password`)

  return otp
}

export async function getCustomOtp(cmd: string): Promise<string> {
  debug('Retrieving OTP using custom command %s', cmd)
  const { stdout, exitCode } = await exec(cmd, undefined, {
    nodeOptions: { shell: true },
  })
  debug(`Custom command exited with code ${exitCode}`)

  return stdout.trim()
}
