import assert from 'node:assert/strict';
import { readFile, readdir } from 'node:fs/promises';
import { preview } from 'vite';

const workflow = await readFile('.github/workflows/verify.yml', 'utf8');
for (const match of workflow.matchAll(/uses:\s+([^\s#]+)/g)) assert.match(match[1], /@[a-f0-9]{40}$/, 'Pin every CI action');
assert.match(workflow, /permissions:\s*\n\s+contents: read/);
assert.match(workflow, /persist-credentials: false/);
assert.match(workflow, /timeout-minutes: 10/);
assert.equal(await readFile('dist/_headers', 'utf8'), await readFile('public/_headers', 'utf8'));
for (const path of await readdir('dist', { recursive: true })) {
  assert.ok(!/(^|[\\/])(?:\.env(?:\..*)?|\.git|\.impeccable)(?:[\\/]|$)|\.map$/.test(path), `Private artifact: ${path}`);
}

const server = await preview({ preview: { host: '127.0.0.1', port: 0, open: false } });
try {
  const origin = `http://127.0.0.1:${server.httpServer.address().port}`;
  for (const [path, status] of [['/', 200], ['/tarifs/', 200], ['/modules/crm/', 200], ['/page-inconnue/', 404], ['/modules/crm', 308], ['/gestelyo-logo.png', 200]]) {
    const response = await fetch(origin + path, { redirect: 'manual' });
    assert.equal(response.status, status, path);
    assert.equal(response.headers.get('x-content-type-options'), 'nosniff', path);
    assert.equal(response.headers.get('x-frame-options'), 'DENY', path);
    assert.equal(response.headers.get('referrer-policy'), 'strict-origin-when-cross-origin', path);
    assert.match(response.headers.get('permissions-policy'), /camera=\(\)/);
    const csp = response.headers.get('content-security-policy');
    for (const directive of ["script-src 'self'", "object-src 'none'", "frame-ancestors 'none'", "base-uri 'none'", "form-action 'none'"]) assert.ok(csp.includes(directive), path);
    assert.ok(!/script-src[^;]*(unsafe-inline|unsafe-eval|https:|\*)/.test(csp));
    await response.arrayBuffer();
  }
  console.log('Security: pinned CI, restricted token, build artifacts and six HTTP responses verified.');
} finally {
  await server.close();
}
