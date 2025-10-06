import { defineConfig } from 'tsup';

export default defineConfig({
  entry: ['src/index.ts'],     // main entry point of your library
  format: ['esm', 'cjs'],      // generate both ESM and CJS
  sourcemap: true,             // include source maps
  clean: true,                 // remove dist/ before each build
  dts: true,                   // generate .d.ts files
  minify: false,               // don't minify library code
  splitting: false,            // avoid code-splitting for library
  treeshake: true,             // remove unused code
  platform: 'neutral',         // works for browser, Node, React Native
  target: 'esnext',            // modern JS target
  external: [
    'react',
    'react-dom',
    '@reduxjs/toolkit',
    'expo-secure-store',
  ],
  // define: {
  //   'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development'),
  // },
});
