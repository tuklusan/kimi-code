# NVIDIA NIM Nemotron 3 Ultra Code Review Harness
## Tool-Agnostic Workflow and Review Algorithm

Version: 3.0
Purpose: Full-company, comprehensive, adjudicated code review of the current codebase
Primary model: NVIDIA Nemotron 3 Ultra 550B A55B
Required credential source: NVIDIA_API_KEY_CODING environment variable

-------------------------------------------------------------------------------

## 1. Purpose

This document defines a language-neutral workflow for operating a rigorous
NVIDIA NIM Nemotron 3 Ultra review harness through a full software development
company, with explicit responsibility assigned to the CEO, CTO, Programmer,
Reviewer, and Tester.

The harness may be implemented in any suitable toolset, including but not
limited to:

- C or C++
- JavaScript or TypeScript
- Bash
- PowerShell
- Python
- Go
- Rust
- Java
- another scripting or systems language

This document specifies behavior and invariants, not a particular programming
language, SDK, shell, or framework.

The canonical goals are:

1. Accuracy.
2. Complete review coverage.
3. Reproducible evidence.
4. Programmer adjudication of every candidate finding.
5. Durable recording of every adjudicated defect.
6. No silent omissions.
7. No false declaration of a clean codebase.
8. Review of tests and test infrastructure as first-class code.
9. Full re-review after any accepted-defect repair that changes the review
   target or behavior-affecting review context.
10. Two consecutive complete zero-defect review rounds before final success.
11. Strict separation of duties among CEO, CTO, Programmer, Reviewer, and Tester.
12. Dynamic verification of accepted repairs and final-candidate behavior.
13. Independent verification that the review harness itself fails closed.

Efficiency, API cost, request count, and wall-clock speed are subordinate to
review accuracy.

-------------------------------------------------------------------------------

## 2. Software Company Roles, Authority, and Separation of Duties

The workflow MUST be operated as a five-role software development company.
Responsibility is distributed among:

- CEO;
- CTO;
- Programmer;
- Reviewer;
- Tester.

These are logical roles with separate responsibilities and evidence obligations.
A conforming implementation may realize them as separate people, agents,
processes, sessions, queues, or other mechanisms, but MUST preserve the role
boundaries below.

### 2.1 CEO - executive owner and final gate authority

The CEO owns the review engagement as a whole.

The CEO MUST:

1. Define or confirm the review scope and project root.
2. Require the current working codebase, tests, test scripts, build logic, and
   other behavior-bearing project files to be in scope unless explicitly and
   defensibly excluded.
3. Ensure the CTO, Programmer, Reviewer, and Tester perform their assigned
   duties without collapsing independence merely for convenience.
4. Ensure unresolved evidence is routed back to the responsible role rather
   than being waived.
5. Ensure every accepted defect is repaired or remains visibly OPEN.
6. Prevent final success while any mandatory workflow gate is incomplete.
7. Review the final evidence package from the CTO, Programmer, Reviewer, and
   Tester.
8. Personally certify final workflow completion only after every subordinate
   certification is supported by evidence.
9. Refuse to report VERIFIED_CLEAN if any contradiction, unresolved candidate,
   open defect, failed test, incomplete review request, coverage gap, snapshot
   mismatch, harness-conformance failure, unproven exact-model access, or
   unauthorized fallback/paid-route use remains.

The CEO MUST NOT:

- edit technical evidence to manufacture a pass;
- overrule a technically unresolved candidate merely to close the review;
- convert a known defect into a non-defect without Programmer adjudication;
- waive the two-consecutive-clean-round gate;
- permit one role to self-certify work assigned to a different role when a
  separate logical role can be maintained.

If the CEO disputes a technical conclusion, the CEO MUST return it for further
CTO analysis, Programmer adjudication, Reviewer challenge, or Tester evidence as
appropriate. The CEO is the final release gate, not a substitute for technical
adjudication.

Recommended CEO artifacts:

- REVIEW_CHARTER.md
- FINAL_REVIEW_CERTIFICATE.md

### 2.2 CTO - review architecture, API contract, and coverage owner

The CTO owns the technical design and conformance of the review harness.

The CTO MUST:

1. Read and reconcile the latest official NVIDIA NIM and Nemotron 3 Ultra
   documentation at the beginning of every review run.
2. Own the resolved API contract: model identifier, endpoint/transport,
   authentication form, Free Endpoint classification, thinking controls,
   reasoning-budget controls, structured-output policy, context/output limits,
   finish reasons, and retry-relevant behavior.
3. Verify that NVIDIA_API_KEY_CODING is sourced only from the environment and is
   not persisted or exposed.
4. Verify from current official NVIDIA documentation that the configured hosted
   route remains a Free Endpoint, perform the mandatory live inference probe
   against the exact configured Nemotron 3 Ultra model, persist sanitized
   MODEL_ACCESS_PROBE.md/equivalent evidence, and hard-stop if exact-model access
   cannot be proven under Sections 6 and 14.
5. Define and verify stable snapshot creation and SNAPSHOT_ID calculation.
6. Own inventory, exclusion, chunking, overlap, line-coverage, codebase-map, and
   context-retrieval architecture.
7. Ensure all project-owned tests and test scripts are first-class review input.
8. Ensure the harness fails closed on incomplete documentation, API/model-access
   failures, invalid responses, incomplete coverage, snapshot mutation, and
   unresolved work.
9. Version the review prompt and material harness policy.
10. Treat any material harness implementation, review prompt, API policy,
    chunking/coverage policy, adjudication policy, or other behavior-affecting
    harness change during a clean sequence as invalidating all prior clean-round
    evidence from that sequence. Reset the consecutive-clean count to zero and
    restart with the changed harness. Do not attempt to preserve a clean result
    by arguing that the change probably did not matter.
11. Provide the Reviewer and Tester with enough deterministic metadata to audit
    coverage and reproduce harness decisions without exposing secrets.
12. Construct and certify a REVIEW_CONTEXT_ID that correctly binds the exact
    behavior-affecting review environment defined in Section 8.5; separately
    certify the final API contract, model/free-endpoint identity, snapshot
    identity, inventory, exclusions, chunk coverage, and harness-conformance
    evidence before CEO sign-off.

The CTO MAY implement or repair the harness itself, but a CTO-authored harness
change MUST still be independently exercised by the Tester and audited by the
Reviewer before it can support final certification.

The CTO MUST NOT perform final Programmer adjudication of candidate defects from
any origin merely because the CTO designed the harness. Technical clarification may be supplied to
the Programmer, but the Programmer remains the adjudicator.

Recommended CTO artifacts:

- API_CONTRACT.md
- MODEL_ACCESS_PROBE.md
- SNAPSHOT_MANIFEST.txt
- EXCLUSIONS.md
- COVERAGE_REPORT.md
- HARNESS_CONFORMANCE.md
- CTO_CERTIFICATE.md

### 2.3 Programmer - sole defect adjudicator and target-project repair owner

The Programmer owns technical adjudication of candidate defects from every
approved origin and owns repairs to the target project. Accepted review-harness
defects remain Programmer-adjudicated but are repaired by the CTO under Section
27.2.

The Programmer MUST:

1. Inspect the actual immutable review snapshot for every candidate finding.
2. Adjudicate every candidate using the states defined later in this workflow.
3. Provide concrete technical evidence for every terminal disposition,
   including acceptance, rejection, out-of-scope classification, and duplicate
   classification.
4. Perform final adjudication whenever the Reviewer challenge reveals
   new/contradictory evidence, an incomplete rationale, a request for
   reconsideration, a material context-driven evidence change, or failure to
   establish a claimed duplicate's root-cause equivalence.
5. Define the root cause and required repair for every ACCEPTED_DEFECT.
6. Repair accepted target-project defects in the live target codebase; accepted
   review-harness defects are repaired by the CTO after Programmer adjudication.
7. Add or correct target-project tests when a target-project defect demonstrates
   missing or incorrect test coverage; harness-test changes remain CTO-owned and
   Tester-verified.
8. Preserve project behavior not implicated by the repair.
9. Provide repair notes that identify changed files and the verification needed.
10. Never delete, suppress, or relabel a candidate merely to reduce the defect
    count.

Only AFTER Programmer adjudication may a genuine finding become a confirmed
entry in the authoritative defect list.

This rule applies regardless of finding origin. A finding discovered by the
NVIDIA NIM review model, the Reviewer, the CTO, the Tester, a dynamic test, a sanitizer, a
build, or another approved verification source is still a candidate until the
Programmer adjudicates it.

The Programmer MUST NOT:

- directly certify the overall review as clean;
- bypass the required Reviewer challenge of a rejection, out-of-scope
  disposition, or duplicate classification;
- weaken or remove a valid test simply to obtain a passing result;
- edit Reviewer or Tester evidence to hide a failure.

Recommended Programmer artifacts:

- PROGRAMMER_ADJUDICATIONS.md or equivalent machine-readable records
- REPAIR_NOTES.md
- PROGRAMMER_CERTIFICATE.md

### 2.4 Reviewer - independent static-review and defect-ledger integrity owner

The Reviewer owns independent static review integrity.

The Reviewer MUST:

1. Operate or supervise every NVIDIA NIM chunk-review request.
2. Verify request/response identity, completeness, and structured-output
   validity before accepting a model result.
3. Ensure every reviewable file and line receives required direct review
   coverage.
4. Conduct the required global cross-file passes and dedicated test-quality
   review.
5. Maintain the normalized, sanitized, provenance-complete candidate queue and
   preserve the originating raw observation/evidence separately from that queue.
6. Deduplicate candidates without losing source IDs or distinct root causes.
7. Route every candidate to the Programmer for adjudication.
8. Independently challenge every Programmer rejection, out-of-scope decision,
   or DUPLICATE classification using the adjudication-challenge procedure.
9. Return a challenged candidate to the Programmer for final adjudication
   whenever the challenge produces new/contradictory evidence, finds the
   rationale incomplete, requests reconsideration, fails to establish claimed
   duplicate root-cause equivalence, or materially changes the evidence after
   context followup.
10. Act as custodian of the authoritative defect list, ensuring that every
    Programmer-accepted defect is recorded only after adjudication and remains
    historically traceable after repair.
11. Verify that no accepted defect disappears from the ledger.
12. Conduct both required clean review rounds using fresh model conversations
    and complete coverage.
13. Certify that the two clean rounds were complete, consecutive, independent,
    and performed against the same unchanged SNAPSHOT_ID and REVIEW_CONTEXT_ID.

The Reviewer MUST NOT modify target production code or tests. If the Reviewer
identifies a required change, it is routed through the Programmer.

The Reviewer MUST NOT treat a model response as authoritative merely because it
came from NVIDIA NIM. Model output is candidate evidence subject to Programmer
adjudication.

Recommended Reviewer artifacts:

- CANDIDATES.jsonl or equivalent
- ADJUDICATIONS.md
- DEFECTS.md
- REVIEW_ROUND_1.md
- REVIEW_ROUND_2.md
- REVIEWER_CERTIFICATE.md

### 2.5 Tester - dynamic verification and harness-failure-mode owner

The Tester owns dynamic evidence and independent verification that repairs and
the harness behave as claimed.

The Tester MUST:

1. Discover the project's intended build and test entry points.
2. Establish a safe execution policy before executing project scripts.
3. Run appropriate baseline build/tests against the review candidate when the
   environment permits safe execution.
4. Record exact commands or equivalent invocation metadata, exit status,
   environment assumptions, and meaningful output summaries.
5. Treat any dynamically discovered possible product failure as a candidate
   finding and route it to the Programmer for adjudication before it becomes a
   confirmed defect.
6. After every accepted-defect repair, execute the verification required by the
   defect record and appropriate regression tests.
7. Detect test weakening, disabled tests, skipped tests, incorrect exit-code
   propagation, and false-green verification scripts.
8. Test the review harness itself using controlled fixtures or fault injection
   sufficient to prove its required fail-closed behavior.
9. Verify at minimum the harness behavior for missing credentials, unavailable
   Free Endpoint classification, exact-model startup-access failure,
   conditional HTTP 404 retry/backoff and exhaustion, 401/403 no-fallback
   behavior, unreachable documentation, invalid/empty/truncated model output,
   general retry exhaustion, uncovered review lines, snapshot mutation, secret
   redaction, stale resume cache, and unresolved candidate state.
10. During EVERY complete static review round, run an appropriate regression
    verification on a NEW disposable execution copy of the exact immutable
    snapshot after the model/global/test-quality review phases. This copy MUST be
    distinct from the baseline execution copy so baseline-generated state cannot
    leak into the round-regression result. If safe execution is unavailable, the
    limitation MUST be explicitly recorded for that round and MUST NOT be
    represented as a pass.
11. Run final project regression/build verification against a NEW disposable
    execution copy of the exact snapshot proposed for final clean certification,
    without modifying that snapshot.
12. Certify the final dynamic-test and harness-conformance evidence before CEO
    sign-off.

The Tester MUST NOT modify product source or weaken tests to obtain a pass. Any
required product or test change is routed to the Programmer and invalidates the
applicable clean evidence as defined later.

Recommended Tester artifacts:

- BASELINE_TEST_REPORT.md
- REPAIR_VERIFICATION.md
- HARNESS_FAILURE_MODE_TESTS.md
- FINAL_TEST_REPORT.md
- TESTER_CERTIFICATE.md

### 2.6 Mandatory role handoff and no-role-collapse rule

Every material handoff MUST preserve:

- RUN_ID;
- ROUND_ID when the handoff belongs to a particular complete review round;
- SNAPSHOT_ID;
- REVIEW_CONTEXT_ID once the review context has been established;
- candidate or DEFECT_ID where applicable;
- originating role;
- receiving role;
- evidence references;
- decision/status;
- timestamp or deterministic sequence number.

A small implementation may reuse the same executable for several roles, but it
MUST NOT erase logical independence. At minimum, each role must have separate
instructions, separate decisions, separate evidence ownership, and an auditable
handoff.

The same model conversation MUST NOT simultaneously act as Reviewer and
Programmer adjudicator for the same candidate.

The Programmer's own repair rationale MUST NOT substitute for Reviewer
re-review or Tester verification.

The CEO's final certificate MUST NOT substitute for CTO, Reviewer, Programmer,
or Tester evidence.

### 2.7 Finding-origin normalization

All potential defects, regardless of origin, enter a common candidate pipeline.

A candidate MUST record an origin equivalent to one of:

- NVIDIA_NIM_CHUNK_REVIEW;
- NVIDIA_NIM_GLOBAL_REVIEW;
- NVIDIA_NIM_TEST_QUALITY_REVIEW;
- REVIEWER_MANUAL;
- CTO_TECHNICAL_ANALYSIS;
- TESTER_DYNAMIC;
- BUILD_OR_STATIC_TOOL;
- OTHER_APPROVED_EVIDENCE.

No origin is allowed to bypass Programmer adjudication.

Only ACCEPTED_DEFECT after Programmer adjudication enters DEFECTS.md.

-------------------------------------------------------------------------------

## 3. Current NVIDIA NIM / Nemotron 3 Ultra API Baseline

As of 2026-08-30, current official NVIDIA documentation identifies the default
hosted review model as:

- model display name:
  NVIDIA Nemotron 3 Ultra 550B A55B

- hosted API model identifier:
  nvidia/nemotron-3-ultra-550b-a55b

- model-card checkpoint family:
  NVIDIA-Nemotron-3-Ultra-550B-A55B-NVFP4

- total parameters:
  approximately 550B, with approximately 55B active

- architecture:
  LatentMoE hybrid using Mamba-2, MoE, Attention, and Multi-Token Prediction

- documented context length:
  up to 1M tokens

- hosted NVIDIA API base URL:
  https://integrate.api.nvidia.com/v1

- hosted chat-completions endpoint:
  POST https://integrate.api.nvidia.com/v1/chat/completions

- reasoning:
  configurable through chat-template controls, with thinking enabled by:
  chat_template_kwargs.enable_thinking = true

- coding-agent compatibility:
  current NVIDIA model documentation recommends:
  chat_template_kwargs.force_nonempty_content = true
  for coding agents

- optional reasoning budget:
  current NVIDIA documentation exposes `reasoning_budget` in supported examples;
  exact use and limits MUST be taken from the current hosted endpoint/model
  documentation at runtime

- current hosted availability:
  NVIDIA Build currently marks this model as a Free Endpoint

The current NVIDIA Build examples use an OpenAI-compatible client with:

base_url = https://integrate.api.nvidia.com/v1
model = nvidia/nemotron-3-ultra-550b-a55b

and reasoning enabled through `chat_template_kwargs`.

The free hosted endpoint is a capacity-limited service. "Free Endpoint" is an
availability classification, not a guarantee of unlimited throughput, constant
capacity, or permanent entitlement.

The harness MUST perform the documentation-discovery/reconciliation and
mandatory live-access-probe phases below before reviewing repository content.

The workflow MUST NOT silently fall back to another model, another provider,
a self-hosted NIM, a paid endpoint, or another API key if the configured hosted
Nemotron 3 Ultra model is inaccessible.

-------------------------------------------------------------------------------

## 4. Authoritative NVIDIA Documentation Sources

At the beginning of every review run, the CTO MUST retrieve current
documentation from official NVIDIA sources.

At minimum, inspect the current equivalents of:

1. NVIDIA Build model/API page:
   https://build.nvidia.com/nvidia/nemotron-3-ultra-550b-a55b

2. NVIDIA hosted NIM model reference:
   https://docs.api.nvidia.com/nim/reference/nvidia-nemotron-3-ultra-550b-a55b

3. NVIDIA hosted LLM API reference:
   https://docs.api.nvidia.com/nim/reference/llm-apis

4. NVIDIA NIM for LLMs current support matrix:
   https://docs.nvidia.com/nim/large-language-models/latest/reference/support-matrix.html

5. Current NVIDIA documentation linked from those pages for:
   - chat completions;
   - authentication;
   - reasoning/thinking controls;
   - output/token limits;
   - tool calling when used;
   - structured output when used;
   - rate/capacity limits;
   - errors and retry guidance;
   - free hosted-endpoint availability.

The harness MUST follow current official NVIDIA links when page locations,
schemas, model aliases, or API details have changed.

NVIDIA Developer Forum posts and other third-party/community material MAY be
used to diagnose operational behavior, such as intermittent hosted-endpoint
routing failures, but MUST NOT override official NVIDIA API/model
documentation.

-------------------------------------------------------------------------------

## 5. Documentation Discovery and Reconciliation

Before repository review and before the mandatory model-access probe, execute
this phase.

### 5.1 Fetch

Fetch the current official NVIDIA documentation listed above.

Record:

- retrieval timestamp in UTC;
- requested URL;
- final URL after redirects;
- HTTP result;
- page title if available;
- document date/version if stated;
- content hash;
- relevant extracted API/model facts.

Do not begin code review if the required official documentation cannot be
retrieved and reconciled.

If required documentation cannot be read, fail closed with a status equivalent
to:

DOCUMENTATION_UNAVAILABLE

### 5.2 Extract current API/model facts

Extract, at minimum:

- current hosted Nemotron 3 Ultra model identifier;
- whether the hosted Free Endpoint remains available;
- hosted base URL;
- chat-completions endpoint;
- authentication format;
- reasoning/thinking controls;
- coding-agent chat-template requirements;
- reasoning-budget controls when documented;
- context limit;
- output-token limit;
- streaming/non-streaming behavior used by the harness;
- reasoning-content representation when relevant;
- structured-output mechanism, if any;
- documented finish reasons;
- documented retry-relevant failures;
- unsupported or ignored parameters;
- tool-call requirements if the harness uses tools;
- deprecation notices affecting the intended request format.

Do NOT copy assumptions from a prior run when current official documentation
can determine the value.

If the current official NVIDIA Build documentation no longer classifies the
configured hosted Nemotron 3 Ultra endpoint as a Free Endpoint, fail closed
before inference with:

NVIDIA_NIM_FREE_ENDPOINT_UNAVAILABLE

The harness MUST NOT silently consume a paid endpoint, paid partner route, or
self-hosted deployment to satisfy this workflow. Changing that policy requires
an explicit workflow/policy revision that changes REVIEW_CONTEXT_ID.

### 5.3 Reconcile official-source conflicts

When current official NVIDIA pages disagree:

1. Prefer the current model-specific hosted API/Build page for hosted model
   identity and request examples.
2. Prefer the current hosted LLM API reference for endpoint/request schema.
3. Prefer the current NIM/model reference for model-specific reasoning or
   integration requirements.
4. Prefer a newer explicitly versioned or dated NVIDIA document over an older
   conflicting document when the newer document clearly supersedes it.
5. Never resolve a material conflict by guessing.

If a material conflict remains unresolved, fail closed with:

DOCUMENTATION_CONFLICT

The run log MUST record the conflicting facts and why review did not proceed.

### 5.4 Select transport

The default transport is the NVIDIA hosted OpenAI-compatible Chat Completions
API:

POST https://integrate.api.nvidia.com/v1/chat/completions

The implementation may use:

- raw HTTPS;
- an OpenAI-compatible client;
- another client explicitly compatible with the current NVIDIA hosted endpoint.

A language-specific SDK is NOT required.

The implementation MUST NOT silently switch to a self-hosted endpoint,
partner endpoint, different provider, or different model.

### 5.5 Record documentation contract

Create a run-local documentation/API-contract record containing the reconciled
facts used by the harness.

This record is evidence of the API/model contract used for the run.

It is NOT a substitute for reading current official NVIDIA documentation on a
later run.

-------------------------------------------------------------------------------

## 6. Credential Handling and Mandatory Startup Model-Access Probe

