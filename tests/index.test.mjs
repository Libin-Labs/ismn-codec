import assert from 'node:assert/strict';
import test from 'node:test';
import * as api from '../dist/esm/index.js';
test('known modern music number', () => {
  assert.ok(api.validateIsmn('9790060115615'));
});
test('legacy conversion', () => {
  assert.equal(api.legacyToIsmn('M060115615'), '9790060115615');
});
test('reverse conversion', () => {
  assert.equal(api.ismnToLegacy('9790060115615'), 'M060115615');
});
test('checksum mismatch', () => {
  assert.equal(api.validateIsmn('9790060115616'), false);
  assert.throws(() => api.legacyToIsmn('M060115616'));
});
test('wrong prefix and syntax', () => {
  assert.throws(() => api.validateIsmn('9780060115615'));
  assert.throws(() => api.legacyToIsmn('m060115615'));
});
test('legacy M weighted identity', () => {
  const body = '06011561',
    values = [3, ...body.split('').map(Number)],
    sum = values.reduce((s, v, i) => s + v * (i % 2 ? 1 : 3), 0),
    digit = String((10 - (sum % 10)) % 10);
  assert.equal(digit, '5');
  assert.equal(api.legacyToIsmn('M' + body + digit), '9790' + body + digit);
});
