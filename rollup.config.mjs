import { defineConfig as Rollup } from 'rollup';
import cjs from '@rollup/plugin-commonjs';
import copy from 'rollup-plugin-copy';
import del from 'rollup-plugin-delete';
import { terser } from 'rollup-plugin-terser';
import { config, env } from './src/index.mjs';

export default Rollup(
  {
    input: 'src/index.mjs',
    output: [
      {
        format: 'cjs',
        file: config.output.cjs,
        sourcemap: env.is('dev', 'inline'),
        exports: 'named',
        esModule: false,
        preferConst: true
      },
      {
        format: 'es',
        file: config.output.esm,
        sourcemap: env.is('dev', 'inline'),
        preferConst: true
      }
    ],
    external: [
      'chalk',
      'jsonminify',
      'strip-indent',
      'strip-json-comments',
      'path',
      'fs',
      'dotenv'
    ],
    plugins: [
      del(
        {
          verbose: true,
          runOnce: !env.prod,
          targets: 'package/*'
        }
      ),
      copy(
        {
          verbose: true,
          copyOnce: !env.prod,
          targets: [
            {
              src: 'src/types/*.ts',
              dest: 'package'
            }
          ]
        }
      ),
      cjs(),
      terser(
        {
          ecma: 2016,
          warnings: 'verbose',
          compress: { passes: 2 }
        }
      )
    ]
  }
);