The hosted NVIDIA NIM API credential MUST come only from the process
environment variable:

NVIDIA_API_KEY_CODING

No fallback credential environment variable is permitted by default.

### 6.1 Mandatory credential rules

The harness MUST:

1. Read NVIDIA_API_KEY_CODING from the process environment.
2. Fail closed if the variable is missing or empty.
3. Never require the API key as a command-line argument.
4. Never persist the API key in source code.
5. Never persist the API key in configuration files.
6. Never write the API key to logs.
7. Never echo or print the API key.
8. Never include the API key in exception text.
9. Never include the API key in model prompts.
10. Never include the API key in candidate/defect/adjudication records.
11. Never include the API key in process titles.
12. Never commit the API key.
13. Redact Authorization headers and credential-bearing request metadata from
    traces.
14. Prevent reviewed-project build/test subprocesses from inheriting
    NVIDIA_API_KEY_CODING.

A missing or empty key MUST terminate the run with:

MISSING_NVIDIA_API_KEY_CODING

### 6.2 Authentication

Construct the current NVIDIA hosted request authentication entirely in memory
from NVIDIA_API_KEY_CODING using the official authentication format resolved in
Section 5.

Dispose of transient request objects normally.

The harness MUST NOT create or use an alternate fallback credential source.

### 6.3 Mandatory live model-access probe

Documentation and a valid-looking key are insufficient. Before snapshotting or
reviewing the target codebase, the CTO MUST perform a LIVE inference probe using
the exact configured hosted model and the exact credential.

The definitive probe MUST call:

POST https://integrate.api.nvidia.com/v1/chat/completions

using the `model` value from the reconciled API contract.

At the time this workflow was written, that value is:

nvidia/nemotron-3-ultra-550b-a55b

If current official NVIDIA documentation changes only the canonical identifier
for the same required Nemotron 3 Ultra 550B A55B hosted model, use that
reconciled identifier and record the change in API_CONTRACT.md.

The probe MUST exercise the review-mode controls intended for production review,
including, when currently supported:

- enable_thinking = true;
- force_nonempty_content = true.

Use a tiny harmless prompt and an output budget sufficient to allow both a
short reasoning trace and a final answer. Do not make the probe so token-starved
that normal thinking consumes the entire generation budget and creates a false
access failure.

When the current hosted endpoint supports `reasoning_budget`, the probe MAY use
a deliberately small reasoning budget to keep the access test inexpensive while
still exercising thinking mode. The probe is not a quality benchmark.

Persist a sanitized MODEL_ACCESS_PROBE.md (or equivalent structured artifact)
containing:

- RUN_ID;
- MODEL_ACCESS_PROBE_ID;
- timestamp;
- official model identifier;
- endpoint;
- free-endpoint classification evidence reference;
- attempt count;
- status/error category for each attempt;
- whether HTTP 404 retry occurred;
- whether Retry-After was honored;
- final success/failure;
- response metadata sufficient to prove exact-model inference.

The probe artifact MUST NOT contain NVIDIA_API_KEY_CODING, Authorization
headers, raw secrets, or sensitive prompt content.

An optional authenticated `GET /v1/models` check MAY be used for diagnostics,
but it MUST NOT substitute for the live chat-completion probe. A model listing
can succeed while actual hosted inference is unavailable to the account.

Probe success requires:

- a successful inference response from the exact configured model;
- a syntactically valid response;
- nonempty usable assistant content or another response form explicitly
  accepted by the current model contract;
- no authentication, entitlement, model-routing, or schema failure.

### 6.4 Probe retry and hard-stop rule

The access probe MUST use the bounded retry policy in Section 14.

In particular, this workflow intentionally treats an HTTP 404 from the hosted
Nemotron chat-completions path as CONDITIONALLY TRANSIENT for a bounded number
of retries. This exception exists to tolerate intermittent hosted routing or
capacity behavior observed operationally. It is a workflow retry policy, not a
claim that HTTP 404 normally means overload.

After retry exhaustion, a persistent 404 means the configured model is
inaccessible for this run.

Likewise, persistent retryable capacity/network failures mean access was not
proven.

Authentication/entitlement failures such as HTTP 401 or HTTP 403 are
non-retryable by default unless current official NVIDIA documentation explicitly
classifies the specific response as transient.

If the exact model cannot be accessed successfully after the permitted retry
sequence, HARD STOP with:

NVIDIA_NIM_MODEL_ACCESS_UNAVAILABLE

No repository review request may begin.

No clean-round evidence may be reused to bypass this startup probe on a new
review run.

-------------------------------------------------------------------------------

## 7. Review State Machine

A complete review engagement follows this role-owned state machine.

### 7.1 Engagement and immutable review preparation

CEO_REVIEW_CHARTER
  ->
CTO_READ_LATEST_NVIDIA_NIM_DOCS
  ->
CTO_RECONCILE_API_CONTRACT
  ->
CTO_VERIFY_FREE_ENDPOINT_CLASSIFICATION
  ->
CTO_VERIFY_API_KEY_AND_EXACT_MODEL_ACCESS
  ->
CTO_PERSIST_SANITIZED_MODEL_ACCESS_PROBE_EVIDENCE
  ->
CTO_CAPTURE_REVIEW_SNAPSHOT
  ->
CTO_BUILD_FILE_MANIFEST
  ->
TESTER_DISCOVER_TESTS_AND_TEST_SCRIPTS
  ->
CTO_BUILD_MODEL_TRANSPORT_VIEW
  ->
CTO_BUILD_CODEBASE_MAP_WITH_MODEL_ASSISTANCE_ALLOWED_ONLY_THROUGH_TRANSPORT_VIEW
  ->
CTO_CHUNK_AND_PROVE_COVERAGE
  ->
CTO_COMPUTE_REVIEW_CONTEXT_ID
  ->
TESTER_RUN_REVIEW_HARNESS_FAILURE_MODE_SUITE
  ->
PROGRAMMER_ADJUDICATE_ANY_HARNESS_SUITE_CANDIDATES
  ->
REPAIR_AND_RESTART_IF_ANY_HARNESS_DEFECT_IS_ACCEPTED

### 7.2 Each complete static review round

For each clean-round attempt on the same immutable SNAPSHOT_ID and
REVIEW_CONTEXT_ID:

TESTER_BASELINE_EXECUTION_ON_FRESH_DISPOSABLE_COPY
  ->
REVIEWER_CHUNK_REVIEW
  ->
REVIEWER_CONTEXT_FOLLOWUP
  ->
REVIEWER_GLOBAL_CROSS_FILE_REVIEW
  ->
REVIEWER_TEST_QUALITY_REVIEW
  ->
TESTER_ROUND_REGRESSION_ON_NEW_FRESH_DISPOSABLE_COPY
  ->
REVIEWER_CANDIDATE_NORMALIZATION_AND_DEDUPLICATION
  ->
PROGRAMMER_INITIAL_ADJUDICATION
  ->
REVIEWER_ADJUDICATION_CHALLENGE
  ->
PROGRAMMER_FINAL_ADJUDICATION
  ->
REVIEWER_UPDATE_DEFECT_LIST_AFTER_ADJUDICATION
  ->
DECISION

Every possible defect found by baseline execution, model review, global review,
test-quality review, round regression, CTO analysis, Reviewer manual analysis,
build/static tooling, or another approved evidence source MUST join the same
candidate pipeline before the DECISION point.

### 7.3 If one or more ACCEPTED defects exist

RESPONSIBLE_REPAIR_OWNER_REPAIR
  ->
REVIEWER_MARK_IMPLEMENTED_REPAIRS_FIXED_PENDING_VERIFICATION
  ->
CTO_RE_READ_AND_RECONCILE_CURRENT_API_DOCUMENTATION
  ->
CTO_FREEZE_REPAIRED_CANDIDATE_SNAPSHOT_AND_REVIEW_CONTEXT
  ->
TESTER_DEFECT_SPECIFIC_REPAIR_VERIFICATION_AND_REGRESSION
  ->
TESTER_RE_RUN_RELEVANT_HARNESS_FAILURE_MODES_IF_HARNESS_WAS_CHANGED
  ->
REVIEWER_REPAIR_AND_TEST_WEAKENING_AUDIT
  ->
PROGRAMMER_ADJUDICATE_ANY_NEW_REPAIR_VERIFICATION_CANDIDATES
  ->
REPEAT_REPAIR_VERIFICATION_UNTIL_NO_ACCEPTED_DEFECT_REMAINS_OPEN_OR_IN_REPAIR
  ->
RESET_CONSECUTIVE_CLEAN_COUNT_TO_ZERO
  ->
RESTART_FROM_CTO_READ_LATEST_NVIDIA_NIM_DOCS

The repaired candidate snapshot is frozen BEFORE Tester verification. Tester or
Reviewer findings produced during repair verification MUST therefore cite that
exact immutable candidate state and review context. Do not capture a different
post-test state and pretend it is the evidence source for those findings.

### 7.4 If no ACCEPTED defects exist in the round

CTO_VERIFY_SNAPSHOT_AND_REVIEW_CONTEXT_STABILITY
  ->
REVIEWER_CLOSE_ELIGIBLE_VERIFIED_REPAIRS_FROM_THIS_CLEAN_ROUND
  ->
REVIEWER_CLOSE_COMPLETE_CLEAN_ROUND
  ->
CTO_CERTIFY_ROUND_SNAPSHOT_AND_COVERAGE
  ->
TESTER_CERTIFY_ZERO_UNRESOLVED_DYNAMIC_CANDIDATES
  ->
INCREMENT_CONSECUTIVE_CLEAN_COUNT

If the consecutive clean count is less than two:

REVIEWER_DISCARD_PRIOR_MODEL_CONVERSATION_STATE
  ->
REVIEWER_REQUIRE_FRESH_API_REQUESTS
  ->
START_A_NEW_COMPLETE_ROUND_ON_THE_SAME_SNAPSHOT_AND_REVIEW_CONTEXT

### 7.5 If consecutive clean count equals two

CTO_REVALIDATE_CURRENT_NVIDIA_DOCS_API_AND_FREE_ENDPOINT_AFTER_CLEAN_ROUNDS
  ->
RESET_AND_RESTART_IF_REVIEW_CONTEXT_CHANGED
  ->
TESTER_FINAL_REGRESSION_ON_A_FRESH_DISPOSABLE_COPY
  ->
PROGRAMMER_ADJUDICATE_ANY_FINAL_TEST_CANDIDATES
  ->
REPAIR_RESET_AND_RESTART_IF_ANY_FINAL_TEST_DEFECT_IS_ACCEPTED
  ->
CTO_REVALIDATE_CURRENT_NVIDIA_DOCS_API_AND_FREE_ENDPOINT_AFTER_FINAL_TEST_WORK
  ->
RESET_AND_RESTART_IF_REVIEW_CONTEXT_CHANGED
  ->
CTO_FINAL_TECHNICAL_CERTIFICATION
  ->
PROGRAMMER_ZERO_UNCLOSED_DEFECT_CERTIFICATION
  ->
REVIEWER_TWO_ROUND_CERTIFICATION
  ->
TESTER_FINAL_CERTIFICATION
  ->
CEO_FINAL_EVIDENCE_REVIEW
  ->
CTO_REVERIFY_LIVE_DELIVERY_STATE_MATCHES_CERTIFIED_SNAPSHOT
  ->
CTO_REVERIFY_REVIEW_CONTEXT_HAS_NOT_CHANGED
  ->
CEO_VERIFIED_CLEAN_CERTIFICATE

### 7.6 Universal routing and reset rules

Any newly discovered candidate at any stage MUST enter the
CANDIDATE_FINDING_QUEUE. During an active collection phase it may be batched
with the other findings for that round; outside an active collection phase it
MUST be routed without delay to Programmer adjudication.

No candidate may bypass Programmer adjudication merely because it was found by
the CTO, Reviewer, Tester, a build/static tool, runtime execution, or the review
harness itself.

Any accepted defect resets the consecutive clean count to zero.

Any change that causes SNAPSHOT_ID to change resets the consecutive clean count
to zero.

Any material review change that causes REVIEW_CONTEXT_ID to change resets the
consecutive clean count to zero.

A final status cannot be emitted by a subordinate role. Only the CEO may emit
the final project-level VERIFIED_CLEAN status after all subordinate gates pass.

-------------------------------------------------------------------------------

## 8. Review Snapshot

The model MUST review a stable representation of the codebase.

It MUST NOT review a moving mixture of files from different repository states.

### 8.1 Determine project root

Determine the project root explicitly.

Do not assume the current shell directory is automatically correct.

When Git is available, repository metadata may assist root discovery, but the
workflow MUST also work without Git.

### 8.2 Capture current state

The review target is the complete current project state under the confirmed
project root, not merely committed HEAD.

Inventory all project-owned entries under that root, including tracked,
modified, untracked, and ignored entries that can affect build, test, runtime,
packaging, deployment, generated deliverables, or the behavior being certified.
Git tracking status and ignore rules are classification metadata; they are NOT
automatic review exclusions.

A path may be excluded only through the explicit exclusion process in Section
9.2. Secrets discovered in otherwise in-scope files are redacted for model
transport, not silently omitted from the local snapshot.

If Git is present, record when available:

- HEAD commit identifier;
- branch name;
- working-tree status;
- tracked modifications;
- untracked files;
- ignored in-root entries that are behavior-bearing or otherwise in scope.

Do not silently review HEAD while ignoring current working-tree changes or
project-owned behavior-bearing files merely because Git does not track them.

### 8.3 Freeze the review target

Create an immutable or effectively immutable review snapshot.

Acceptable implementations include:

- a temporary filesystem copy;
- a content-addressed staging directory;
- an immutable archive expanded into a review area;
- another mechanism that guarantees each request reads the same bytes.

Preserve project-relative paths.

The snapshot MUST represent the codebase being adjudicated.

### 8.4 Snapshot identifier

Compute a stable SNAPSHOT_ID from a canonical inventory that covers every
behavior-bearing part of the review target. At minimum include, as applicable:

- normalized project-relative path;
- entry type: regular file, directory marker when relevant, symlink, submodule,
  or other special project entry;
- file-content hash for EVERY included regular file, including behavior-bearing
  binaries/assets/configuration even when that file is not directly suitable for
  semantic model review;
- executable/permission metadata when it can change delivered or test behavior;
- symlink target without blindly following an out-of-root target;
- for an in-scope submodule or nested repository: pinned commit/equivalent
  repository identity PLUS the actual captured working-tree content/metadata
  needed to distinguish local modifications, untracked behavior-bearing files,
  or dirty state from the pinned commit alone;
- other project metadata that can change build/test/runtime behavior without
  changing ordinary file bytes.

Use a canonical ordering and unambiguous serialization before hashing so two
implementations cannot accidentally hash a different logical inventory.

The exact hash algorithm is implementation-defined but MUST be
cryptographically collision-resistant and suitable for snapshot identity, such
as SHA-256 or a stronger currently accepted equivalent.

Every code-review, global-review, test-quality, adjudication-challenge, and
other model request that evaluates the target after snapshot establishment MUST
carry SNAPSHOT_ID, as MUST candidate findings, adjudications, defects, applicable
role handoffs, and final role certificates.

The mandatory startup model-access probe in Section 6.3 is intentionally
pre-snapshot and therefore does NOT carry SNAPSHOT_ID. It MUST instead carry
RUN_ID and its own MODEL_ACCESS_PROBE_ID/evidence identity and may not review
project content.

### 8.5 Review context identifier

Code identity alone is insufficient to prove that two clean rounds or final
certificates relied on the same review machinery.

The CTO MUST compute a stable REVIEW_CONTEXT_ID from a canonical,
cryptographically hashed representation of every behavior-affecting review
identity that could change what the harness finds or how it interprets results.
At minimum include:

- reconciled API-contract identity;
- hashes/identities of the official documentation set relevant to that
  reconciled contract;
- selected model identifier and any documented model-generation semantics on
  which the review depends;
- selected endpoint/transport/interface semantics;
- thinking-mode and reasoning-budget policy;
- structured-output policy/schema version;
- REVIEW_PROMPT_VERSION;
- harness implementation/policy version;
- chunking, overlap, coverage, source-redaction/model-transport,
  run-evidence redaction/model-safe-evidence, context-retrieval, retry,
  candidate-normalization, adjudication, challenge, and clean-round policy
  identities when these are not already incorporated into the harness version;
- the deterministic MODEL_TRANSPORT_VIEW manifest hash for the certified
  snapshot;
- the deterministic base chunk-manifest/coverage-plan hash used by both clean
  rounds;
- the deterministic model-safe codebase-map identity when that map contributes
  model context.

Use canonical ordering and unambiguous serialization before hashing.

The REVIEW_CONTEXT_ID MUST be established before the first clean round and MUST
remain unchanged through both clean rounds, final Tester regression, subordinate
certifications, and CEO final evidence review.

If any component of REVIEW_CONTEXT_ID changes materially:

1. invalidate all clean-round evidence produced under the prior context;
2. reset the consecutive-clean count to zero;
3. re-read/reconcile current official documentation as required;
4. compute a new REVIEW_CONTEXT_ID; and
5. restart the complete review sequence under that new context.

All target-review/adjudication model requests issued after REVIEW_CONTEXT_ID is
established, all round certificates, all final subordinate certificates, and
the CEO final certificate MUST carry both SNAPSHOT_ID and REVIEW_CONTEXT_ID.

The Section 6.3 startup access probe precedes both identifiers and is governed
instead by RUN_ID plus MODEL_ACCESS_PROBE_ID. It MUST NOT be counted as a
review packet or clean-round request.

-------------------------------------------------------------------------------

## 9. File Inventory

The harness MUST create a complete inventory before chunking.

### 9.1 Files that are first-class review material

Include all project-owned files that can affect build, test, packaging,
deployment, behavior, correctness, or maintainability, including:

- application source;
- libraries;
- headers;
- modules;
- test source;
- unit tests;
- integration tests;
- end-to-end tests;
- test fixtures;
- test harnesses;
- test scripts;
- shell scripts;
- PowerShell scripts;
- JavaScript/TypeScript scripts;
- Python scripts;
- build scripts;
- package manifests;
- dependency declarations;
- lock files;
- compiler/build configuration;
- CI/CD workflow files;
- lint configuration;
- static-analysis configuration;
- packaging scripts;
- migration code;
- schema files;
- code-generation inputs;
- project-owned generated code if shipped or committed;
- runtime configuration templates;
- installer logic;
- deployment logic;
- relevant documentation describing expected behavior or invariants.

Test scripts MUST NOT be omitted merely because they are scripts.

Tests MUST be reviewed as code, not treated as proof that production code is
correct.

### 9.2 Potential exclusions

The following may be excluded from direct semantic code review when they are
not project-owned source:

- .git object storage;
- dependency caches;
- downloaded third-party dependency trees;
- compiler object files;
- transient build directories;
- transient coverage output;
- IDE caches;
- large binary assets that contain no executable logic.

No exclusion may be silent.

Every excluded path or path class MUST be represented in an exclusion ledger
with:

- path or pattern;
- classification;
- exclusion reason;
- whether it is tracked/committed;
- whether it can affect delivered behavior.

If a nominally generated, vendor, binary, or build file is actually
project-owned and behaviorally relevant, it must receive appropriate review.

### 9.3 Binary files

For binary files:

1. Record their presence, path, size, hash, and role.
2. Review project code that loads/parses/executes them.
3. Extract metadata when useful and safe.
4. Do not pretend binary content was semantically reviewed when it was not.
5. Flag unexpected executables, archives, or opaque behavior-bearing binaries
   for Programmer adjudication when appropriate.

### 9.4 Secrets and sensitive values

Never send actual secrets to NVIDIA NIM.

Before model submission, locally detect and redact likely:

- API keys;
- passwords;
- private keys;
- authentication tokens;
- connection secrets;
- credentials.

Preserve:

- file path;
- line location;
- variable/field name;
- surrounding non-secret structure.

Replace secret values with stable placeholders such as:

<REDACTED_SECRET_001>

The CTO MUST construct a dedicated MODEL_TRANSPORT_VIEW from the immutable
snapshot. Every byte of SNAPSHOT/SOURCE content sent to NVIDIA NIM MUST come from
that redacted view or from a derivative proven to contain only data from that
view.

The MODEL_TRANSPORT_VIEW MUST:

- preserve project-relative path identity;
- preserve line numbering and line boundaries wherever text is sent for
  line-grounded review;
- preserve enough non-secret syntax and structure for meaningful review;
- use deterministic placeholders within the same snapshot and redaction-policy
  version;
- record both the raw source-content hash and the model-transport-content hash
  for every transported chunk or source-context packet;
- never overwrite or mutate the immutable raw snapshot;
- be regenerated or revalidated when the snapshot or source-redaction policy
  changes.

Initial chunks, related-source packets, global-review source packets,
test-quality source packets, and source-code context-followup material sent to
NVIDIA NIM MUST use MODEL_TRANSPORT_VIEW. A code path that can send raw snapshot
content directly to the model is a harness defect.

Run-local evidence does not necessarily originate from the immutable source
snapshot. Tester output, build/static-tool output, harness failure-mode evidence,
Reviewer/CTO analysis records, Programmer rationale, and defect-history evidence
that must be shown to NVIDIA NIM MUST pass through a separate
MODEL_SAFE_EVIDENCE_VIEW before transmission.

MODEL_SAFE_EVIDENCE_VIEW MUST:

- redact actual secrets and harness-only credentials;
- preserve the evidence identity, provenance, and non-secret technical facts
  required to evaluate the claim;
