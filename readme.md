## @brixtol/rollup-utils

Various rollup plugin utilities for working with packages in the [Brixtol Textles](#) monorepo workspace. These utilities are collection of commonly used modules we use in development on mostly innternal closed source applications.

### Why?

We here at Brixtol Textiles leverage [Rollup](#) exclusively. This package is a collection of various project specific plugins that assist in the bundling process of various packages. The utilties exported in this module provide a clean and easy way to execute commonly used functions.

### Utilities

| Export               | Description                                                                |
| -------------------- | -------------------------------------------------------------------------- |
| `plugins([],[])`     | Seperates development and production plugins based on environment variable |
| `banner({}, string)` | Generates comment banner in bundles that includes License and information  |
| `jsonmin(string)`    | Minifies JSON files passed in via [rollup-plugin-globlin](#)               |

## Install

```cli
pnpm i @brixtol/rollup-utils --save-dev
```

> This package is not available on the public NPM registery

## Usage

```js
import { plugins } from "@brixtol/rollup-utils";

export default {
  input: "src/index.js",
  output: {
    dir: "output",
    format: "cjs",
  },
  plugins: plugins([
      // Dev Plugins
    ], [
      // Prod Plugins
    ]),
  ]
};
```

## Contributing

This package licensed under MIT but it exists as part of a monorepo that is closed source. Currently, any contributions, issues and/or feature requests by end users is not possible.

## Author

🥛 <small>Laced with [Vellocet](#) by [Νίκος Σαβίδης](mailto:nicos@gmx.com)</small> <img align="right" src="https://img.shields.io/badge/-@sisselsiv-1DA1F2?logo=twitter&logoColor=fff" />
