import { getDefaultTelemetryClient } from './client';
import { EventSink } from './sink';
import { SystemMetricsCollector } from './systemMetrics';
import { AsyncTransport } from './transport';

export const TELEMETRY_DISABLE_ENV = 'KIMI_DISABLE_TELEMETRY';
// Fork opt-in: telemetry is suppressed by default in this downstream fork (no
// calls to telemetry-logs.kimi.com / telemetry-logs.kimi.ai). Set
// KIMI_ENABLE_TELEMETRY to a truthy value to restore upstream behavior.
export const TELEMETRY_ENABLE_ENV = 'KIMI_ENABLE_TELEMETRY';

const TRUE_ENV_VALUES = new Set(['1', 'true', 't', 'yes', 'y']);

export interface TelemetryBootstrapOptions {
  readonly enabled?: boolean;
  readonly homeDir: string;
  readonly deviceId: string;
  readonly sessionId?: string;
  readonly appName: string;
  readonly version: string;
  readonly uiMode?: string;
  readonly model?: string;
  readonly buildSha?: string;
  readonly terminal?: string;
  readonly locale?: string;
  readonly getAccessToken?: () => string | null | Promise<string | null>;
  /**
   * Region-aware endpoint derived by the composition root (this package stays
   * dependency-free and keeps the cn default in `TELEMETRY_ENDPOINT`). A
   * resolver is invoked per flush so an in-process region switch takes effect
   * without re-initialization.
   */
  readonly endpoint?: string | (() => string);
}

export function isTelemetryDisabledByEnv(env: NodeJS.ProcessEnv = process.env): boolean {
  const value = env[TELEMETRY_DISABLE_ENV];
  return value !== undefined && TRUE_ENV_VALUES.has(value.trim().toLowerCase());
}

export function isTelemetryEnabledByEnv(env: NodeJS.ProcessEnv = process.env): boolean {
  const value = env[TELEMETRY_ENABLE_ENV];
  return value !== undefined && TRUE_ENV_VALUES.has(value.trim().toLowerCase());
}

export function shouldEnableTelemetry(
  input: { readonly enabled?: boolean; readonly env?: NodeJS.ProcessEnv } = {},
): boolean {
  const env = input.env ?? process.env;
  // A caller opting out (config `telemetry: false`) or the explicit disable env
  // always wins. Otherwise the fork stays silent unless telemetry is explicitly
  // re-enabled via KIMI_ENABLE_TELEMETRY, so no telemetry endpoint is contacted
  // by default.
  if (input.enabled === false) return false;
  if (isTelemetryDisabledByEnv(env)) return false;
  return isTelemetryEnabledByEnv(env);
}

export function initializeTelemetry(options: TelemetryBootstrapOptions): void {
  const client = getDefaultTelemetryClient();
  if (!shouldEnableTelemetry({ enabled: options.enabled })) {
    client.disable();
    return;
  }

  client.enable();
  client.setContext({
    deviceId: options.deviceId,
    sessionId: options.sessionId,
  });

  const transport = new AsyncTransport({
    homeDir: options.homeDir,
    deviceId: options.deviceId,
    endpoint: options.endpoint,
    getAccessToken: options.getAccessToken,
  });
  const sink = new EventSink({
    transport,
    context: {
      appName: options.appName,
      version: options.version,
      uiMode: options.uiMode,
      model: options.model,
      buildSha: options.buildSha,
      terminal: options.terminal,
      locale: options.locale,
    },
  });

  client.attachSink(sink);
  sink.startPeriodicFlush();

  const systemMetricsCollector = new SystemMetricsCollector({ client });
  client.setSystemMetricsCollector(systemMetricsCollector);
  systemMetricsCollector.start();

  void sink.retryDiskEvents().catch(() => {});
}