- bind the sanitized evidence to an authoritative LOCAL_EVIDENCE_REGISTRY
  EVIDENCE_ID and the applicable RUN_ID, ROUND_ID, SNAPSHOT_ID, and
  REVIEW_CONTEXT_ID;
- never mutate the raw LOCAL_EVIDENCE_REGISTRY evidence;
- never claim that redacted evidence is byte-identical to raw evidence; and
- be generated under the evidence-redaction policy bound into
  REVIEW_CONTEXT_ID.

Before ANY non-source evidence is included in MODEL_SAFE_EVIDENCE_VIEW, it MUST
first have an immutable/local evidence entry in LOCAL_EVIDENCE_REGISTRY. This
applies not only to Tester/build/harness evidence but also to excerpts from
DEFECTS.md, ADJUDICATIONS.md, Programmer rationale, Reviewer/CTO analysis, and
other durable history used in a model challenge.

When importing durable ledger/history evidence into LOCAL_EVIDENCE_REGISTRY,
record:

- originating artifact/ledger type;
- originating record ID such as DEFECT_ID, candidate/adjudication ID, or
  certificate/evidence ID;
- content hash of the imported evidence;
- RUN_ID/ROUND_ID/SNAPSHOT_ID/REVIEW_CONTEXT_ID provenance carried by the
  original record when available;
- current RUN_ID and purpose for which the evidence was imported.

This import does not rewrite historical provenance. It creates a current,
immutable evidence reference from which MODEL_SAFE_EVIDENCE_VIEW can be safely
derived.

Every model-bound packet MUST be assembled only from:
1. MODEL_TRANSPORT_VIEW or a proven-safe derivative for source/snapshot content;
2. MODEL_SAFE_EVIDENCE_VIEW for run-local/adjudication/defect-history evidence;
3. harness-authored instructions and schema that contain no secret.

The Programmer performs adjudication locally against the unredacted immutable
snapshot plus authorized LOCAL_EVIDENCE_REGISTRY evidence. Raw local evidence
MUST NOT be sent directly to NVIDIA NIM.

A possible hard-coded secret MUST enter the candidate pipeline and be
Programmer-adjudicated without exposing the secret value to the model, candidate
record, adjudication record, defect log, or other harness artifact.

### 9.5 Symlinks, submodules, nested repositories, and unusual paths

The inventory phase MUST explicitly detect:

- symbolic links;
- junctions/reparse points where applicable;
- Git submodules;
- nested repositories;
- hidden project files;
- filenames containing spaces or shell metacharacters;
- case-colliding paths on case-insensitive platforms.

Do not blindly follow a link outside the project root.

For each such entry, record its relationship to the project and either:

1. include its project-owned content in the review snapshot; or
2. record a precise exclusion and reason.

A submodule or nested repository that contains project-owned behavior required
for the delivered product MUST NOT disappear from review merely because it has
a separate repository boundary.

Path handling in the harness MUST avoid shell-word-splitting assumptions.

-------------------------------------------------------------------------------

## 10. Codebase Map

Before defect hunting, build a structural map of the snapshot.

The map MUST identify, as applicable to the project:

- languages;
- entry points;
- modules/packages;
- public interfaces;
- important data structures;
- call relationships;
- imports/includes;
- process boundaries;
- threads/tasks/workers;
- shared mutable state;
- persistence;
- network boundaries;
- configuration;
- build system;
- test framework;
- test-to-production relationships;
- major state machines;
- security boundaries;
- resource ownership;
- error-handling conventions.

This map may be created through deterministic parsing, lightweight static
analysis, model-assisted fact extraction, or a combination. Any model-assisted
fact extraction MUST receive only MODEL_TRANSPORT_VIEW content or a proven-safe
derivative, never raw snapshot content.

The codebase map is context, not evidence that the underlying files have been
reviewed.

Every reviewable file must still receive direct chunk coverage.

-------------------------------------------------------------------------------

## 11. Chunking Algorithm

Chunk the complete reviewable snapshot.

Do not rely on one giant prompt merely because the model currently has a large
context window.

Chunking exists to guarantee coverage and maintain review attention.

### 11.1 Chunking priority

Prefer semantic boundaries in this order when practical:

1. complete function/method;
2. complete type/class/module;
3. complete logical section;
4. line-range window.

Never split a short logical unit merely to hit an exact token count.

For very large functions or generated structures, split with overlapping
context and explicitly mark the continuation relationship.

### 11.2 Chunk metadata

Every chunk MUST have:

- SNAPSHOT_ID;
- REVIEW_CONTEXT_ID before the chunk is submitted for model review;
- CHUNK_ID;
- relative file path or file paths;
- start line;
- end line;
- raw source-content hash;
- model-transport-content hash;
- language/type;
- symbol names when known;
- imports/includes/dependencies when known;
- predecessor/successor chunk IDs when applicable;
- associated test chunk IDs when known;
- whether content was redacted;
- whether the chunk is complete or a continuation.

### 11.3 Size policy

Determine the current model context limit from the documentation discovery
phase.

Use a conservative per-request code budget even when the advertised context
window is very large.

A reasonable implementation target is approximately:

- 12K to 24K input tokens of primary code per chunk;
- a soft upper range around 40K primary-code tokens;
- structural overlap around boundaries where needed.

These are guidance values, not protocol constants.

The harness MUST reduce chunk size if:

- responses become truncated;
- findings become vague;
- the model loses line-level grounding;
- context-followup requests become excessive.

If an exact tokenizer is unavailable, use a conservative character-based
estimate and leave substantial context headroom.

### 11.4 Overlap

Use overlap where a boundary can hide a defect.

Examples:

- function declarations and implementations;
- class fields and methods;
- producer/consumer interfaces;
- error path at the end of one chunk and caller in the next;
- state transition logic;
- lock acquisition/release;
- allocation/free ownership.

Do not allow overlap to create duplicate defects without deduplication.

### 11.5 Test pairing

When a production chunk has identifiable tests, provide compact references to
the related tests and, when budget permits, pair relevant test chunks with the
production review.

However:

- every test file must also be independently reviewed;
- pairing does not count as full test review;
- a passing test is not evidence that the implementation is correct;
- test assertions must themselves be challenged.

### 11.6 Coverage invariant

At the end of chunk construction:

EVERY REVIEWABLE TEXT LINE MUST BELONG TO AT LEAST ONE CHUNK.

The harness MUST compute and verify this invariant.

Any uncovered reviewable line is a harness failure.

-------------------------------------------------------------------------------

## 12. Baseline Test Discovery

Before model defect review, discover how the project claims to test itself.

Record:

- test directories;
- test files;
- test scripts;
- package/build test targets;
- CI test commands;
- verification scripts;
- static-analysis commands;
- coverage commands;
- documented manual checks.

The Tester owns execution decisions. Do not automatically execute arbitrary
discovered commands merely because they are named "test".

Before execution, the Tester MUST establish an explicit safe execution policy
covering at least destructive operations, network access, external services,
credentials, filesystem writes, process creation, timeouts, and cleanup.

Project build/test subprocesses MUST run under an explicitly constructed
sanitized environment. They MUST NOT inherit NVIDIA_API_KEY_CODING, authorization
headers, model-service credentials, or other harness-only secrets. If the
project under review has legitimate test credentials of its own, those are
separately governed by the project's safe execution policy and MUST NOT be
silently substituted with the review harness credential.

When safe execution is possible, the Tester MUST execute the documented
baseline build/test path before static review so existing runtime failures can
enter the same candidate pipeline. A baseline failure MUST NOT be silently
ignored merely because the static Reviewer has not begun.

If safe execution is impossible, the Tester MUST document why and the CEO MUST
not misrepresent unexecuted tests as passing.

The primary static-review requirement remains that test code and test scripts
are included in direct review. Dynamic execution supplements rather than
replaces that review.

-------------------------------------------------------------------------------

## 13. NVIDIA NIM / Nemotron Request Policy

The Reviewer operates model-review requests under the API/model contract
resolved and certified by the CTO.

### 13.1 Model

Use the current official hosted model identifier obtained from NVIDIA
documentation.

Baseline default:

nvidia/nemotron-3-ultra-550b-a55b

Do not silently fall back to a smaller Nemotron, a different NVIDIA model,
another provider, or a local/self-hosted deployment.

If the exact configured model becomes inaccessible, the run MUST stop under
Section 6.4 rather than silently changing reviewers.

### 13.2 Thinking/reasoning mode

For substantive review, enable Nemotron thinking when the current hosted API
supports it.

Baseline hosted control:

chat_template_kwargs.enable_thinking = true

For coding/review-agent use, also set when currently documented:

chat_template_kwargs.force_nonempty_content = true

The current NVIDIA documentation also exposes a `reasoning_budget` mechanism in
supported examples. The CTO MUST reconcile the current hosted behavior before
using it.

For exhaustive review, use a generous reasoning budget that fits within the
current hosted output constraints and leaves adequate space for the required
structured final answer.

Current NVIDIA examples commonly use a 16,384-token generation/reasoning scale,
but this document does NOT freeze that as an eternal API limit. The runtime
documentation contract controls.

Do not treat the model's hidden or returned reasoning trace as the authoritative
defect record. The authoritative candidate is the structured final finding
content validated by the harness.

### 13.3 Sampling discipline

Use only parameters currently supported by the hosted Nemotron endpoint.

Current NVIDIA examples for this model commonly show:

- temperature = 1.0
- top_p = 0.95

Other official NVIDIA workflows also demonstrate different values for specific
agent use cases. Therefore:

- the reconciled current API/model documentation controls;
- do not claim determinism solely from temperature/top_p;
- do not rely on sampling settings as the mechanism for independence between
  clean rounds;
- use fresh conversations/requests and varied review ordering for independent
  rounds.

### 13.4 Structured finding output

A structured candidate schema remains mandatory for this harness.

If the current NVIDIA hosted API explicitly supports a reliable native
structured-output/JSON-schema mechanism for this model, the CTO MAY use it.

If native structured output is not currently documented or is unreliable, the
Reviewer MUST:

1. instruct the model to place its FINAL answer in strict JSON matching the
   logical schema in Section 16;
2. keep reasoning/thinking separate from the final JSON when the API exposes
   separate `reasoning_content`;
3. parse only the intended final answer field as candidate JSON;
4. validate the JSON locally against the required schema;
5. treat empty, malformed, truncated, or schema-invalid final output as a failed
   model request, not as "zero findings";
6. retry under Section 14.

The harness MUST NOT parse a reasoning trace as if it were the final candidate
ledger.

### 13.5 Current logical hosted request shape

When the current NVIDIA hosted Chat Completions API remains the selected
transport, the logical request is equivalent to:

POST https://integrate.api.nvidia.com/v1/chat/completions

Authorization:
Bearer <NVIDIA_API_KEY_CODING held only in memory>

Body fields include current equivalents of:

- model: nvidia/nemotron-3-ultra-550b-a55b
- messages: system/user review content
- max_tokens: sufficiently large for reasoning plus final structured findings
- temperature/top_p only if current documentation supports/recommends them
- extra_body/chat-template controls equivalent to:
  - enable_thinking: true
  - force_nonempty_content: true
- reasoning_budget when supported and selected by the CTO

The exact serialization mechanism depends on the chosen client library.

A client that does not expose NVIDIA-specific chat-template controls directly
MUST use its supported extra-body/raw-JSON mechanism rather than silently
dropping them.

### 13.6 Response handling

The hosted model may expose reasoning separately from final content.

The Reviewer MUST preserve enough response metadata to diagnose:

- empty final content;
- reasoning-only output;
- truncation;
- finish reason;
- invalid schema;
- mismatched request identity;
- capacity/routing failure.

Every logical model-review packet MUST carry RUN_ID and a unique
REVIEW_PACKET_ID. A packet belonging to one of the two complete clean-round
attempts MUST also carry that ROUND_ID. A chunk packet additionally has a
CHUNK_ID. Non-chunk packets may have CHUNK_ID = null.

The final model answer/schema MUST echo the applicable:

- RUN_ID;
- ROUND_ID when applicable;
- SNAPSHOT_ID;
- REVIEW_CONTEXT_ID;
- REVIEW_PACKET_ID;
- CHUNK_ID when applicable.

A request/response is invalid if any of the following occurs:

- transport failure;
- exhausted retryable HTTP failure;
- non-retryable HTTP failure;
- empty usable final model content;
- reasoning-only response when final content is required;
- invalid structured final output;
- missing or wrong RUN_ID;
- missing or wrong ROUND_ID when applicable;
- missing or wrong SNAPSHOT_ID;
- missing or wrong REVIEW_CONTEXT_ID;
- missing or wrong REVIEW_PACKET_ID;
- missing or wrong CHUNK_ID for a chunk-review packet;
- truncated final output;
- finish reason indicating output exhaustion when required schema is incomplete;
- unsupported-model or entitlement response;
- incomplete findings array when schema requires one;
- response cannot be tied unambiguously to the submitted logical packet.

An invalid request MUST NOT count as a clean review.

-------------------------------------------------------------------------------

## 14. NVIDIA Hosted API Retry Policy

Implement bounded retries for transient hosted-NIM failures.

### 14.1 Retryable conditions

Retry, subject to the current official NVIDIA API contract, for:

- network timeout;
- transient DNS/connectivity failure;
- connection reset;
- HTTP 408;
- HTTP 425 when encountered and semantically retryable;
- HTTP 429;
- HTTP 500;
- HTTP 502;
- HTTP 503;
- HTTP 504;
- other 5xx responses that current documentation does not classify as
  permanent;
- empty/invalid/truncated model output that is safe to regenerate;
- HTTP 404 from the exact hosted Nemotron chat-completions request, under the
  special bounded rule below.

### 14.2 Special HTTP 404 rule

For this hosted review model, HTTP 404 is CONDITIONALLY RETRYABLE.

Although 404 conventionally indicates a missing route/resource, this workflow
intentionally tolerates intermittent hosted routing/capacity 404 responses.

Rules:

1. Retry the exact same logical request against the same configured endpoint and
   exact model.
2. Do not change model, provider, endpoint class, or API key to make the retry
   pass.
3. Apply the same bounded exponential-backoff policy as other transient errors.
4. Log status code, attempt number, timing, and request identity without logging
   credentials or sensitive prompt content.
5. If 404 persists through retry exhaustion, classify the model/request as
   inaccessible and fail the applicable probe or review request closed.

This 404 exception is intentionally conservative and bounded. It is not
permission to retry an obviously incorrect URL forever.

### 14.3 Non-retryable-by-default conditions

Do not automatically retry indefinitely for:

- HTTP 400 malformed request;
- HTTP 401 authentication failure;
- HTTP 403 authorization/entitlement failure;
- HTTP 405 wrong method;
- HTTP 422 request validation failure;
- a model identifier proven invalid by current official documentation;
- a deterministic local schema/construction bug.

A single short revalidation/reconstruction attempt MAY occur if the harness
detects that its own request serialization was stale and repairs it under the
normal harness-defect process. Do not disguise a permanent access failure as a
transient retry loop.

### 14.4 Suggested exponential backoff

Suggested default:

- maximum attempts: 7 total attempts, including the first request;
- base delay: 2 seconds;
- exponential cap: 60 seconds;
- full jitter.

For retry number `r`, where the first retry is r=1:

backoff_cap = min(60 seconds, 2 seconds * 2^(r-1))
sleep = random_uniform(0, backoff_cap)

If a valid `Retry-After` value is supplied, honor it instead of sleeping less
than the server-requested interval.

Record:

- request/packet ID;
- attempt number;
- HTTP status or transport error category;
- retry reason;
- computed delay;
- whether Retry-After was used;
- final success/exhaustion.

Never log Authorization headers or NVIDIA_API_KEY_CODING.

### 14.5 Retry exhaustion

If retry exhaustion occurs:

1. mark the logical request incomplete;
2. mark the review round incomplete when the request belongs to a round;
3. do not increment the clean-round counter;
4. preserve a resumable checkpoint only if all checkpoint rules are satisfied;
5. hard stop when the exhausted request is the mandatory startup model-access
   probe;
6. otherwise terminate the run or resume later from a valid explicit checkpoint.

A partially reviewed repository cannot be declared clean.

-------------------------------------------------------------------------------

## 15. Chunk Review Prompt Contract

Every chunk review request MUST provide:

1. review role;
2. project-level correctness expectations;
3. RUN_ID;
4. ROUND_ID;
5. SNAPSHOT_ID;
6. REVIEW_CONTEXT_ID;
7. unique REVIEW_PACKET_ID;
8. CHUNK_ID;
9. relevant codebase map;
10. exact chunk metadata;
11. exact MODEL_TRANSPORT_VIEW code for the chunk under review;
12. nearby interfaces or related tests from the MODEL_TRANSPORT_VIEW when
    available;
13. previously adjudicated rejected, out-of-scope, duplicate, reopened, or
    linked-regression findings relevant to this chunk;
14. structured output schema;
15. explicit permission to request more context.

The model MUST be instructed to act as an independent senior reviewer and to
look for defects, not to congratulate the code.

### 15.1 Required review lenses

For each chunk, inspect as applicable:

- incorrect logic;
- boundary errors;
- invalid state transitions;
- null/none handling;
- integer overflow/underflow;
- floating-point invalid states;
- resource leaks;
- use-after-free;
- double free;
- ownership errors;
- lifetime errors;
- concurrency races;
- lock-order bugs;
- deadlocks;
- async ordering errors;
- stale state;
- partial updates;
- transactionality;
- retry bugs;
- error swallowing;
- incorrect error recovery;
- security defects;
- unsafe input handling;
- injection;
- path traversal;
- command construction;
- authentication/authorization mistakes;
- cryptographic misuse;
- secret exposure;
- serialization/deserialization errors;
- API misuse;
- portability defects;
- undefined behavior;
- platform assumptions;
- filesystem errors;
- time/clock assumptions;
- randomness/reproducibility defects;
- performance defects that become correctness or availability defects;
- missing validation;
- impossible invariants;
- unreachable required behavior;
- misleading comments that contradict implementation;
- configuration mismatch;
- dependency misuse;
- test false positives;
- tests that assert the wrong behavior;
- tests that never exercise the claimed path;
- mocks that hide integration defects;
- disabled/skipped tests;
- brittle timing tests;
- cleanup defects in tests;
- test-order dependence.

### 15.2 Evidence requirement

A candidate finding must be grounded.

For every reported candidate, the model MUST identify, when applicable:

- exact path;
- exact line/range or symbol;
- defective behavior;
- why it is wrong;
- triggering condition;
- observable impact;
- relevant cross-file context;
- confidence;
- suggested verification.

The model must distinguish:

- proven defect;
- likely defect needing context;
- design concern;
- style issue;
- test gap.

Style preferences MUST NOT be promoted into defects unless they create a
concrete correctness, security, maintainability, portability, or operational
risk.

-------------------------------------------------------------------------------

## 16. Structured Candidate Finding Schema

A language-neutral logical schema is:

{
  "run_id": "...",
  "round_id": "... or null when outside a complete static review round",
  "snapshot_id": "...",
  "review_context_id": "...",
  "chunk_id": "... or null when not a chunk review",
  "review_packet_id": "...",
  "origin": "NVIDIA_NIM_CHUNK_REVIEW|NVIDIA_NIM_GLOBAL_REVIEW|NVIDIA_NIM_TEST_QUALITY_REVIEW",
  "reviewed_ranges": [
    {
      "path": "...",
      "start_line": 1,
      "end_line": 100,
      "raw_source_content_hash": "...",
      "model_transport_content_hash": "..."
    }
  ],
  "context_requests": [
    {
      "path": "...",
      "symbol_or_range": "...",
      "reason": "..."
    }
  ],
  "findings": [
    {
      "finding_ref": "... optional model-local reference only",
      "severity": "critical|high|medium|low",
      "confidence": "high|medium|low",
      "category": "...",
      "path": "...",
      "start_line": 1,
      "end_line": 2,
      "symbol": "...",
      "title": "...",
      "claim": "...",
      "evidence": "...",
      "trigger": "...",
      "impact": "...",
      "related_paths": ["..."],
      "test_implication": "...",
      "suggested_verification": "...",
      "suggested_fix_direction": "..."
    }
  ],
  "coverage_notes": ["..."]
}

This is a logical schema. Implementations may use equivalent field names or
serialization formats.

The model MUST NOT be authoritative for persisted CANDIDATE_ID assignment.
`finding_ref`, when supplied, is only a model-local reference inside that
response.

During atomic candidate ingress, the Reviewer MUST generate the authoritative
persisted CANDIDATE_ID locally AFTER secret sanitization and provenance
normalization.

Persisted CANDIDATE_ID values MUST be stable within a
SNAPSHOT_ID/REVIEW_CONTEXT_ID pair and unique enough to support provenance,
deduplication, and adjudication tracking.

A useful persisted CANDIDATE_ID can be derived from normalized,
SECRET-SANITIZED fields:

SNAPSHOT_ID
+ REVIEW_CONTEXT_ID
+ primary path
+ symbol/range
+ normalized defect claim

Generate persisted candidate IDs only after secret sanitization. Do not place a
raw secret, reversible encoding of a secret, or hash derived solely from a raw
secret into a candidate ID.

-------------------------------------------------------------------------------

## 17. Context Followup Protocol

A chunk reviewer is not required to guess when required context is missing.

If the NVIDIA NIM model requests additional context:

1. Validate the requested path/range against the immutable review snapshot.
2. Resolve the corresponding line-preserving content only from the
   MODEL_TRANSPORT_VIEW for model transmission.
3. Add the requested symbol/range and necessary nearby redacted context.
4. Resubmit the same candidate-review conversation or a reconstructed
   equivalent.
