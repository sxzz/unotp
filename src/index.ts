import Debug from 'debug'
import { exec } from 'tinyexec'

const debug = Debug('unotp')

export function buildEnv(otp: string | number): Record<string, string> {
  return {
    npm_config_otp: String(otp),
  }
}

export async function get1PasswordOtp(nameOrIdOrLink: string): Promise<string> {
  const { stdout: version } = await exec('op', ['--version'])
  debug(`Using 1Password CLI v${version}`)

  const { stdout } = await exec('op', ['items', 'get', nameOrIdOrLink, '--otp'])
  return stdout.trim()
}
