import { createDecorator, type ServiceIdentifier } from '#/_base/di/instantiation';
import type { Event, IWaitUntil } from '#/_base/event';

export type ProviderType = string;

export interface OAuthRef {
  storage: 'file' | 'keyring';
  key: string;
  oauthHost?: string;
}

export type ModelSource = 'static' | 'discover' | 'oauth-catalog';

export interface ProviderConfig {
  modelSource?: ModelSource;

  baseUrl?: string;
  customHeaders?: Record<string, string>;
  defaultModel?: string;

  type?: ProviderType;
  apiKey?: string;
  oauth?: OAuthRef;
  env?: Record<string, string>;
  source?: Record<string, unknown>;

  // Per-provider opt-out for the OpenAI-native `prompt_cache_key` request
  // field. Some strict OpenAI-compatible gateways (NVIDIA NIM, some vLLM
  // deployments) reject unknown params with HTTP 400. When explicitly set to
  // `false`, the openai / openai_responses bases skip the field entirely.
  // Unset / `true` preserves the legacy always-send behavior.
  sendPromptCacheKey?: boolean;
}

export type ProvidersSection = Record<string, ProviderConfig>;

export interface ProvidersChangedEvent {
  readonly added: readonly string[];
  readonly removed: readonly string[];
  readonly changed: readonly string[];
}

export interface DefaultProviderChangedEvent {
  readonly id: string | undefined;
}

export interface IProviderService {
  readonly _serviceBrand: undefined;

  readonly ready: Promise<void>;
  readonly onDidChangeProviders: Event<ProvidersChangedEvent & IWaitUntil>;
  readonly onDidChangeDefaultProvider: Event<DefaultProviderChangedEvent & IWaitUntil>;
  get(name: string): ProviderConfig | undefined;
  list(): Readonly<Record<string, ProviderConfig>>;
  getDefaultProvider(): string | undefined;
  set(name: string, config: ProviderConfig): Promise<void>;
  delete(name: string): Promise<void>;
  loadAll(providers: ProvidersSection, defaultProvider: string | undefined): void;
  replaceAll(providers: ProvidersSection): Promise<void>;
  setDefaultProvider(id: string | undefined): Promise<void>;
}

export const IProviderService: ServiceIdentifier<IProviderService> =
  createDecorator<IProviderService>('providerService');
