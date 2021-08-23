# @brixtol/rollup-utils

Various rollup plugin utilities for working with packages in the [Brixtol Textiles](https://brixtoltextiles.com) monorepo workspace. These utilities are collection of commonly used modules leveraged in development for both closed and open source and modules.

### Why?

We here at Brixtol Textiles leverage [Rollup](https://rollupjs.org/guide/en/) exclusively. This package is a collection of various project specific plugins that assist in the bundling and transpilation process for various packages. The utilities exported in this module provide a clean and easy way to execute commonly used functions.

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
pnpm i @brixtol/rollup-utils --save-dev
```

## Contributing

This package licensed under MIT but it exists as part of a monorepo that is closed source. Currently, any contributions, issues and/or feature requests by end users is not possible.

---

We [♡](https://www.brixtoltextiles.com/discount/4D3V3L0P3RS]) open source!
