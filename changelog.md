## _CHANGELOG_

### v1.2.0 | 13/11/2021

- Fix `is` environment variable conditional for `dev` mode.
- Allow conditional boolean be passed to `if` and `is` wrappers

### v1.1.2 | 13/10/2021

- rollback concat and use spread

### v1.1.1 | 13/10/2021

- post-publish script

### v1.1.0 | 13/10/2021

- Added time utility which returns a pretty date

### v1.0.0 | 07/10/2021

- Cleaned up file
- Provided missing types
- Improved export methods in declarations
- Update readme.md and inform upon all available utils.

### v0.4.0 | 09/09/2021

- Fixed missing types used for package.json
- Applied declares for various types used by the tsconfig util

### v0.3.0 | 23/08/2021

- Provided getter `vars` to `env{}` method which returns vars in a `.env` file at cwd
- Added shortcuts to `exports`, `main` and `module` fields
- Updated types
- Cleaned up package.json file

### v0.2.0 | 17/08/2021

- Overhauled utilities
- Support for consuming configuration JSON files like `tsconfig.json` and `package.json`
- Added `env.*` support utility
- Extended `banner` utility
- Converted to `mjs` build export type
- Provided detailed typings for provided utilities

### v0.1.0 | 25/09/2020

Initial Release
