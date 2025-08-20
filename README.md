# unotp

[![npm version][npm-version-src]][npm-version-href]
[![npm downloads][npm-downloads-src]][npm-downloads-href]
[![Unit Test][unit-test-src]][unit-test-href]

Automatically complete npm OTP 2FA.

## Installation

```bash
npm install -D unotp
```

## Setup

### 1Password

1. Install the [1Password CLI](https://developer.1password.com/docs/cli/get-started/).
2. Set the `UNOTP_1PASSWORD_KEY` environment variable to the name of your npm item in 1Password, or use `op items list` to find the item ID.

You can add this setting to your shell profile for convenience.

#### Bash / Zsh

```bash
export UNOTP_1PASSWORD_KEY=npm
```

#### Fish

```fish
set -gx UNOTP_1PASSWORD_KEY npm
```

### Custom Command

You can also use a custom command to retrieve the OTP. Set the `UNOTP_CUSTOM_CMD` environment variable to your command.

```bash
export UNOTP_CUSTOM_CMD="echo 123456"
```

## Usage

### CLI

```bash
npx unotp <command>
# Example:
npx unotp npm publish
```

### Add to `scripts` in `package.json`

```json
{
  "scripts": {
    "release": "unotp npm publish"
  }
}
```

## Sponsors

<p align="center">
  <a href="https://cdn.jsdelivr.net/gh/sxzz/sponsors/sponsors.svg">
    <img src='https://cdn.jsdelivr.net/gh/sxzz/sponsors/sponsors.svg'/>
  </a>
</p>

## License

[MIT](./LICENSE) License © 2025 [Kevin Deng](https://github.com/sxzz)

<!-- Badges -->

[npm-version-src]: https://img.shields.io/npm/v/unotp.svg
[npm-version-href]: https://npmjs.com/package/unotp
[npm-downloads-src]: https://img.shields.io/npm/dm/unotp
[npm-downloads-href]: https://www.npmcharts.com/compare/unotp?interval=30
[unit-test-src]: https://github.com/sxzz/unotp/actions/workflows/unit-test.yml/badge.svg
[unit-test-href]: https://github.com/sxzz/unotp/actions/workflows/unit-test.yml
