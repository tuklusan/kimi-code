/**
 * Minimum-interval gate — serializes waiters so at most one `wait()` returns
 * per `minIntervalMs` window. Used to throttle model-driven outbound network
 * calls (web fetch, web search) so a runaway loop cannot hammer external
 * hosts, and to give operators a simple lever to slow the agent down.
 *
 * Semantics:
 *  - Waiters queue in call order (`chain` is a promise pipeline).
 *  - The first waiter after a quiet period returns immediately.
 *  - Each subsequent waiter sleeps until `lastReleasedAt + minIntervalMs`.
 *  - `signal` aborts the wait — the waiter throws, the queue advances.
 *  - `minIntervalMs <= 0` degenerates to a no-op (pass-through).
 */

import { abortable, abortError } from './abort';

export class MinIntervalGate {
  private lastReleasedAt = 0;
  private chain: Promise<void> = Promise.resolve();

  constructor(private readonly minIntervalMs: number) {}

  /** Effective interval. Exposed so callers can log / expose it. */
  get intervalMs(): number {
    return this.minIntervalMs;
  }

  async wait(signal?: AbortSignal): Promise<void> {
    if (this.minIntervalMs <= 0) return;
    if (signal?.aborted === true) throw abortError();

    // Serialize: each waiter awaits the previous one before checking the
    // interval, so N concurrent callers spread out at ~minIntervalMs each.
    const previous = this.chain;
    let release: () => void = () => {};
    this.chain = new Promise<void>((resolve) => {
      release = resolve;
    });
    try {
      await previous;
      const now = Date.now();
      const remaining = this.lastReleasedAt + this.minIntervalMs - now;
      if (remaining > 0) {
        await sleep(remaining, signal);
      }
      this.lastReleasedAt = Date.now();
    } finally {
      release();
    }
  }
}

function sleep(ms: number, signal?: AbortSignal): Promise<void> {
  const timer = new Promise<void>((resolve) => setTimeout(resolve, ms));
  return signal === undefined ? timer : abortable(timer, signal);
}

/**
 * Reads a positive-integer millisecond value from a process env var; falls
 * back to the default when missing, empty, or unparseable. Zero and negative
 * values are accepted verbatim and disable the gate at the call site.
 */
export function envIntervalMs(name: string, fallbackMs: number, env: NodeJS.ProcessEnv = process.env): number {
  const raw = env[name];
  if (raw === undefined || raw.trim() === '') return fallbackMs;
  const parsed = Number(raw);
  return Number.isFinite(parsed) ? parsed : fallbackMs;
}

/**
 * Shared outbound throttle for model-driven internet requests (web fetch,
 * web search). Single module-level singleton so both call surfaces observe
 * the same minimum spacing. Interval is `KIMI_OUTBOUND_MIN_INTERVAL_MS`
 * (default 1000). Set to `0` to disable.
 */
export const OUTBOUND_INTERVAL_ENV = 'KIMI_OUTBOUND_MIN_INTERVAL_MS';
export const DEFAULT_OUTBOUND_INTERVAL_MS = 1000;

export const sharedOutboundGate = new MinIntervalGate(
  envIntervalMs(OUTBOUND_INTERVAL_ENV, DEFAULT_OUTBOUND_INTERVAL_MS),
);
