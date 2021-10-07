import {join} from 'path';
import {cwd} from 'process';
import {defineConfig, UserConfig} from 'vite';
import viteMetablockPlugin from './src/plugins/metablock/main';
import metablock from './src/metablock';
import {name as packageName} from './package.json';

export default defineConfig(({mode}) => {
  const isDev = mode === 'development';
  const rootPath = cwd();
  const viteRoot = join(rootPath, 'src');
  const viteEntry = join(viteRoot, 'index.ts');
  const viteConfig: UserConfig = {
    root: viteRoot,
    plugins: [viteMetablockPlugin(metablock)],
    build: {
      outDir: rootPath,
      lib: {
        entry: viteEntry,
        name: packageName.replace(/-/gm, '_'),
        formats: ['iife'],
        fileName: () => 'sak32009-get-dlc-info-from-steamdb.user.js',
      },
    },
  };
  if (isDev) {
    viteConfig.build!.minify = false;
  }

  return viteConfig;
});