5. Preserve RUN_ID, ROUND_ID when applicable, REVIEW_PACKET_ID, SNAPSHOT_ID,
   REVIEW_CONTEXT_ID, and CHUNK_ID when the logical packet is a chunk review.
6. Limit recursive context requests with a high but finite safety bound.
7. If the model still lacks necessary context, mark the candidate as
   NEEDS_CONTEXT rather than inventing a conclusion.

The context limit is not permission to ignore a cross-file defect.

If needed, create a dedicated cross-file review packet.

-------------------------------------------------------------------------------

## 18. Global Cross-File Review

Per-chunk review is necessary but insufficient.

After all chunks complete, perform independent repository-level passes.

At minimum perform these global lenses:

### 18.1 Architecture and state

Review:

- major control flow;
- state machines;
- lifecycle;
- initialization;
- shutdown;
- restart/recovery;
- global invariants;
- ownership;
- persistence consistency.

### 18.2 Interface contracts

Review:

- caller/callee assumptions;
- type/unit mismatch;
- error contract mismatch;
- nullability;
- serialization contract;
- versioning assumptions;
- public/private boundary mistakes.

### 18.3 Concurrency and ordering

Review:

- shared state;
- threads/tasks/workers;
- lock ordering;
- cancellation;
- retries;
- timeout behavior;
- event ordering;
- duplicate processing;
- lost updates.

### 18.4 Resource and failure paths

Review:

- files;
- sockets;
- handles;
- allocations;
- temporary resources;
- process creation;
- cleanup;
- partial initialization;
- exceptional exits.

### 18.5 Security and trust boundaries

Review:

- untrusted inputs;
- shell/process calls;
- filesystem paths;
- network inputs;
- configuration;
- credentials;
- privileges;
- parsing;
- deserialization.

### 18.6 Portability

Review:

- path separators;
- encoding;
- newline assumptions;
- filesystem semantics;
- compiler assumptions;
- integer widths;
- endianness;
- environment handling;
- process APIs;
- platform-specific behavior.

### 18.7 Build/package/deployment

Review:

- build reproducibility;
- missing runtime files;
- wrong dependency scopes;
- packaging omissions;
- development-only assumptions;
- CI/local mismatches.

Each global pass may request targeted source packets, but every source packet
sent to NVIDIA NIM MUST be resolved from the MODEL_TRANSPORT_VIEW, not raw
snapshot content.

Every global candidate finding enters the same candidate pipeline as a
chunk-level finding.

-------------------------------------------------------------------------------

## 19. Test Quality Review

Tests are adversarially reviewed after production-code review.

The NVIDIA NIM model MUST be asked explicitly:

1. Do tests assert the correct expected behavior?
2. Can a test pass while production behavior is wrong?
3. Are important assertions missing?
4. Are tests accidentally no-ops?
5. Are exceptions swallowed?
6. Are tests skipped/disabled?
7. Are mocks replacing the behavior supposedly under test?
8. Is setup creating an impossible or unrealistic state?
9. Is teardown hiding leaks or state pollution?
10. Are tests order-dependent?
11. Do timing sleeps hide races?
12. Are boundary cases absent?
13. Are error paths absent?
14. Are platform-specific paths untested?
15. Are test scripts invoking the intended binaries/configurations?
16. Can verification scripts report success despite subcommand failure?
17. Are exit codes propagated correctly?
18. Are test-selection filters unintentionally omitting tests?
19. Are stale generated fixtures masking schema/API changes?
20. Are expected-failure markers still justified?

A defective test or test script is a candidate defect.

A missing test is a candidate defect when the missing coverage creates a
material risk that required behavior can regress undetected.

-------------------------------------------------------------------------------

## 20. Candidate Finding Queue

The Reviewer is the custodian of the candidate queue. Candidates may originate from model review, manual review, CTO analysis, Tester execution, builds, or other approved evidence.

NVIDIA NIM findings are NOT defects merely because the model produced them.

Store only normalized, sanitized, provenance-complete candidates in the
temporary or run-local:

CANDIDATE_FINDING_QUEUE

Raw observations remain in their originating model-response/evidence staging
area until atomic candidate ingress succeeds. They are not queue entries.

The authoritative defect list MUST NOT be directly writable by the NVIDIA NIM
review step.

Every candidate MUST proceed through Programmer adjudication.

The candidate queue MUST preserve for every origin:

- candidate ID;
- RUN_ID;
- ROUND_ID when applicable;
- SNAPSHOT_ID;
- REVIEW_CONTEXT_ID;
- source REVIEW_PACKET_ID when the candidate came from a model packet;
- origin category from Section 2.7;
- originating role/tool/process;
- source review round, test run, build run, or other evidence run;
- source CHUNK_ID/global lens when applicable;
- source path/range/symbol when applicable;
- proposed severity/confidence when the origin supplies them;
- sanitized evidence/reproduction summary plus evidence references;
- context gathered;
- sanitized originating finding or normalized equivalent;
- duplicate/provenance relationships;
- adjudication state.

Fields that are model-specific may be null or absent for Tester/CTO/build-origin
candidates. Provenance itself MUST NOT be omitted.

Candidate ingress MUST be atomic.

A raw observation from a model response, Tester, CTO, Reviewer, build, sanitizer,
or other source is not yet a queue candidate. Before appending it to
CANDIDATE_FINDING_QUEUE, the Reviewer MUST normalize and validate:

- candidate ID after secret sanitization;
- origin category and originating role/tool;
- RUN_ID;
- ROUND_ID when applicable;
- SNAPSHOT_ID;
- REVIEW_CONTEXT_ID;
- source REVIEW_PACKET_ID and CHUNK_ID when model-originated/applicable;
- source evidence-run identifier for dynamic/build evidence;
- sanitized evidence and reproduction metadata;
- path/range/symbol metadata when applicable.

Before any non-model finding is persisted into the candidate queue, locally
sanitize its evidence so actual secret values cannot enter candidate,
adjudication, defect, or model-challenge artifacts. Preserve the fact, location,
and identity of the secret condition without preserving the secret value.

A finding with missing mandatory ingress provenance MUST remain a raw observation
and MUST NOT enter the queue or be adjudicated until the provenance is repaired.

-------------------------------------------------------------------------------

## 21. Candidate Deduplication

The Reviewer owns deduplication and MUST preserve provenance. The Programmer confirms any duplicate relationship during adjudication when it affects defect identity.

Before Programmer adjudication:

1. Group findings by path/symbol.
2. Compare normalized claims.
3. Merge findings that describe the same root defect.
4. Preserve every source candidate ID.
5. Preserve the strongest evidence.
6. Do not merge distinct root causes merely because they have the same
   symptom.
7. Mark suspected duplicates for Programmer confirmation.
8. For every suspected-duplicate group, designate one primary/canonical
   candidate and require the Programmer to adjudicate that primary candidate
   before any dependent candidate may receive DUPLICATE_OF_<DEFECT_ID>.
9. If the primary candidate is rejected or remains unresolved, no dependent
   candidate may be dismissed merely by referring to that unaccepted primary;
   adjudicate the remaining candidates on their own evidence or designate a new
   primary.

A deduplicated candidate still requires adjudication.

-------------------------------------------------------------------------------

## 22. Programmer Adjudication

The Programmer is the sole final technical adjudicator of candidate findings before they may enter the authoritative defect list.

### 22.0 Local adjudication evidence registry

Candidate provenance by ID is not sufficient by itself. The harness MUST
maintain a LOCAL_EVIDENCE_REGISTRY outside the immutable target snapshot.

For every non-model observation and every model finding whose adjudication
depends on execution/build/tool evidence, the registry MUST preserve or point to
the complete LOCAL evidence required for Programmer adjudication. It also acts
as the mandatory staging registry for any durable defect/adjudication/history
evidence that will be transmitted to NVIDIA NIM through MODEL_SAFE_EVIDENCE_VIEW.
Relevant evidence includes as applicable:

- raw Tester baseline evidence;
- raw per-round regression evidence;
- raw final-regression evidence;
- repair-verification evidence;
- harness failure-mode evidence;
- Reviewer manual-analysis evidence;
- CTO technical-analysis evidence;
- build/static/sanitizer/tool output;
- exact command metadata and exit status where applicable;
- imported DEFECTS.md or ADJUDICATIONS.md records/excerpts needed for a model
  challenge;
- imported Programmer rationale or prior certification/history evidence needed
  for a model challenge.

Actual secrets MUST remain protected and MUST NOT be copied into candidate,
adjudication, defect, or model-bound artifacts. If raw local evidence itself
contains a secret needed for local diagnosis, the registry MUST keep that raw
evidence outside the target repository and ordinary logs with access/retention
appropriate to sensitive data. The Programmer may inspect authorized local raw
evidence when necessary, but any such evidence sent to NVIDIA NIM for an
adjudication challenge MUST first pass through MODEL_SAFE_EVIDENCE_VIEW.

Each candidate's `evidence_run_id` or equivalent evidence reference MUST resolve
to the correct LOCAL_EVIDENCE_REGISTRY entry for the same RUN_ID, applicable
ROUND_ID, SNAPSHOT_ID, and REVIEW_CONTEXT_ID.

When an adjudication challenge requests additional run-local evidence, the
Reviewer/CTO MUST resolve that request against the matching local evidence
entries, create only the requested necessary MODEL_SAFE_EVIDENCE_VIEW material,
and preserve the same evidence provenance in the follow-up packet. The model
MUST NOT gain direct access to LOCAL_EVIDENCE_REGISTRY.

A missing, stale, mismatched, or unavailable required evidence reference makes
the candidate NEEDS_MORE_EVIDENCE. It MUST NOT be accepted, rejected,
classified out-of-scope, or classified duplicate until the evidence deficiency
is resolved.

The Programmer may be implemented as a human programmer, a designated
programmer agent, or another mechanism explicitly instantiated as the separate
Programmer role. The adjudicator MUST NOT simultaneously act as CEO, CTO,
Reviewer, or Tester for that same candidate adjudication.

The mechanism is implementation-specific. The Programmer role boundary and the
required decision process are not.

### 22.1 Evidence packet

For each candidate, provide the Programmer:

- candidate ID;
- RUN_ID;
- ROUND_ID when applicable;
- SNAPSHOT_ID;
- REVIEW_CONTEXT_ID;
- source REVIEW_PACKET_ID when applicable;
- exact cited source;
- relevant surrounding code;
- related callers/callees;
- relevant tests;
- normalized candidate claim from the originating evidence source;
- originating evidence, including model evidence when applicable;
- trigger or reproduction condition when known;
- impact;
- requested context;
- any duplicate relationships.

The Programmer MUST inspect the actual snapshot code.

The Programmer MUST NOT adjudicate from the finding title alone.

### 22.2 Allowed initial adjudications

Use outcomes equivalent to:

ACCEPTED_DEFECT

REJECTED_FALSE_POSITIVE

DUPLICATE_OF_ACCEPTED_DEFECT

NEEDS_MORE_EVIDENCE

OUT_OF_SCOPE_NOT_A_DEFECT

### 22.3 Requirements for acceptance

For ACCEPTED_DEFECT record:

- why the finding is valid;
- actual root cause;
- actual affected code;
- corrected severity if needed;
- expected repair;
- verification/test requirement.

### 22.4 Requirements for rejection and out-of-scope classification

For REJECTED_FALSE_POSITIVE record:

- specific technical reason;
- code evidence;
- invariant/API/rule that makes the behavior correct;
- why the claimed trigger cannot produce the alleged defect.

For OUT_OF_SCOPE_NOT_A_DEFECT record:

- the precise scope boundary being applied;
- evidence that the cited behavior is not a defect in the in-scope current
  project state;
- evidence that the disposition does not hide an in-scope build, test, runtime,
  packaging, deployment, security, portability, or maintainability defect; and
- the reason the candidate should not instead be ACCEPTED_DEFECT.

OUT_OF_SCOPE_NOT_A_DEFECT MUST NOT be used merely because a defect is
inconvenient, belongs to an unexpected file type, occurs in an untracked/ignored
file, or crosses a nested repository/submodule boundary. The scope rules in
Sections 2.1, 8, and 9 control.

"Looks fine", "unlikely", "tests pass", "out of scope", or "model is wrong"
without the required evidence is insufficient.

### 22.5 Needs-more-evidence

If NEEDS_MORE_EVIDENCE:

1. identify the missing evidence;
2. gather it from the snapshot or safe execution evidence;
3. return the candidate for adjudication;
4. do not close the review round while it remains unresolved.

### 22.6 Duplicates and regressions

DUPLICATE_OF_ACCEPTED_DEFECT is permitted only after identifying the canonical
accepted defect ID and proving that the canonical defect is itself an active
accepted defect for the current candidate state. The Programmer MUST record the
specific root-cause equivalence evidence supporting that duplicate relationship;
shared symptoms, paths, stack traces, or consequences alone are insufficient.
The canonical active defect then blocks a clean result, so the duplicate cannot
create a false clean round.

A current-snapshot finding MUST NOT be dismissed as a harmless duplicate of a
CLOSED historical defect.

If substantially the same defect is observed after its canonical defect was
CLOSED:

1. treat the observation as evidence of regression or failed closure;
2. the Programmer MUST either reopen the canonical defect or accept a new
   regression defect with an explicit link to the historical DEFECT_ID;
3. record the current SNAPSHOT_ID, REVIEW_CONTEXT_ID, RUN_ID, and ROUND_ID;
4. reset the clean-round count to zero; and
5. require repair, defect-specific verification, and complete post-repair
   re-review.

A duplicate relationship never erases current evidence. The candidate remains
traceable to the canonical defect.

-------------------------------------------------------------------------------

## 23. Adjudication Challenge Pass

The Reviewer owns this challenge pass and MUST use a fresh model conversation
and fresh API request under the SAME applicable REVIEW_CONTEXT_ID. "Fresh" here
means independent conversation state; it does not authorize a changed review
policy or changed REVIEW_CONTEXT_ID. The challenge cannot directly convert a
dismissed candidate into a confirmed defect. Any mandatory reconsideration
condition defined below returns the candidate to the Programmer for final
adjudication.

Accuracy requires challenging every Programmer disposition that would remove a
candidate from independent defect consideration without accepting it.

After initial Programmer adjudication, provide each REJECTED_FALSE_POSITIVE,
OUT_OF_SCOPE_NOT_A_DEFECT, or DUPLICATE_OF_ACCEPTED_DEFECT candidate, including
the Programmer's rationale and cited evidence, to a fresh NVIDIA Nemotron 3 Ultra
adjudication-review request.

For a DUPLICATE disposition, provide the canonical accepted defect's sanitized
claim/evidence as well and ask whether the two findings truly share the same root
cause rather than merely a symptom, path, or consequence.

Ask NVIDIA NIM to answer in structured form with fields/values equivalent to:

- rationale fully resolves candidate;
- duplicate root-cause equivalence is valid, when applicable;
- duplicate root-cause equivalence is not established, when applicable;
- rationale is incomplete;
- new or contradictory evidence exists;
- reconsideration is recommended;
- additional source context and/or run-local evidence context is required;
- after any context followup, whether the resolved context materially changed
  the evidence.

The Reviewer MUST normalize the final context-resolved response so each of
those conditions can be tested deterministically by the workflow.

This challenge is advisory; it does not bypass Programmer adjudication.

The candidate MUST return to the Programmer for final adjudication when ANY of
the following is true:

- the challenge produces new or contradictory evidence;
- the challenge finds the Programmer rationale incomplete;
- the challenge requests reconsideration;
- a claimed duplicate's root-cause equivalence is not established; or
- additional context materially changes the evidence.

Gather all applicable local evidence before final Programmer adjudication.
Any model-bound follow-up evidence MUST use MODEL_TRANSPORT_VIEW for source
material and MODEL_SAFE_EVIDENCE_VIEW for run-local/adjudication evidence.

The review round cannot close while an adjudication challenge is unresolved.

-------------------------------------------------------------------------------

## 24. Final Programmer Adjudication

After any challenge, the Programmer makes the final technical adjudication. The Reviewer verifies that the decision is evidence-bearing and complete, but MUST NOT silently substitute a different adjudication. If evidence remains contradictory or insufficient, the candidate remains unresolved and the round cannot close.

Every candidate must end in exactly one terminal state:

ACCEPTED_DEFECT

REJECTED_FALSE_POSITIVE

DUPLICATE_OF_<ACTIVE_ACCEPTED_DEFECT_ID>

OUT_OF_SCOPE_NOT_A_DEFECT

There MUST be zero unresolved candidates before the defect list is finalized
for the round.

-------------------------------------------------------------------------------

## 25. Authoritative Defect List

The Reviewer is accountable for defect-ledger integrity, even if the harness performs the physical write automatically.

Only AFTER Programmer adjudication may a genuine defect enter the authoritative defect list. This applies to every finding origin, including NVIDIA NIM, Reviewer, CTO, Tester, build, runtime, sanitizer, or other approved evidence.

Recommended canonical file name:

DEFECTS.md

An implementation may additionally maintain machine-readable JSON/JSONL/CSV,
and DEFECTS.md MUST remain a durable human-readable confirmed-defect record.

### 25.1 Defect list invariant

EVERY candidate adjudicated as ACCEPTED_DEFECT MUST appear in DEFECTS.md.

NO candidate that has not been adjudicated as a genuine defect may be entered
as a confirmed defect.

Duplicates MUST reference the canonical defect rather than create fake
defect inflation.

### 25.2 Required defect fields

Each confirmed defect MUST contain, or explicitly mark not applicable for:

- DEFECT_ID;
- status;
- first-seen timestamp;
- first-accepted RUN_ID;
- first-accepted ROUND_ID when applicable;
- first-accepted SNAPSHOT_ID;
- first-accepted REVIEW_CONTEXT_ID;
- candidate source IDs;
- source REVIEW_PACKET_ID values when applicable;
- severity;
- category;
- title;
- affected path(s);
- affected line/symbol;
- defect description;
- triggering condition;
- impact;
- root cause;
- originating evidence summary, including NVIDIA NIM evidence when applicable;
- Programmer adjudication;
- Programmer adjudication evidence;
- required repair;
- required verification;
- repair snapshot/commit when fixed;
- repair REVIEW_CONTEXT_ID when applicable;
- verification snapshot ID;
- verification REVIEW_CONTEXT_ID;
- verification evidence;
- closure status;
- closure timestamp.

### 25.3 Status lifecycle

The required lifecycle is logically equivalent to:

OPEN
  ->
IN_REPAIR
  ->
FIXED_PENDING_VERIFICATION
  ->
VERIFIED_FIXED_PENDING_FULL_REVIEW
  ->
CLOSED

`VERIFIED_FIXED_PENDING_FULL_REVIEW` means the Tester has verified the specific
repair, but the complete post-repair repository review required by this workflow
has not yet produced a clean round that includes the repaired state.

A defect MUST NOT disappear from the list after repair.

A defect MUST NOT become CLOSED solely from defect-specific testing. The
Reviewer may close a VERIFIED_FIXED_PENDING_FULL_REVIEW defect only after a
complete clean review round covers a snapshot containing that verified repair
and confirms that the repair remains present without an accepted regression.

CLOSED is not immutable history. If the same root defect is observed again in a
later/current candidate state, the Reviewer MUST preserve the prior closure
record and the Programmer MUST adjudicate the recurrence. An accepted recurrence
reopens the canonical defect to OPEN (or creates a separately linked accepted
regression defect when technically more accurate), records the new provenance,
and resets clean evidence.

Update status and retain the complete history of open, repair, verification,
closure, and any reopening.

### 25.4 Harness-state placement

During an active clean-round sequence, harness control artifacts MUST live
outside the target project tree and outside the immutable review snapshot. This
includes:

- DEFECTS.md;
- ADJUDICATIONS.md;
- normalized candidate queues;
- raw-observation and raw-model-response staging;
- LOCAL_EVIDENCE_REGISTRY;
- temporary/materialized MODEL_SAFE_EVIDENCE_VIEW artifacts;
- MODEL_TRANSPORT_VIEW staging/materializations;
- API_CONTRACT.md/equivalent;
- MODEL_ACCESS_PROBE.md/equivalent;
- API metadata logs;
- documentation snapshots;
- temporary chunks;
- retry/checkpoint state.

This prevents the act of reviewing from mutating the target being certified.

If project policy requires a copy of DEFECTS.md or another review artifact to
be stored in the repository, publish that copy only at an explicit boundary,
then capture a new snapshot if that repository state itself must be certified.
Do not allow harness-generated evidence to silently alter a snapshot between
clean rounds.

### 25.5 Non-accepted terminal-adjudication record

Candidates finally adjudicated as REJECTED_FALSE_POSITIVE,
OUT_OF_SCOPE_NOT_A_DEFECT, or DUPLICATE_OF_<ACTIVE_ACCEPTED_DEFECT_ID> MUST NOT
pollute DEFECTS.md as independent confirmed defects, but their dispositions MUST
remain durably auditable.

Maintain a separate durable adjudication record such as:

ADJUDICATIONS.md

or a machine-readable equivalent.

For every non-accepted terminal disposition, preserve the candidate provenance,
Programmer rationale/evidence, required Reviewer challenge evidence, final
Programmer adjudication when reconsideration occurred, and canonical DEFECT_ID
when the disposition is a duplicate.

This record prevents:

- silent disappearance;
- repeated rediscovery without context;
- loss of rejection/out-of-scope/duplicate rationale;
- unreviewable Programmer dismissals; and
- a non-accepted disposition from becoming a hidden escape path around
  DEFECTS.md.

-------------------------------------------------------------------------------

## 26. Repair and Verification Loop

If one or more OPEN accepted defects exist:

1. The Reviewer confirms every accepted finding has a canonical DEFECT_ID and
   complete Programmer adjudication.
