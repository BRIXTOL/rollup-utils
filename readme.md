# @brixtol/rollup-utils

Various rollup plugin utilities for working with packages in the [Brixtol Textiles](https://brixtoltextiles.com) monorepo workspace. These utilities are collection of commonly used modules leveraged in development for both closed and open source and modules.

### Why?

We here at Brixtol Textiles leverage [Rollup](https://rollupjs.org/guide/en/) exclusively. This package is a collection of various project specific utilities that assist in the bundling and transpilation process of JavaScript packages. The utilities exported in this module provide a clean and easy way to execute commonly used functions.

# Utilities

| Export               | Description                                                               |
| -------------------- | ------------------------------------------------------------------------- |
| `path(string)`       | Resolves a Path to location to current working directory.                 |
| `env.*`              | Provides ENV operations for `dev`, `prod` and `watch` builds.             |
| `config.*`           | Enables `package.json` or other config files within `rollup.config.mjs`   |
| `banner({}, string)` | Generates comment banner in bundles that includes License and information |
| `jsonmin(string)`    | Minifies JSON, used with [rollup-plugin-copy](https://git.io/J0Lv9)       |

# Install

```cli
pnpm add @brixtol/rollup-utils --save-dev
```

> This module is used together with [@brixtol/rollup-config](https://github.com/brixtol/rollup-config) with all exports exposed from that module.

### Usage

Typings explain the utilities in good detail. It's important that when using the `env` util environment values are passed on the command line using `--environment` flag. Pass `prod`from production and either omit or pass `dev` for development.

> Custom flags are not supported, only `prod` and `dev` are available.

<!-- prettier-ignore -->
```js
import { env, config } from "@brixtol/rollup-utils";

export default Rollup(
  {
    input: "src/file.js",
    output: {
      format: 'cjs',
      file: config.output.cjs, // The exports.require value in package.json
      sourcemap: env.is('dev', 'inline') // Inline sourcemap in development else false
      interop: 'default'
    },
    plugins: env.if('div')(
      [
        // Development plugins
      ]
    )(
      [
        // Production plugins
      ]
    )
  }
);
```

## Contributing

This package licensed under MIT but it exists as part of a monorepo that is closed source. Currently, any contributions, issues and/or feature requests by end users is not possible.

---

We [♡](https://www.brixtoltextiles.com/discount/4D3V3L0P3RS]) open source!
