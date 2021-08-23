import jsonStrip from 'strip-json-comments';
import jsonMinify from 'jsonminify';
import { basename, join, resolve } from 'path';
import { readFileSync, existsSync } from 'fs';
import stripIndent from 'strip-indent';
import chalk from 'chalk';
import dotenv from 'dotenv';

/**
 * Path Resolver Helper
 *
 * @param {string} url
 * @returns {string}
 */
export const path = (url) => resolve(process.cwd(), url);

/**
 * Environment conditional executor
 */
export const env = {

  get vars () { return dotenv.config(); },
  get dev () { return !process.env.prod; },
  get prod () { return process.env.prod === 'true'; },
  get watch () { return process.env.ROLLUP_WATCH === 'true'; },
  is: (condition, returns) => env[condition]
    ? returns
    : typeof returns === 'function'
      ? null
      : false,
  if: condition => initial => combined => {

    if (env[condition]) return initial;

    const arrInitial = Array.isArray(initial);
    const arrCombined = Array.isArray(combined);

    if (arrInitial && arrCombined) return [ ...initial, ...combined ];

    const strInitial = typeof initial === 'string';
    const strCombined = typeof combined === 'string';

    if (arrInitial && strCombined) return [ ...initial, combined ];
    if (strInitial && arrCombined) return [ initial, ...combined ];
    if (strInitial && strCombined) return [ initial, combined ];

    const fnInitial = typeof initial === 'function';
    const fnCombined = typeof combined === 'function';

    if (arrInitial && fnCombined) return [ ...initial, combined ];
    if (fnInitial && arrCombined) return [ initial, ...combined ];
    if (fnInitial && fnCombined) return [ initial, combined ];

    return combined;

  }

};

/**
 * Provides config files shortcuts
 */
export const config = (() => {

  const cwd = process.cwd();
  const file = readFileSync(join(cwd, 'package.json')).toString();
  const pkg = JSON.parse(jsonStrip(file));
  const path = join(cwd, 'tsconfig.json');

  return {
    get cwd () { return cwd; }
    , get package () { return pkg; }
    , get external () { return Object.keys(pkg.dependencies); }
    , get tsconfig () {

      if (existsSync(path)) {
        const json = readFileSync(path).toString();
        const tsconfig = JSON.parse(jsonStrip(json));
        return tsconfig;
      }

      return null;
    }
    , path: (uri) => resolve(cwd, uri)
    , alias: (ids, src = 'src') => ids.map((find) => ({
      find
      , replacement: resolve(cwd, `./${src}/${find}`)
    }))
    , output: {
      get cjs () { return pkg.exports.require || null; },
      get esm () { return pkg.exports.import || null; },
      get exports () { return pkg.exports || null; },
      get main () { return pkg.main || null; },
      get module () { return pkg.module || null; }
    }
  };
})();

/**
 * Minify JSON and strip JSONC files
 *
 * @param {string} content
 */
export const jsonmin = (content) => {

  if (content.length === 0) {
    return console.log(chalk`{italic  JSON file is empty, skipping}`);
  }

  try {
    const parsed = JSON.parse(jsonStrip(content));
    const minified = jsonMinify(JSON.stringify(parsed));

    return minified;
  } catch (e) {
    throw new Error(e);
  }

};

/**
 * License banner applied to javascript files
 *
 * @param {object} package
 * @returns {string}
 */
export const banner = (license = 'PROPRIETARY') => {

  const { name, main, version, author } = config.package;
  const owner = author;
  const date = new Date().toISOString().replace(/T/, ' ').substr(0, 19);

  switch (license) {
    case 'PROPRIETARY':
      return stripIndent(
        `
      /**
       * !! THIS IS PROPRIETARY SOFTWARE !!
       *
       * @license
       *
       * ${basename(main)}
       *
       * Copyright © of ${owner} - All Rights Reserved.
       *
       * Unauthorized copying or modification of this file, via any medium is strictly
       * prohibited. Please refer to the LICENSE and/or ThirdPartyNotices.txt files
       * included in bundle.
       *
       * License:  ${license}
       * Package:  ${name}
       * Version:  ${version}
       * Updated:  ${date}
       *
       */`
      );
    case 'MIT':
      return stripIndent(
        `
      /**
       * @license
       *
       * MIT License
       *
       * ${basename(main)}
       *
       * Copyright © ${owner}
       *
       * Package:  ${name}
       * Version:  ${version}
       * Updated:  ${date}
       *
       * Permission is hereby granted, free of charge, to any person obtaining a copy
       * of this software and associated documentation files (the "Software"), to deal
       * in the Software without restriction, including without limitation the rights
       * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
       * copies of the Software, and to permit persons to whom the Software is
       * furnished to do so, subject to the following conditions:
       *
       * The above copyright notice and this permission notice shall be included in all
       * copies or substantial portions of the Software.
       *
       * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
       * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
       * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
       * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
       * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
       * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
       * SOFTWARE.
       */`
      );
    case 'CC BY-NC-ND 4.0':
      return stripIndent(
        `
      /**
       * @license
       *
       * ${basename(main)}
       *
       * Copyright © ${owner}
       *
       * License:  ${license}
       * Package:  ${name}
       * Version:  ${version}
       * Updated:  ${date}
       *
       * Please refer to the LICENSE.txt and/or ThirdPartyNotices.txt files included in bundle.
       *
       */`
      );
  }
};