2. The CEO/CTO classify repair ownership without changing the Programmer's
   adjudication authority:
   - target-project source/test/build/configuration defects are repaired by the
     Programmer;
   - review-harness/API-contract/chunking/prompt defects are repaired by the CTO.
3. The responsible repair owner repairs every accepted defect selected for the
   next candidate state.
4. The Programmer adds or corrects target-project tests when required by
   target-project defect evidence; the CTO changes harness fixtures/tests when a
   harness defect requires it.
5. The responsible repair owner records changed files and intended verification,
   and the Reviewer advances an implemented repair only to
   FIXED_PENDING_VERIFICATION before Tester verification.
6. The CTO freezes the repaired target state into a NEW immutable candidate
   snapshot BEFORE Tester repair verification that may generate new findings.
7. The CTO also freezes the exact behavior-affecting review/harness identity
   used for repair verification into a candidate REVIEW_CONTEXT_ID. If the
   harness, prompt, API contract, documentation contract, or material review
   policy changed, that new identity MUST be reflected here and all prior clean
   evidence remains invalid.
8. The Tester executes each defect-specific verification and appropriate
   regression tests against a disposable execution copy of that exact candidate
   snapshot under the safe execution policy.
9. For each pre-existing defect whose required defect-specific verification
   passes, the Reviewer records the evidence and advances it only to
   VERIFIED_FIXED_PENDING_FULL_REVIEW. It is not yet CLOSED.
10. A pre-existing defect whose repair verification fails remains OPEN/IN_REPAIR
    and returns to its responsible repair owner. A failed repair MUST NOT be
    disguised as a new defect solely to make the original defect appear fixed.
11. Any genuinely new Tester/Reviewer/CTO possible defect enters the candidate
    queue and MUST be Programmer-adjudicated against the exact immutable
    candidate snapshot and candidate REVIEW_CONTEXT_ID before it can become a
    confirmed defect.
12. If a new candidate is accepted, record it in DEFECTS.md, apply the correct
    repair ownership, and include it in the next repair cycle.
13. Repeat repair, freeze, verification, and adjudication until:
    - no accepted defect remains OPEN/IN_REPAIR for the candidate state; and
    - every repaired defect is at least VERIFIED_FIXED_PENDING_FULL_REVIEW.
14. The Reviewer verifies that no accepted defect was merely hidden by test
    weakening, suppression, changed expectations, or harness-policy weakening.
15. After the candidate state is ready for full review, the CTO recomputes the
    complete SNAPSHOT_ID, REVIEW_CONTEXT_ID, inventory, exclusions, chunks, and
    coverage.
16. Consecutive clean review count resets to zero.
17. Restart the COMPLETE review workflow against that repaired snapshot and
    review context.

Do not review only the changed lines.

A repair can create defects elsewhere. A test repair is code and receives the
same full re-review treatment as a production-code repair.

A defect-specific verification pass is necessary but insufficient for closure.
The first subsequent complete clean review round over the repaired state is the
earliest point at which the Reviewer may move corresponding
VERIFIED_FIXED_PENDING_FULL_REVIEW entries to CLOSED.

If the Tester cannot verify an accepted repair, the defect remains OPEN,
IN_REPAIR, or FIXED_PENDING_VERIFICATION; it MUST NOT be closed merely because
the repair owner says it is fixed.

-------------------------------------------------------------------------------

## 27. Tester Dynamic Verification and Harness Conformance Gate

The Tester MUST independently verify both the target project and the review
harness behavior required for trustworthy certification.

### 27.1 Target-project dynamic verification

When safe and supported by the project environment, the Tester MUST create or
use a disposable execution copy derived from the exact review snapshot, verify
its identity before execution, and then:

- build the target using the documented clean build path;
- execute the documented automated tests;
- execute relevant integration/end-to-end tests;
- verify defect-specific reproduction and repair where applicable;
- record exact or equivalently reproducible invocation metadata and exit status;
- preserve failure evidence;
- ensure test outputs are generated outside the immutable review snapshot or in
  a disposable execution copy so verification does not mutate certified bytes;
- execute project processes with a sanitized child environment that excludes
  NVIDIA_API_KEY_CODING and all harness-only secrets.

A dynamic failure is a candidate finding, not an automatic confirmed defect.
It enters Programmer adjudication.

### 27.2 Review-harness failure-mode verification

Before the harness can support final certification, the Tester MUST exercise
controlled fixtures or fault injection proving, at minimum, that the harness:

1. fails closed when NVIDIA_API_KEY_CODING is missing or empty;
2. does not expose the API key in logs or prompts;
3. performs a real startup inference probe against the exact configured hosted
   Nemotron 3 Ultra model and refuses to treat `GET /v1/models` alone as proof of
   inference access;
4. fails closed before inference if current official documentation no longer
   classifies that hosted route as a Free Endpoint, rather than silently using
   paid entitlement;
5. hard-stops when the exact model remains inaccessible after bounded retries;
6. treats HTTP 404 from the exact hosted chat-completions request as
   conditionally retryable with bounded exponential backoff and then fails
   closed after retry exhaustion;
7. treats HTTP 401/403 as non-retryable by default and does not evade them by
   silently changing credentials, model, provider, or endpoint;
8. proves the retry path never silently falls back to another model, provider,
   endpoint class, paid route, or credential source;
9. fails closed when mandatory official documentation cannot be retrieved;
10. fails closed on unresolved material documentation conflicts;
11. detects empty usable final model content;
12. detects malformed structured output;
13. detects truncated/length-exhausted output;
14. handles retryable errors with bounded retry and eventually fails closed on
    retry exhaustion;
15. detects at least one intentionally uncovered reviewable line;
16. detects snapshot mutation or identity mismatch;
17. prevents reuse of stale cached results whose snapshot, prompt, model,
    reconciled API-contract, relevant official-documentation, selected-transport,
    or policy identity no longer matches;
18. preserves candidate provenance through deduplication;
19. prevents unadjudicated candidates from entering DEFECTS.md;
20. prevents unresolved candidates from producing a clean round;
21. resets the clean counter after an accepted defect and repair;
22. refuses to count reused first-round model responses as the independent
    second clean round;
23. redacts seeded secret-like values before model submission while preserving
    enough location metadata for adjudication;
24. proves that source/snapshot content in chunks, context followups, and
    cross-file/test-quality packets cannot bypass MODEL_TRANSPORT_VIEW, and that
    run-local/adjudication/defect-history evidence cannot bypass
    MODEL_SAFE_EVIDENCE_VIEW;
25. proves that target-project build/test subprocesses do not inherit
    NVIDIA_API_KEY_CODING or harness-only secrets;
26. includes test scripts in direct review coverage;
27. rejects a model response whose RUN_ID, applicable ROUND_ID,
    REVIEW_PACKET_ID, SNAPSHOT_ID, REVIEW_CONTEXT_ID, or required CHUNK_ID does
    not match the submitted logical packet;
28. prevents a raw Tester/CTO/Reviewer/build/model observation from entering
    CANDIDATE_FINDING_QUEUE until atomic ingress sanitization and mandatory
    provenance assignment have completed;
29. prevents a current recurrence of a CLOSED historical defect from being
    dismissed as a harmless duplicate and proves that an accepted recurrence
    reopens or creates a linked regression defect and resets clean evidence;
30. rejects a missing/mismatched LOCAL_EVIDENCE_REGISTRY reference, proves that
    adjudication-challenge followup can retrieve matching run-local evidence
    only through MODEL_SAFE_EVIDENCE_VIEW without exposing the raw registry, and
    proves that durable DEFECTS/ADJUDICATIONS/history evidence is first imported
    into LOCAL_EVIDENCE_REGISTRY before model-safe transmission;
31. on checkpoint resume, preserves the original RUN_ID and active ROUND_ID,
    rejects cached packet reuse when REVIEW_PACKET_ID or required provenance does
    not match, re-fetches/reconciles current official documentation, reruns the
    mandatory exact-model access probe, and invalidates incompatible cached
    evidence and any affected clean-round count after a material API-contract or
    documentation change.

The Tester MUST record fixture identities and expected/actual results.

A possible review-harness failure is a candidate finding and MUST enter the same
candidate pipeline as every other possible defect. The Programmer MUST adjudicate
it before it may be confirmed. If accepted, it MUST be recorded in DEFECTS.md
with a harness-defect category and complete provenance.

For an accepted harness defect, technical repair ownership belongs to the CTO,
not the Programmer, because the CTO owns the review architecture and harness
contract. The Programmer remains the required defect adjudicator; this repair
ownership exception does not bypass Programmer adjudication or defect logging.

After a harness repair:

1. the CTO records the changed harness/prompt/policy identity;
2. the Tester reruns the affected failure-mode suite;
3. any new Tester, Reviewer, or CTO finding enters the candidate pipeline;
4. the Reviewer audits the repair and evidence;
5. after required defect-specific verification succeeds, the accepted harness
   defect may advance only to VERIFIED_FIXED_PENDING_FULL_REVIEW and may become
   CLOSED only after the complete post-repair clean-round rule in Sections 25.3,
   26, and 29 is satisfied; and
6. every clean-round sequence whose evidence depends on the defective or changed
   harness MUST be discarded and restarted from zero.

### 27.3 Final Tester gate

After two complete static clean rounds on the same unchanged snapshot and the
same unchanged REVIEW_CONTEXT_ID, the Tester MUST perform final
regression/build verification against a disposable
execution copy of that exact snapshot when safe execution is supported.

If this final verification reveals a new possible defect:

- do not certify;
- route the finding to Programmer adjudication;
- if accepted, reset the clean counter to zero after repair and restart;
- if the candidate is rejected, classified out-of-scope, or classified as a
  duplicate, complete the required Reviewer adjudication challenge and any
  resulting final Programmer adjudication before resuming final certification.

-------------------------------------------------------------------------------

## 28. Complete Review Round

A complete review round is valid only if ALL of the following are true:

- the CEO review charter identifies the current scope;
- the CTO resolved and recorded the current API contract;
- the Tester completed baseline execution or documented why safe execution was
  unavailable;
- the Tester completed the required fresh-copy round regression for THIS round,
  or documented why safe execution was unavailable; any limitation is recorded
  as a limitation rather than a pass;

- latest official NVIDIA NIM/Nemotron documentation was read and reconciled;
- NVIDIA_API_KEY_CODING was present only through environment handling;
- current official NVIDIA documentation still classified the configured hosted
  Nemotron 3 Ultra route as a Free Endpoint;
- the mandatory startup live inference probe succeeded for the exact configured
  hosted Nemotron 3 Ultra model using that credential;
- MODEL_ACCESS_PROBE.md or equivalent sanitized evidence exists for this RUN_ID;
- no fallback model/provider/endpoint was used to satisfy the startup probe;
- one stable SNAPSHOT_ID was used;
- one stable REVIEW_CONTEXT_ID was used;
- file inventory completed;
- all exclusions were recorded;
- all reviewable text lines had chunk coverage;
- every test file and test script had direct review coverage;
- every chunk request completed successfully;
- every requested context followup completed or was explicitly resolved;
- all required global cross-file passes completed;
- test-quality review completed;
- all candidates were deduplicated;
- every candidate received Programmer adjudication;
- required adjudication challenge pass completed for every rejection,
  out-of-scope disposition, and duplicate classification;
- every challenged candidate meeting ANY mandatory final-adjudication trigger
  in Section 23 received final Programmer adjudication;
- every accepted defect was written to DEFECTS.md only after Programmer
  adjudication;
- every non-accepted terminal disposition was durably written to ADJUDICATIONS.md
  or its approved equivalent with its required challenge/adjudication evidence;
- zero candidates remain unresolved;
- the Reviewer certifies round completeness;
- the CTO certifies snapshot/coverage integrity;
- the Tester has no unresolved dynamic candidate for the snapshot;
- baseline and round-regression evidence are bound to this RUN_ID, ROUND_ID,
  SNAPSHOT_ID, and REVIEW_CONTEXT_ID;
- the SNAPSHOT_ID remained unchanged throughout the round;
- the REVIEW_CONTEXT_ID remained unchanged throughout the round;
- required harness failure-mode verification for the current harness/review
  context passed, and no unresolved harness candidate remains.

If any item is false, the round is INCOMPLETE.

An incomplete round cannot count as clean.

-------------------------------------------------------------------------------

## 29. Clean-Round Definition

A complete review round qualifies for CLEAN closure only when:

1. it satisfies every Complete Review Round condition; and
2. after final Programmer adjudication, it contains ZERO accepted defects.

When those two conditions are true, but before recording the round as CLEAN,
the Reviewer MUST:

1. identify every VERIFIED_FIXED_PENDING_FULL_REVIEW defect whose verified
   repair is present in this exact SNAPSHOT_ID;
2. verify that this round found no accepted regression invalidating that repair;
3. record the clean-round closure evidence in DEFECTS.md; and
4. move only those qualifying defects to CLOSED.

After that closure action, the Reviewer MUST verify that no accepted defect
associated with the candidate delivery state remains OPEN, IN_REPAIR,
FIXED_PENDING_VERIFICATION, or VERIFIED_FIXED_PENDING_FULL_REVIEW.

Only then may the round be recorded as CLEAN.

A technically justified REJECTED_FALSE_POSITIVE or OUT_OF_SCOPE_NOT_A_DEFECT
disposition does not make a round defective when its adjudication and challenge
are complete.

A valid duplicate disposition does not create a second independent defect, but
its active canonical accepted defect still blocks CLEAN until that canonical
defect is repaired, verified, and closed under this workflow.

An unresolved candidate or an unclosed accepted defect prevents a clean result.

-------------------------------------------------------------------------------

## 30. Two-Consecutive-Clean-Round Gate

The harness MUST NOT declare success after one clean round.

SUCCESS requires TWO consecutive complete CLEAN rounds against the same
unchanged review snapshot and the same unchanged REVIEW_CONTEXT_ID.

### 30.1 Round independence

The second clean round MUST be a fresh review, not a replay of cached model
responses.

Use:

- new model conversations;
- fresh API requests;
- complete chunk coverage again;
- complete global passes again;
- complete test-quality review again;
- complete adjudication again for any new candidates.

To reduce correlated misses, vary:

- chunk review order;
- global lens order;
- which related context is proactively paired.

Do not weaken prompts between rounds.

### 30.2 Reset rule

If ANY accepted defect is found in either round:

1. clean-round count becomes zero;
2. repair the defect;
3. create a new snapshot;
4. restart from the beginning.

If SNAPSHOT_ID changes for ANY reason between the two clean rounds, including a
change to source, tests, test scripts, build/configuration files, in-scope
documentation, behavior-bearing metadata, or other snapshot material,
clean-round count becomes zero.

If REVIEW_CONTEXT_ID changes between the two clean rounds for any
behavior-affecting review reason, clean-round count becomes zero.

### 30.3 Success condition

Only when:

CONSECUTIVE_CLEAN_ROUNDS == 2

may the workflow advance to final company certification. The harness or Reviewer
may report the subordinate status:

STATIC_REVIEW_STATUS: TWO_CONSECUTIVE_CLEAN_ROUNDS

Only the CEO, after final CTO, Programmer, Reviewer, and Tester certifications,
may report the project-level status:

REVIEW_STATUS: VERIFIED_CLEAN

This means no defects were found after Programmer adjudication in two
consecutive exhaustive review rounds.

It does not claim mathematical proof that no possible defect exists.

-------------------------------------------------------------------------------

## 31. Snapshot Stability Check

At the end of every round, re-hash the snapshot inventory.

Verify:

ENDING_SNAPSHOT_ID == STARTING_SNAPSHOT_ID

and:

ENDING_REVIEW_CONTEXT_ID == STARTING_REVIEW_CONTEXT_ID

If either equality fails:

- invalidate the round;
- do not use its clean result;
- capture/recompute the applicable stable snapshot and review context;
- reset the clean count as required;
- restart.

If the live working tree changed while the snapshot remained immutable, the
completed snapshot review remains historically valid, but it MUST NOT be used
to certify the newer working tree.

The final certified snapshot MUST correspond to the code intended for delivery,
and the final REVIEW_CONTEXT_ID MUST correspond to the exact review machinery
and API/documentation contract used to certify that snapshot.

-------------------------------------------------------------------------------

## 32. Review Coverage Matrix

Maintain a coverage table containing one row per reviewable file.

Suggested columns:

| Path | Hash | Type | Lines | Chunk IDs | Direct Review | Global Context | Test Review | Status |
|------|------|------|-------|-----------|---------------|----------------|-------------|--------|

Before a round can close, every reviewable file must show adequate direct
coverage.

For line-oriented text files, also verify line coverage programmatically.

-------------------------------------------------------------------------------

## 33. Harness Run Log

Maintain a run log separate from the defect list.

It MUST record:

- RUN_ID;
- every ROUND_ID and its start/end timestamps/status;
- overall run start/end timestamps;
- documentation retrieval facts;
- resolved API contract;
- model identifier;
- request interface;
- startup model-access probe timestamp/result;
- MODEL_ACCESS_PROBE evidence ID/path/hash;
- startup probe exact model/endpoint identity;
- official Free Endpoint classification result/evidence reference;
- startup probe HTTP/transport attempt count and retry classifications;
- whether any 404 retry occurred and its eventual result;
- confirmation that no fallback model/provider/endpoint was used;
- SNAPSHOT_ID;
- REVIEW_CONTEXT_ID;
- file count;
- reviewable line count;
- chunk count;
- exclusion count;
- API request counts;
- retry counts;
- invalid response counts;
- context followup counts;
- logical REVIEW_PACKET_ID count and packet-kind counts;
- MODEL_TRANSPORT_VIEW manifest/policy identity;
- LOCAL_EVIDENCE_REGISTRY manifest/identity or equivalent integrity evidence;
- MODEL_SAFE_EVIDENCE_VIEW policy identity and relevant generated-view evidence
  IDs/hashes;
- harness failure-mode suite evidence identifier and result;
- global pass completion;
- candidate count;
- accepted defect count;
- rejected count;
- out-of-scope count;
- duplicate count;
- unresolved count;
- clean-round count;
- final run status.

Never log:

- NVIDIA_API_KEY_CODING;
- authorization headers;
- actual secret values discovered in source.

-------------------------------------------------------------------------------

## 34. Checkpoint and Resume

The harness may support safe resume.

Every resumed process MUST first re-fetch and reconcile the current official
NVIDIA NIM/Nemotron documentation under Sections 4 and 5 AND rerun the mandatory
exact-model live access probe in Section 6.3 before issuing any new model-review
request. A checkpointed documentation record or prior successful access probe is
evidence of the earlier run state, not authority to skip either current check.

If the newly reconciled API contract, model semantics, selected transport,
thinking/structured-output requirements, or other review-affecting official
documentation materially differs from the checkpointed identity, the harness
MUST invalidate incompatible cached model results, reset any affected
consecutive-clean sequence to zero, and restart the affected review work under
the new contract.

Checkpoint only stable artifacts such as:

- RUN_ID and active ROUND_ID when a round is in progress;
- documentation record;
- snapshot manifest;
- file inventory;
- chunk manifest;
- logical REVIEW_PACKET_ID registry and packet kind;
- completed request result keyed by REVIEW_PACKET_ID plus content identities;
- candidate queue;
- LOCAL_EVIDENCE_REGISTRY manifest and immutable evidence references;
- adjudication state.

A process restart that RESUMES an existing engagement MUST preserve the same
RUN_ID. If it resumes a partially completed round, it MUST also preserve that
same ROUND_ID and the already allocated REVIEW_PACKET_ID values for completed
logical packets.

A new RUN_ID is a new review engagement. Results from another RUN_ID MUST NOT be
silently imported as completed review work merely because snapshot/content
hashes happen to match. Historical evidence may be referenced, but the new run
must perform its own required review unless this section explicitly defines a
cross-run reuse mode; this workflow defines no such mode.

A resumed run may reuse a completed chunk result only when ALL of these match:

- RUN_ID;
- active ROUND_ID;
- REVIEW_PACKET_ID;
- SNAPSHOT_ID;
- REVIEW_CONTEXT_ID;
- raw source-content hash;
- model-transport-content hash;
- current reconciled API-contract identity/hash;
- current official-documentation identity/hash set relevant to the selected API contract;
- selected transport/interface semantics;
- review prompt version;
- model identifier/version semantics;
- review policy version;
- relevant codebase-map hash.

For the mandatory second clean round, do NOT reuse model review responses from
the first clean round.

That round must be independent.

-------------------------------------------------------------------------------

## 35. Prompt Versioning

The review prompt itself is part of the harness behavior.

Compute a REVIEW_PROMPT_VERSION or hash.

Record it in every run.

If the prompt changes materially during a clean-round sequence:

- reset the consecutive-clean count;
- start a new review sequence.

Prompt improvements may reveal defects previously missed.

-------------------------------------------------------------------------------

## 36. Defect Severity Guidance

Severity is useful for prioritization but does not determine whether a real
defect is recorded.

Suggested meanings:

CRITICAL
- data loss, security compromise, unrecoverable corruption, catastrophic
  failure, or primary function fundamentally invalid.

HIGH
- major required behavior wrong, common crash, serious state corruption,
  severe security/reliability problem.

MEDIUM
- real incorrect behavior under plausible conditions, incomplete error
  handling, material portability/integration defect.

LOW
- genuine but limited defect, edge-case incorrectness, misleading behavior,
  or maintainability problem with concrete failure risk.

A LOW genuine defect is still a defect.

Do not omit it merely because it is not release-blocking under some other
project policy.

-------------------------------------------------------------------------------

## 37. Model Review System Instruction - Logical Template

