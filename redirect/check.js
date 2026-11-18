// Run by CI: the redirect must keep path and query and point at https://hahakigami.com.
import assert from 'node:assert/strict';
import worker from './worker.js';

const res = worker.fetch(new Request('http://www.hahakigami.app:8080/a/b?c=1#x'));
assert.equal(res.status, 301);
assert.equal(res.headers.get('location'), 'https://hahakigami.com/a/b?c=1#x');
