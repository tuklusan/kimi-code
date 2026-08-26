import { describe, it, expect } from 'vitest';

import { MinIntervalGate, envIntervalMs } from '#/_base/utils/rate-limit';

describe('MinIntervalGate', () => {
  it('lets the first waiter through immediately', async () => {
    const gate = new MinIntervalGate(50);
    const t0 = Date.now();
    await gate.wait();
    expect(Date.now() - t0).toBeLessThan(20);
  });

  it('spaces successive waiters by the configured interval', async () => {
    const gate = new MinIntervalGate(50);
    const t0 = Date.now();
    await gate.wait();
    await gate.wait();
    await gate.wait();
    const elapsed = Date.now() - t0;
    expect(elapsed).toBeGreaterThanOrEqual(95);
    expect(elapsed).toBeLessThan(300);
  });

  it('serializes concurrent waiters in call order', async () => {
    const gate = new MinIntervalGate(40);
    const t0 = Date.now();
    const results = await Promise.all([gate.wait(), gate.wait(), gate.wait()]);
    const elapsed = Date.now() - t0;
    expect(results).toEqual([undefined, undefined, undefined]);
    expect(elapsed).toBeGreaterThanOrEqual(75);
  });

  it('is a no-op when the interval is zero', async () => {
    const gate = new MinIntervalGate(0);
    const t0 = Date.now();
    await gate.wait();
    await gate.wait();
    await gate.wait();
    expect(Date.now() - t0).toBeLessThan(20);
  });

  it('is a no-op when the interval is negative', async () => {
    const gate = new MinIntervalGate(-1);
    const t0 = Date.now();
    await gate.wait();
    await gate.wait();
    expect(Date.now() - t0).toBeLessThan(20);
  });

  it('aborts the wait when the signal fires and lets the next waiter run', async () => {
    const gate = new MinIntervalGate(200);
    await gate.wait();
    const ac = new AbortController();
    const rejected = gate.wait(ac.signal);
    setTimeout(() => ac.abort(), 10);
    await expect(rejected).rejects.toMatchObject({ name: 'AbortError' });
    await gate.wait();
  });

  it('rejects immediately when the signal is already aborted', async () => {
    const gate = new MinIntervalGate(1000);
    const ac = new AbortController();
    ac.abort();
    await expect(gate.wait(ac.signal)).rejects.toMatchObject({ name: 'AbortError' });
  });
});

describe('envIntervalMs', () => {
  it('returns the fallback when the env var is missing', () => {
    expect(envIntervalMs('KIMI_UNSET_TEST_VAR', 1234, {})).toBe(1234);
  });

  it('returns the fallback when the env var is empty or whitespace', () => {
    expect(envIntervalMs('X', 500, { X: '' })).toBe(500);
    expect(envIntervalMs('X', 500, { X: '   ' })).toBe(500);
  });

  it('parses a numeric env var', () => {
    expect(envIntervalMs('X', 500, { X: '2500' })).toBe(2500);
    expect(envIntervalMs('X', 500, { X: '0' })).toBe(0);
  });

  it('falls back on a non-numeric env var', () => {
    expect(envIntervalMs('X', 500, { X: 'nope' })).toBe(500);
  });
});