The implementation MUST use an instruction behaviorally equivalent to:

"You are an independent senior software reviewer. Review the supplied code
for actual defects. Accuracy is more important than speed or token cost.
Inspect production code, tests, test scripts, build/configuration logic, error
paths, state transitions, resource ownership, portability, security, and
cross-file contracts. Do not assume tests are correct merely because they
exist. Do not report style preferences as defects without a concrete risk.
Ground every candidate finding in exact code evidence. If required context is
missing, request that context instead of guessing. Your findings are candidate
findings only; a programmer will adjudicate them. Return valid JSON matching
the supplied schema."

The exact wording may differ.

The behavioral requirements may not.

-------------------------------------------------------------------------------

## 38. Programmer Adjudication Instruction - Logical Template

The Programmer MUST receive an instruction behaviorally equivalent to:

"Adjudicate this candidate finding against the actual immutable review
snapshot and its locally preserved evidence. Inspect the cited code, relevant
callers/callees, tests, and applicable dynamic/build evidence. Do not choose any
terminal disposition based on the reviewer summary alone. If it is a real
defect, identify the actual root cause, affected code, severity, repair
direction, and verification requirement. If it is a false positive, provide
specific code evidence and explain why the alleged trigger cannot produce the
claimed failure. If it is genuinely out of scope, prove the precise scope
boundary and why no in-scope defect is being hidden. If it is a duplicate,
identify the active canonical accepted defect and prove root-cause equivalence,
not merely symptom similarity. If evidence is insufficient, request exactly
what is missing. Do not leave the candidate unresolved."

-------------------------------------------------------------------------------

## 39. Adjudication Challenge Instruction - Logical Template

Use a fresh NVIDIA NIM request equivalent to:

"Independently evaluate the Programmer's disposition of this candidate finding.
The disposition may be rejection, out-of-scope, or duplicate of an active
accepted defect. You are not deciding the final adjudication. Determine whether
the Programmer's technical rationale and cited evidence fully resolve the
candidate. For a duplicate disposition, determine whether the candidate and
canonical defect truly share the same root cause rather than merely a symptom
or affected location. Identify any contradiction, incomplete rationale, missing
case, invalid duplicate classification, additional context required, or reason
the Programmer should reconsider. After any requested context is supplied,
state whether that context materially changes the evidence. Return structured
JSON matching the required challenge schema. Do not repeat the original claim
without analyzing the Programmer's evidence."

-------------------------------------------------------------------------------

## 40. Global Review Instruction - Logical Template

Use a fresh NVIDIA NIM request equivalent to:

"Review the repository-level map and supplied targeted code as one system.
Look specifically for defects that local chunk review can miss: interface
contract mismatch, lifecycle/state errors, concurrency/order defects, resource
ownership, persistence inconsistency, error propagation, security boundaries,
portability, configuration/build mismatches, and tests that can pass despite
incorrect integrated behavior. Request exact source context when needed.
Return grounded candidate defects only."

-------------------------------------------------------------------------------

## 41. Recommended Artifact Layout

A language-neutral harness may produce the following OUTSIDE the target
project tree:

<HARNESS_STATE>/
  review/
    runs/
      <RUN_ID>/
        docs/
          api-contract.md
        snapshot/
          manifest.txt
          exclusions.txt
          codebase-map.md
          chunks.json
          coverage.csv
        candidates/
          all-candidates.jsonl
        evidence/
          local-evidence-registry/
        model/
          raw-responses/
        adjudication/
          adjudications.jsonl
        logs/
          run.log
          api-metadata.log
        summary/
          round-summary.md
  DEFECTS.md
  ADJUDICATIONS.md
  REVIEW_CHARTER.md
  API_CONTRACT.md
  MODEL_ACCESS_PROBE.md
  HARNESS_CONFORMANCE.md
  FINAL_TEST_REPORT.md
  CTO_CERTIFICATE.md
  PROGRAMMER_CERTIFICATE.md
  REVIEWER_CERTIFICATE.md
  TESTER_CERTIFICATE.md
  FINAL_REVIEW_CERTIFICATE.md

The exact filenames are optional except where a project chooses to make them
contractual.

The separation of:

- raw observations/model responses and local raw evidence;
- normalized provenance-complete candidates;
- adjudications;
- confirmed defects;

is mandatory in behavior.

Raw observations are staging evidence, not CANDIDATE_FINDING_QUEUE entries.

-------------------------------------------------------------------------------

## 42. Pseudocode

The complete tool-agnostic company algorithm is expressed below. The names are
logical operations, not functions required by a particular language.

BEGIN

  run_id <- CEO.establish_review_charter_and_allocate_RUN_ID()

  clean_count <- 0
  local_evidence_registry <- Reviewer.initialize_LOCAL_EVIDENCE_REGISTRY(run_id)

  WHILE true:

    docs <- CTO.fetch_latest_official_nvidia_nim_docs()
    api_contract <- CTO.reconcile_docs_or_fail(docs)
    CTO.assert_nemotron3_ultra_hosted_model_supported(api_contract)
    CTO.assert_free_hosted_endpoint_available(api_contract)

    require_environment("NVIDIA_API_KEY_CODING")
    api_key <- read_environment("NVIDIA_API_KEY_CODING")
    assert_nonempty(api_key)
    mark_secret(api_key)
    CTO.assert_environment_only_secret_handling()

    access_probe <- CTO.probe_exact_hosted_nemotron_model_with_retry(
        api_contract,
        api_key,
        model=api_contract.model_identifier,
        enable_thinking=true,
        force_nonempty_content=true,
        retry_policy=SECTION_14_POLICY
    )
    CTO.assert_model_access_probe_success_or_hard_stop(access_probe)
    access_probe_id <- CTO.allocate_MODEL_ACCESS_PROBE_ID(run_id, access_probe)
    CTO.persist_sanitized_MODEL_ACCESS_PROBE(
        access_probe_id,
        run_id,
        access_probe
    )

    live_root <- CEO.confirm_project_root()
    snapshot <- CTO.capture_stable_current_codebase(live_root)
    snapshot_id <- CTO.hash_behavior_complete_snapshot(snapshot)

    inventory <- CTO.enumerate_project_files(snapshot)
    CTO.classify_files(inventory)
    CTO.create_exclusion_ledger(inventory)

    reviewable <- CTO.select_all_reviewable_project_files(inventory)
    test_inventory <- Tester.discover_tests_and_test_scripts(reviewable)

    transport_view <- CTO.build_secret_redacted_model_transport_view(
        snapshot,
        reviewable
    )
    CTO.assert_transport_view_preserves_line_mapping_and_contains_no_known_secret(
        transport_view,
        snapshot
    )

    codebase_map <- CTO.build_codebase_map(
        reviewable,
        model_assistance_source=transport_view
    )
    model_codebase_map <- CTO.build_model_safe_codebase_map(
        codebase_map,
        transport_view
    )
    transport_manifest_hash <- CTO.hash_model_transport_manifest(transport_view)
    model_codebase_map_hash <- CTO.hash_model_safe_codebase_map(
        model_codebase_map
    )

    chunks <- CTO.semantic_chunk_all_reviewable_files(
        transport_view,
        source_inventory=reviewable
    )
    CTO.attach_related_tests_and_interfaces(
        chunks,
        model_codebase_map
    )
    CTO.assert_every_reviewable_line_is_covered(chunks)
    chunk_manifest_hash <- CTO.hash_base_chunk_manifest_and_coverage_plan(chunks)

    harness_version <- CTO.current_harness_policy_and_prompt_identity()
    review_context_id <- CTO.compute_review_context_id(
        api_contract,
        docs,
        harness_version,
        transport_manifest_hash,
        chunk_manifest_hash,
        model_codebase_map_hash
    )
    CTO.assert_review_context_complete(review_context_id)
    CTO.attach_review_context_id_to_chunks(chunks, review_context_id)

    project_exec_env <- Tester.build_sanitized_project_execution_environment()
    Tester.assert_environment_excludes(
        project_exec_env,
        "NVIDIA_API_KEY_CODING",
        harness_only_secrets
    )

    harness_suite <- Tester.run_harness_failure_mode_suite(
        harness_version,
        review_context_id
    )
    Tester.record_harness_failure_mode_evidence(harness_suite)
    Reviewer.register_local_evidence(
        local_evidence_registry,
        harness_suite.evidence_id,
        harness_suite.evidence,
        run_id,
        null,
        snapshot_id,
        review_context_id
    )

    harness_candidates <- Reviewer.normalize_candidate_ingress(
        harness_suite.candidate_findings,
        origin="TESTER_DYNAMIC",
        run_id=run_id,
        round_id=null,
        snapshot_id=snapshot_id,
        review_context_id=review_context_id,
        evidence_run_id=harness_suite.evidence_id
    )

    IF harness_candidates is not empty:

      harness_model_evidence <- CTO.build_MODEL_SAFE_EVIDENCE_VIEW(
          harness_suite.evidence,
          snapshot_id,
          review_context_id
      )

      harness_local_evidence <- assemble_local_adjudication_evidence_bundle(
          snapshot,
          harness_candidates,
          local_evidence_registry
      )

      harness_adjudications <- PROGRAMMER_ADJUDICATE_AND_CHALLENGE_ALL(
          harness_candidates,
          harness_local_evidence,
          harness_model_evidence,
          run_id,
          null,
          snapshot_id,
          review_context_id,
          api_contract,
          api_key
      )

      Reviewer.assert_zero_unresolved_candidates(harness_adjudications)

      FOR each harness_adjudication IN harness_adjudications:
        IF harness_adjudication == ACCEPTED_DEFECT:
          Reviewer.append_or_merge_into_DEFECTS_after_programmer_adjudication(
              harness_adjudication,
              snapshot_id,
              review_context_id
          )

      Reviewer.persist_all_nonaccepted_terminal_adjudications(
          harness_adjudications,
          ADJUDICATIONS
      )

      IF any_ACCEPTED_DEFECT(harness_adjudications):
        clean_count <- 0
        REPAIR_AND_VERIFY_ACCEPTED_DEFECTS_UNTIL_STABLE(
            all_ACCEPTED_DEFECT(harness_adjudications),
            live_root,
            run_id,
            local_evidence_registry,
            api_contract,
            review_context_id,
            api_key
        )
        continue outer WHILE

    Tester.certify_harness_failure_mode_suite_passed(
        harness_version,
        review_context_id
    )

    # The same immutable snapshot may attempt two independent clean rounds.
    # Any accepted defect or behavior-affecting harness change exits this inner
    # loop and restarts the outer loop with clean_count reset to zero.

    clean_count <- 0
    restart_outer_loop <- false

    WHILE clean_count < 2:

      round_id <- Reviewer.allocate_fresh_ROUND_ID(
          run_id,
          snapshot_id,
          review_context_id,
          clean_count
      )

      CTO.assert_snapshot_unchanged(snapshot_id)
      CTO.assert_harness_identity_unchanged(harness_version)
      CTO.assert_review_context_unchanged(review_context_id)

      candidate_queue <- empty

      execution_copy <- Tester.create_disposable_execution_copy(snapshot)
      Tester.assert_execution_copy_matches_snapshot(execution_copy, snapshot_id)
      baseline_result <- Tester.run_baseline_if_safe(
          execution_copy,
          test_inventory,
          project_exec_env
      )
      Reviewer.register_local_evidence(
          local_evidence_registry,
          baseline_result.evidence_id,
          baseline_result.evidence,
          run_id,
          round_id,
          snapshot_id,
          review_context_id
      )
      Reviewer.append_normalized_candidate_ingress(
          candidate_queue,
          baseline_result.candidate_findings,
          origin="TESTER_DYNAMIC",
          run_id=run_id,
          round_id=round_id,
          snapshot_id=snapshot_id,
          review_context_id=review_context_id,
          evidence_run_id=baseline_result.evidence_id
      )

      review_order <- Reviewer.choose_round_specific_order(
          chunks,
          clean_count
      )

      FOR each chunk IN review_order:

        review_packet_id <- Reviewer.new_review_packet_id(
            run_id,
            round_id,
            "CHUNK",
            chunk.CHUNK_ID,
            snapshot_id,
            review_context_id
        )

        response <- Reviewer.call_nemotron3_ultra_with_retry(
            api_contract,
            api_key,
            chunk_review_prompt(
                chunk,
                model_codebase_map,
                run_id,
                round_id,
                snapshot_id,
                review_context_id,
                review_packet_id
            )
        )

        Reviewer.validate_response_or_fail(response)

        WHILE response.requests_more_context:
          context <- CTO.fetch_requested_context_for_model(
              transport_view,
              response.context_requests,
              snapshot_id,
              review_context_id
          )
          response <- Reviewer.continue_review_with_context_or_fail(
              api_contract,
              api_key,
              response,
              context
          )
          Reviewer.validate_response_or_fail(response)

        Reviewer.append_normalized_candidate_ingress(
            candidate_queue,
            response.findings,
            origin="NVIDIA_NIM_CHUNK_REVIEW",
            run_id=run_id,
            round_id=round_id,
            snapshot_id=snapshot_id,
            review_context_id=review_context_id,
            review_packet_id=review_packet_id,
            chunk_id=chunk.CHUNK_ID
        )
        Reviewer.mark_chunk_covered(chunk)

      Reviewer.assert_all_chunks_completed()
      Reviewer.assert_all_tests_and_test_scripts_directly_reviewed()

      FOR each required_global_lens:
        global_packet_id <- Reviewer.new_review_packet_id(
            run_id,
            round_id,
            "GLOBAL",
            lens,
            snapshot_id,
            review_context_id
        )
        response <- Reviewer.perform_global_nemotron3_ultra_review(
            lens,
            model_codebase_map,
            targeted_model_transport_context(
                transport_view,
                lens
            ),
            run_id,
            round_id,
            snapshot_id,
            review_context_id,
            global_packet_id
        )
        Reviewer.validate_response_or_fail(response)
        response <- Reviewer.resolve_context_requests_or_fail(
            response,
            transport_view,
            snapshot_id,
            review_context_id,
            global_packet_id
        )
        Reviewer.validate_response_or_fail(response)
        Reviewer.append_normalized_candidate_ingress(
            candidate_queue,
            response.findings,
            origin="NVIDIA_NIM_GLOBAL_REVIEW",
            run_id=run_id,
            round_id=round_id,
            snapshot_id=snapshot_id,
            review_context_id=review_context_id,
            review_packet_id=global_packet_id
        )

      test_quality_packet_id <- Reviewer.new_review_packet_id(
          run_id,
          round_id,
          "TEST_QUALITY",
          snapshot_id,
          review_context_id
      )
      response <- Reviewer.perform_test_quality_review(
          model_codebase_map,
          test_inventory,
          relevant_model_transport_context(transport_view),
          run_id,
          round_id,
          snapshot_id,
          review_context_id,
          test_quality_packet_id
      )
      Reviewer.validate_response_or_fail(response)
      response <- Reviewer.resolve_context_requests_or_fail(
          response,
          transport_view,
          snapshot_id,
          review_context_id,
          test_quality_packet_id
      )
      Reviewer.validate_response_or_fail(response)
      Reviewer.append_normalized_candidate_ingress(
          candidate_queue,
          response.findings,
          origin="NVIDIA_NIM_TEST_QUALITY_REVIEW",
          run_id=run_id,
          round_id=round_id,
          snapshot_id=snapshot_id,
          review_context_id=review_context_id,
          review_packet_id=test_quality_packet_id
      )

      # Use a fresh execution copy for the independent round-regression phase.
      # Baseline execution is permitted to create build products, temporary
      # files, caches, databases, or other state; none of that state may leak
      # into this later Tester phase.
      round_execution_copy <- Tester.create_disposable_execution_copy(snapshot)
      Tester.assert_execution_copy_matches_snapshot(
          round_execution_copy,
          snapshot_id
      )
      round_test <- Tester.run_round_regression_if_safe(
          round_execution_copy,
          project_exec_env
      )
      Reviewer.register_local_evidence(
          local_evidence_registry,
          round_test.evidence_id,
          round_test.evidence,
          run_id,
          round_id,
          snapshot_id,
          review_context_id
      )
      Reviewer.append_normalized_candidate_ingress(
          candidate_queue,
          round_test.candidate_findings,
          origin="TESTER_DYNAMIC",
          run_id=run_id,
          round_id=round_id,
          snapshot_id=snapshot_id,
          review_context_id=review_context_id,
          evidence_run_id=round_test.evidence_id
      )

      Reviewer.assert_candidate_queue_provenance_complete(candidate_queue)

      candidates <- Reviewer.deduplicate_candidates_preserving_provenance(
          candidate_queue
      )

      local_adjudication_evidence <- assemble_local_adjudication_evidence_bundle(
          snapshot,
          candidates,
          local_evidence_registry
      )

      adjudications <- PROGRAMMER_ADJUDICATE_AND_CHALLENGE_ALL(
          candidates,
          local_adjudication_evidence,
          transport_view,
          run_id,
          round_id,
          snapshot_id,
          review_context_id,
          api_contract,
          api_key
      )

      Reviewer.assert_zero_unresolved_candidates(adjudications)

      accepted <- all_ACCEPTED_DEFECT(adjudications)

      FOR each accepted_defect IN accepted:
        Reviewer.append_or_merge_into_DEFECTS_after_programmer_adjudication(
            accepted_defect,
            adjudication_for(accepted_defect),
            snapshot_id,
            review_context_id
        )

      Reviewer.persist_all_nonaccepted_terminal_adjudications(
          adjudications,
          ADJUDICATIONS
      )
      CTO.assert_snapshot_unchanged(snapshot_id)
      CTO.assert_harness_identity_unchanged(harness_version)
      CTO.assert_review_context_unchanged(review_context_id)

      IF accepted is not empty:

        clean_count <- 0

        REPAIR_AND_VERIFY_ACCEPTED_DEFECTS_UNTIL_STABLE(
            accepted,
            live_root,
            run_id,
            local_evidence_registry,
            api_contract,
            review_context_id,
            api_key
        )

        restart_outer_loop <- true
        BREAK inner WHILE

      ELSE:

        Reviewer.certify_complete_round(
            run_id,
            round_id,
            snapshot_id,
            review_context_id
        )
        Reviewer.close_verified_repairs_covered_by_clean_round(
            run_id,
            round_id,
            snapshot_id,
            review_context_id
        )
        Reviewer.assert_no_unclosed_accepted_defect_for_snapshot(snapshot_id)
        CTO.certify_round_snapshot_and_coverage(
            run_id,
            round_id,
            snapshot_id,
            review_context_id
        )
        Tester.certify_no_unresolved_dynamic_candidate(
            run_id,
            round_id,
            snapshot_id,
            review_context_id
        )
        clean_count <- clean_count + 1

        IF clean_count < 2:
          Reviewer.discard_conversation_state_for_next_clean_round()
          Reviewer.require_fresh_api_requests_next_round()
          continue inner WHILE

    IF restart_outer_loop:
      continue outer WHILE

    Reviewer.assert_two_consecutive_complete_clean_rounds()
    CTO.assert_same_unchanged_snapshot_for_both_clean_rounds(snapshot_id)
    CTO.assert_same_unchanged_review_context_for_both_clean_rounds(
        review_context_id
    )
    CTO.assert_harness_identity_unchanged(harness_version)
    CTO.assert_review_context_unchanged(review_context_id)

    # Re-read current official NVIDIA documentation before final certification.
    # If the relevant API/model/free-endpoint contract changed during a long run,
    # the clean evidence was produced under a stale REVIEW_CONTEXT_ID.
    final_docs <- CTO.fetch_latest_official_nvidia_nim_docs()
    final_api_contract <- CTO.reconcile_docs_or_fail(final_docs)
    CTO.assert_nemotron3_ultra_hosted_model_supported(final_api_contract)
    CTO.assert_free_hosted_endpoint_available(final_api_contract)

    final_documentation_context_id <- CTO.recompute_review_context_id_with_docs(
        final_api_contract,
        final_docs,
        harness_version,
        transport_manifest_hash,
        chunk_manifest_hash,
        model_codebase_map_hash
    )

    IF final_documentation_context_id != review_context_id:
      clean_count <- 0
      continue outer WHILE

    final_execution_copy <- Tester.create_disposable_execution_copy(snapshot)
    Tester.assert_execution_copy_matches_snapshot(
        final_execution_copy,
        snapshot_id
    )
    final_test <- Tester.final_regression_if_safe(
        final_execution_copy,
        project_exec_env
    )
    Reviewer.register_local_evidence(
        local_evidence_registry,
        final_test.evidence_id,
        final_test.evidence,
        run_id,
        null,
        snapshot_id,
        review_context_id
    )

    IF final_test.candidate_findings is not empty:

      final_candidate_queue <- empty
      Reviewer.append_normalized_candidate_ingress(
          final_candidate_queue,
          final_test.candidate_findings,
          origin="TESTER_DYNAMIC",
          run_id=run_id,
          round_id=null,
          snapshot_id=snapshot_id,
          review_context_id=review_context_id,
          evidence_run_id=final_test.evidence_id
      )
      Reviewer.assert_candidate_queue_provenance_complete(final_candidate_queue)

      final_local_evidence <- assemble_local_adjudication_evidence_bundle(
          snapshot,
          final_candidate_queue,
          local_evidence_registry
      )

      final_adjudications <- PROGRAMMER_ADJUDICATE_AND_CHALLENGE_ALL(
          final_candidate_queue,
          final_local_evidence,
          transport_view,
          run_id,
          null,
          snapshot_id,
          review_context_id,
          final_api_contract,
          api_key
      )
      Reviewer.assert_zero_unresolved_candidates(final_adjudications)

      FOR each final_adjudication IN final_adjudications:
        IF final_adjudication == ACCEPTED_DEFECT:
          Reviewer.append_or_merge_into_DEFECTS_after_programmer_adjudication(
              final_adjudication,
              snapshot_id,
              review_context_id
          )

      Reviewer.persist_all_nonaccepted_terminal_adjudications(
          final_adjudications,
          ADJUDICATIONS
      )

      IF any_ACCEPTED_DEFECT(final_adjudications):
        clean_count <- 0
        REPAIR_AND_VERIFY_ACCEPTED_DEFECTS_UNTIL_STABLE(
            all_ACCEPTED_DEFECT(final_adjudications),
            live_root,
            run_id,
            local_evidence_registry,
            api_contract,
            review_context_id,
            api_key
        )
        continue outer WHILE

      # All final-test candidates reached valid non-accepted terminal states;
      # their adjudications/challenges were durably recorded, and code/harness
      # are unchanged, so final certification may continue.

    # Final API/documentation freshness check after Tester work and any
    # adjudication challenges. Do not certify against a contract that changed
    # during a long final-regression/adjudication phase.
    certification_docs <- CTO.fetch_latest_official_nvidia_nim_docs()
    certification_api_contract <- CTO.reconcile_docs_or_fail(certification_docs)
    CTO.assert_nemotron3_ultra_hosted_model_supported(certification_api_contract)
    CTO.assert_free_hosted_endpoint_available(certification_api_contract)

    certification_review_context_id <- CTO.recompute_review_context_id_with_docs(
        certification_api_contract,
        certification_docs,
        harness_version,
        transport_manifest_hash,
        chunk_manifest_hash,
        model_codebase_map_hash
    )

    IF certification_review_context_id != review_context_id:
      clean_count <- 0
      continue outer WHILE

    CTO.final_certification(run_id, snapshot_id, review_context_id)
    Programmer.final_certification(run_id, snapshot_id, review_context_id)
    Reviewer.final_certification(run_id, snapshot_id, review_context_id)
    Tester.final_certification(run_id, snapshot_id, review_context_id)

    CEO.final_evidence_review(run_id, snapshot_id, review_context_id)
    CEO.assert_all_subordinate_certificates_valid_and_consistent(
        run_id,
        snapshot_id,
        review_context_id
    )

    delivery_freeze <- CTO.acquire_final_delivery_freeze_or_equivalent(
        live_root,
        review_context_id
    )

    final_live_snapshot_id <- CTO.hash_current_delivery_state(live_root)
    final_live_review_context_id <- CTO.recompute_current_review_context_id(
        certification_api_contract,
        certification_docs,
        CTO.current_harness_policy_and_prompt_identity(),
        transport_manifest_hash,
        chunk_manifest_hash,
        model_codebase_map_hash
    )

    CEO.assert_equal(final_live_snapshot_id, snapshot_id)
    CEO.assert_equal(final_live_review_context_id, review_context_id)
    CEO.assert_no_change_after_certification_evidence(
        snapshot_id,
        review_context_id
    )
    CTO.assert_delivery_freeze_still_effective(delivery_freeze)
    CEO.emit("REVIEW_STATUS: VERIFIED_CLEAN")
    CTO.release_final_delivery_freeze_after_status(delivery_freeze)
    END

