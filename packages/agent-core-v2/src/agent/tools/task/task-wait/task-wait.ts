import { z } from 'zod';

import { createDecorator } from '#/_base/di/instantiation';
import { type AgentTool } from '#/tool/toolContract';

// Fork-only: lift the WaitFor cap from the bash bg DEFAULT (10 min) —
// upstream's original — up to 7 days. The upstream default made
// long-running company / verification workflows drop out of their
// wait early; multi-agent SDLC runs can legitimately span hours, and
// a wait-for-task tool that dies before its background task can drive
// the caller into a needless poll loop. 7 days is a "practically
// unlimited" ceiling for any wait a real operator would sit through.
export const WAIT_FOR_MAX_TIMEOUT_S = 7 * 24 * 60 * 60;

export const WaitForInputSchema = z.object({
  timeout: z
    .number()
    .int()
    .positive()
    .max(WAIT_FOR_MAX_TIMEOUT_S)
    .describe(
      `Maximum time to wait, in seconds (1-${String(WAIT_FOR_MAX_TIMEOUT_S)}). A timeout is not an error: the tool returns the tasks that are still running, and you can call it again to keep waiting.`,
    ),
  task_id: z
    .string()
    .optional()
    .describe(
      'The background task ID to wait for. When omitted, the wait ends as soon as any background task that was running at call time finishes.',
    ),
});

export type WaitForInput = z.infer<typeof WaitForInputSchema>;

export interface IWaitForTool extends AgentTool<WaitForInput> { readonly _serviceBrand: undefined }
export const IWaitForTool = createDecorator<IWaitForTool>('waitForTool');
