import { readFileSync } from 'node:fs';
import { describe, expect, it } from 'vitest';

// Guards the toolchain pins that experiments #1/#2 verified — accidental upgrades here are how
// "works on my machine" starts (astro check breaks on TypeScript 7; Vite floor forces Node >=22.12).
const pkg = JSON.parse(readFileSync(new URL('../package.json', import.meta.url), 'utf8')) as {
  dependencies: Record<string, string>;
  devDependencies: Record<string, string>;
  engines: Record<string, string>;
  packageManager: string;
};

describe('toolchain pins', () => {
  it('pins the framework and checker versions verified in the sibling projects', () => {
    expect(pkg.dependencies.astro).toBe('7.3.3');
    expect(pkg.dependencies['@astrojs/mdx']).toBe('8.0.1');
    expect(pkg.dependencies['@astrojs/sitemap']).toBe('3.7.4');
    expect(pkg.dependencies['@fontsource-variable/inter']).toBe('^5.3.0');
    expect(pkg.dependencies['@fontsource-variable/fraunces']).toBe('^5.3.0');
    expect(pkg.devDependencies['@astrojs/check']).toBe('0.9.10');
    expect(pkg.devDependencies.typescript).toBe('6.0.3');
    expect(pkg.devDependencies.vitest).toBe('5.0.1');
  });

  it('enforces a supported Node floor and the npm pin', () => {
    expect(pkg.engines.node).toBe('>=22.12.0');
    expect(pkg.packageManager).toBe('npm@11.8.0');
  });
});