PROCEDURE REPAIR_AND_VERIFY_ACCEPTED_DEFECTS_UNTIL_STABLE(
    accepted_defects,
    live_root,
    run_identity,
    local_evidence_registry,
    api_contract,
    prior_review_context_id,
    api_key
):

  Reviewer.record_clean_evidence_invalidation(
      prior_review_context_id,
      accepted_defects
  )

  pending <- accepted_defects

  WHILE pending is not empty:

    target_defects <- defects_owned_for_repair_by_programmer(pending)
    harness_defects <- defects_owned_for_repair_by_cto(pending)

    Programmer.repair_target_project_defects(target_defects)
    CTO.repair_review_harness_defects(harness_defects)
    Reviewer.mark_implemented_repairs_FIXED_PENDING_VERIFICATION(pending)

    # Re-establish the current review contract after any repair because a harness
    # repair can change model-request, prompt, retry, chunking, or adjudication
    # behavior. Do not use the old clean-round context by assumption.
    repair_docs <- CTO.fetch_latest_official_nvidia_nim_docs()
    repair_api_contract <- CTO.reconcile_docs_or_fail(repair_docs)
    CTO.assert_nemotron3_ultra_hosted_model_supported(repair_api_contract)
    CTO.assert_free_hosted_endpoint_available(repair_api_contract)
    repair_harness_version <- CTO.current_harness_policy_and_prompt_identity()

    # Freeze target state first. Every dynamic/manual finding generated after
    # repairs must cite immutable target evidence plus the exact repair-review
    # context rather than a moving live workspace.
    candidate_snapshot <- CTO.capture_stable_current_codebase(live_root)
    candidate_snapshot_id <- CTO.hash_behavior_complete_snapshot(
        candidate_snapshot
    )
    candidate_inventory <- CTO.enumerate_project_files(candidate_snapshot)
    candidate_reviewable <- CTO.select_all_reviewable_project_files(
        candidate_inventory
    )
    candidate_transport_view <- CTO.build_secret_redacted_model_transport_view(
        candidate_snapshot,
        candidate_reviewable
    )
    CTO.assert_transport_view_preserves_line_mapping_and_contains_no_known_secret(
        candidate_transport_view,
        candidate_snapshot
    )

    candidate_codebase_map <- CTO.build_codebase_map(
        candidate_reviewable,
        model_assistance_source=candidate_transport_view
    )
    candidate_model_codebase_map <- CTO.build_model_safe_codebase_map(
        candidate_codebase_map,
        candidate_transport_view
    )
    candidate_chunks <- CTO.semantic_chunk_all_reviewable_files(
        candidate_transport_view,
        source_inventory=candidate_reviewable
    )
    CTO.assert_every_reviewable_line_is_covered(candidate_chunks)

    candidate_transport_manifest_hash <- CTO.hash_model_transport_manifest(
        candidate_transport_view
    )
    candidate_chunk_manifest_hash <- CTO.hash_base_chunk_manifest_and_coverage_plan(
        candidate_chunks
    )
    candidate_model_map_hash <- CTO.hash_model_safe_codebase_map(
        candidate_model_codebase_map
    )

    repair_review_context_id <- CTO.compute_review_context_id(
        repair_api_contract,
        repair_docs,
        repair_harness_version,
        candidate_transport_manifest_hash,
        candidate_chunk_manifest_hash,
        candidate_model_map_hash
    )
    CTO.assert_review_context_complete(repair_review_context_id)

    repair_exec_env <- Tester.build_sanitized_project_execution_environment()
    Tester.assert_environment_excludes(
        repair_exec_env,
        "NVIDIA_API_KEY_CODING",
        harness_only_secrets
    )

    repair_execution_copy <- Tester.create_disposable_execution_copy(
        candidate_snapshot
    )
    Tester.assert_execution_copy_matches_snapshot(
        repair_execution_copy,
        candidate_snapshot_id
    )

    repair_result <- Tester.verify_repairs_and_regression(
        repair_execution_copy,
        pending,
        repair_exec_env
    )
    Reviewer.register_local_evidence(
        local_evidence_registry,
        repair_result.evidence_id,
        repair_result.evidence,
        run_identity,
        null,
        candidate_snapshot_id,
        repair_review_context_id
    )

    IF harness_defects is not empty:
      harness_repair_suite <- Tester.run_relevant_harness_failure_mode_suite(
          repair_harness_version,
          repair_review_context_id,
          harness_defects
      )
      Reviewer.register_local_evidence(
          local_evidence_registry,
          harness_repair_suite.evidence_id,
          harness_repair_suite.evidence,
          run_identity,
          null,
          candidate_snapshot_id,
          repair_review_context_id
      )
      repair_result <- merge_repair_verification_results(
          repair_result,
          harness_repair_suite
      )

    Reviewer.audit_repair_for_test_or_policy_weakening(
        candidate_snapshot,
        repair_review_context_id
    )

    # Existing defects whose required defect-specific verification passed are
    # advanced, but not closed. Existing failed repairs stay pending.
    FOR each defect IN pending:
      IF repair_result.required_verification_passed(defect):
        Reviewer.mark_VERIFIED_FIXED_PENDING_FULL_REVIEW(
            defect,
            candidate_snapshot_id,
            repair_review_context_id,
            repair_result.evidence_for(defect)
        )
      ELSE:
        Reviewer.keep_defect_open_for_repair(
            defect,
            repair_result.evidence_for(defect)
        )

    failed_existing <- repair_result.defects_whose_required_verification_failed

    Reviewer.register_local_evidence(
        local_evidence_registry,
        Reviewer.repair_audit_evidence_id,
        Reviewer.repair_audit_evidence,
        run_identity,
        null,
        candidate_snapshot_id,
        repair_review_context_id
    )
    Reviewer.register_local_evidence(
        local_evidence_registry,
        CTO.repair_analysis_evidence_id,
        CTO.repair_analysis_evidence,
        run_identity,
        null,
        candidate_snapshot_id,
        repair_review_context_id
    )

    repair_candidates <- Reviewer.normalize_candidate_ingress_from_multiple_sources(
        sources=[
          (repair_result.new_candidate_findings, "TESTER_DYNAMIC",
           repair_result.evidence_id),
          (Reviewer.repair_audit_findings, "REVIEWER_MANUAL",
           Reviewer.repair_audit_evidence_id),
          (CTO.repair_analysis_findings, "CTO_TECHNICAL_ANALYSIS",
           CTO.repair_analysis_evidence_id)
        ],
        run_id=run_identity,
        round_id=null,
        snapshot_id=candidate_snapshot_id,
        review_context_id=repair_review_context_id
    )
    Reviewer.assert_candidate_collection_provenance_complete(repair_candidates)

    newly_accepted <- empty

    IF repair_candidates is not empty:
      repair_local_evidence <- assemble_local_adjudication_evidence_bundle(
          candidate_snapshot,
          repair_candidates,
          local_evidence_registry
      )

      repair_adjudications <- PROGRAMMER_ADJUDICATE_AND_CHALLENGE_ALL(
          repair_candidates,
          repair_local_evidence,
          candidate_transport_view,
          run_identity,
          null,
          candidate_snapshot_id,
          repair_review_context_id,
          repair_api_contract,
          api_key
      )

      Reviewer.assert_zero_unresolved_candidates(repair_adjudications)
      Reviewer.persist_all_nonaccepted_terminal_adjudications(
          repair_adjudications,
          ADJUDICATIONS
      )

      FOR each repair_adjudication IN repair_adjudications:
        IF repair_adjudication == ACCEPTED_DEFECT:
          Reviewer.append_or_merge_into_DEFECTS_after_programmer_adjudication(
              repair_adjudication,
              candidate_snapshot_id,
              repair_review_context_id
          )

      newly_accepted <- all_ACCEPTED_DEFECT(repair_adjudications)

    pending <- stable_union(failed_existing, newly_accepted)

  RETURN

PROCEDURE PROGRAMMER_ADJUDICATE_AND_CHALLENGE_ALL(
    candidates,
    raw_evidence_source,
    model_transport_source,
    run_identity,
    round_identity,
    snapshot_identity,
    review_context_identity,
    api_contract,
    api_key
):

  Reviewer.assert_candidate_collection_provenance_complete(candidates)

  normalized_candidates <- Reviewer.normalize_and_deduplicate_candidates(
      candidates,
      run_identity,
      round_identity,
      snapshot_identity,
      review_context_identity
  )
  Reviewer.flag_candidates_matching_closed_historical_defects_as_regressions(
      normalized_candidates,
      DEFECTS
  )

  Reviewer.assert_every_candidate_identity_matches(
      normalized_candidates,
      run_identity,
      round_identity,
      snapshot_identity,
      review_context_identity
  )

  ordered_candidates <- Reviewer.order_duplicate_groups_canonical_first(
      normalized_candidates
  )
  Reviewer.assert_no_dependent_duplicate_precedes_its_primary(
      ordered_candidates
  )

  adjudications <- empty

  FOR each candidate IN ordered_candidates:

    decision <- Programmer.adjudicate(
        candidate,
        exact_evidence_for(
            candidate,
            raw_evidence_source,
            snapshot_identity,
            review_context_identity
        )
    )

    WHILE decision == NEEDS_MORE_EVIDENCE:
      evidence <- gather_requested_evidence(
          candidate,
          raw_evidence_source,
          snapshot_identity
      )
      decision <- Programmer.adjudicate(candidate, evidence)

    IF decision is a DUPLICATE disposition:
      canonical_defect <- Reviewer.resolve_active_accepted_canonical_defect(
          decision,
          DEFECTS,
          adjudications
      )
      Reviewer.assert_canonical_defect_is_active_and_accepted(
          canonical_defect,
          snapshot_identity,
          review_context_identity
      )
    ELSE:
      canonical_defect <- null

    IF decision is REJECTED_FALSE_POSITIVE
       OR decision is OUT_OF_SCOPE_NOT_A_DEFECT
       OR decision is a DUPLICATE disposition:

      challenge_packet_id <- Reviewer.new_review_packet_id(
          run_identity,
          round_identity,
          "ADJUDICATION_CHALLENGE",
          candidate.candidate_id,
          snapshot_identity,
          review_context_identity
      )

      challenge <- Reviewer.fresh_nemotron3_ultra_challenge(
          candidate,
          decision,
          build_MODEL_SAFE_EVIDENCE_VIEW_for_adjudication_challenge(
              candidate,
              decision,
              canonical_defect_evidence_id_or_register_if_needed(
                  canonical_defect,
                  run_identity,
                  round_identity,
                  snapshot_identity,
                  review_context_identity
              ),
              raw_evidence_source,
              model_transport_source,
              snapshot_identity,
              review_context_identity
          ),
          run_identity,
          round_identity,
          snapshot_identity,
          review_context_identity,
          challenge_packet_id,
          api_contract,
          api_key
      )
      Reviewer.validate_response_or_fail(challenge)
      canonical_defect_evidence_id <- Reviewer.import_history_into_LOCAL_EVIDENCE_REGISTRY_if_needed(
          canonical_defect,
          run_identity,
          round_identity,
          snapshot_identity,
          review_context_identity
      )

      challenge <- Reviewer.resolve_adjudication_challenge_context_or_fail(
          challenge,
          source_context_view=model_transport_source,
          run_evidence_view=build_MODEL_SAFE_EVIDENCE_VIEW_for_requested_local_evidence(
              candidate,
              raw_evidence_source,
              snapshot_identity,
              review_context_identity
          ),
          canonical_defect_view=build_MODEL_SAFE_EVIDENCE_VIEW_from_registered_evidence(
              canonical_defect_evidence_id,
              snapshot_identity,
              review_context_identity
          ),
          snapshot_identity=snapshot_identity,
          review_context_identity=review_context_identity,
          review_packet_id=challenge_packet_id
      )
      Reviewer.validate_response_or_fail(challenge)

      IF challenge.rationale_incomplete
         OR challenge.has_new_evidence
         OR challenge.requests_reconsideration
         OR challenge.material_context_change
         OR challenge.duplicate_root_cause_not_established:

        final_local_evidence <- assemble_local_final_adjudication_evidence(
            candidate,
            raw_evidence_source,
            decision,
            canonical_defect,
            challenge,
            snapshot_identity,
            review_context_identity
        )

        decision <- Programmer.final_adjudicate(
            candidate,
            decision,
            challenge,
            final_local_evidence
        )

    append(adjudications, decision)

  assert_zero_unresolved_candidates(adjudications)
  RETURN adjudications

The pseudocode is logical, not syntax for a particular language. Implementations
may structure loops/functions differently but MUST preserve role ownership,
complete candidate normalization, post-adjudication defect logging, reset
behavior, two fresh clean rounds, and the rule that only the CEO emits the
project-level REVIEW_STATUS: VERIFIED_CLEAN.

-------------------------------------------------------------------------------

## 43. Final Company Certification Sequence

After two consecutive complete clean static review rounds on the same unchanged
snapshot and same unchanged REVIEW_CONTEXT_ID, the CTO MUST first re-fetch and
reconcile the current official NVIDIA NIM/Nemotron documentation. If any
REVIEW_CONTEXT_ID component derived from the API contract, model semantics,
Free Endpoint classification, or relevant official documentation changed, the
two clean rounds are stale: reset the clean count to zero and restart.

After the final Tester regression and any resulting adjudication challenges
complete, the CTO MUST perform one more current NVIDIA documentation/API/
Free-Endpoint revalidation immediately before subordinate certificates are
issued. If that revalidation changes REVIEW_CONTEXT_ID, reset the clean count
and restart.

Only after both freshness checks succeed does final certification proceed in
this exact order. Every subordinate certificate MUST carry the same RUN_ID,
SNAPSHOT_ID, and REVIEW_CONTEXT_ID.

### 43.1 CTO certification

The CTO certifies with evidence that:

- latest official API documentation was read and reconciled at run start,
  revalidated after the two clean rounds, and revalidated again after final
  Tester/adjudication work immediately before certificates were issued;
- neither final-stage revalidation changed REVIEW_CONTEXT_ID;
- the intended hosted Nemotron 3 Ultra API contract was used;
- current official documentation classified the configured route as a Free
  Endpoint for this run;
- MODEL_ACCESS_PROBE.md or equivalent evidence is present, sanitized, and bound
  to this RUN_ID;
- the mandatory live access probe succeeded for the exact configured model using
  NVIDIA_API_KEY_CODING;
- any startup 404 responses followed the bounded retry policy and a persistent
  404 did not get misclassified as success;
- no fallback model/provider/endpoint was used;
- credential handling conformed to this workflow;
- the final SNAPSHOT_ID is correct;
- the final REVIEW_CONTEXT_ID is correct and binds the exact API/documentation,
  model/transport, prompt, harness, and review-policy identities used for the
  certified rounds;
- inventory and exclusions are complete and defensible;
- every reviewable line is covered;
- MODEL_TRANSPORT_VIEW generation is evidenced as redacted and line-mapped to
  the certified snapshot;
- all model-bound run-local/adjudication/defect-history evidence paths are
  evidenced as passing through MODEL_SAFE_EVIDENCE_VIEW;
- prompt/policy versions are recorded;
- required harness failure-mode tests passed;
- no material harness defect invalidates the two clean rounds.

### 43.2 Programmer certification

The Programmer certifies with evidence that:

- every candidate requiring Programmer adjudication reached a terminal state;
- every accepted defect was recorded in DEFECTS.md;
- every accepted defect intended for closure was repaired;
- no accepted defect is being hidden as a rejected candidate, out-of-scope
  disposition, or duplicate;
- DEFECTS.md contains zero OPEN, IN_REPAIR, FIXED_PENDING_VERIFICATION,
  VERIFIED_FIXED_PENDING_FULL_REVIEW, or otherwise unverified/unclosed accepted
  defects of any severity for the certified snapshot.

This certification does not replace Reviewer or Tester verification.

### 43.3 Reviewer certification

The Reviewer certifies with evidence that:

- all chunk/global/test-quality review obligations were completed;
- no invalid API response was counted as clean;
- all candidates were preserved and routed to Programmer adjudication;
- every rejection, out-of-scope disposition, and duplicate classification
  received a valid independent challenge, including canonical root-cause
  comparison for every duplicate classification;
- every challenge meeting a mandatory final-adjudication trigger in Section 23
  returned to the Programmer and reached final adjudication;
- DEFECTS.md contains every Programmer-accepted defect;
- ADJUDICATIONS.md or its approved equivalent contains every non-accepted
  terminal disposition with the required rationale/challenge evidence;
- two consecutive complete clean rounds used fresh model requests and the same
  unchanged final snapshot and same unchanged REVIEW_CONTEXT_ID;
- no Reviewer-discovered unresolved evidence remains.

### 43.4 Tester certification

The Tester certifies with evidence that:

- baseline verification, every clean round's required independent fresh-copy
  regression, and final project verification were executed where safe and
  supported, or each limitation is explicitly documented without being
  represented as a pass;
- defect-specific repair verification was completed;
- no unresolved Tester candidate remains;
- required harness failure-mode tests pass, including exact-model startup
  access probing, bounded 404 retry, hard-stop on exhausted access, and
  no-fallback behavior;
- final tests operated against a disposable execution copy of the exact
  certified snapshot and did not mutate certified bytes;
- project subprocesses did not inherit NVIDIA_API_KEY_CODING or harness-only
  secrets;
- no false-green test behavior is known.

### 43.5 CEO certification

Before the final live-state comparison and CEO status emission, the CEO/CTO MUST
establish a final delivery freeze: either make the intended delivery state
read-only/immutable for the certification interval or use an equivalent
coordination mechanism that prevents concurrent target/harness changes between
the final identity comparison and status emission.

The CEO MUST inspect all four subordinate certifications and their underlying
material evidence.

The CEO MUST verify that:

- all role certificates refer to the same RUN_ID;
- all role certificates refer to the same final SNAPSHOT_ID;
- all role certificates refer to the same final REVIEW_CONTEXT_ID;
- the certified REVIEW_CONTEXT_ID still matches the API/documentation,
  model/transport, prompt, harness, and review-policy identities on which the
  evidence depends;
- the exact hosted Nemotron 3 Ultra model-access probe succeeded with
  NVIDIA_API_KEY_CODING and no fallback path was used;
- there is no contradiction between certificates;
- no subordinate gate is conditional, incomplete, or merely asserted without
  evidence;
- no accepted defect remains unclosed in any status and no unresolved candidate
  remains;
