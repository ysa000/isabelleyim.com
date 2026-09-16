import { execFileSync } from 'node:child_process';
import { rmSync } from 'node:fs';

/** Runs `astro build` so the tests can assert on real output.
 *  Skip with `SKIP_BUILD=1` when iterating on tests against an existing build. */
export default function setup() {
  if (process.env.SKIP_BUILD) return;

  const build = (outDir: string, env: Record<string, string>) => {
    rmSync(outDir, { recursive: true, force: true });
    execFileSync('pnpm', ['exec', 'astro', 'build', '--outDir', outDir], {
      stdio: 'inherit',
      env: { ...process.env, ...env },
    });
  };

  // Production build: travel hidden (the default in src/data/site.ts).
  build('dist', {});
  // Same site with the Travel flag forced on, to prove it can be flipped back.
  build('dist-travel', { TRAVEL: 'true' });
}
