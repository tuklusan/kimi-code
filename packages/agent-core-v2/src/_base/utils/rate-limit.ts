import { abortable, abortError } from './abort';

export class MinIntervalGate {
  private lastReleasedAt = 0;
  private chain: Promise<void> = Promise.resolve();

  constructor(private readonly minIntervalMs: number) {}

  get intervalMs(): number {
    return this.minIntervalMs;
  }

  async wait(signal?: AbortSignal): Promise<void> {
    if (this.minIntervalMs <= 0) return;
    if (signal?.aborted === true) throw abortError();

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

export function envIntervalMs(name: string, fallbackMs: number, env: NodeJS.ProcessEnv = process.env): number {
  const raw = env[name];
  if (raw === undefined || raw.trim() === '') return fallbackMs;
  const parsed = Number(raw);
  return Number.isFinite(parsed) ? parsed : fallbackMs;
}

export const OUTBOUND_INTERVAL_ENV = 'KIMI_OUTBOUND_MIN_INTERVAL_MS';
export const DEFAULT_OUTBOUND_INTERVAL_MS = 1000;

export const sharedOutboundGate = new MinIntervalGate(
  envIntervalMs(OUTBOUND_INTERVAL_ENV, DEFAULT_OUTBOUND_INTERVAL_MS),
);