- DEFECTS.md and ADJUDICATIONS.md (or approved equivalents) are complete and
  mutually consistent with the candidate/adjudication evidence;
- the two-clean-round gate is valid;
- the final Tester gate is valid;
- no change occurred after the evidence on which certification depends;
- the final delivery freeze or equivalent coordination remained effective from
  the final identity comparison through status emission.

Only then may the CEO emit:

REVIEW_STATUS: VERIFIED_CLEAN

If any final certificate cannot be truthfully issued, the CEO MUST return the
workflow to the earliest affected gate. If that issue requires a target-code,
test, harness, prompt, or material policy change, invalidate prior clean evidence
as required and restart the clean-round sequence.

## 44. Failure Conditions

The CEO MUST treat the engagement as not clean when any required role has not completed its assigned gate or when role independence/evidence ownership has collapsed in a way that prevents independent verification.

The CEO MUST NOT return REVIEW_STATUS: VERIFIED_CLEAN when any of these is true:

- current NVIDIA NIM/Nemotron documentation was not read;
- material documentation conflict remains unresolved;
- either required final-stage documentation/API revalidation was skipped, or
  either changed REVIEW_CONTEXT_ID without resetting/restarting the clean
  sequence;
- NVIDIA_API_KEY_CODING was not sourced from the environment;
- current official NVIDIA documentation did not classify the configured hosted
  route as a Free Endpoint but review proceeded anyway;
- MODEL_ACCESS_PROBE.md/equivalent evidence is missing, unsanitized, or not bound
  to the current RUN_ID;
- the mandatory exact-model startup inference probe was skipped, failed, or
  exhausted retries without a hard stop;
- `GET /v1/models` or documentation alone was treated as proof of live model
  inference access;
- persistent HTTP 404 after bounded retries was treated as success;
- HTTP 401/403 was evaded through silent credential/model/provider substitution;
- a different model, provider, endpoint class, or credential source was silently
  substituted;
- repository snapshot changed during review;
- any in-scope current project entry was unintentionally omitted because it was
  untracked, ignored, modified, binary, nested, or otherwise not represented by
  committed HEAD;
- test files were omitted;
- test scripts were omitted;
- a reviewable file has no direct chunk coverage;
- a reviewable text line is uncovered;
- any chunk request failed permanently;
- any model response was empty and interpreted as clean;
- any model response was truncated and interpreted as clean;
- any context request is unresolved;
- raw snapshot/source content bypassed MODEL_TRANSPORT_VIEW, raw
  LOCAL_EVIDENCE_REGISTRY/run-local evidence bypassed MODEL_SAFE_EVIDENCE_VIEW,
  durable defect/adjudication/history evidence was sent without first receiving
  an authoritative local evidence registration/import identity, the model
  gained direct access to the local evidence registry, or an actual secret was
  sent to NVIDIA NIM;
- a target-project subprocess inherited NVIDIA_API_KEY_CODING or another
  harness-only secret;
- any required global pass is incomplete;
- test-quality review is incomplete;
- any raw observation was persisted into CANDIDATE_FINDING_QUEUE before required
  provenance/sanitization was complete;
- any candidate that depends on local execution/build/tool evidence lacks a
  valid matching LOCAL_EVIDENCE_REGISTRY entry;
- any candidate lacks Programmer adjudication;
- any required rejection/out-of-scope/duplicate challenge was skipped,
  incomplete, invalid, or unresolved;
- any accepted defect is missing from DEFECTS.md;
- any accepted defect remains OPEN, IN_REPAIR, FIXED_PENDING_VERIFICATION,
  VERIFIED_FIXED_PENDING_FULL_REVIEW, or otherwise unclosed;
- any target-review/adjudication model request, candidate, adjudication, or
  certificate lacks the required RUN_ID, applicable ROUND_ID, SNAPSHOT_ID, or
  REVIEW_CONTEXT_ID provenance;
- the pre-snapshot startup access probe lacks RUN_ID or MODEL_ACCESS_PROBE_ID, or
  is incorrectly treated as a clean-round/review packet;
- any model response lacks the matching RUN_ID, applicable ROUND_ID,
  REVIEW_PACKET_ID, or lacks the matching CHUNK_ID when the packet is a chunk
  review;
- fewer than two consecutive complete clean rounds occurred;
- SNAPSHOT_ID changed between the two clean rounds for any reason;
- the second clean round reused first-round model responses;
- required Tester baseline, per-round fresh-copy regression, final dynamic, or
  harness-conformance verification is incomplete or an unavailable execution
  limitation was represented as a pass;
- a required CTO, Programmer, Reviewer, or Tester certificate is missing;
- no effective final delivery freeze/equivalent coordination prevents target or
  harness changes between the final identity comparison and CEO status emission;
- subordinate certificates refer to different RUN_ID values;
- subordinate certificates refer to different SNAPSHOT_ID values;
- subordinate certificates refer to different REVIEW_CONTEXT_ID values;
- REVIEW_CONTEXT_ID changed between clean rounds or after evidence without the
  required reset/restart;
- role independence was collapsed for the same candidate in a prohibited way;
- a material harness/prompt/policy change occurred without resetting the clean sequence;
- final tests discovered a candidate that has not completed adjudication/challenge;
- behavior-bearing snapshot metadata changed without changing SNAPSHOT_ID;
- ENDING_REVIEW_CONTEXT_ID differs from STARTING_REVIEW_CONTEXT_ID for a round
  that was counted as clean;
- an accepted defect was closed after only defect-specific verification without
  a complete clean post-repair review round.

-------------------------------------------------------------------------------

## 45. Non-Goals

This harness is not:

- a substitute for runtime testing;
- a substitute for fuzzing;
- a substitute for dynamic sanitizers;
- a substitute for human domain knowledge;
- a mathematical proof of correctness;
- permission to skip project-specific QA gates.

It is a full-company review workflow centered on exhaustive model-assisted
static review and Programmer adjudication, supplemented by Tester-owned dynamic
verification and harness-conformance testing.

It still does not replace project-specific runtime, fuzzing, sanitizer, domain,
or acceptance gates beyond those explicitly integrated here.

-------------------------------------------------------------------------------

## 46. Implementation Independence

A conforming implementation may use any programming language or shell.

It may use:

- subprocesses;
- direct filesystem APIs;
- Git commands;
- HTTP libraries;
- curl-like tools;
- native JSON parsing;
- SDKs;
- databases;
- flat files.

A conforming implementation MUST preserve the workflow invariants regardless
of tool choice.

Examples:

- A Bash implementation may use curl and jq.
- A PowerShell implementation may use Invoke-RestMethod.
- A JavaScript implementation may use fetch or an HTTP client.
- A Python implementation may use requests/httpx or an API SDK.
- A compiled implementation may use its native HTTP and JSON libraries.

None of those choices changes:

- documentation discovery;
- environment-only NVIDIA_API_KEY_CODING use;
- official Free Endpoint classification check with fail-closed semantics;
- mandatory exact-model startup inference probe and hard-stop semantics;
- bounded exponential backoff including conditional hosted HTTP 404 retry;
- no model/provider/endpoint fallback;
- complete code/test inventory;
- stable snapshotting;
- LOCAL_EVIDENCE_REGISTRY plus MODEL_TRANSPORT_VIEW and
  MODEL_SAFE_EVIDENCE_VIEW isolation;
- complete chunk coverage;
- NVIDIA Nemotron 3 Ultra review;
- Programmer adjudication;
- Reviewer challenge of rejections, out-of-scope dispositions, and duplicate
  classifications;
- post-adjudication defect logging;
- repair-triggered full re-review;
- Tester dynamic/harness verification;
- two-consecutive-clean-round success gate;
- ordered CTO, Programmer, Reviewer, Tester, and CEO final certification.

-------------------------------------------------------------------------------

## 47. Required Conformance Checklist

### Software company responsibility

- [ ] CEO defined/confirmed scope and owns final gate.
- [ ] CTO owns API contract, snapshot, inventory, chunking, and coverage.
- [ ] Programmer adjudicates every candidate before confirmed defect logging.
- [ ] Reviewer owns independent model review, challenge, and defect-ledger integrity.
- [ ] Tester owns dynamic verification and harness failure-mode testing.
- [ ] Reviewer does not modify target code/tests.
- [ ] Programmer does not self-certify overall clean status.
- [ ] Tester does not weaken tests to obtain green results.
- [ ] CEO does not waive unresolved technical evidence.
- [ ] All material handoffs preserve RUN_ID/ROUND_ID/SNAPSHOT_ID/REVIEW_CONTEXT_ID as applicable and evidence provenance.
- [ ] Findings from every origin use the same Programmer-adjudication gate.
- [ ] Final CEO status follows CTO, Programmer, Reviewer, and Tester certificates.

An implementation conforms to this workflow only if all answers are YES.

### NVIDIA NIM/API

- [ ] Reads latest official NVIDIA NIM and Nemotron 3 Ultra documentation at every run.
- [ ] Reconciles official documentation conflicts.
- [ ] Uses current NVIDIA Nemotron 3 Ultra hosted model identifier.
- [ ] Confirms current official NVIDIA Build documentation still marks the
      configured hosted route as a Free Endpoint and fails closed otherwise.
- [ ] Performs a live startup chat-completion probe against that exact model.
- [ ] Persists sanitized MODEL_ACCESS_PROBE.md/equivalent evidence bound to the
      current RUN_ID and a unique MODEL_ACCESS_PROBE_ID; the pre-snapshot probe is
      not misclassified as a review packet.
- [ ] Does not accept `GET /v1/models` alone as proof of inference access.
- [ ] Hard-stops if exact-model access cannot be proven after bounded retries.
- [ ] Does not silently fall back to another model, provider, endpoint, or
      credential source.
- [ ] Uses NVIDIA_API_KEY_CODING from environment only.
- [ ] Never logs or persists the API key.
- [ ] Detects empty/truncated/invalid structured output.
- [ ] Uses bounded exponential backoff with jitter for retryable failures.
- [ ] Treats hosted HTTP 404 as conditionally retryable but fails closed after
      retry exhaustion.
- [ ] Treats 401/403 as non-retryable by default unless current official NVIDIA
      documentation explicitly says otherwise.
- [ ] Honors current thinking-mode and reasoning-budget parameter semantics.

### Snapshot/inventory

- [ ] Captures every in-scope current project entry, not merely committed HEAD,
      and does not treat Git ignore/tracking status as an automatic exclusion.
- [ ] Uses one immutable/effectively immutable snapshot per round.
- [ ] Computes SNAPSHOT_ID from file content plus behavior-bearing metadata as applicable.
- [ ] Inventories all relevant project files.
- [ ] Detects symlinks, submodules, nested repositories, and unusual paths.
- [ ] Records every exclusion.
- [ ] Includes production source.
- [ ] Includes all tests.
- [ ] Includes all test scripts.
- [ ] Includes build/configuration/CI logic.
- [ ] Redacts actual secrets before model transmission.
- [ ] Every model-bound snapshot/source packet comes only from the
      line-preserving MODEL_TRANSPORT_VIEW or a proven-safe derivative.
- [ ] Every model-bound run-local/adjudication/defect-history evidence packet
      comes only from MODEL_SAFE_EVIDENCE_VIEW.
- [ ] Durable defect/adjudication/history evidence is imported into
      LOCAL_EVIDENCE_REGISTRY with source-record ID/hash before a
      MODEL_SAFE_EVIDENCE_VIEW is generated from it.
- [ ] Project build/test subprocesses do not inherit NVIDIA_API_KEY_CODING or
      harness-only secrets.

### Chunking

- [ ] Chunks every reviewable file.
- [ ] Prefers semantic boundaries.
- [ ] Preserves path, line, SNAPSHOT_ID, and REVIEW_CONTEXT_ID metadata.
- [ ] Uses overlap where boundaries matter.
- [ ] Verifies every reviewable line has coverage.
- [ ] Reviews tests independently even when paired with production chunks.

### Review

- [ ] Performs direct chunk review.
- [ ] Allows explicit context requests.
- [ ] Performs global cross-file review.
- [ ] Performs dedicated test-quality review.
- [ ] Tester performs the required regression on a NEW disposable execution copy
      in every complete review round, distinct from the baseline execution copy,
      or records safe-execution unavailability without claiming a pass.
- [ ] Assigns every logical model packet a REVIEW_PACKET_ID and validates the
      echoed packet identity plus CHUNK_ID when applicable.
- [ ] Validates every model response after all required context followups.
- [ ] Does not interpret failed requests as clean results.

### Adjudication

- [ ] Normalizes/sanitizes provenance atomically at candidate ingress; no raw
      observation enters CANDIDATE_FINDING_QUEUE first and receives required
      identity metadata later.
- [ ] Keeps findings from every approved origin in a provenance-preserving candidate queue.
- [ ] No finding source, including NVIDIA NIM or Tester, can directly write a confirmed defect before Programmer adjudication.
- [ ] Programmer inspects actual cited code.
- [ ] Every candidate carries RUN_ID, applicable ROUND_ID, SNAPSHOT_ID,
      REVIEW_CONTEXT_ID, and source REVIEW_PACKET_ID when model-originated, and
      is adjudicated.
- [ ] Every candidate depending on execution/build/tool evidence resolves to a
      matching LOCAL_EVIDENCE_REGISTRY entry; raw registry evidence is local-only
      and model followups receive only MODEL_SAFE_EVIDENCE_VIEW.
- [ ] Every non-accepted terminal disposition is evidence-bearing: rejection
      proves the candidate false, out-of-scope proves the strict scope boundary
      without hiding an in-scope defect, and duplicate proves the active
      canonical root-cause relationship.
- [ ] Rejections, out-of-scope dispositions, and duplicate classifications
      receive an independent NVIDIA NIM challenge pass.
- [ ] Any new/contradictory challenge evidence, incomplete rationale,
      reconsideration request, material context change, or invalid duplicate
      classification returns to Programmer for final adjudication.
- [ ] Zero candidates remain unresolved.

### Defect list

- [ ] Every Programmer-accepted defect, including an accepted review-harness defect, is in DEFECTS.md.
- [ ] Defects from every origin are logged only after Programmer adjudication.
- [ ] Duplicate candidates map to active canonical defects; recurrence of a
      CLOSED defect is reopened or accepted as a linked regression and cannot be
      used to manufacture a clean round.
- [ ] Every non-accepted terminal disposition is preserved separately in the
      durable adjudication record with required rationale/challenge evidence.
- [ ] Fixed defects remain historically recorded.
- [ ] Defect closure includes defect-specific verification evidence plus a
      complete clean post-repair review round.
- [ ] Harness control artifacts do not silently mutate the review snapshot.

### Completion

- [ ] After any repair, the target state is freshly recaptured and SNAPSHOT_ID
      is recomputed; a harness-only repair may legitimately yield the same target
      SNAPSHOT_ID but MUST yield/revalidate the applicable REVIEW_CONTEXT_ID.
- [ ] Any accepted-defect repair resets clean-round count to zero.
- [ ] Full repository review restarts after repair.
- [ ] One clean round is insufficient.
- [ ] Second clean round uses fresh model requests.
- [ ] Same unchanged snapshot and same unchanged REVIEW_CONTEXT_ID pass two consecutive clean rounds.
- [ ] Current official NVIDIA docs/API/free-endpoint facts are revalidated after
      the two clean rounds AND again after final Tester/adjudication work
      immediately before certificates; either changed REVIEW_CONTEXT_ID resets
      the sequence.
- [ ] Tester actually executes the required harness failure-mode suite for the
      certified harness/review context; it is not merely asserted to exist.
- [ ] Harness fault injection proves exact-model startup probing, bounded 404
      retry/hard-stop behavior, 401/403 no-fallback handling, packet-identity
      mismatch rejection, atomic candidate-ingress enforcement,
      LOCAL_EVIDENCE_REGISTRY mismatch rejection and safe followup isolation,
      and CLOSED-defect recurrence/regression handling.
- [ ] Required Tester final regression and harness-conformance gates pass.
- [ ] CTO, Programmer, Reviewer, and Tester issue evidence-bearing final certificates.
- [ ] CEO validates all certificates against the same RUN_ID, SNAPSHOT_ID, and REVIEW_CONTEXT_ID.
- [ ] A final delivery freeze/equivalent coordination prevents post-check changes
      through CEO status emission.
- [ ] Only the CEO may then emit REVIEW_STATUS: VERIFIED_CLEAN.

-------------------------------------------------------------------------------

## 48. Final Success Contract

Final success is a company-level result, not merely a model or harness result.
The CEO may certify success only after the CTO, Programmer, Reviewer, and Tester
have completed their mandatory evidence-bearing certifications.

The CEO may report success only when the company evidence proves:

1. It read and reconciled the latest official NVIDIA NIM and Nemotron 3 Ultra
   documentation.
2. It authenticated exclusively from NVIDIA_API_KEY_CODING in the environment.
3. Current official NVIDIA documentation classified the configured hosted
   Nemotron 3 Ultra route as a Free Endpoint; the company preserved sanitized
   MODEL_ACCESS_PROBE evidence for the current RUN_ID and successfully completed
   the mandatory live startup inference probe against the exact configured
   `nvidia/nemotron-3-ultra-550b-a55b` model, or its reconciled current official
   replacement identifier, using bounded retry including the conditional 404
   policy and using no fallback model/provider, endpoint class, credential
   source, or paid route.
4. It captured the complete current codebase into a stable review snapshot.
5. It directly reviewed all reviewable production code.
6. It directly reviewed all tests.
7. It directly reviewed all test scripts.
8. It reviewed build, configuration, and other behavior-bearing project logic.
9. It proved that all model-bound snapshot/source material used
   MODEL_TRANSPORT_VIEW, all model-bound run-local/adjudication/defect-history
   evidence used MODEL_SAFE_EVIDENCE_VIEW, durable history evidence was first
   imported into LOCAL_EVIDENCE_REGISTRY with an authoritative source identity,
   and target-project subprocesses did not inherit NVIDIA_API_KEY_CODING or
   harness-only secrets.
10. It verified complete chunk/line coverage.
11. It completed repository-level cross-file review.
12. It completed adversarial test-quality review.
13. Every candidate finding from every approved origin was adjudicated by the
    Programmer against the immutable source state plus all required matching
    LOCAL_EVIDENCE_REGISTRY evidence, and no model request received raw registry
    evidence outside MODEL_SAFE_EVIDENCE_VIEW.
14. Every Programmer rejection, out-of-scope decision, and duplicate
    classification was independently challenge-reviewed, and every duplicate
    challenge compared the candidate with the active canonical accepted defect's
    sanitized root-cause evidence.
15. Every challenge with new/contradictory evidence, incomplete rationale,
    reconsideration request, materially changed context, or invalid duplicate
    classification was finally adjudicated by the Programmer.
16. Every genuine adjudicated defect was recorded in the authoritative defect
    list, and every non-accepted terminal disposition was durably recorded in the
    separate adjudication record.
17. Zero candidates remained unresolved, and every candidate/adjudication
    retained the correct RUN_ID, applicable ROUND_ID, SNAPSHOT_ID,
    REVIEW_CONTEXT_ID, and source REVIEW_PACKET_ID where applicable.
18. All accepted defects, including accepted review-harness defects, were
    repaired and defect-specifically verified by their assigned repair owner,
    then closed only after a complete clean post-repair review round covered the
    repaired state; any recurrence of a previously CLOSED defect was reopened or
    recorded as an accepted regression rather than dismissed as a harmless
    duplicate.
19. The resulting codebase and the harness identity on which its review depended
    received the required complete fresh review/conformance cycle after repairs.
20. The exact same unchanged snapshot under the exact same unchanged
    REVIEW_CONTEXT_ID completed two consecutive clean review rounds with zero
    accepted defects.
21. No failed, empty, truncated, partial, or skipped review was counted as
    clean.
22. Required Tester baseline verification, each clean round's independent
    fresh-copy regression, final target-project regression, and harness
    failure-mode tests passed, or any explicitly non-executable project-test
    limitation was truthfully documented without being represented as a pass.
23. CTO, Programmer, Reviewer, and Tester final certificates all refer to the
    same RUN_ID, same unchanged SNAPSHOT_ID, and same unchanged
    REVIEW_CONTEXT_ID and are evidence-bearing.
24. The CTO revalidated current official NVIDIA documentation/API/free-endpoint
    facts after the two clean rounds and again after final Tester/adjudication
    work immediately before certificates, neither check changed
    REVIEW_CONTEXT_ID, and the CEO independently checked all certificates and
    found no contradiction, unresolved evidence, model-access ambiguity, or
    post-evidence change.


Only then may the CEO emit:

REVIEW_STATUS: VERIFIED_CLEAN

-------------------------------------------------------------------------------

## 49. Official Documentation References Used for This Specification

Current official NVIDIA references consulted when this workflow was written:

https://build.nvidia.com/nvidia/nemotron-3-ultra-550b-a55b
https://docs.api.nvidia.com/nim/reference/nvidia-nemotron-3-ultra-550b-a55b
https://docs.api.nvidia.com/nim/reference/llm-apis
https://docs.nvidia.com/nim/large-language-models/latest/reference/support-matrix.html

Current NVIDIA Build/API documentation establishes the baseline hosted endpoint,
model identifier, Free Endpoint availability, context scale, and thinking-mode
configuration summarized in Sections 3-6 and 13.

Community/forum operational reports were consulted only to justify the
workflow's bounded defensive treatment of intermittent HTTP 404 responses.
Community reports are diagnostic evidence, not authoritative API-contract
documentation.

These URLs are bootstrap references only.

A conforming harness MUST re-read current official NVIDIA documentation at run
time and MUST NOT assume this document remains more current than NVIDIA's
official documentation.

