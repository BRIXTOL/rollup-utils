import test from 'ava';
import { jsonmin, env, config, path, date } from '../package/index.mjs';
import { readFileSync } from 'fs';

function fakeplugin () {
  return {
    load () {
      return null;
    }
  };
}

test.serial('Config export package.json config', t => {

  t.is(config.package.name, '@brixtol/rollup-utils');

  t.pass();

});

test.serial('Config export tsconfig.json config', t => {

  t.is(config.tsconfig, null);

  t.pass();

});

test.serial('Config current working directory', t => {

  t.is(config.cwd, process.cwd());

  t.pass();

});

test.serial('External export returning dependencies as an array', t => {

  t.deepEqual(config.external, Object.keys(config.package.dependencies));

  t.pass();

});

test.serial('Config path resolver', t => {

  const file = process.cwd() + '/test/jsonmin.jsonc';

  t.is(path('test/jsonmin.jsonc'), file);
  t.is(path('/test/jsonmin.jsonc'), '/test/jsonmin.jsonc');

  t.pass();

});

test.serial('Environment flag in dev mod', t => {

  t.is(env.watch, false);
  t.is(env.prod, false);
  t.is(env.dev, true);

  t.pass();

});

test.serial('Environment flag in prod mod', t => {

  process.env.prod = 'true';

  t.is(env.prod, true);
  t.is(env.watch, false);
  t.is(env.dev, false);

  delete process.env.prod;

  t.pass();

});

test.serial('Environment conditionals in dev mode', t => {

  process.env.dev = 'true';

  const plugin = fakeplugin();

  t.is(env.is('dev', plugin), plugin);
  t.is(env.is('dev', 'valid'), 'valid');
  t.is(env.is('prod', 'valid'), false);
  t.is(env.is('prod', plugin), null);

  const plugin1 = function devplugin () {};
  const plugin2 = function prodplugin () {};

  t.deepEqual(env.if('dev')([ plugin1 ])([ plugin2 ]), [ plugin1 ]);

  delete process.env.prod;

  t.pass();

});

test.serial('Environment conditionals in prod mode', t => {

  const plugin = fakeplugin();

  // dev is default, these will pass
  t.is(env.is('dev', plugin), plugin);
  t.is(env.is('dev', 'valid'), 'valid');

  process.env.prod = 'true';

  // these will now not work as we swapped to prod
  t.is(env.is('dev', 'valid'), false);
  t.is(env.is('dev', plugin), null);

  t.is(env.is('prod', 'valid'), 'valid');
  t.is(env.is('prod', plugin), plugin);

  const plugin1 = function devplugin () {};
  const plugin2 = function prodplugin () {};

  t.deepEqual(env.if('dev')([ plugin1 ])([ plugin2 ]), [ plugin1, plugin2 ]);

  t.pass();

});

test.serial('Minify JSON file with comments', t => {

  const json = readFileSync('./test/jsonmin.jsonc').toString();
  const minified = jsonmin(json);

  t.is(minified, '{"id":100,"text":"Hello World","array":[{"boolean":true,"object":{"number":1000.1}}]}');

  t.pass();

});

test.serial('Pretty formatted date', t => {

  t.log(date());

  t.pass();

});
